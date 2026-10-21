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

/** Tiempo transcurrido desde un instante: "hace 5 min", "hace 3 h", "hace 2 días". */
export function relativeAgo(date: Date | string | null | undefined): string {
  if (!date) return "";
  const t = (typeof date === "string" ? new Date(date) : date).getTime();
  if (Number.isNaN(t)) return "";
  const min = Math.max(0, Math.round((Date.now() - t) / 60000));
  if (min < 1) return "hace un momento";
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  return d === 1 ? "hace 1 día" : `hace ${d} días`;
}

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
