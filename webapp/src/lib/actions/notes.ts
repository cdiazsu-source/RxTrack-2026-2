"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";

/**
 * Agregar una nota de bitácora es la única escritura que el perfil "read"
 * también puede hacer (igual que en ET en Marcha). Requiere sesión válida y un
 * nombre de autor (lista corta editable en el futuro; por ahora texto libre).
 */
export async function addProjectNote(projectId: string, formData: FormData) {
  if (!(await getSession()).authed) return;
  const body = String(formData.get("body") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  if (!body || !author) return;

  const p = await prisma.project.update({
    where: { id: projectId },
    data: {
      notes: { create: { body, author, authorRole: null } },
    },
    select: { subjectId: true },
  });
  await touchSubject(p.subjectId);
  revalidateAll();
}

export async function deleteProjectNote(noteId: string) {
  if (!(await getSession()).authed) return;
  await prisma.projectNote.delete({ where: { id: noteId } });
  revalidateAll();
}
