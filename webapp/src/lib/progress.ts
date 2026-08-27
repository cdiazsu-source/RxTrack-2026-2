/**
 * Progreso siempre visible (principio rector 2). Un solo sitio donde se define
 * "cuánto llevas" de cada cosa, para que todas las barras y anillos de la app
 * cuenten lo mismo. Funciones puras: se pueden usar en servidor y en cliente.
 *
 * Todos devuelven un número 0..1. `pct()` lo pasa a entero 0..100.
 */

export type ModuleStatusValue = "NO_VISTO" | "EN_PROGRESO" | "DOMINADO";
export type LabReportValue = "PENDIENTE" | "ENTREGADO" | "CALIFICADO" | null;

export interface ModuleProgressInput {
  status: ModuleStatusValue;
  checklistDone: number;
  checklistTotal: number;
  sessionCount: number;
  hasLab: boolean;
  labReportStatus: LabReportValue;
}

/** Pesos del progreso compuesto de un módulo. Ajustables aquí, en un solo sitio. */
export const MODULE_WEIGHTS = {
  checklist: 0.4,
  status: 0.3,
  sessions: 0.2,
  lab: 0.1,
} as const;

const STATUS_SCORE: Record<ModuleStatusValue, number> = {
  NO_VISTO: 0,
  EN_PROGRESO: 0.5,
  DOMINADO: 1,
};

function labScore(hasLab: boolean, status: LabReportValue): number {
  if (!hasLab) return 1;
  if (status === "CALIFICADO") return 1;
  if (status === "ENTREGADO") return 0.5;
  return 0; // PENDIENTE o null
}

export function moduleProgress(m: ModuleProgressInput): number {
  const parts: Array<[number, number]> = [
    [MODULE_WEIGHTS.status, STATUS_SCORE[m.status]],
    [MODULE_WEIGHTS.sessions, m.sessionCount > 0 ? 1 : 0],
    [MODULE_WEIGHTS.lab, labScore(m.hasLab, m.labReportStatus)],
  ];
  // El checklist solo cuenta si el módulo tiene subtareas; si no, se reparte su
  // peso entre los demás componentes (norma-ponderada sobre lo aplicable).
  if (m.checklistTotal > 0) {
    parts.push([MODULE_WEIGHTS.checklist, m.checklistDone / m.checklistTotal]);
  }
  const wsum = parts.reduce((a, [w]) => a + w, 0);
  const score = parts.reduce((a, [w, v]) => a + w * v, 0);
  return wsum > 0 ? clamp01(score / wsum) : 0;
}

export function subjectProgress(moduleScores: number[]): number {
  if (moduleScores.length === 0) return 0;
  return clamp01(moduleScores.reduce((a, b) => a + b, 0) / moduleScores.length);
}

export function semesterProgress(subjectScores: number[]): number {
  if (subjectScores.length === 0) return 0;
  return clamp01(subjectScores.reduce((a, b) => a + b, 0) / subjectScores.length);
}

export function ratio(done: number, total: number): number {
  return total > 0 ? clamp01(done / total) : 0;
}

export function pct(value01: number): number {
  return Math.round(clamp01(value01) * 100);
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

/** Hito de racha inmediatamente superior a `days` (para el anillo de la racha). */
export function nextStreakMilestone(days: number): number {
  const milestones = [3, 7, 14, 21, 30, 45, 60, 90, 120];
  return milestones.find((m) => m > days) ?? Math.ceil((days + 1) / 30) * 30;
}
