/**
 * TDAH — el tiempo tiene que verse. Junto a cada fecha absoluta se muestra su
 * distancia en días desde hoy: "hoy", "mañana", "en 3 días", "hace 8 días".
 */
const MS_DAY = 24 * 60 * 60 * 1000;

/** Días de calendario entre hoy y `date` (en hora de Bogotá, aprox. UTC-5).
 *  Positivo = futuro, negativo = pasado, 0 = hoy. */
export function daysFromToday(date: Date | string | null | undefined): number | null {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return null;

  const bogotaNow = new Date(Date.now() - 5 * 60 * 60 * 1000);
  const today = Date.UTC(bogotaNow.getUTCFullYear(), bogotaNow.getUTCMonth(), bogotaNow.getUTCDate());
  const target = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Math.round((target - today) / MS_DAY);
}

export function relativeDays(date: Date | string | null | undefined): string {
  const n = daysFromToday(date);
  if (n === null) return "";
  if (n === 0) return "hoy";
  if (n === 1) return "mañana";
  if (n === -1) return "ayer";
  if (n > 1) return `en ${n} días`;
  return `hace ${Math.abs(n)} días`;
}

export type Urgency = "past" | "today" | "soon" | "upcoming" | "far" | "none";

/** Tono para la cuenta regresiva. Nunca "rojo agresivo": el máximo es `past`,
 *  que la UI pinta ámbar + negrita. */
export function urgencyOf(date: Date | string | null | undefined): Urgency {
  const n = daysFromToday(date);
  if (n === null) return "none";
  if (n < 0) return "past";
  if (n === 0) return "today";
  if (n <= 3) return "soon";
  if (n <= 10) return "upcoming";
  return "far";
}
