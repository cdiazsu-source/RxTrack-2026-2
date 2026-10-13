/**
 * Constructores de prompts de IA. Principio rector 4: la app NUNCA llama a una
 * API. Estas funciones puras arman un texto; la persona lo copia y lo pega en su
 * asistente, y pega la respuesta de vuelta para guardarla.
 */

export interface PromptModule {
  title: string;
  description: string;
}

/**
 * "Prompt de contexto" de una práctica de laboratorio: arma un texto
 * autosuficiente (asignatura + agrupación del laboratorio + equipo + práctica en
 * detalle) para pegarlo en cualquier IA y poder hacerle preguntas puntuales.
 */
export function labPracticePrompt(opts: {
  subjectName: string;
  /** Resumen y objetivo de la asignatura (contexto general para la IA). */
  subjectSummary?: string | null;
  subjectObjective?: string | null;
  /** Módulo curricular enlazado (cross-link blando), si lo hay. */
  moduleTitle?: string | null;
  /** Agrupación del laboratorio: nombre, subtítulo, equipo y reglas. */
  labModule?: { name: string; subtitle?: string; team?: string[]; rules?: string[] } | null;
  practice: {
    number: number;
    title: string;
    fundamento: string;
    /** Desarrollo pedagógico (Markdown). Las imágenes se omiten. */
    desarrollo?: string;
    keyPoints: string[];
    procedure: string;
    equations: string[];
    dataRequested: string[];
    studyTopics?: string[];
  };
}): string {
  const p = opts.practice;
  const lm = opts.labModule ?? null;
  const bloque = (titulo: string, items: string[]) =>
    items.length ? `\n${titulo}:\n${items.map((x) => `- ${x}`).join("\n")}\n` : "";

  const asignatura =
    `CONTEXTO DE LA ASIGNATURA:\n` +
    `Asignatura: ${opts.subjectName} (pregrado de Química Farmacéutica, Universidad Nacional de Colombia).` +
    (opts.subjectSummary ? `\nDe qué trata: ${stripMarkup(opts.subjectSummary)}` : "") +
    (opts.subjectObjective ? `\nObjetivo general: ${stripMarkup(opts.subjectObjective)}` : "") +
    (opts.moduleTitle ? `\nTema del curso al que se enlaza esta práctica: ${opts.moduleTitle}.` : "") +
    `\n`;

  const laboratorio = lm
    ? `\nCONTEXTO DEL LABORATORIO — ${lm.name}:\n` +
      (lm.subtitle ? `${stripMarkup(lm.subtitle)}\n` : "") +
      (lm.team && lm.team.length ? `Integrantes del grupo: ${lm.team.join(", ")}.\n` : "") +
      (lm.rules && lm.rules.length ? `Reglas y logística:\n${lm.rules.map((r) => `- ${stripMarkup(r)}`).join("\n")}\n` : "")
    : "";

  return (
    `Eres un asistente experto en química analítica, análisis instrumental y ` +
    `prácticas de laboratorio farmacéutico. Voy a hacerte preguntas puntuales ` +
    `sobre UNA práctica de laboratorio. Primero lee TODO el contexto de abajo ` +
    `(asignatura, laboratorio y práctica); después responde solo con base en él ` +
    `y en tu conocimiento técnico.\n\n` +
    asignatura +
    laboratorio +
    `\n══════════ PRÁCTICA ${lm ? `(${lm.name}) ` : ""}${p.number} — ${p.title} ══════════\n\n` +
    `FUNDAMENTO:\n${stripMarkup(p.fundamento)}\n` +
    (p.desarrollo ? `\nDESARROLLO / EXPLICACIÓN DETALLADA:\n${stripMarkdownExtras(p.desarrollo)}\n` : "") +
    bloque("LO QUE DEBO TENER PRESENTE", p.keyPoints.map(stripMarkup)) +
    `\nPROCEDIMIENTO:\n${stripMarkup(p.procedure)}\n` +
    bloque("ECUACIONES QUE NECESITO", p.equations) +
    bloque("DATOS QUE DEBO REGISTRAR", p.dataRequested.map(stripMarkup)) +
    bloque("TEMAS DE CONSULTA", (p.studyTopics ?? []).map(stripMarkup)) +
    `\nCÓMO QUIERO QUE ME RESPONDAS:\n` +
    `- Paso a paso, con paciencia y sin dar por sabido nada: no tengo buenas bases en química analítica.\n` +
    `- En cada cálculo: interpreta primero qué se está calculando, muestra los FACTORES DE CONVERSIÓN con las unidades que se cancelan, y cierra con una conclusión.\n` +
    `- Si hay una reacción, escríbela balanceada y explica la estequiometría; si un reactivo puede estar hidratado, dime con qué masa molar trabajas y por qué.\n` +
    `- No inventes datos que no te haya dado: si falta un dato para un cálculo, pídemelo.\n\n` +
    `Con este contexto, respóndeme lo que te pregunte sobre esta práctica: ` +
    `montaje, cálculos con mis datos, interpretación de resultados, fuentes de ` +
    `error, tratamiento estadístico, qué esperar y cómo redactar la discusión.`
  );
}

