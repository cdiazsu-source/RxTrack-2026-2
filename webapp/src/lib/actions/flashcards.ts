"use server";

import { prisma } from "@/lib/prisma";
import { getSession, blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { review, type Grade } from "@/lib/srs";

/**
 * Crea/actualiza tarjetas de repaso a partir del glosario y las fórmulas de una
 * asignatura. Idempotente: empareja por (source, sourceId). No borra las que ya
 * hayas repasado; solo refresca el texto y agrega las que falten.
 */
export async function generateFlashcards(subjectId: string) {
  if (await blockedForRead()) return;

  const [terms, formulas] = await Promise.all([
    prisma.glossaryTerm.findMany({ where: { subjectId }, select: { id: true, term: true, definition: true, moduleId: true } }),
    prisma.formula.findMany({
      where: { subjectId },
      select: { id: true, name: true, expression: true, description: true, moduleId: true },
    }),
  ]);

  for (const t of terms) {
    await prisma.flashcard.upsert({
      where: { source_sourceId: { source: "GLOSARIO", sourceId: t.id } },
      create: {
        subjectId,
        moduleId: t.moduleId,
        source: "GLOSARIO",
        sourceId: t.id,
        front: `¿Qué es **${t.term}**?`,
        back: t.definition,
      },
      update: { front: `¿Qué es **${t.term}**?`, back: t.definition, moduleId: t.moduleId },
    });
  }

  for (const f of formulas) {
    const back = [`\`${f.expression.replace(/\n/g, " ")}\``, f.description].filter(Boolean).join("\n\n");
    await prisma.flashcard.upsert({
      where: { source_sourceId: { source: "FORMULA", sourceId: f.id } },
      create: {
        subjectId,
        moduleId: f.moduleId,
        source: "FORMULA",
        sourceId: f.id,
        front: `Fórmula: **${f.name}** — escríbela y di para qué sirve.`,
        back,
      },
      update: { front: `Fórmula: **${f.name}** — escríbela y di para qué sirve.`, back, moduleId: f.moduleId },
    });
  }

  revalidateAll();
}

/** Registrar una respuesta durante el repaso. Actualiza el estado SM-2. */
export async function reviewFlashcard(id: string, grade: Grade) {
  if (!(await getSession()).authed) return;
  const card = await prisma.flashcard.findUnique({
    where: { id },
    select: { intervalDays: true, easeFactor: true, reps: true, lapses: true },
  });
  if (!card) return;
  const r = review(card, grade);
  await prisma.flashcard.update({
    where: { id },
    data: {
      intervalDays: r.intervalDays,
      easeFactor: r.easeFactor,
      reps: r.reps,
      lapses: r.lapses,
      dueDate: r.dueDate,
      lastReviewedAt: new Date(),
    },
  });
  // No revalidamos toda la app en cada tarjeta: el repaso maneja su propio estado.
}

export async function addFlashcard(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const front = String(formData.get("front") ?? "").trim();
  const back = String(formData.get("back") ?? "").trim();
  if (!front || !back) return;
  const moduleId = String(formData.get("moduleId") ?? "").trim() || null;
  await prisma.flashcard.create({ data: { subjectId, moduleId, front, back, source: "MANUAL" } });
  revalidateAll();
}

export async function updateFlashcard(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const front = String(formData.get("front") ?? "").trim();
  const back = String(formData.get("back") ?? "").trim();
  await prisma.flashcard.update({
    where: { id },
    data: { ...(front ? { front } : {}), ...(back ? { back } : {}) },
  });
  revalidateAll();
}

export async function setFlashcardSuspended(id: string, suspended: boolean) {
  if (await blockedForRead()) return;
  await prisma.flashcard.update({ where: { id }, data: { suspended } });
  revalidateAll();
}

export async function deleteFlashcard(id: string) {
  if (await blockedForRead()) return;
  await prisma.flashcard.delete({ where: { id } });
  revalidateAll();
}
