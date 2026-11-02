/**
 * Plan de estudios del pregrado en Farmacia (UNAL Bogotá, Acuerdo 511 de 2023, modificado por el
 * Acuerdo 656 de 2026): la malla sugerida semestre a semestre, 185 créditos. Sirve para precargar
 * la malla personal (`loadMallaPlan`); el avance de cada fila vive en `MallaSubject`, no aquí.
 *
 * `area`: Q química · FME física, matemáticas y estadística · BG biológica · F farmacéutica ·
 * BM biomédica · AS administrativa y sociohumanística · TG trabajo de grado ·
 * OF optativa de fundamentación · OD optativa disciplinar · LE libre elección.
 * `slug`: asignatura de la app que la cubre este semestre (queda «en curso» y enlazada).
 */

export type MallaPlanEntry = { name: string; credits: number; area: string; slug?: string };

export const MALLA_AREA_LABEL: Record<string, string> = {
  Q: "Química",
  FME: "Física, mat. y estadística",
  BG: "Biológica",
  F: "Farmacéutica",
  BM: "Biomédica",
  AS: "Administrativa y sociohumanística",
  TG: "Trabajo de grado",
  OF: "Optativa de fundamentación",
  OD: "Optativa disciplinar",
  LE: "Libre elección",
};

export const MALLA_PLAN: MallaPlanEntry[][] = [
  // I — 18 créditos
  [
    { name: "Principios de química", credits: 3, area: "Q" },
    { name: "Laboratorio de técnicas básicas en química", credits: 3, area: "Q" },
    { name: "Cálculo diferencial", credits: 4, area: "FME" },
    { name: "Biología molecular y celular", credits: 3, area: "BG" },
    { name: "Introducción a la farmacia", credits: 2, area: "AS" },
    { name: "Libre elección", credits: 3, area: "LE" },
  ],
  // II — 19
  [
    { name: "Química orgánica I", credits: 3, area: "Q" },
    { name: "Laboratorio de química orgánica I", credits: 3, area: "Q" },
    { name: "Principios de análisis químico", credits: 3, area: "Q" },
    { name: "Laboratorio de principios de análisis químico", credits: 3, area: "Q" },
    { name: "Mecánica y ondas para biociencias", credits: 4, area: "FME" },
    { name: "Bioestadística fundamental", credits: 3, area: "FME" },
  ],
  // III — 17
  [
    { name: "Química orgánica II", credits: 3, area: "Q" },
    { name: "Química inorgánica farmacéutica", credits: 2, area: "F" },
    { name: "Bioquímica", credits: 3, area: "BM" },
    { name: "Fisicoquímica I", credits: 3, area: "Q" },
    { name: "Optativa de fundamentación", credits: 3, area: "OF" },
    { name: "Libre elección", credits: 3, area: "LE" },
  ],
  // IV — 19
  [
    { name: "Fisioanatomía", credits: 3, area: "BM" },
    { name: "Microbiología general", credits: 3, area: "BM" },
    { name: "Operaciones unitarias farmacéuticas", credits: 2, area: "F" },
    { name: "Farmacognosia y fitoquímica", credits: 4, area: "F" },
    { name: "Optativa de fundamentación", credits: 3, area: "OF" },
    { name: "Libre elección", credits: 4, area: "LE" },
  ],
  // V — 20
  [
    { name: "Fisiopatología", credits: 3, area: "BM" },
    { name: "Microbiología farmacéutica", credits: 3, area: "BM" },
    { name: "Farmacotecnia I", credits: 4, area: "F" },
    { name: "Farmacia química I", credits: 4, area: "F" },
    { name: "Optativa de fundamentación", credits: 3, area: "OF" },
    { name: "Libre elección", credits: 3, area: "LE" },
  ],
  // VI — 19
  [
    { name: "Farmacología general", credits: 3, area: "BM", slug: "fg" },
    { name: "Salud pública y farmacia", credits: 2, area: "AS", slug: "spf" },
    { name: "Farmacotecnia II", credits: 4, area: "F", slug: "ft2" },
    { name: "Análisis instrumental farmacéutico", credits: 4, area: "F", slug: "aif" },
    { name: "Biofarmacia y farmacocinética", credits: 2, area: "F", slug: "bfc" },
    { name: "Farmacia química II", credits: 2, area: "F" },
    { name: "Administración farmacéutica", credits: 2, area: "AS", slug: "af" },
  ],
  // VII — 16
  [
    { name: "Farmacología especial", credits: 3, area: "BM" },
    { name: "Gestión de servicios farmacéuticos", credits: 2, area: "AS" },
    { name: "Legislación farmacéutica", credits: 2, area: "AS" },
    { name: "Toxicología", credits: 3, area: "BM" },
    { name: "Optativa disciplinar", credits: 3, area: "OD" },
    { name: "Libre elección", credits: 3, area: "LE" },
  ],
  // VIII — 19
  [
    { name: "Farmacia industrial", credits: 4, area: "F" },
    { name: "Control de calidad farmacéutico", credits: 4, area: "F" },
    { name: "Aseguramiento de calidad", credits: 2, area: "AS" },
    { name: "Optativa disciplinar", credits: 3, area: "OD" },
    { name: "Libre elección", credits: 3, area: "LE" },
    { name: "Libre elección", credits: 3, area: "LE" },
  ],
  // IX — 21
  [
    { name: "Farmacia hospitalaria", credits: 9, area: "F" },
    { name: "Optativa disciplinar", credits: 3, area: "OD" },
    { name: "Optativa disciplinar", credits: 3, area: "OD" },
    { name: "Libre elección", credits: 3, area: "LE" },
    { name: "Libre elección", credits: 3, area: "LE" },
  ],
  // X — 17
  [
    { name: "Trabajo de grado", credits: 8, area: "TG" },
    { name: "Libre elección", credits: 3, area: "LE" },
    { name: "Libre elección", credits: 3, area: "LE" },
    { name: "Libre elección", credits: 3, area: "LE" },
  ],
];

export const MALLA_PLAN_CREDITS = MALLA_PLAN.flat().reduce((sum, e) => sum + e.credits, 0);

/** Créditos de grado que exige el plan para poder cursar el trabajo de grado (80 % de 185). */
export const MALLA_GRADE_THRESHOLD = 148;
