"use server";

import { prisma } from "@/lib/prisma";
import { blockedForContribute } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

/**
 * Enlace al documento (Excel) de una agrupación del laboratorio ("Módulo I",
 * "Módulo II"…). Vacío = quitar el enlace. Solo se aceptan http(s).
 */
export async function setLabModuleLink(subjectId: string, name: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const raw = String(formData.get("url") ?? "").trim();
  if (raw && !/^https?:\/\//i.test(raw)) return;
  const url = raw || null;
  await prisma.labModuleLink.upsert({
    where: { subjectId_name: { subjectId, name } },
    create: { subjectId, name, url },
    update: { url },
  });
  revalidateAll();
}
