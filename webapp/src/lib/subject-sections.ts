/** Secciones de una asignatura, en orden, para la sub-navegación.
 *  En un módulo aparte (sin imports de servidor) para poder usarlo en
 *  componentes de cliente. */
export const SUBJECT_SECTIONS = [
  { segment: "", label: "Panel" },
  { segment: "modulos", label: "Módulos" },
  { segment: "proyectos", label: "Proyectos" },
  { segment: "fechas", label: "Fechas" },
  { segment: "repaso", label: "Repaso" },
  { segment: "glosario", label: "Glosario" },
  { segment: "formulas", label: "Fórmulas" },
  { segment: "bibliografia", label: "Bibliografía" },
  { segment: "insumos", label: "Insumos" },
  { segment: "prompt-ia", label: "Prompt IA" },
] as const;

export const SUBJECT_SECTION_SEGMENTS = SUBJECT_SECTIONS.map((s) => s.segment).filter(Boolean) as string[];

/** Secciones que siempre se muestran, listen o no en `Subject.sections`. */
const ALWAYS_ON = new Set(["", "repaso", "modulos"]);

/**
 * Secciones visibles para una asignatura según su naturaleza. `sections` viene
 * de `Subject.sections` (sembrado desde content/<code>.ts). Vacío = todas.
 * El "Panel" (segment "") siempre se muestra.
 */
export function visibleSubjectSections(sections: readonly string[] | undefined | null) {
  if (!sections || sections.length === 0) return SUBJECT_SECTIONS;
  const allowed = new Set(sections);
  return SUBJECT_SECTIONS.filter((s) => ALWAYS_ON.has(s.segment) || allowed.has(s.segment));
}

/** ¿Está visible esta sección para la asignatura? (para guardas de ruta) */
export function isSectionVisible(sections: readonly string[] | undefined | null, segment: string): boolean {
  if (ALWAYS_ON.has(segment)) return true;
  if (!sections || sections.length === 0) return true;
  return sections.includes(segment);
}
