/** Secciones de una asignatura, en orden, para la sub-navegación.
 *  En un módulo aparte (sin imports de servidor) para poder usarlo en
 *  componentes de cliente. */
export const SUBJECT_SECTIONS = [
  { segment: "", label: "Panel" },
  { segment: "modulos", label: "Módulos" },
  { segment: "proyectos", label: "Proyectos" },
  { segment: "fechas", label: "Fechas" },
  { segment: "glosario", label: "Glosario" },
  { segment: "formulas", label: "Fórmulas" },
  { segment: "bibliografia", label: "Bibliografía" },
  { segment: "insumos", label: "Insumos" },
  { segment: "prompt-ia", label: "Prompt IA" },
] as const;

export const SUBJECT_SECTION_SEGMENTS = SUBJECT_SECTIONS.map((s) => s.segment).filter(Boolean) as string[];
