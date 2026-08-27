"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

export async function addGlossaryTerm(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const term = String(formData.get("term") ?? "").trim();
  const definition = String(formData.get("definition") ?? "").trim();
  if (!term || !definition) return;
  const moduleId = String(formData.get("moduleId") ?? "").trim() || null;
  await prisma.glossaryTerm.create({
    data: { subjectId, term, definition, moduleId, fromContent: false },
  });
  revalidateAll();
}

export async function updateGlossaryTerm(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const term = String(formData.get("term") ?? "").trim();
  const definition = String(formData.get("definition") ?? "").trim();
  const moduleId = String(formData.get("moduleId") ?? "").trim() || null;
  await prisma.glossaryTerm.update({
    where: { id },
    data: { ...(term ? { term } : {}), ...(definition ? { definition } : {}), moduleId },
  });
  revalidateAll();
}

export async function deleteGlossaryTerm(id: string) {
  if (await blockedForRead()) return;
  await prisma.glossaryTerm.delete({ where: { id } });
  revalidateAll();
}
