import { ALL_SUBJECTS, type SubjectContent } from "@content/index";

/**
 * Devuelve el objeto de temario (`content/<slug>.ts`) de una asignatura, o null.
 * Se usa para el material de referencia que NO pasa por la base de datos
 * (p. ej. las prácticas y reglas de laboratorio en la pestaña "Laboratorio").
 */
export function getSubjectContent(slug: string): SubjectContent | null {
  return ALL_SUBJECTS.find((s) => s.slug === slug) ?? null;
}

export type { SubjectContent } from "@content/index";
export type { LabPracticeContent } from "@content/_schema";
