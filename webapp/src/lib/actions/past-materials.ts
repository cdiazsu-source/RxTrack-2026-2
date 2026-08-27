"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

function read(formData: FormData) {
  return {
    kind: formData.get("kind") === "simulacro" ? "simulacro" : "taller",
    title: String(formData.get("title") ?? "").trim(),
    semester: String(formData.get("semester") ?? "").trim(),
    url: String(formData.get("url") ?? "").trim() || null,
    patterns: String(formData.get("patterns") ?? "").trim(),
    moduleId: String(formData.get("moduleId") ?? "").trim() || null,
  };
}

export async function addPastMaterial(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = read(formData);
  if (!d.title) return;
  await prisma.pastMaterial.create({ data: { subjectId, ...d } });
  revalidateAll();
}

export async function updatePastMaterial(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const { title, ...rest } = read(formData);
  await prisma.pastMaterial.update({
    where: { id },
    data: { ...rest, ...(title ? { title } : {}) },
  });
  revalidateAll();
}

export async function deletePastMaterial(id: string) {
  if (await blockedForRead()) return;
  await prisma.pastMaterial.delete({ where: { id } });
  revalidateAll();
}
