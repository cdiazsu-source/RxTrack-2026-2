"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead, blockedForContribute, getSession } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { parseDateInput } from "@/lib/utils";

function clampGrade(raw: FormDataEntryValue | null): number | null {
  const s = String(raw ?? "").trim().replace(",", ".");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? Math.min(5, Math.max(0, n)) : null;
}

/** Registrar la nota obtenida en un componente (0..5). Vacío = sin nota aún.
 *  Solo la persona dueña de esa fila (Cesar o Diana) puede tocar su propia
 *  nota — cada quien lleva la suya, aparte. Sin efecto si el componente ya
 *  tiene quizzes (su nota sale del promedio, no de este campo). */
export async function setEvaluationGrade(id: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const session = await getSession();
  if (!session.authed) return;
  const item = await prisma.evaluationItem.findUnique({
    where: { id },
    select: { owner: true, _count: { select: { quizzes: true } } },
  });
  if (!item || item.owner !== session.name || item._count.quizzes > 0) return;
  await prisma.evaluationItem.update({ where: { id }, data: { grade: clampGrade(formData.get("grade")) } });
  revalidateAll();
}

/** Cesar define la estructura del curso (componentes y pesos): crea la fila
 *  para él Y para Diana a la vez, para que ambos seguimientos queden en
 *  sincro. */
export async function addEvaluationItem(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const name = String(formData.get("name") ?? "").trim();
  const weight = Math.max(0, Math.round(Number(formData.get("weight") ?? 0)));
  if (!name || !weight) return;
  const last = await prisma.evaluationItem.findFirst({
    where: { subjectId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const order = (last?.order ?? -1) + 1;
  await prisma.evaluationItem.createMany({
    data: [
      { subjectId, name, weight, order, owner: "Cesar" },
      { subjectId, name, weight, order, owner: "Diana" },
    ],
  });
  revalidateAll();
}

/** Borra el componente (la fila de Cesar Y la de Diana, para no dejar el
 *  seguimiento de una persona desincronizado del de la otra). */
export async function deleteEvaluationItem(id: string) {
  if (await blockedForRead()) return;
  const item = await prisma.evaluationItem.findUnique({ where: { id }, select: { subjectId: true, name: true } });
  if (!item) return;
  await prisma.evaluationItem.deleteMany({ where: { subjectId: item.subjectId, name: item.name } });
  revalidateAll();
}

/** Agrega un quiz (nota + fecha opcional) a un componente. Solo el dueño de
 *  esa fila puede agregar los suyos. */
export async function addQuizGrade(evaluationItemId: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const session = await getSession();
  if (!session.authed) return;
  const item = await prisma.evaluationItem.findUnique({ where: { id: evaluationItemId }, select: { owner: true } });
  if (!item || item.owner !== session.name) return;
  const grade = clampGrade(formData.get("grade"));
  if (grade === null) return;
  const date = parseDateInput(formData.get("date"));
  await prisma.quizGrade.create({ data: { evaluationItemId, grade, date } });
  revalidateAll();
}

export async function deleteQuizGrade(id: string) {
  if (await blockedForContribute()) return;
  const session = await getSession();
  if (!session.authed) return;
  const quiz = await prisma.quizGrade.findUnique({ where: { id }, select: { evaluationItem: { select: { owner: true } } } });
  if (!quiz || quiz.evaluationItem.owner !== session.name) return;
  await prisma.quizGrade.delete({ where: { id } });
  revalidateAll();
}