/** "Profesor experto en <asignatura> + temario + tema a profundizar". */
export function contextPrompt(subjectName: string, modules: PromptModule[], topic: string): string {
  const temario = modules.length
    ? modules.map((m, i) => `${i + 1}. ${m.title}: ${stripMarkup(m.description)}`).join("\n")
    : "(La asignatura aún no tiene temario cargado.)";

  return (
    `Eres un profesor experto en ${subjectName}, una asignatura del pregrado de ` +
    `Química Farmacéutica. Explicas con rigor técnico pero de forma clara y ` +
    `didáctica, como en una asesoría personalizada del curso.\n\n` +
    `Este es el contenido del curso, como contexto:\n\n${temario}\n\n` +
    `Con este contexto, quiero que profundices en lo siguiente:\n` +
    `${topic.trim() || "[ESCRIBE AQUÍ EL TEMA QUE QUIERES PROFUNDIZAR O INVESTIGAR]"}\n\n` +
    `Da una explicación con el nivel de un curso universitario de farmacia, usa ` +
    `ejemplos aplicados cuando sea posible, y si el tema se relaciona con alguno ` +
    `de los módulos anteriores dilo explícitamente.`
  );
}

/**
 * Prompt para EXTRAER el texto de unas diapositivas / un PDF de clase y dejarlo
 * ordenado y relacionado con la asignatura. La persona pega el material al final;
 * la IA devuelve texto limpio que luego se guarda en "Diapositivas / Notas de
 * clase" y alimenta el prompt Cornell.
 */
export function slidesExtractPrompt(opts: {
  subjectName: string;
  modules: PromptModule[];
  moduleTitle: string;
  topic?: string;
}): string {
  const temario = opts.modules.length
    ? opts.modules.map((m, i) => `${i + 1}. ${m.title}: ${stripMarkup(m.description)}`).join("\n")
    : "(La asignatura aún no tiene temario cargado.)";

  return (
    `Eres un asistente de estudio experto en ${opts.subjectName}, del pregrado de ` +
    `Química Farmacéutica. Contexto del curso:\n\n${temario}\n\n` +
    `Te voy a pasar el material de una clase del módulo "${opts.moduleTitle}"` +
    (opts.topic ? ` sobre "${opts.topic}"` : "") +
    ` — pueden ser diapositivas, un PDF o notas sueltas, con formato desordenado.\n\n` +
    `Tu tarea:\n` +
    `1. EXTRAE todo el texto útil: definiciones, esquemas, listas, tablas, fórmulas, ` +
    `ejemplos, valores, nombres de fármacos y referencias citadas.\n` +
    `2. ORDÉNALO en secuencia lógica con encabezados \`####\` y viñetas \`*\`, en ` +
    `Markdown; reconstruye las tablas con | pipes |.\n` +
    `3. RELACIÓNALO con el curso: si un punto conecta con otro módulo del temario, ` +
    `dilo en una línea entre corchetes, p. ej. \`[Ver módulo 2: …]\`.\n` +
    `4. DESCARTA el ruido: números de diapositiva, logos, pies de página, "gracias".\n` +
    `5. Marca con \`[?]\` lo que quede ilegible, cortado o dudoso.\n` +
    `No resumas ni interpretes de más: el objetivo es transcribir y ordenar, no opinar.\n\n` +
    `--- MATERIAL DE LA CLASE (diapositivas / PDF / notas) ---\n\n` +
    `[pega aquí el texto de las diapositivas o del PDF]\n`
  );
}

