/** Estadísticas del repaso para las gráficas de /repaso: pronóstico, actividad reciente y madurez. */

import { prisma } from "@/lib/prisma";

const DAY = 24 * 60 * 60 * 1000;
/** Bogotá es UTC-5 todo el año. */
const BOGOTA_MS = 5 * 60 * 60 * 1000;

/** Día de calendario (AAAA-MM-DD) en hora de Bogotá. */
const dayKey = (ms: number) => new Date(ms - BOGOTA_MS).toISOString().slice(0, 10);
const shortLabel = (key: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${key}T12:00:00.000Z`).toLocaleDateString("es-CO", { ...opts, timeZone: "UTC" });

export const FORECAST_DAYS = 14;
export const ACTIVITY_DAYS = 30;
/** Estabilidad (días) desde la que una tarjeta se considera «madura», como en Anki. */
export const MATURE_STABILITY = 21;

export type ForecastDay = { label: string; due: number };
export type ActivityDay = { label: string; correct: number; again: number };
export type MaturityBucket = { name: string; value: number; tone: "new" | "learning" | "young" | "mature" };

export type ReviewStats = {
  /** Tarjetas ya vistas que vencen cada día (hoy incluye las atrasadas). */
  forecast: ForecastDay[];
  /** Respuestas por día, últimos 30 días. */
  activity: ActivityDay[];
  /** Respuestas en los últimos 30 días. */
  reviews30: number;
  /** % de respuestas acertadas (no «otra vez») entre tarjetas que ya estaban en repaso; null si aún no hay. */
  retention: number | null;
  maturity: MaturityBucket[];
  /** Tarjetas activas (sin suspender). */
  total: number;
};

export async function getReviewStats(now: Date = new Date()): Promise<ReviewStats> {
  const todayKey = dayKey(now.getTime());
  // Medianoche de Bogotá del primer día de la ventana de actividad.
  const since = new Date(new Date(`${dayKey(now.getTime() - (ACTIVITY_DAYS - 1) * DAY)}T00:00:00.000Z`).getTime() + BOGOTA_MS);

  const [cards, logs] = await Promise.all([
    prisma.flashcard.findMany({ where: { suspended: false }, select: { fsrsState: true, stability: true, dueDate: true } }),
    prisma.flashcardReviewLog.findMany({
      where: { reviewedAt: { gte: since } },
      select: { rating: true, state: true, reviewedAt: true },
    }),
  ]);

  // Pronóstico: días de calendario desde hoy.
  const forecastKeys = Array.from({ length: FORECAST_DAYS }, (_, i) => dayKey(now.getTime() + i * DAY));
  const forecastCount = new Map(forecastKeys.map((k) => [k, 0]));
  for (const c of cards) {
    if (c.fsrsState === 0) continue;
    const key = dayKey(c.dueDate.getTime());
    const bucket = key <= todayKey ? todayKey : key;
    if (forecastCount.has(bucket)) forecastCount.set(bucket, (forecastCount.get(bucket) ?? 0) + 1);
  }
  const forecast = forecastKeys.map((k, i) => ({
    label: i === 0 ? "Hoy" : i === 1 ? "Mañana" : shortLabel(k, { weekday: "short", day: "numeric" }),
    due: forecastCount.get(k) ?? 0,
  }));

  // Actividad: respuestas por día.
  const activityKeys = Array.from({ length: ACTIVITY_DAYS }, (_, i) => dayKey(now.getTime() - (ACTIVITY_DAYS - 1 - i) * DAY));
  const perDay = new Map(activityKeys.map((k) => [k, { correct: 0, again: 0 }]));
  let seen = 0;
  let seenOk = 0;
  for (const l of logs) {
    const slot = perDay.get(dayKey(l.reviewedAt.getTime()));
    if (!slot) continue;
    if (l.rating > 1) slot.correct += 1;
    else slot.again += 1;
    if (l.state === 2 || l.state === 3) {
      seen += 1;
      if (l.rating > 1) seenOk += 1;
    }
  }
  const activity = activityKeys.map((k) => ({
    label: shortLabel(k, { day: "numeric", month: "short" }),
    ...(perDay.get(k) ?? { correct: 0, again: 0 }),
  }));

  const count = (f: (c: (typeof cards)[number]) => boolean) => cards.filter(f).length;
  const maturity: MaturityBucket[] = [
    { name: "Nuevas", value: count((c) => c.fsrsState === 0), tone: "new" },
    { name: "Aprendiendo", value: count((c) => c.fsrsState === 1 || c.fsrsState === 3), tone: "learning" },
    { name: "Jóvenes", value: count((c) => c.fsrsState === 2 && c.stability < MATURE_STABILITY), tone: "young" },
    { name: "Maduras", value: count((c) => c.fsrsState === 2 && c.stability >= MATURE_STABILITY), tone: "mature" },
  ];

  return {
    forecast,
    activity,
    reviews30: activity.reduce((s, d) => s + d.correct + d.again, 0),
    retention: seen > 0 ? Math.round((seenOk / seen) * 100) : null,
    maturity,
    total: cards.length,
  };
}
