"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { cleanHttpUrl } from "@/lib/url";
import { parseDateInput } from "@/lib/utils";
import { SESSION_LINK_KIND_NAME, asSessionLinkKind } from "@/lib/session-links";
import { asCourseModality, asCourseStatus, asKeepTag, canUseCourses } from "@/lib/courses";

/**
 * Cursos personales (SAP, Power BI…). Son solo de Cesar: toda acción exige una sesión
 * con acceso total y sin alcance acotado (`canUseCourses`); cualquier otra corta en silencio.
 */

async function allowed() {
  return canUseCourses(await getSession());
}

const str = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max);
const opt = (fd: FormData, key: string, max: number) => str(fd, key, max) || null;
const intOrNull = (fd: FormData, key: string) => {
  const n = Number.parseInt(str(fd, key, 6), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
};

function readCourse(fd: FormData) {
  return {
    title: str(fd, "title", 140),
    provider: opt(fd, "provider", 140),
    modality: asCourseModality(fd.get("modality")),
    status: asCourseStatus(fd.get("status")),
    goal: opt(fd, "goal", 2000),
    instructor: opt(fd, "instructor", 140),
    schedule: opt(fd, "schedule", 200),
    location: opt(fd, "location", 300),
    startDate: parseDateInput(fd.get("startDate")),
    endDate: parseDateInput(fd.get("endDate")),
    totalSessions: intOrNull(fd, "totalSessions"),
  };
}

// ───────────────────────────── Curso ─────────────────────────────

export async function createCourse(formData: FormData) {
  if (!(await allowed())) return;
  const d = readCourse(formData);
  if (!d.title) return;
  const last = await prisma.course.findFirst({ orderBy: { order: "desc" }, select: { order: true } });
  const c = await prisma.course.create({ data: { ...d, order: (last?.order ?? -1) + 1 }, select: { id: true } });
  revalidateAll();
  redirect(`/cursos/${c.id}`);
}

export async function updateCourse(courseId: string, formData: FormData) {
  if (!(await allowed())) return;
  const d = readCourse(formData);
  if (!d.title) return;
  await prisma.course.update({ where: { id: courseId }, data: d });
  revalidateAll();
}

export async function setCourseStatus(courseId: string, status: string) {
  if (!(await allowed())) return;
  await prisma.course.update({ where: { id: courseId }, data: { status: asCourseStatus(status) } });
  revalidateAll();
}

export async function deleteCourse(courseId: string) {
  if (!(await allowed())) return;
  await prisma.course.delete({ where: { id: courseId } }).catch(() => undefined);
  revalidateAll();
  redirect("/cursos");
}

// ───────────────────────────── Clases y apuntes ─────────────────────────────

function readClass(fd: FormData) {
  return {
    topic: str(fd, "topic", 200),
    content: String(fd.get("content") ?? "").slice(0, 60000),
    date: parseDateInput(fd.get("date")),
    // El formulario manda "off" (oculto) y, si está marcada la casilla, también "on".
    attended: fd.getAll("attended").includes("on"),
    number: intOrNull(fd, "number"),
  };
}

export async function addCourseSession(courseId: string, formData: FormData) {
  if (!(await allowed())) return;
  const d = readClass(formData);
  if (!d.topic && !d.content.trim()) return;
  const number =
    d.number ??
    ((await prisma.courseSession.aggregate({ where: { courseId }, _max: { number: true } }))._max.number ?? 0) + 1;
  await prisma.courseSession.create({ data: { courseId, ...d, number, topic: d.topic || `Clase ${number}` } });
  revalidateAll();
}

export async function updateCourseSession(sessionId: string, formData: FormData) {
  if (!(await allowed())) return;
  const d = readClass(formData);
  await prisma.courseSession.update({
    where: { id: sessionId },
    data: { ...d, number: d.number ?? undefined, topic: d.topic || undefined },
  });
  revalidateAll();
}

export async function setCourseSessionAttended(sessionId: string, attended: boolean) {
  if (!(await allowed())) return;
  await prisma.courseSession.update({ where: { id: sessionId }, data: { attended } });
  revalidateAll();
}

export async function deleteCourseSession(sessionId: string) {
  if (!(await allowed())) return;
  await prisma.courseSession.delete({ where: { id: sessionId } }).catch(() => undefined);
  revalidateAll();
}

// ───────────────────────────── Tareas ─────────────────────────────

export async function addCourseTask(courseId: string, formData: FormData) {
  if (!(await allowed())) return;
  const text = str(formData, "text", 300);
  if (!text) return;
  const last = await prisma.courseTask.findFirst({ where: { courseId }, orderBy: { order: "desc" }, select: { order: true } });
  await prisma.courseTask.create({
    data: {
      courseId,
      text,
      description: opt(formData, "description", 600),
      dueDate: parseDateInput(formData.get("dueDate")),
      order: (last?.order ?? -1) + 1,
    },
  });
  revalidateAll();
}

export async function updateCourseTask(taskId: string, formData: FormData) {
  if (!(await allowed())) return;
  const text = str(formData, "text", 300);
  if (!text) return;
  await prisma.courseTask.update({
    where: { id: taskId },
    data: { text, description: opt(formData, "description", 600), dueDate: parseDateInput(formData.get("dueDate")) },
  });
  revalidateAll();
}

export async function setCourseTaskDone(taskId: string, done: boolean) {
  if (!(await allowed())) return;
  await prisma.courseTask.update({ where: { id: taskId }, data: { done, doneAt: done ? new Date() : null } });
  revalidateAll();
}

export async function deleteCourseTask(taskId: string) {
  if (!(await allowed())) return;
  await prisma.courseTask.delete({ where: { id: taskId } }).catch(() => undefined);
  revalidateAll();
}

// ───────────────────────────── Enlaces ─────────────────────────────

function readLink(fd: FormData) {
  const url = cleanHttpUrl(String(fd.get("url") ?? ""));
  if (!url) return null;
  const kind = asSessionLinkKind(fd.get("kind"));
  const name = str(fd, "name", 120) || SESSION_LINK_KIND_NAME[kind] || new URL(url).hostname;
  return { url, kind, name };
}

/** `sessionId` null = enlace del curso; con valor = enlace de esa clase. */
export async function addCourseLink(courseId: string, sessionId: string | null, formData: FormData) {
  if (!(await allowed())) return;
  const d = readLink(formData);
  if (!d) return;
  const last = await prisma.courseLink.findFirst({
    where: { courseId, sessionId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.courseLink.create({ data: { courseId, sessionId, ...d, order: (last?.order ?? -1) + 1 } });
  revalidateAll();
}

export async function updateCourseLink(linkId: string, formData: FormData) {
  if (!(await allowed())) return;
  const d = readLink(formData);
  if (!d) return;
  await prisma.courseLink.update({ where: { id: linkId }, data: d });
  revalidateAll();
}

export async function deleteCourseLink(linkId: string) {
  if (!(await allowed())) return;
  await prisma.courseLink.delete({ where: { id: linkId } }).catch(() => undefined);
  revalidateAll();
}

// ───────────────────────────── Para el futuro ─────────────────────────────

export async function addCourseKeep(courseId: string, formData: FormData) {
  if (!(await allowed())) return;
  const title = str(formData, "title", 160);
  const body = String(formData.get("body") ?? "").trim().slice(0, 20000);
  if (!title || !body) return;
  await prisma.courseKeep.create({ data: { courseId, title, body, tag: asKeepTag(formData.get("tag")) } });
  revalidateAll();
}

export async function updateCourseKeep(keepId: string, formData: FormData) {
  if (!(await allowed())) return;
  const title = str(formData, "title", 160);
  const body = String(formData.get("body") ?? "").trim().slice(0, 20000);
  if (!title || !body) return;
  await prisma.courseKeep.update({ where: { id: keepId }, data: { title, body, tag: asKeepTag(formData.get("tag")) } });
  revalidateAll();
}

export async function setCourseKeepPinned(keepId: string, pinned: boolean) {
  if (!(await allowed())) return;
  await prisma.courseKeep.update({ where: { id: keepId }, data: { pinned } });
  revalidateAll();
}

export async function deleteCourseKeep(keepId: string) {
  if (!(await allowed())) return;
  await prisma.courseKeep.delete({ where: { id: keepId } }).catch(() => undefined);
  revalidateAll();
}
