"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

export async function addBibliography(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const reference = String(formData.get("reference") ?? "").trim();
  if (!reference) return;
  const kind = formData.get("kind") === "revista" ? "revista" : "libro";
  const url = String(formData.get("url") ?? "").trim() || null;
  const moduleId = String(formData.get("moduleId") ?? "").trim() || null;
  await prisma.bibliographyItem.create({
    data: { subjectId, reference, kind, url, moduleId, fromContent: false },
  });
  revalidateAll();
}

export async function setBibliographyUrl(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const url = String(formData.get("url") ?? "").trim() || null;
  await prisma.bibliographyItem.update({ where: { id }, data: { url } });
  revalidateAll();
}

export async function deleteBibliography(id: string) {
  if (await blockedForRead()) return;
  const b = await prisma.bibliographyItem.findUnique({ where: { id }, select: { fromContent: true } });
  if (!b || b.fromContent) return;
  await prisma.bibliographyItem.delete({ where: { id } });
  revalidateAll();
}
