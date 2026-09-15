/** Lunes de la Semana 1 de clases del semestre 2026-2. Confirmado por el usuario:
 *  coincide con los festivos ya anotados en `content/spf.ts` (5 oct = semana 6,
 *  9 nov = semana 11, 7 dic = semana 15). */
export const SEMESTER_WEEK1_MONDAY = "2026-08-31";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Número de semana del semestre (1, 2, 3…) para la fecha de una sesión de
 *  clase. Reemplaza la numeración manual: la sesión ya no depende de que
 *  alguien recuerde "cuál fue la anterior", el número sale solo de la fecha.
 *  Las fechas "solo día" de la app se guardan a medianoche UTC (ver
 *  `lib/utils.ts`), así que el cálculo se hace en UTC a propósito. */
export function semesterWeekNumber(date: Date | string | null | undefined): number | null {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date.length === 10 ? `${date}T00:00:00.000Z` : date) : date;
  if (Number.isNaN(d.getTime())) return null;
  const start = new Date(`${SEMESTER_WEEK1_MONDAY}T00:00:00.000Z`);
  const diffDays = Math.floor((d.getTime() - start.getTime()) / DAY_MS);
  return Math.max(1, Math.floor(diffDays / 7) + 1);
}
