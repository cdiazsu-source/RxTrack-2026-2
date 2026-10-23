/** Cursos personales (SAP, Power BI…): constantes y reglas compartidas (client-safe). */

export const COURSE_MODALITIES = ["VIRTUAL", "PRESENCIAL", "HIBRIDO"] as const;
export type CourseModality = (typeof COURSE_MODALITIES)[number];
export const COURSE_MODALITY_LABEL: Record<CourseModality, string> = {
  VIRTUAL: "Virtual",
  PRESENCIAL: "Presencial",
  HIBRIDO: "Híbrido",
};

export const COURSE_STATUSES = ["POR_INICIAR", "EN_CURSO", "PAUSADO", "COMPLETADO"] as const;
export type CourseStatus = (typeof COURSE_STATUSES)[number];
export const COURSE_STATUS_LABEL: Record<CourseStatus, string> = {
  POR_INICIAR: "Por iniciar",
  EN_CURSO: "En curso",
  PAUSADO: "En pausa",
  COMPLETADO: "Completado",
};

/** Etiquetas de «Para el futuro». */
export const KEEP_TAGS = ["TIP", "CODIGO", "FORMULA", "ATAJO", "IDEA", "ENLACE_UTIL", "OTRO"] as const;
export type KeepTag = (typeof KEEP_TAGS)[number];
export const KEEP_TAG_LABEL: Record<KeepTag, string> = {
  TIP: "Tip",
  CODIGO: "Código / transacción",
  FORMULA: "Fórmula / DAX",
  ATAJO: "Atajo",
  IDEA: "Idea",
  ENLACE_UTIL: "Enlace útil",
  OTRO: "Otro",
};

export const asCourseModality = (raw: unknown): CourseModality | null =>
  (COURSE_MODALITIES as readonly string[]).includes(String(raw)) ? (raw as CourseModality) : null;
export const asCourseStatus = (raw: unknown): CourseStatus =>
  (COURSE_STATUSES as readonly string[]).includes(String(raw)) ? (raw as CourseStatus) : "EN_CURSO";
export const asKeepTag = (raw: unknown): KeepTag =>
  (KEEP_TAGS as readonly string[]).includes(String(raw)) ? (raw as KeepTag) : "TIP";

/** Los cursos son personales de Cesar: solo la cuenta con acceso total y sin alcance acotado
 *  (al usar «Ver como» otra cuenta, la sesión toma su nivel y dejan de verse). */
export function canUseCourses(s: { authed: boolean; level?: string; scope?: unknown[] | null }): boolean {
  return s.authed && s.level === "full" && !s.scope;
}

/** Avance 0..1 de un curso: mezcla clases asistidas (si hay total) y tareas hechas. */
export function courseProgress(c: {
  totalSessions: number | null;
  attendedSessions: number;
  tasksDone: number;
  tasksTotal: number;
  status: string;
}): number {
  if (c.status === "COMPLETADO") return 1;
  const parts: number[] = [];
  if (c.totalSessions && c.totalSessions > 0) parts.push(Math.min(1, c.attendedSessions / c.totalSessions));
  if (c.tasksTotal > 0) parts.push(c.tasksDone / c.tasksTotal);
  return parts.length ? parts.reduce((a, b) => a + b, 0) / parts.length : 0;
}
