"use client";

/**
 * TDAH — nadie tiene que acordarse de guardar. Cada editor escribe un borrador
 * local en cada tecla; si se cierra la pestaña o se pierde la conexión, al
 * volver se ofrece restaurarlo. Es solo un colchón de cliente: la fuente de
 * verdad sigue siendo la base de datos vía server actions.
 */
const PREFIX = "rxtrack:draft:";

export interface Draft {
  value: string;
  savedAt: number;
}

export function saveDraft(key: string, value: string): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ value, savedAt: Date.now() }));
  } catch {
    /* almacenamiento lleno o bloqueado: se ignora, no es crítico */
  }
}

export function loadDraft(key: string): Draft | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (typeof d?.value === "string" && typeof d?.savedAt === "number") return d;
    return null;
  } catch {
    return null;
  }
}

export function clearDraft(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    /* noop */
  }
}

/** "hace 5 min" para el aviso de borrador. */
export function draftAge(savedAt: number): string {
  const min = Math.round((Date.now() - savedAt) / 60000);
  if (min < 1) return "hace un momento";
  if (min === 1) return "hace 1 minuto";
  if (min < 60) return `hace ${min} minutos`;
  const h = Math.round(min / 60);
  return h === 1 ? "hace 1 hora" : `hace ${h} horas`;
}
