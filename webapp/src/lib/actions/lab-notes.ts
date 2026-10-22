"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";
import { asLabNoteKind, canWriteLabLog } from "@/lib/lab-log";

/**
 * Bitácora de cada práctica de laboratorio: cualquier sesión puede escribir
 * (como la de proyectos), salvo el perfil de solo lectura con alcance (profe).
 * El autor es la persona que inició sesión. Cada entrada tiene cuatro bloques:
 * qué hice (`body`), dato, por qué se hace así y qué significa; solo el primero es obligatorio.
 */

const ROLE_LABEL: Record<"full" | "read", string> = { full: "Editor", read: "Colaboradora" };

async function writer() {
  const s = await getSession();
  return s.authed && canWriteLabLog(s) ? s : null;
}

const text = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max);
const optional = (fd: FormData, key: string) => text(fd, key, 8000) || null;

function readBlocks(fd: FormData) {
  return {
    kind: asLabNoteKind(fd.get("kind")),
    step: text(fd, "step", 20) || null,
    body: text(fd, "body", 8000),
    data: optional(fd, "data"),
    why: optional(fd, "why"),
    meaning: optional(fd, "meaning"),
  };
}

export async function addLabPracticeNote(subjectId: string, practiceKey: string, formData: FormData) {
  const s = await writer();
  if (!s) return;
  const blocks = readBlocks(formData);
  if (!blocks.body || !practiceKey) return;
  await prisma.labPracticeNote.create({
    data: { subjectId, practiceKey, ...blocks, author: s.name, authorRole: ROLE_LABEL[s.level] },
  });
  await touchSubject(subjectId);
  revalidateAll();
}

export async function updateLabPracticeNote(noteId: string, formData: FormData) {
  if (!(await writer())) return;
  const blocks = readBlocks(formData);
  if (!blocks.body) return;
  await prisma.labPracticeNote.update({ where: { id: noteId }, data: blocks });
  revalidateAll();
}

export async function deleteLabPracticeNote(noteId: string) {
  if (!(await writer())) return;
  await prisma.labPracticeNote.delete({ where: { id: noteId } });
  revalidateAll();
}
