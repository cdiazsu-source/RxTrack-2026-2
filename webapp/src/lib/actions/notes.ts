"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { PEOPLE } from "@/lib/auth";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";

/**
 * La bitácora la puede escribir cualquier sesión válida (incluido el perfil
 * "read"). Una nota puede quedar ligada a una subtarea del checklist del proyecto
 * y mencionar a personas del equipo; eso alimenta el feed de la portada.
 */

/** Etiqueta de cargo que se guarda junto a la nota, según el perfil de sesión. */
const ROLE_LABEL: Record<"full" | "read", string> = {
  full: "Editor",
  read: "Colaboradora",
};

/** Devuelve el id de la subtarea solo si pertenece a este proyecto; si no, null
 *  (la nota queda como nota general). */
async function resolveChecklistItem(raw: FormDataEntryValue | null, projectId: string) {
  const id = String(raw ?? "").trim();
  if (!id) return null;
  const item = await prisma.checklistItem.findUnique({
    where: { id },
    select: { projectId: true },
  });
  return item && item.projectId === projectId ? id : null;
}

/** Filtra las menciones a nombres de personas con cuenta. */
function resolveMentions(raw: FormDataEntryValue[]): string[] {
  const names = raw.map((v) => String(v).trim());
  return PEOPLE.filter((p) => names.includes(p));
}

export async function addProjectNote(projectId: string, formData: FormData) {
  const session = await getSession();
  if (!session.authed) return;
  const body = String(formData.get("body") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  if (!body || !author) return;

  const checklistItemId = await resolveChecklistItem(formData.get("checklistItemId"), projectId);
  const mentions = resolveMentions(formData.getAll("mentions"));

  const p = await prisma.project.update({
    where: { id: projectId },
    data: {
      notes: {
        create: { body, author, authorRole: ROLE_LABEL[session.level], checklistItemId, mentions },
      },
    },
    select: { subjectId: true },
  });
  await touchSubject(p.subjectId);
  revalidateAll();
}

export async function updateProjectNote(noteId: string, projectId: string, formData: FormData) {
  if (!(await getSession()).authed) return;
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;

  const checklistItemId = await resolveChecklistItem(formData.get("checklistItemId"), projectId);
  const mentions = resolveMentions(formData.getAll("mentions"));

  await prisma.projectNote.update({
    where: { id: noteId },
    data: { body, checklistItemId, mentions },
  });
  revalidateAll();
}

export async function deleteProjectNote(noteId: string) {
  if (!(await getSession()).authed) return;
  await prisma.projectNote.delete({ where: { id: noteId } });
  revalidateAll();
}
