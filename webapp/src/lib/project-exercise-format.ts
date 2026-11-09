/**
 * Formato de intercambio de talleres y ejercicios de un proyecto.
 *
 * Una IA que está trabajando un proyecto recibe `projectExercisePrompt` (lib/prompts.ts), resuelve
 * los ejercicios y responde con este formato; la persona lo pega en la app («Pegar respuesta de la
 * IA») o en el chat de desarrollo. Es texto plano con marcadores `@@` en su propia línea, porque el
 * Markdown de la solución ya usa bloques de código (```formula) y no se puede anidar otro cerco.
 *
 *   @@TALLER: Taller 2 — Cinética       (opcional; vale para los ejercicios que siguen)
 *   @@EJERCICIO: Problema 1 — Vida media
 *   @@ENUNCIADO
 *   …Markdown…
 *   @@SOLUCION
 *   …Markdown…
 *   @@FIN
 *
 * Módulo puro (sin servidor ni cliente): lo usan el prompt, la vista previa y la server action.
 */

export type ParsedProjectExercise = {
  workshop: string | null;
  title: string;
  question: string;
  solution: string;
};

export type ParseResult = { items: ParsedProjectExercise[]; problems: string[] };

export const MAX_TITLE = 160;
export const MAX_WORKSHOP = 120;
export const MAX_BODY = 30000;

const MARKER = /^\s*@@\s*(TALLER|EJERCICIO|ENUNCIADO|SOLUCI[OÓ]N|FIN)\b\s*:?\s*(.*?)\s*$/i;
// Cerco externo que la IA pone para que se pueda copiar (4 o más acentos graves, con o sin idioma).
const OUTER_FENCE = /^\s*`{4,}[\w-]*\s*$/;

export function parseProjectExercises(raw: string): ParseResult {
  const items: ParsedProjectExercise[] = [];
  const problems: string[] = [];
  let workshop: string | null = null;
  let cur: { title: string; q: string[]; s: string[] } | null = null;
  let mode: "q" | "s" | null = null;

  const flush = () => {
    if (!cur) return;
    const title = cur.title.trim();
    const question = cur.q.join("\n").trim();
    const solution = cur.s.join("\n").trim();
    const label = title || `ejercicio ${items.length + problems.length + 1}`;
    if (!title) problems.push(`Un ejercicio no tiene título (@@EJERCICIO: …).`);
    else if (!question) problems.push(`«${label}» no tiene enunciado (@@ENUNCIADO).`);
    else if (!solution) problems.push(`«${label}» no tiene solución (@@SOLUCION).`);
    else items.push({ workshop, title: title.slice(0, MAX_TITLE), question, solution });
    cur = null;
    mode = null;
  };

  for (const line of raw.replace(/\r\n?/g, "\n").split("\n")) {
    if (OUTER_FENCE.test(line)) continue;
    const m = MARKER.exec(line);
    if (!m) {
      if (cur && mode === "q") cur.q.push(line);
      else if (cur && mode === "s") cur.s.push(line);
      continue;
    }
    const kind = m[1].toUpperCase().replace("Ó", "O");
    const rest = m[2];
    if (kind === "TALLER") {
      flush();
      workshop = rest.slice(0, MAX_WORKSHOP) || null;
    } else if (kind === "EJERCICIO") {
      flush();
      cur = { title: rest, q: [], s: [] };
    } else if (kind === "ENUNCIADO") {
      if (cur) mode = "q";
    } else if (kind === "SOLUCION") {
      if (cur) mode = "s";
    } else {
      flush();
    }
  }
  flush();

  if (items.length === 0 && problems.length === 0) {
    problems.push("No encontré ningún ejercicio. Debe haber líneas «@@EJERCICIO: título», «@@ENUNCIADO» y «@@SOLUCION».");
  }
  return { items, problems };
}
