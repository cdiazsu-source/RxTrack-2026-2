/**
 * Repetición espaciada con FSRS (paquete ts-fsrs), con 4 calificaciones.
 * Funciones puras: reciben el estado de una tarjeta y la calificación y devuelven el
 * estado nuevo. Sirven en servidor y cliente; las fechas viajan como milisegundos para
 * poder pasar por las props de los componentes de cliente.
 *
 * Sin "fuzz" (variación aleatoria del intervalo): así el intervalo que se muestra en
 * cada botón es exactamente el que se guarda al responder.
 */

import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card } from "ts-fsrs";

export type Grade = "again" | "hard" | "good" | "easy";

/** Estado FSRS de una tarjeta, tal como se guarda en la tabla Flashcard. */
export interface SrsState {
  /** 0 nueva · 1 aprendiendo · 2 repaso · 3 reaprendiendo */
  fsrsState: number;
  stability: number;
  difficulty: number;
  learningSteps: number;
  reps: number;
  lapses: number;
  /** Días programados en el último repaso. */
  intervalDays: number;
  /** ms desde epoch; null si nunca se ha repasado. */
  lastReview: number | null;
}

export interface SrsResult extends SrsState {
  /** ms desde epoch del próximo repaso. */
  due: number;
  /** Estado de la tarjeta antes de responder (para el registro). */
  prevState: number;
}

/** Campos de Flashcard que forman el estado de repaso. */
export const SRS_SELECT = {
  fsrsState: true,
  stability: true,
  difficulty: true,
  learningSteps: true,
  reps: true,
  lapses: true,
  intervalDays: true,
  lastReviewedAt: true,
} as const;

export function srsFromRow(c: {
  fsrsState: number;
  stability: number;
  difficulty: number;
  learningSteps: number;
  reps: number;
  lapses: number;
  intervalDays: number;
  lastReviewedAt: Date | null;
}): SrsState {
  return {
    fsrsState: c.fsrsState,
    stability: c.stability,
    difficulty: c.difficulty,
    learningSteps: c.learningSteps,
    reps: c.reps,
    lapses: c.lapses,
    intervalDays: c.intervalDays,
    lastReview: c.lastReviewedAt ? c.lastReviewedAt.getTime() : null,
  };
}

const GRADE_RATING ={ again: Rating.Again, hard: Rating.Hard, good: Rating.Good, easy: Rating.Easy } as const;

const scheduler = fsrs(generatorParameters({ enable_fuzz: false, maximum_interval: 365 }));

function toCard(s: SrsState, now: Date): Card {
  if (s.fsrsState === State.New) return createEmptyCard(now);
  return {
    due: now,
    stability: s.stability,
    difficulty: s.difficulty,
    scheduled_days: s.intervalDays,
    learning_steps: s.learningSteps,
    reps: s.reps,
    lapses: s.lapses,
    state: s.fsrsState as State,
    last_review: new Date(s.lastReview ?? now.getTime()),
  };
}

/** Aplica una calificación y calcula el estado nuevo y el próximo vencimiento. */
export function review(state: SrsState, grade: Grade, now: Date = new Date()): SrsResult {
  const { card } = scheduler.repeat(toCard(state, now), now)[GRADE_RATING[grade]];
  return {
    fsrsState: card.state,
    stability: card.stability,
    difficulty: card.difficulty,
    learningSteps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    intervalDays: card.scheduled_days,
    lastReview: now.getTime(),
    due: card.due.getTime(),
    prevState: state.fsrsState,
  };
}

/** Texto corto del tiempo que falta (minutos, horas, días, meses). */
export function formatDelay(ms: number): string {
  const min = Math.round(ms / 60_000);
  if (min < 1) return "<1 min";
  if (min < 60) return `${min} min`;
  const hours = Math.round(min / 60);
  if (hours < 24) return `${hours} h`;
  const days = Math.round(hours / 24);
  if (days === 1) return "1 día";
  if (days < 30) return `${days} días`;
  const months = Math.round(days / 30);
  return months === 1 ? "1 mes" : `${months} meses`;
}

/** Etiqueta del intervalo resultante, para mostrar en los botones. */
export function previewInterval(state: SrsState, grade: Grade, now: Date = new Date()): string {
  return formatDelay(review(state, grade, now).due - now.getTime());
}

/** Ventana (ms) por debajo de la cual una tarjeta vuelve a la cola de la misma sesión. */
export const SAME_SESSION_MS = 20 * 60_000;
