/** Malla académica personal (client-safe): estados, cuentas de avance y lectura de la lista pegada. */

import { canUseCourses } from "@/lib/courses";

export const MALLA_STATUSES = ["PENDIENTE", "EN_CURSO", "APROBADA"] as const;
export type MallaStatus = (typeof MALLA_STATUSES)[number];
export const MALLA_STATUS_LABEL: Record<MallaStatus, string> = {
  PENDIENTE: "Por ver",
  EN_CURSO: "En curso",
  APROBADA: "Vista",
};

export const asMallaStatus = (raw: unknown): MallaStatus =>
  (MALLA_STATUSES as readonly string[]).includes(String(raw)) ? (raw as MallaStatus) : "PENDIENTE";

/** Como los cursos personales: solo la cuenta con acceso total y sin alcance acotado. */
export const canUseMalla = canUseCourses;

export const MAX_SEMESTER = 14;

export type MallaRow = {
  id: string;
  semester: number;
  name: string;
  credits: number | null;
  area: string | null;
  status: MallaStatus;
  grade: number | null;
  subjectSlug: string | null;
};

export type MallaTotals = {
  count: number;
  /** Créditos por estado (las asignaturas sin créditos no suman). */
  credits: Record<MallaStatus, number>;
  /** Cantidad de asignaturas por estado. */
  counts: Record<MallaStatus, number>;
  totalCredits: number;
  /** 0..1 de créditos aprobados sobre el total; si no hay créditos, por número de asignaturas. */
  progress: number;
  /** Promedio ponderado por créditos de las aprobadas con nota; null si no hay notas. */
  average: number | null;
};

export function mallaTotals(rows: Pick<MallaRow, "status" | "credits" | "grade">[]): MallaTotals {
  const credits: Record<MallaStatus, number> = { PENDIENTE: 0, EN_CURSO: 0, APROBADA: 0 };
  const counts: Record<MallaStatus, number> = { PENDIENTE: 0, EN_CURSO: 0, APROBADA: 0 };
  let weighted = 0;
  let weights = 0;
  for (const r of rows) {
    counts[r.status] += 1;
    credits[r.status] += r.credits ?? 0;
    if (r.status === "APROBADA" && r.grade != null) {
      const w = r.credits ?? 1;
      weighted += r.grade * w;
      weights += w;
    }
  }
  const totalCredits = credits.PENDIENTE + credits.EN_CURSO + credits.APROBADA;
  const progress =
    totalCredits > 0 ? credits.APROBADA / totalCredits : rows.length > 0 ? counts.APROBADA / rows.length : 0;
  return { count: rows.length, credits, counts, totalCredits, progress, average: weights > 0 ? weighted / weights : null };
}

/** Nota 0–5 con coma o punto; null si no es válida. */
export function parseGrade(raw: unknown): number | null {
  const n = Number.parseFloat(String(raw ?? "").trim().replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n <= 5 ? Math.round(n * 10) / 10 : null;
}

export type ParsedMallaLine = { semester: number; name: string; credits: number | null; status: MallaStatus };

const STATUS_WORDS: { re: RegExp; status: MallaStatus }[] = [
  { re: /^(aprobad[ao]|vist[ao]|ganad[ao]|cursad[ao]|ok|✓)$/i, status: "APROBADA" },
  { re: /^(en curso|cursando|actual|viendo)$/i, status: "EN_CURSO" },
  { re: /^(pendiente|por ver|falta|no vist[ao])$/i, status: "PENDIENTE" },
];

/**
 * Lee una lista pegada. Cada línea: `semestre; nombre; créditos; estado` (separados por `;`, tab o `|`),
 * con créditos y estado opcionales. Un encabezado «Semestre 3» (o «3.º semestre») fija el semestre de las
 * líneas siguientes, que pueden ser solo `nombre; créditos; estado`. Devuelve también las líneas ignoradas.
 */
export function parseMallaList(text: string): { lines: ParsedMallaLine[]; skipped: string[] } {
  const lines: ParsedMallaLine[] = [];
  const skipped: string[] = [];
  let current: number | null = null;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;

    const header = line.match(/^(?:semestre\s*(\d{1,2})|(\d{1,2})\s*[.º°]*\s*semestre)\s*:?$/i);
    if (header) {
      current = Number(header[1] ?? header[2]);
      continue;
    }

    const parts = line.split(/\s*[;\t|]\s*/).map((p) => p.trim()).filter(Boolean);
    let semester = current;
    if (parts.length > 1 && /^\d{1,2}$/.test(parts[0]) && current === null) {
      semester = Number(parts.shift());
    } else if (parts.length > 2 && /^\d{1,2}$/.test(parts[0]) && !/^\d+$/.test(parts[1])) {
      semester = Number(parts.shift());
    }
    const name = parts.shift()?.replace(/^[-•*\d.)\s]+(?=[A-Za-zÁÉÍÓÚÑáéíóúñ])/, "").trim();

    if (!name || semester === null || semester < 1 || semester > MAX_SEMESTER) {
      skipped.push(line);
      continue;
    }

    let credits: number | null = null;
    let status: MallaStatus = "PENDIENTE";
    for (const p of parts) {
      const word = STATUS_WORDS.find((w) => w.re.test(p));
      if (word) status = word.status;
      else if (/^\d{1,2}(\s*cr[eé]ditos?)?$/i.test(p)) credits = Number.parseInt(p, 10);
    }
    lines.push({ semester, name: name.slice(0, 140), credits, status });
  }
  return { lines, skipped };
}
