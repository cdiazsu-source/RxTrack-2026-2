"use server";

import type { LabReportStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

export async function setLabReportStatus(moduleId: string, status: LabReportStatus) {
  if (await blockedForRead()) return;
  await prisma.module.update({ where: { id: moduleId }, data: { labReportStatus: status } });
  revalidateAll();
}

export async function addLabMaterial(moduleId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return;
  const last = await prisma.labMaterial.findFirst({
    where: { moduleId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.labMaterial.create({ data: { moduleId, text, order: (last?.order ?? -1) + 1 } });
  revalidateAll();
}

export async function toggleLabMaterial(materialId: string, done: boolean) {
  if (await blockedForRead()) return;
  await prisma.labMaterial.update({ where: { id: materialId }, data: { done } });
  revalidateAll();
}

export async function deleteLabMaterial(materialId: string) {
  if (await blockedForRead()) return;
  await prisma.labMaterial.delete({ where: { id: materialId } });
  revalidateAll();
}
