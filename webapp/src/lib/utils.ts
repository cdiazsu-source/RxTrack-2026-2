import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Toda la app se muestra en hora de Bogotá (UTC-5, sin horario de verano). Las
 *  fechas "solo día" se guardan a medianoche UTC y se formatean en UTC a
 *  propósito (convertirlas a Bogotá las correría un día atrás). */
export const APP_TIME_ZONE = "America/Bogota";

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function formatDateTime(date: Date | string | null | undefined) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: APP_TIME_ZONE,
  }).format(d);
}

/** "2026-09-04" a partir de un <input type="date">, o null. */
export function parseDateInput(raw: FormDataEntryValue | null): Date | null {
  if (!raw || typeof raw !== "string" || raw.trim().length === 0) return null;
  const d = new Date(raw.length === 10 ? `${raw}T00:00:00.000Z` : raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function dateInputValue(date: Date | null | undefined): string {
  return date ? date.toISOString().slice(0, 10) : "";
}

export const MODULE_STATUS_LABEL: Record<string, string> = {
  NO_VISTO: "No visto",
  EN_PROGRESO: "En progreso",
  DOMINADO: "Dominado",
};

export const PROJECT_STATUS_LABEL: Record<string, string> = {
  POR_INICIAR: "Por iniciar",
  EN_CURSO: "En curso",
  COMPLETADO: "Completado",
};

export const LAB_REPORT_STATUS_LABEL: Record<string, string> = {
  PENDIENTE: "Pendiente",
  ENTREGADO: "Entregado",
  CALIFICADO: "Calificado",
};
