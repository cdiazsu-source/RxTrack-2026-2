"use server";

import { prisma } from "@/lib/prisma";
import { blockedForContribute } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";

/** Nota «para retomar» del proyecto: dónde quedaste y cuál es el primer paso al volver. */
export async function setFocusNote(projectId: string, note: string) {
  if (await blockedForContribute()) return;
  const clean = note.trim().slice(0, 600);
  await prisma.project.update({ where: { id: projectId }, data: { focusNote: clean || null } });
  revalidateAll();
}

/** Suma al proyecto los minutos de un bloque de trabajo terminado. */
export async function addFocusMinutes(projectId: string, minutes: number) {
  if (await blockedForContribute()) return;
  const m = Math.round(minutes);
  if (!Number.isFinite(m) || m <= 0 || m > 240) return;
  const p = await prisma.project.update({
    where: { id: projectId },
    data: { focusMinutes: { increment: m } },
    select: { subjectId: true },
  });
  await touchSubject(p.subjectId);
  revalidateAll();
}

/**
 * Divide una subtarea en pasos más pequeños: los nuevos pasos ocupan su lugar
 * (en el orden en que se escribieron) y la subtarea original se reemplaza. Las
 * demás quedan intactas. Las notas que la mencionaban pasan a ser generales.
 */
export async function splitChecklistItem(itemId: string, steps: string[]) {
  if (await blockedForContribute()) return;
  const texts = steps.map((t) => t.trim()).filter(Boolean).slice(0, 12);
  if (texts.length === 0) return;

  const item = await prisma.checklistItem.findUnique({
    where: { id: itemId },
    select: { id: true, moduleId: true, projectId: true, labReportId: true },
  });
  if (!item) return;
  const where = item.moduleId
    ? { moduleId: item.moduleId }
    : item.projectId
      ? { projectId: item.projectId }
      : { labReportId: item.labReportId };

  const siblings = await prisma.checklistItem.findMany({
    where,
    orderBy: { order: "asc" },
    select: { id: true },
  });
  const idx = siblings.findIndex((s) => s.id === itemId);
  if (idx === -1) return;

  // Reescribe el orden completo: [... anteriores, nuevos…, resto…] sin la original.
  const newIds: string[] = [];
  await prisma.$transaction(async (tx) => {
    for (const text of texts) {
      const c = await tx.checklistItem.create({ data: { ...where, text, order: 0 } });
      newIds.push(c.id);
    }
    const ordered = [
      ...siblings.slice(0, idx).map((s) => s.id),
      ...newIds,
      ...siblings.slice(idx + 1).map((s) => s.id),
    ];
    await tx.checklistItem.delete({ where: { id: itemId } });
    for (let i = 0; i < ordered.length; i++) {
      await tx.checklistItem.update({ where: { id: ordered[i] }, data: { order: i } });
    }
  });
  revalidateAll();
}

/** «Dejarlo para después»: manda la subtarea al final de la lista del mismo padre. */
export async function deferChecklistItem(itemId: string) {
  if (await blockedForContribute()) return;
  const item = await prisma.checklistItem.findUnique({
    where: { id: itemId },
    select: { moduleId: true, projectId: true, labReportId: true },
  });
  if (!item) return;
  const where = item.moduleId
    ? { moduleId: item.moduleId }
    : item.projectId
      ? { projectId: item.projectId }
      : { labReportId: item.labReportId };
  const last = await prisma.checklistItem.findFirst({ where, orderBy: { order: "desc" }, select: { order: true } });
  await prisma.checklistItem.update({ where: { id: itemId }, data: { order: (last?.order ?? 0) + 1 } });
  revalidateAll();
}
