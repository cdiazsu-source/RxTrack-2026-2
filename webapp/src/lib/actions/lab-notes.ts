"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";
import { asLabNoteKind, canWriteLabLog } from "@/lib/lab-log";

/**
 * Bitácora de cada práctica de laboratorio: cualquier sesión puede escribir
 * (como la de proyectos), salvo el perfil de solo lectura con alcance (profe).
 * El autor es la persona que inició sesión.
 */

const ROLE_LABEL: Record<"full" | "read", string> = { full: "Editor", read: "Colaboradora" };

async function writer() {
  const s = await getSession();
  return s.authed && canWriteLabLog(s) ? s : null;
}

export async function addLabPracticeNote(subjectId: string, practiceKey: string, formData: FormData) {
  const s = await writer();
  if (!s) return;
  const body = String(formData.get("body") ?? "").trim().slice(0, 8000);
  if (!body || !practiceKey) return;
  await prisma.labPracticeNote.create({
    data: {
      subjectId,
      practiceKey,
      kind: asLabNoteKind(formData.get("kind")),
      body,
      author: s.name,
      authorRole: ROLE_LABEL[s.level],
    },
  });
  await touchSubject(subjectId);
  revalidateAll();
}

export async function updateLabPracticeNote(noteId: string, formData: FormData) {
  if (!(await writer())) return;
  const body = String(formData.get("body") ?? "").trim().slice(0, 8000);
  if (!body) return;
  await prisma.labPracticeNote.update({ where: { id: noteId }, data: { body, kind: asLabNoteKind(formData.get("kind")) } });
  revalidateAll();
}

export async function deleteLabPracticeNote(noteId: string) {
  if (!(await writer())) return;
  await prisma.labPracticeNote.delete({ where: { id: noteId } });
  revalidateAll();
}
