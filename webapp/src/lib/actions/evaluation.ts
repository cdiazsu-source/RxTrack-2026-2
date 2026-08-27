"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

/** Registrar la nota obtenida en un componente (0..5). Vacío = sin nota aún. */
export async function setEvaluationGrade(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const raw = String(formData.get("grade") ?? "").trim().replace(",", ".");
  let grade: number | null = null;
  if (raw) {
    const n = Number(raw);
    if (Number.isFinite(n)) grade = Math.min(5, Math.max(0, n));
  }
  await prisma.evaluationItem.update({ where: { id }, data: { grade } });
  revalidateAll();
}

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
  await prisma.evaluationItem.create({
    data: { subjectId, name, weight, order: (last?.order ?? -1) + 1 },
  });
  revalidateAll();
}

export async function deleteEvaluationItem(id: string) {
  if (await blockedForRead()) return;
  await prisma.evaluationItem.delete({ where: { id } });
  revalidateAll();
}