/** Plantilla de apuntes método Cornell a partir de una transcripción + diapositivas. */
export function cornellPrompt(opts: {
  subjectName: string;
  moduleTitle: string;
  topic?: string;
  transcription?: string;
  slides?: string;
  /** Términos del glosario del módulo (para que respete la terminología). */
  glossary?: string[];
  /** Fórmulas del módulo (por si aparecen en la clase). */
  formulas?: string[];
  /** Apuntes Cornell de la sesión anterior, para dar continuidad. */
  previousCornell?: string;
}): string {
  const listBlock = (title: string, items?: string[]) =>
    items && items.length ? `\n${title}:\n${items.map((x) => `- ${x}`).join("\n")}\n` : "";

  const prev = opts.previousCornell?.trim()
    ? `\nAPUNTES DE LA SESIÓN ANTERIOR (contexto, no los repitas; conéctalos si aplica):\n${opts.previousCornell.trim()}\n`
    : "";

  return (
    `Eres un asistente de estudio experto en ${opts.subjectName}. A partir del ` +
    `material de una clase del módulo "${opts.moduleTitle}"` +
    (opts.topic ? ` sobre "${opts.topic}"` : "") +
    `, redacta apuntes con el MÉTODO CORNELL, en español, usando exactamente este ` +
    `formato de texto (encabezados con ####, tablas con | pipes |, viñetas con *, ` +
    `**negrita** para lo clave):\n\n` +
    `#### 1. Encabezado de la sesión\n(módulo, tema, fecha si se conoce)\n\n` +
    `#### 2. Tabla del método Cornell\n\n| Preguntas guía / palabras clave | Notas |\n| --- | --- |\n| ... | ... |\n\n` +
    `#### 3. Resumen sintético (3 a 5 oraciones)\n\n` +
    `#### 4. Tareas, laboratorios y pendientes\n* [ ] ...\n\n` +
    `Respeta la terminología del glosario del módulo. Si mencionan una fórmula del ` +
    `listado, inclúyela en las notas.\n` +
    listBlock("Glosario del módulo", opts.glossary) +
    listBlock("Fórmulas del módulo", opts.formulas) +
    prev +
    `\n--- MATERIAL DE LA CLASE ---\n\n` +
    `TRANSCRIPCIÓN:\n${opts.transcription?.trim() || "[pega aquí la transcripción de la clase]"}\n\n` +
    `DIAPOSITIVAS / NOTAS:\n${opts.slides?.trim() || "[pega aquí el texto de las diapositivas, si lo tienes]"}\n`
  );
}

/** Quiz / parcial de un módulo, con el material ligado a ese módulo como base. */
export function quizPrompt(opts: {
  subjectName: string;
  moduleTitle: string;
  sessions: string[];
  checklist: string[];
  formulas: string[];
  glossary: string[];
}): string {
  const bloque = (titulo: string, items: string[]) =>
    items.length ? `\n${titulo}:\n${items.map((x) => `- ${x}`).join("\n")}\n` : "";

  return (
    `Eres profesor de ${opts.subjectName}. Con base EXCLUSIVAMENTE en el siguiente ` +
    `material del módulo "${opts.moduleTitle}", genera un quiz de 10 preguntas ` +
    `(mezcla de opción múltiple, verdadero/falso y una de cálculo) con su ` +
    `solucionario razonado al final. Ajusta la dificultad a un parcial universitario.\n` +
    bloque("Temas vistos en clase (apuntes)", opts.sessions) +
    bloque("Puntos de checklist del módulo", opts.checklist) +
    bloque("Fórmulas del módulo", opts.formulas) +
    bloque("Términos del glosario del módulo", opts.glossary)
  );
}

