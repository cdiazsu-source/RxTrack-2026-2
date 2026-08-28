"use server";

import { prisma } from "@/lib/prisma";
import { getSession, blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

/** Capturar una idea sin decidir dónde va. Permitido también en modo lectura:
 *  es tu bandeja, no toca el contenido compartido. */
export async function addInboxItem(formData: FormData) {
  if (!(await getSession()).authed) return;
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return;
  const url = String(formData.get("url") ?? "").trim() || null;
  await prisma.inboxItem.create({ data: { text, url } });
  revalidateAll();
}

/** Marcar como resuelta (procesada). Opcionalmente asignarle una asignatura. */
export async function triageInboxItem(id: string, subjectId: string | null) {
  if (!(await getSession()).authed) return;
  await prisma.inboxItem.update({
    where: { id },
    data: { triagedAt: new Date(), subjectId: subjectId || null },
  });
  revalidateAll();
}

export async function reopenInboxItem(id: string) {
  if (!(await getSession()).authed) return;
  await prisma.inboxItem.update({ where: { id }, data: { triagedAt: null } });
  revalidateAll();
}

export async function deleteInboxItem(id: string) {
  if (!(await getSession()).authed) return;
  await prisma.inboxItem.delete({ where: { id } });
  revalidateAll();
}

/** Convertir una captura en subtarea de un módulo (y marcarla como procesada). */
export async function inboxToChecklist(id: string, moduleId: string) {
  if (await blockedForRead()) return;
  const item = await prisma.inboxItem.findUnique({ where: { id }, select: { text: true, url: true } });
  if (!item) return;
  const last = await prisma.checklistItem.findFirst({
    where: { moduleId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const text = item.url ? `${item.text} — ${item.url}` : item.text;
  await prisma.checklistItem.create({ data: { moduleId, text, order: (last?.order ?? -1) + 1 } });
  await prisma.inboxItem.update({ where: { id }, data: { triagedAt: new Date() } });
  revalidateAll();
}
