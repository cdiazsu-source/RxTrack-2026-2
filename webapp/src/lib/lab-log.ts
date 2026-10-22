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

export interface PracticeStep {
  /** "<grupo>.<n>": índice del encabezado (desde 1) y número del paso dentro del grupo. */
  id: string;
  groupIndex: number;
  /** "A", "B"… si el encabezado es «Actividad X — …»; si no, el número del grupo. */
  groupTag: string;
  groupTitle: string;
  n: number;
  /** Texto del paso, sin Markdown. */
  text: string;
}

const plainStep = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\s+/g, " ").trim();

/** Divide `procedure` (Markdown: «#### Encabezado» + «1. paso») en pasos con id estable.
 *  Un paso sin encabezado previo cae en el grupo 1. */
export function parsePracticeSteps(procedure: string): PracticeStep[] {
  const out: PracticeStep[] = [];
  let g = 0;
  let tag = "1";
  let title = "Procedimiento";
  let count = 0;
  for (const raw of procedure.split("\n")) {
    const line = raw.trim();
    const h = /^#{2,5}\s+(.*)$/.exec(line);
    if (h) {
      g += 1;
      count = 0;
      const act = /^Actividad\s+([A-Za-z0-9]+)\s*[—–-]\s*(.*)$/.exec(h[1]);
      tag = act ? act[1] : String(g);
      title = plainStep(act ? act[2] : h[1]);
      continue;
    }
    const s = /^(\d+)\.\s+(.*)$/.exec(line);
    if (!s) continue;
    if (g === 0) g = 1;
    count += 1;
    out.push({ id: `${g}.${count}`, groupIndex: g, groupTag: tag, groupTitle: title, n: count, text: plainStep(s[2]) });
  }
  return out;
}

/** «C · Paso 2: preparar 5 niveles…» (texto recortado). */
export function stepLabel(s: PracticeStep, max = 90): string {
  const t = s.text.length > max ? `${s.text.slice(0, max - 1)}…` : s.text;
  return `${s.groupTag} · Paso ${s.n}: ${t}`;
}
