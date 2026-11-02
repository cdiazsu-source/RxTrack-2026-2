"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { MALLA_PLAN } from "@/lib/malla-plan";
import { MAX_SEMESTER, asMallaStatus, canUseMalla, parseGrade, parseMallaList } from "@/lib/malla";

/**
 * Malla académica personal. Solo la cuenta con acceso total y sin alcance acotado
 * (`canUseMalla`); cualquier otra corta en silencio, igual que los cursos personales.
 */

async function allowed() {
  return canUseMalla(await getSession());
}

const str = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max);
const opt = (fd: FormData, key: string, max: number) => str(fd, key, max) || null;
const intOrNull = (fd: FormData, key: string) => {
  const n = Number.parseInt(str(fd, key, 3), 10);
  return Number.isFinite(n) && n > 0 && n <= 99 ? n : null;
};
const semesterOf = (fd: FormData) => {
  const n = Number.parseInt(str(fd, "semester", 3), 10);
  return Number.isFinite(n) && n >= 1 && n <= MAX_SEMESTER ? n : null;
};

/** La nota solo tiene sentido si está vista; al volver a «por ver» o «en curso» se borra. */
function gradeFor(status: string, fd: FormData) {
  return status === "APROBADA" ? parseGrade(fd.get("grade")) : null;
}

async function nextOrder(semester: number) {
  const last = await prisma.mallaSubject.findFirst({ where: { semester }, orderBy: { order: "desc" }, select: { order: true } });
  return (last?.order ?? -1) + 1;
}

export async function addMallaSubject(formData: FormData) {
  if (!(await allowed())) return;
  const semester = semesterOf(formData);
  const name = str(formData, "name", 140);
  if (!semester || !name) return;
  const status = asMallaStatus(formData.get("status"));
  await prisma.mallaSubject.create({
    data: {
      semester,
      name,
      credits: intOrNull(formData, "credits"),
      area: opt(formData, "area", 60),
      status,
      grade: gradeFor(status, formData),
      order: await nextOrder(semester),
    },
  });
  revalidateAll();
}

export async function updateMallaSubject(id: string, formData: FormData) {
  if (!(await allowed())) return;
  const semester = semesterOf(formData);
  const name = str(formData, "name", 140);
  if (!semester || !name) return;
  const status = asMallaStatus(formData.get("status"));
  const prev = await prisma.mallaSubject.findUnique({ where: { id }, select: { semester: true } });
  if (!prev) return;
  await prisma.mallaSubject.update({
    where: { id },
    data: {
      semester,
      name,
      credits: intOrNull(formData, "credits"),
      area: opt(formData, "area", 60),
      status,
      grade: gradeFor(status, formData),
      ...(prev.semester !== semester ? { order: await nextOrder(semester) } : {}),
    },
  });
  revalidateAll();
}

/** Cambio rápido de estado desde la tarjeta (sin abrir el formulario). */
export async function setMallaStatus(id: string, rawStatus: string) {
  if (!(await allowed())) return;
  const status = asMallaStatus(rawStatus);
  await prisma.mallaSubject.updateMany({
    where: { id },
    data: { status, ...(status === "APROBADA" ? {} : { grade: null }) },
  });
  revalidateAll();
}

export async function deleteMallaSubject(id: string) {
  if (!(await allowed())) return;
  await prisma.mallaSubject.deleteMany({ where: { id } });
  revalidateAll();
}

/** De lo pedido, lo que aún no existe; los nombres repetidos en un semestre (p. ej. «Libre elección») se cuentan uno a uno. */
async function missingCounts<T extends { semester: number; name: string }>(wanted: T[]): Promise<T[]> {
  const existing = await prisma.mallaSubject.findMany({ select: { semester: true, name: true } });
  const have = new Map<string, number>();
  for (const e of existing) have.set(rowKey(e.semester, e.name), (have.get(rowKey(e.semester, e.name)) ?? 0) + 1);
  return wanted.filter((w) => {
    const k = rowKey(w.semester, w.name);
    const n = have.get(k) ?? 0;
    if (n > 0) {
      have.set(k, n - 1);
      return false;
    }
    return true;
  });
}
const rowKey = (semester: number, name: string) => `${semester}|${name.toLowerCase()}`;

/**
 * Precarga el plan de estudios oficial (`MALLA_PLAN`). Lo que se cursa este semestre queda «en curso» y
 * enlazado a su asignatura de la app; el resto, «por ver». Si ya hay filas del plan no las duplica.
 */
export async function loadMallaPlan() {
  if (!(await allowed())) return;
  const wanted = MALLA_PLAN.flatMap((entries, i) => entries.map((e, order) => ({ ...e, semester: i + 1, order })));
  const toCreate = await missingCounts(wanted);
  if (toCreate.length > 0) {
    await prisma.mallaSubject.createMany({
      data: toCreate.map((e) => ({
        semester: e.semester,
        name: e.name,
        credits: e.credits,
        area: e.area,
        status: e.slug ? "EN_CURSO" : "PENDIENTE",
        subjectSlug: e.slug ?? null,
        order: e.order,
      })),
    });
  }
  revalidateAll();
}

/** Marca como vistas todas las asignaturas de un semestre que no estén en curso (conserva las notas ya puestas). */
export async function markSemesterPassed(semester: number) {
  if (!(await allowed())) return;
  if (!Number.isInteger(semester) || semester < 1 || semester > MAX_SEMESTER) return;
  await prisma.mallaSubject.updateMany({ where: { semester, status: "PENDIENTE" }, data: { status: "APROBADA" } });
  revalidateAll();
}

export type ImportMallaResult = { added: number; skipped: string[] } | null;

/** Importa una lista pegada (ver `parseMallaList`). No duplica lo que ya existe con el mismo nombre en el mismo semestre. */
export async function importMallaList(_prev: ImportMallaResult, formData: FormData): Promise<ImportMallaResult> {
  if (!(await allowed())) return null;
  const { lines, skipped } = parseMallaList(str(formData, "text", 20000));
  if (lines.length === 0) return { added: 0, skipped };

  const fresh = await missingCounts(lines);
  const orders = new Map<number, number>();
  const data = [];
  for (const l of fresh) {
    if (!orders.has(l.semester)) orders.set(l.semester, await nextOrder(l.semester));
    const order = orders.get(l.semester)!;
    orders.set(l.semester, order + 1);
    data.push({ ...l, order });
  }
  if (data.length > 0) await prisma.mallaSubject.createMany({ data });
  revalidateAll();
  return { added: data.length, skipped };
}
