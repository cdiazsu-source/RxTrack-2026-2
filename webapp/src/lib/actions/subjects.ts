"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

/** Enlace a la carpeta de Drive de la asignatura. */
export async function setSubjectDriveUrl(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const driveUrl = String(formData.get("driveUrl") ?? "").trim();
  await prisma.subject.update({
    where: { id: subjectId },
    data: { driveUrl: driveUrl || null },
  });
  revalidateAll();
}
