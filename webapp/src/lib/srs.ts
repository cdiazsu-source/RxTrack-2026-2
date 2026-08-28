/**
 * Repetición espaciada — variante de SM-2 (Anki-like) con 4 calificaciones.
 * Función pura: recibe el estado actual de una tarjeta y la calificación,
 * devuelve el estado nuevo. Sin dependencias, se usa en servidor y cliente.
 */

export type Grade = "again" | "hard" | "good" | "easy";

export interface SrsState {
  intervalDays: number;
  easeFactor: number;
  reps: number;
  lapses: number;
}

export interface SrsResult extends SrsState {
  dueDate: Date;
}

const MIN_EASE = 1.3;
const DAY = 24 * 60 * 60 * 1000;

/** Aplica una calificación y calcula el próximo intervalo y vencimiento. */
export function review(state: SrsState, grade: Grade, now: Date = new Date()): SrsResult {
  let { intervalDays, easeFactor, reps, lapses } = state;

  if (grade === "again") {
    reps = 0;
    lapses += 1;
    easeFactor = Math.max(MIN_EASE, easeFactor - 0.2);
    // Se vuelve a ver pronto (misma sesión / mismo día).
    return { intervalDays: 0, easeFactor, reps, lapses, dueDate: new Date(now.getTime() + 10 * 60 * 1000) };
  }

  // Ajuste del factor de facilidad según la calificación.
  if (grade === "hard") easeFactor = Math.max(MIN_EASE, easeFactor - 0.15);
  else if (grade === "easy") easeFactor = easeFactor + 0.15;

  reps += 1;

  let next: number;
  if (reps === 1) next = grade === "hard" ? 1 : grade === "easy" ? 4 : 1;
  else if (reps === 2) next = grade === "hard" ? 3 : grade === "easy" ? 10 : 6;
  else {
    const mult = grade === "hard" ? 1.2 : grade === "easy" ? easeFactor * 1.3 : easeFactor;
    next = Math.round(Math.max(1, intervalDays) * mult);
  }
  next = Math.min(next, 365);

  return { intervalDays: next, easeFactor, reps, lapses, dueDate: new Date(now.getTime() + next * DAY) };
}

/** Etiqueta corta del intervalo resultante, para mostrar en los botones. */
export function previewInterval(state: SrsState, grade: Grade): string {
  const r = review(state, grade);
  if (grade === "again") return "<10 min";
  if (r.intervalDays < 1) return "hoy";
  if (r.intervalDays === 1) return "1 día";
  if (r.intervalDays < 30) return `${r.intervalDays} días`;
  const m = Math.round(r.intervalDays / 30);
  return m === 1 ? "1 mes" : `${m} meses`;
}
