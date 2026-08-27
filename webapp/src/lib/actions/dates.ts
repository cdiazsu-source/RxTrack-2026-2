"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { parseDateInput } from "@/lib/utils";

/** Poner / cambiar la fecha de un parcial o entrega. Es lo más frecuente. */
export async function setKeyDate(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  await prisma.keyDate.update({
    where: { id },
    data: {
      date: parseDateInput(formData.get("date")),
      note: String(formData.get("note") ?? "").trim() || null,
    },
  });
  revalidateAll();
}

export async function addKeyDate(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  await prisma.keyDate.create({
    data: {
      subjectId,
      name,
      weight: String(formData.get("weight") ?? "").trim() || null,
      date: parseDateInput(formData.get("date")),
      fromContent: false,
    },
  });
  revalidateAll();
}

export async function deleteKeyDate(id: string) {
  if (await blockedForRead()) return;
  const d = await prisma.keyDate.findUnique({ where: { id }, select: { fromContent: true } });
  if (!d || d.fromContent) return; // las del temario no se borran aquí
  await prisma.keyDate.delete({ where: { id } });
  revalidateAll();
}
