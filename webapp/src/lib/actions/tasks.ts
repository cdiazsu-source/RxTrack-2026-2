"use server";

import type { TaskStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { blockedForRead, blockedForContribute } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

/** Cesar crea una tarea para Diana. */
export async function createAssignedTask(formData: FormData) {
  if (await blockedForRead()) return;
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  const detail = String(formData.get("detail") ?? "").trim() || null;
  const subjectId = String(formData.get("subjectId") ?? "").trim() || null;
  const moduleId = String(formData.get("moduleId") ?? "").trim() || null;
  await prisma.assignedTask.create({ data: { title, detail, subjectId, moduleId } });
  revalidateAll();
}

/** Diana (o Cesar) mueve el estado. Marca doneAt al terminar. */
export async function setAssignedTaskStatus(id: string, status: TaskStatus) {
  if (await blockedForContribute()) return;
  await prisma.assignedTask.update({
    where: { id },
    data: { status, doneAt: status === "HECHA" ? new Date() : null },
  });
  revalidateAll();
}

/** Cesar edita el enunciado de una tarea. */
export async function updateAssignedTask(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  const detail = String(formData.get("detail") ?? "").trim() || null;
  const subjectId = String(formData.get("subjectId") ?? "").trim() || null;
  const moduleId = String(formData.get("moduleId") ?? "").trim() || null;
  await prisma.assignedTask.update({ where: { id }, data: { title, detail, subjectId, moduleId } });
  revalidateAll();
}

/** Cesar borra una tarea. */
export async function deleteAssignedTask(id: string) {
  if (await blockedForRead()) return;
  await prisma.assignedTask.delete({ where: { id } });
  revalidateAll();
}
