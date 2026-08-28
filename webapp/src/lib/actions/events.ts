"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { parseDateInput } from "@/lib/utils";

export async function addPersonalEvent(formData: FormData) {
  if (await blockedForRead()) return;
  const title = String(formData.get("title") ?? "").trim();
  const date = parseDateInput(formData.get("date"));
  if (!title || !date) return;
  await prisma.personalEvent.create({
    data: {
      title,
      date,
      note: String(formData.get("note") ?? "").trim() || null,
      subjectId: String(formData.get("subjectId") ?? "").trim() || null,
    },
  });
  revalidateAll();
}

export async function deletePersonalEvent(id: string) {
  if (await blockedForRead()) return;
  await prisma.personalEvent.delete({ where: { id } });
  revalidateAll();
}
