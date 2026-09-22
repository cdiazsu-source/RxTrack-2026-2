/**
 * Tipos de la fuente de verdad del temario.
 *
 * Cada asignatura es un archivo `content/<code>.ts` que exporta un objeto
 * `SubjectContent`. Lo lee `webapp/prisma/seed.ts` y lo sincroniza hacia la base
 * de datos de forma idempotente: actualiza los campos de contenido y AGREGA lo
 * que falte, pero nunca borra ni sobrescribe el avance de la persona (estado de
 * módulo, checklist marcado, sesiones, fechas puestas a mano, notas, notas de
 * evaluación).
 *
 * Los `moduleSlug` son referencias blandas al `slug` de un módulo de la MISMA
 * asignatura (para el cross-link opcional glosario/fórmula/bibliografía ↔ módulo).
 */

export interface ExerciseContent {
  /** Enunciado en Markdown (markdown-lite: encabezados, tablas, listas, **negrita**). */
  question: string;
  /** Solución paso a paso en Markdown. Se muestra solo al pulsar "Ver solución". */
  solution: string;
}

export interface ModuleContent {
  /** Identificador estable dentro de la asignatura. No cambiarlo una vez usado. */
  slug: string;
  title: string;
  description: string;
  hasLab?: boolean;
  /** Protocolo / práctica asociada, si tiene laboratorio. */
  labProtocol?: string;
  /**
   * Ejercicios resueltos del módulo (una pregunta a la vez en la app). El orden
   * del arreglo es el orden en que aparecen.
   */
  exercises?: ExerciseContent[];
  /**
   * Desarrollo extenso y pedagógico del módulo completo, en Markdown
   * (markdown-lite: `#### encabezado`, listas, `**negrita**`, `> analogía`,
   * y bloques ` ```formula ` con el markup de fórmulas). Es material de
   * lectura — un capítulo de libro para ese módulo — no un resumen; se
   * muestra plegado en su propia sección en la página del módulo.
   */
  chapter?: string;
}

export interface GlossaryContent {
  term: string;
  definition: string;
  moduleSlug?: string | null;
}

export interface FormulaContent {
  name: string;
  /** Markup: `_{sub}`, `^{sup}`, `#{numerador|denominador}`, `\n` = salto de línea. */
  expression: string;
  variables?: string;
  description?: string;
  /** Desarrollo e interpretación; una línea por idea. Admite `**negrita**` + el markup. */
  derivation?: string;
  /**
   * Ejemplos resueltos (Markdown, markdown-lite). Se muestran en un bloque
   * aparte "Ejemplos resueltos", debajo del desarrollo.
   */
  examples?: string[];
  moduleSlug?: string | null;
}

export interface KeyDateContent {
  name: string;
  /** Peso en la nota, texto libre: "15%". La fecha la pone la persona en la app. */
  weight?: string | null;
  note?: string | null;
}

export interface EvaluationContent {
  name: string;
  /** Porcentaje entero. La suma de todos debería dar 100. */
  weight: number;
}

export interface BibliographyContent {
  kind: "libro" | "revista";
  reference: string;
  url?: string;
  moduleSlug?: string | null;
}

export interface ProjectContent {
  title: string;
  category?: string | null;
}

/**
 * Práctica de laboratorio. Es material de referencia (no lleva avance por ítem;
 * eso lo cubre `LabReport` dentro de la app). Se renderiza en la pestaña
 * "Laboratorio" como una sección plegable por práctica.
 */
export interface LabPracticeContent {
  number: number;
  title: string;
  /** Módulo de la MISMA asignatura al que corresponde (cross-link blando). */
  moduleSlug?: string | null;
  /** Por qué se hace la práctica y qué se busca demostrar. Admite `**negrita**`. */
  fundamento: string;
  /** Todo lo esencial para desarrollarla: reactivos clave, pasos críticos,
   *  criterios de clasificación, precauciones. Un elemento por viñeta. */
  keyPoints: string[];
  /** Procedimiento paso a paso, en Markdown-lite: `#### Actividad`, listas
   *  numeradas, tablas con `| pipes |` para las formulaciones. */
  procedure: string;
  /** Ecuaciones necesarias (mismo markup que `formulas`). */
  equations?: FormulaContent[];
  /** Datos / tablas que la guía pide registrar durante la práctica. */
  dataRequested: string[];
  /** Temas de consulta previos (opcional). */
  studyTopics?: string[];
}

export interface SubjectContent {
  /** Código corto en mayúsculas: "AIF", "FT2", … */
  code: string;
  /** Slug en minúsculas para la URL: "aif", "ft2", … */
  slug: string;
  name: string;
  credits?: string;
  professors?: string[];
  scheduleTheory?: string;
  scheduleLab?: string;
  descriptionSummary?: string;
  objectiveGeneral?: string;
  objectivesSpecific?: string[];
  hasLab?: boolean;
  /** Total de clases del semestre, para el % de asistencia. Default 32. */
  totalClasses?: number;
  /**
   * Qué secciones de la asignatura se muestran en la sub-navegación, según su
   * naturaleza. Vacío u omitido = todas. El "Panel" siempre se muestra.
   * Valores válidos: "modulos" | "laboratorio" | "proyectos" | "fechas" |
   *                  "glosario" | "formulas" | "bibliografia" | "insumos" |
   *                  "prompt-ia"
   */
  sections?: string[];

  modules?: ModuleContent[];
  glossary?: GlossaryContent[];
  formulas?: FormulaContent[];
  keyDates?: KeyDateContent[];
  evaluation?: EvaluationContent[];
  bibliography?: BibliographyContent[];
  /** Entregables fijos de la asignatura (seminario, producto final, informes…). */
  projects?: ProjectContent[];
  /** Bullets con el contexto y las reglas del laboratorio (pestaña Laboratorio). */
  labRules?: string[];
  /** Prácticas de laboratorio, cada una como su propia sección. */
  labPractices?: LabPracticeContent[];
}
