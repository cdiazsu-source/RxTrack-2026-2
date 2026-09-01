"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

function read(formData: FormData) {
  return {
    question: String(formData.get("question") ?? "").trim(),
    solution: String(formData.get("solution") ?? "").trim(),
  };
}

export async function addExercise(moduleId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = read(formData);
  if (!d.question || !d.solution) return;
  const last = await prisma.exercise.findFirst({
    where: { moduleId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.exercise.create({
    data: { moduleId, fromContent: false, order: (last?.order ?? -1) + 1, ...d },
  });
  revalidateAll();
}

export async function updateExercise(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = read(formData);
  if (!d.question || !d.solution) return;
  await prisma.exercise.update({ where: { id }, data: d });
  revalidateAll();
}

export async function deleteExercise(id: string) {
  if (await blockedForRead()) return;
  await prisma.exercise.delete({ where: { id } });
  revalidateAll();
}
