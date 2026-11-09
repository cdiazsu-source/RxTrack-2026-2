"use server";

import { prisma } from "@/lib/prisma";
import { blockedForContribute } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { MAX_BODY, MAX_TITLE, MAX_WORKSHOP, parseProjectExercises } from "@/lib/project-exercise-format";

function read(formData: FormData) {
  return {
    workshop: String(formData.get("workshop") ?? "").trim().slice(0, MAX_WORKSHOP) || null,
    title: String(formData.get("title") ?? "").trim().slice(0, MAX_TITLE),
    question: String(formData.get("question") ?? "").trim().slice(0, MAX_BODY),
    solution: String(formData.get("solution") ?? "").trim().slice(0, MAX_BODY),
  };
}

async function nextOrder(projectId: string) {
  const last = await prisma.projectExercise.findFirst({
    where: { projectId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  return (last?.order ?? -1) + 1;
}

export async function addProjectExercise(projectId: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const d = read(formData);
  if (!d.title || !d.question || !d.solution) return;
  await prisma.projectExercise.create({ data: { projectId, order: await nextOrder(projectId), ...d } });
  revalidateAll();
}

export async function updateProjectExercise(id: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const d = read(formData);
  if (!d.title || !d.question || !d.solution) return;
  await prisma.projectExercise.update({ where: { id }, data: d });
  revalidateAll();
}

export async function deleteProjectExercise(id: string) {
  if (await blockedForContribute()) return;
  await prisma.projectExercise.delete({ where: { id } }).catch(() => undefined);
  revalidateAll();
}

/**
 * Importa la respuesta de una IA (formato `@@TALLER / @@EJERCICIO / @@ENUNCIADO / @@SOLUCION / @@FIN`).
 * Se vuelve a analizar en el servidor: nunca se confía en lo que diga el cliente. Si hay ejercicios
 * con problemas, se agregan los que están completos y se devuelven los avisos.
 */
export async function importProjectExercises(
  projectId: string,
  raw: string,
): Promise<{ added: number; problems: string[] }> {
  if (await blockedForContribute()) return { added: 0, problems: ["No tienes permiso para agregar ejercicios."] };
  const { items, problems } = parseProjectExercises(String(raw ?? ""));
  if (items.length === 0) return { added: 0, problems };
  let order = await nextOrder(projectId);
  await prisma.projectExercise.createMany({
    data: items.map((it) => ({
      projectId,
      order: order++,
      workshop: it.workshop,
      title: it.title,
      question: it.question.slice(0, MAX_BODY),
      solution: it.solution.slice(0, MAX_BODY),
    })),
  });
  revalidateAll();
  return { added: items.length, problems };
}
