/** Utilidades de la bitácora de prácticas (client-safe: las usan la página, la acción y el componente). */

export const LAB_NOTE_KINDS = ["OBSERVACION", "DATO", "INCIDENTE", "PENDIENTE"] as const;
export type LabNoteKind = (typeof LAB_NOTE_KINDS)[number];

export const LAB_NOTE_KIND_LABEL: Record<LabNoteKind, string> = {
  OBSERVACION: "Observación",
  DATO: "Dato medido",
  INCIDENTE: "Incidente",
  PENDIENTE: "Pendiente",
};

export function asLabNoteKind(raw: unknown): LabNoteKind {
  return (LAB_NOTE_KINDS as readonly string[]).includes(String(raw)) ? (raw as LabNoteKind) : "OBSERVACION";
}

/** Las prácticas viven en content/<code>.ts: se identifican por agrupación + número
 *  (la numeración es por agrupación: "Módulo I · Práctica 1" y "Módulo II · Práctica 1" coexisten). */
export function practiceKey(p: { labModule?: string | null; number: number }): string {
  return `${p.labModule ?? ""}|${p.number}`;
}

/** Quién puede escribir en la bitácora: cualquier sesión, salvo un perfil de solo
 *  lectura con alcance acotado (el profe, que mira pero no escribe en tu bitácora). */
export function canWriteLabLog(s: { authed: boolean; level?: string; scope?: unknown[] | null }): boolean {
  return s.authed && !(s.level === "read" && s.scope);
}