/** Análisis de patrones de evaluación a partir de talleres/simulacros previos. */
export function patternsPrompt(
  subjectName: string,
  materials: Array<{ title: string; semester: string; patterns: string }>,
): string {
  const cuerpo = materials.length
    ? materials
        .map((m) => `- ${m.title} (${m.semester || "semestre no indicado"}): ${m.patterns || "sin observaciones"}`)
        .join("\n")
    : "[Agrega insumos con observaciones en la sección Insumos para que este prompt sea útil.]";

  return (
    `Eres un tutor que ayuda a un estudiante de ${subjectName} a prepararse para ` +
    `los parciales. A partir de estas observaciones sobre talleres y simulacros de ` +
    `semestres anteriores, identifica: (1) qué temas y tipos de pregunta se ` +
    `repiten más, (2) qué errores parece castigar el profesor, (3) un plan de ` +
    `estudio priorizado para las próximas dos semanas.\n\n${cuerpo}`
  );
}

function stripMarkup(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
}

/** Para texto Markdown largo (desarrollo): quita imágenes y `**negrita**`, y
 *  deja las tablas y listas como texto plano legible por una IA. */
function stripMarkdownExtras(s: string): string {
  return stripMarkup(s.replace(/^\s*!\[[^\]]*\]\([^)]*\)\s*$/gm, "")).replace(/\n{3,}/g, "\n\n");
}

/**
 * Prompt para que una IA RESUELVA un ejercicio del módulo y devuelva el enunciado y
 * la solución ya en el Markdown de la app (renderCornell), listos para pegar en
 * los dos campos del formulario «Agregar» de Ejercicios. La persona pega el
 * enunciado al final (o lo trae precargado).
 */
