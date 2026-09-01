"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";

export type ChecklistParent = { type: "module" | "project" | "labReport"; id: string };

function parentWhere(parent: ChecklistParent) {
  if (parent.type === "module") return { moduleId: parent.id };
  if (parent.type === "project") return { projectId: parent.id };
  return { labReportId: parent.id };
}

async function subjectIdOfParent(parent: ChecklistParent): Promise<string | null> {
  if (parent.type === "module") {
    const m = await prisma.module.findUnique({ where: { id: parent.id }, select: { subjectId: true } });
    return m?.subjectId ?? null;
  }
  if (parent.type === "project") {
    const p = await prisma.project.findUnique({ where: { id: parent.id }, select: { subjectId: true } });
    return p?.subjectId ?? null;
  }
  const l = await prisma.labReport.findUnique({ where: { id: parent.id }, select: { subjectId: true } });
  return l?.subjectId ?? null;
}

async function subjectIdOfItem(itemId: string): Promise<string | null> {
  const it = await prisma.checklistItem.findUnique({
    where: { id: itemId },
    select: {
      module: { select: { subjectId: true } },
      project: { select: { subjectId: true } },
      labReport: { select: { subjectId: true } },
    },
  });
  return it?.module?.subjectId ?? it?.project?.subjectId ?? it?.labReport?.subjectId ?? null;
}

export async function addChecklistItem(parent: ChecklistParent, formData: FormData) {
  if (await blockedForRead()) return;
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return;

  const where = parentWhere(parent);
  const last = await prisma.checklistItem.findFirst({
    where,
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.checklistItem.create({
    data: {
      ...where,
      text,
      order: (last?.order ?? -1) + 1,
    },
  });
  const sid = await subjectIdOfParent(parent);
  if (sid) await touchSubject(sid);
  revalidateAll();
}

export async function toggleChecklistItem(itemId: string, done: boolean) {
  if (await blockedForRead()) return;
  await prisma.checklistItem.update({ where: { id: itemId }, data: { done } });
  const sid = await subjectIdOfItem(itemId);
  if (sid) await touchSubject(sid);
  revalidateAll();
}

export async function updateChecklistItem(itemId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return;
  await prisma.checklistItem.update({ where: { id: itemId }, data: { text } });
  revalidateAll();
}

export async function deleteChecklistItem(itemId: string) {
  if (await blockedForRead()) return;
  await prisma.checklistItem.delete({ where: { id: itemId } });
  revalidateAll();
}

export async function moveChecklistItem(itemId: string, dir: "up" | "down") {
  if (await blockedForRead()) return;
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

  const items = await prisma.checklistItem.findMany({
    where,
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });
  const idx = items.findIndex((i) => i.id === itemId);
  const swapIdx = dir === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapIdx < 0 || swapIdx >= items.length) return;

  const a = items[idx];
  const b = items[swapIdx];
  await prisma.$transaction([
    prisma.checklistItem.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.checklistItem.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);
  revalidateAll();
}