export function exerciseSolutionPrompt(opts: {
  subjectName: string;
  moduleTitle: string;
  moduleDescription?: string | null;
  glossary?: string[];
  formulas?: string[];
  question?: string;
}): string {
  const bloque = (titulo: string, items?: string[]) =>
    items && items.length ? `\n${titulo}:\n${items.map((x) => `- ${x}`).join("\n")}\n` : "";
  const F = "````"; // cerco externo de 4: el interior lleva bloques ```formula

  return [
    `Eres un profesor experto en ${opts.subjectName} (pregrado de Química Farmacéutica, Universidad Nacional de Colombia). ` +
      `Voy a darte UN ejercicio del módulo "${opts.moduleTitle}" y quiero que lo resuelvas completo, paso a paso, ` +
      `en un formato que pueda pegar tal cual en mi app de estudio.`,
    opts.moduleDescription ? `\nDe qué trata el módulo: ${stripMarkup(opts.moduleDescription)}` : "",
    bloque("Términos del glosario del módulo (respeta esta terminología)", opts.glossary),
    bloque("Fórmulas del módulo (úsalas por su nombre cuando apliquen)", opts.formulas),
    "",
    "CÓMO DEBES RESOLVERLO",
    "- No supongas conocimientos previos: explica cada paso como si fuera la primera vez que lo veo, con analogías cuando ayuden.",
    "- Divide la solución en pasos pequeños: «#### Paso N — qué se hace». Una sola idea por paso.",
    "- En CADA paso, en este orden: **Interpretación.** (qué se calcula y por qué, en palabras simples) · **Factor de conversión:** (cuál se usa y qué unidades se cancelan) · el cálculo, con el resultado en **negrita** y con unidades · **Conclusión:** (qué significa ese resultado y cómo conecta con el siguiente paso).",
    "- Muestra TODAS las conversiones de unidades de forma explícita (mL→L, mg→g, g→mol, % p/p→g, etc.). Nunca saltes de un número a otro sin mostrar el factor.",
    "- Si hay una reacción: escríbela balanceada, explica la estequiometría (relación molar entre las sustancias) y di de qué reactivo parte cada cálculo.",
    "- Si hay concentraciones: parte de M → N → equivalentes con N = M·θ, aunque θ valga 1, y explica qué es θ en esa reacción.",
    "- Si un reactivo puede estar hidratado o no ser puro, dime con qué masa molar y qué pureza trabajas, y por qué.",
    "- Si el enunciado no da un dato que haga falta, NO lo inventes en silencio: dilo, propón un valor tabulado y decláralo como supuesto al inicio. Si no se puede resolver sin ese dato, pregúntamelo.",
    "- Cierra con «#### Respuesta final» (una línea en **negrita** con unidades y cifras significativas razonables) y con «#### Errores comunes» (2 a 4 viñetas con los fallos típicos de este tipo de ejercicio).",
    "- Escribe en español y usa coma decimal (1,19 g/mL).",
    "",
    "FORMATO DE SALIDA (obligatorio — mi app solo entiende este Markdown)",
    `Entrega EXACTAMENTE dos bloques de código, uno para el enunciado y otro para la solución, cada uno cercado con CUATRO acentos graves (${F}markdown … ${F}) para que pueda copiarlos sin que se pierda el formato. Antes o después de los bloques no escribas nada más.`,
    "1) Primer bloque = ENUNCIADO: el problema tal cual (una sola pregunta), con **negrita** en los datos clave. Si añadiste supuestos, ponlos al final en una línea que empiece por «*Dato que hay que asumir* (el enunciado no lo da): …».",
    "2) Segundo bloque = SOLUCIÓN paso a paso.",
    "Reglas del Markdown permitido:",
    "- Encabezados: «#### Título» (siempre cuatro #).",
    "- **negrita** y *cursiva*. NO uses «*» como signo de multiplicación (se confunde con cursiva): usa «×» o «·».",
    "- Listas: una viñeta por línea con «* » o numeradas «1. ». Sin listas anidadas.",
    "- Tablas con | pipes |, una fila por línea, sin saltos de línea dentro de una celda y sin el símbolo | dentro del texto de una celda.",
    "- Subíndices y superíndices dentro de una frase: usa caracteres Unicode (H₂O, KMnO₄, Ca²⁺, mol⁻¹, 10⁻³). NO escribas _{2} ni ^{2} en el texto corrido: solo funcionan dentro de un bloque ```formula.",
    "- Ecuaciones y fracciones: usa un bloque ```formula (una línea por renglón) con _{sub}, ^{sup} y #{numerador|denominador}. Ejemplo:",
    "  ```formula",
    "  C_{1} · V_{1} = C_{2} · V_{2}",
    "  n = #{m|PM}",
    "  ```",
    "- Está PROHIBIDO: LaTeX ($…$, \\frac, \\text), HTML, imágenes y enlaces.",
    "",
    "──────── ENUNCIADO DEL EJERCICIO ────────",
    opts.question?.trim() || "[pega aquí el enunciado del ejercicio]",
    "",
  ]
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

/**
 * Prompt para dividir un paso que se siente grande o confuso en micro-pasos
 * (Modo Enfoque → «Se me complicó»). La persona lo pega en su IA y escribe cada
 * paso devuelto en el formulario «Dividir este paso».
 */
export function focusSplitPrompt(opts: {
  subjectName: string;
  projectTitle: string;
  step: string;
  otherSteps: string[];
}): string {
  const others = opts.otherSteps.length
    ? opts.otherSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")
    : "(no hay otros pasos)";
  return [
    "Ayúdame a empezar un paso que se me hace demasiado grande o confuso.",
    "",
    `Asignatura: ${opts.subjectName}`,
    `Proyecto: ${opts.projectTitle}`,
    `Paso en el que estoy trabado: ${opts.step}`,
    "",
    "Otros pasos del proyecto (solo de contexto, no los repitas):",
    others,
    "",
    "Divide ese paso en entre 3 y 7 micro-pasos con estas reglas:",
    "- Cada micro-paso debe poder hacerse en 2 a 10 minutos.",
    "- Empieza con un primer movimiento físico y concreto (abrir un archivo, escribir el título, sacar un material), no con «pensar» ni «planear».",
    "- Cada micro-paso debe ser una acción visible: al terminarlo se puede saber sin duda que ya está hecho.",
    "- Una sola acción por micro-paso; sin «y» que junten dos cosas.",
    "- Ordénalos en el orden en que realmente los haría.",
    "",
    "Respóndeme solo con la lista numerada, un micro-paso por línea, sin explicaciones.",
  ].join("\n");
}
