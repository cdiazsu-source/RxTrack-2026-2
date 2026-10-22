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
export interface LabPromptOpts {
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
}

/** Bloque de contexto compartido: asignatura + laboratorio + práctica completa. */
function labPracticeContext(opts: LabPromptOpts): string {
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
    asignatura +
    laboratorio +
    `\n══════════ PRÁCTICA ${lm ? `(${lm.name}) ` : ""}${p.number} — ${p.title} ══════════\n\n` +
    `FUNDAMENTO:\n${stripMarkup(p.fundamento)}\n` +
    (p.desarrollo ? `\nDESARROLLO / EXPLICACIÓN DETALLADA:\n${stripMarkdownExtras(p.desarrollo)}\n` : "") +
    bloque("LO QUE DEBO TENER PRESENTE", p.keyPoints.map(stripMarkup)) +
    `\nPROCEDIMIENTO:\n${stripMarkup(p.procedure)}\n` +
    bloque("ECUACIONES QUE NECESITO", p.equations) +
    bloque("DATOS QUE DEBO REGISTRAR", p.dataRequested.map(stripMarkup)) +
    bloque("TEMAS DE CONSULTA", (p.studyTopics ?? []).map(stripMarkup))
  );
}

export function labPracticePrompt(opts: LabPromptOpts): string {
  return (
    `Eres un asistente experto en química analítica, análisis instrumental y ` +
    `prácticas de laboratorio farmacéutico. Voy a hacerte preguntas puntuales ` +
    `sobre UNA práctica de laboratorio. Primero lee TODO el contexto de abajo ` +
    `(asignatura, laboratorio y práctica); después responde solo con base en él ` +
    `y en tu conocimiento técnico.\n\n` +
    labPracticeContext(opts) +
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

export interface LabLogPromptEntry {
  /** Fecha y hora ya formateadas. */
  when: string;
  /** Tipo en texto: "Observación", "Dato medido", "Incidente", "Pendiente". */
  kind: string;
  author: string;
  body: string;
}

/**
 * Prompt de seguimiento de una práctica: contexto completo + la bitácora que la
 * persona ha escrito (cronológica) para que la IA ubique en qué paso va, diga qué
 * sigue y explique/interprete el fundamento detrás de cada paso del procedimiento.
 */
export function labLogPrompt(opts: LabPromptOpts & { entries: LabLogPromptEntry[]; today: string }): string {
  const bitacora = opts.entries.length
    ? opts.entries.map((e, i) => `${i + 1}. [${e.when}] (${e.kind}, ${e.author}) ${e.body.replace(/\n+/g, " ⏎ ")}`).join("\n")
    : "(Todavía no he escrito nada en la bitácora: asume que estoy por empezar la práctica.)";

  return (
    `Eres un tutor experto en química analítica, análisis instrumental y prácticas de laboratorio ` +
    `farmacéutico. Me acompañas MIENTRAS hago UNA práctica: quiero entender en qué paso estoy, qué ` +
    `sigue, y por qué se hace cada paso. Lee TODO el contexto y mi bitácora antes de responder.\n\n` +
    labPracticeContext(opts) +
    `\n══════════ MI BITÁCORA (de la más antigua a la más reciente; hoy es ${opts.today}) ══════════\n` +
    `Es lo que yo mismo fui anotando durante la práctica. Los tipos son: Observación (lo que vi o hice), ` +
    `Dato medido (valores con sus unidades), Incidente (algo que salió mal o distinto) y Pendiente (algo que me falta).\n\n` +
    `${bitacora}\n\n` +
    `══════════ QUÉ NECESITO DE TI ══════════\n` +
    `Responde con estas secciones, en este orden:\n\n` +
    `1. DÓNDE ESTOY. Numera los pasos del PROCEDIMIENTO y dime, con base SOLO en mi bitácora, cuáles ` +
    `ya están hechos, cuál estoy haciendo ahora y cuáles no tienen evidencia. Cita la entrada de la bitácora ` +
    `que te hace pensar eso. Si una entrada es ambigua o falta información, no la supongas: dímelo y pregúntame.\n\n` +
    `2. QUÉ SIGUE. El siguiente paso concreto y lo que debo tener listo antes de hacerlo (material, reactivos, ` +
    `condiciones), qué dato debo registrar en ese momento y qué precauciones tomar. Si hay Incidentes o Pendientes ` +
    `sin resolver en mi bitácora, dime cómo afectan lo que sigue y qué hacer con ellos.\n\n` +
    `3. EL FUNDAMENTO DE CADA PASO. Para el paso actual, el siguiente y cada uno de los demás (aunque ya los haya hecho), ` +
    `explícame con tus propias palabras e interpretándolo: qué se hace, POR QUÉ se hace así (el principio químico o ` +
    `físico detrás), qué pasaría si se omite o se hace mal, y qué debería ver o medir para saber que salió bien. ` +
    `Usa analogías sencillas y no uses ningún término técnico ni sigla sin explicarlo antes.\n\n` +
    `4. INTERPRETACIÓN DE LO QUE YA TENGO. Revisa mis Datos medidos: ¿las unidades y los órdenes de magnitud tienen sentido? ` +
    `¿son coherentes con lo esperado en esta práctica? Si hay cálculos posibles con lo que ya medí, hazlos paso a paso: ` +
    `qué se calcula, FACTORES DE CONVERSIÓN con las unidades que se cancelan, y una conclusión. Señala posibles fuentes de error.\n\n` +
    `5. PREGUNTAS PARA MÍ. Máximo 5 preguntas, solo las que de verdad necesites para orientarme mejor en el próximo mensaje.\n\n` +
    `Reglas: no inventes datos que no escribí; si falta uno, pídemelo. Si hay una reacción, escríbela balanceada y explica ` +
    `la estequiometría; si un reactivo puede estar hidratado, dime con qué masa molar trabajas y por qué. No tengo buenas ` +
    `bases en química analítica: ve despacio y no des nada por sabido.`
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
    "- En CADA paso, sin excepción y en este orden: **Qué está pasando.** (una o dos frases que describan la situación real del paso: qué sustancia, muestra o dato estamos manejando y qué le ocurre) · **Interpretación.** (qué se calcula, por qué hace falta y cómo leerlo, en palabras simples) · **Factor de conversión:** (cuál se usa y qué unidades se cancelan) · el cálculo, con el resultado en **negrita** · **Conclusión:** (qué significa ese resultado y cómo conecta con el siguiente paso).",
    "- UNIDADES SIEMPRE: cada número, en cada línea de cada paso (datos, operaciones intermedias, resultados y la respuesta final), debe llevar su unidad correspondiente (g, mL, mol, mEq, mol/L, % p/p, etc.). Nunca escribas un número «pelado». Si una unidad se cancela, escríbela en la operación para que se vea cómo desaparece, y revisa que el resultado quede en la unidad que pide el enunciado.",
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
 * «Prompt rápido» de un módulo para una FOTO: la persona adjunta en su IA la imagen
 * de una diapositiva o del tablero y pega este texto. La IA devuelve, en cuatro
 * bloques, la transcripción fiel, la explicación, la relación con el módulo y un
 * control de calidad — todo en el Markdown de la app, listo para pegar en
 * «Diapositivas / notas» de una sesión de apuntes.
 */
export function photoExtractPrompt(opts: {
  subjectName: string;
  moduleTitle: string;
  moduleDescription?: string | null;
  glossary?: string[];
  formulas?: string[];
  /** Qué es la imagen. */
  kind?: "diapositiva" | "tablero" | "ambas";
  /** Cuántas imágenes se van a adjuntar (por defecto, una). */
  imageCount?: number;
  /** Nota de la persona sobre la imagen (tema, qué le interesa, qué no entiende). */
  note?: string;
}): string {
  const bloque = (titulo: string, items?: string[]) =>
    items && items.length ? `\n${titulo}:\n${items.map((x) => `- ${x}`).join("\n")}\n` : "";
  const F = "````"; // cerco externo de 4: el interior lleva bloques ```formula
  const n = Math.max(1, opts.imageCount ?? 1);
  const que =
    opts.kind === "tablero"
      ? "una foto del TABLERO de la clase (puede haber letra manuscrita, borrones, flechas y dibujos a mano)"
      : opts.kind === "diapositiva"
        ? "una DIAPOSITIVA de la clase (o una foto de la pantalla del salón)"
        : "una diapositiva o una foto del tablero de la clase (puede haber letra manuscrita, flechas y dibujos)";

  return [
    `Eres un profesor experto en ${opts.subjectName} (pregrado de Química Farmacéutica, Universidad Nacional de Colombia). ` +
      (n > 1
        ? `Te adjunto ${n} IMÁGENES, en orden (Imagen 1, Imagen 2…); cada una es ${que}. `
        : `Te adjunto una IMAGEN: ${que}. `) +
      `Pertenece al módulo «${opts.moduleTitle}». Quiero que extraigas SOLO lo relevante que dice el contenido y lo expliques apoyándote en el contexto del módulo.`,
    opts.moduleDescription ? `\nDe qué trata el módulo: ${stripMarkup(opts.moduleDescription)}` : "",
    bloque("Términos del glosario del módulo (respeta esta terminología)", opts.glossary),
    bloque("Fórmulas del módulo (nómbralas cuando aparezcan)", opts.formulas),
    opts.note?.trim() ? `\nNOTA MÍA SOBRE LA IMAGEN: ${opts.note.trim()}` : "",
    "",
    "PRIMERO, REVISA LA IMAGEN (antes de escribir nada)",
    "- Mírala completa y con atención, por zonas (arriba, centro, abajo; izquierda y derecha), y NO respondas desde lo que esperas ver: solo desde lo que de verdad está en la imagen.",
    "- Ubica el ÁREA DE CONTENIDO: " +
      (opts.kind === "tablero"
        ? "el tablero y lo que el profesor escribió o dibujó en él."
        : opts.kind === "diapositiva"
          ? "el cuerpo de la diapositiva (títulos, texto, esquemas, tablas y fórmulas)."
          : "el tablero o el cuerpo de la diapositiva, según sea."),
    "- IGNORA por completo todo lo que esté FUERA de esa área: paredes, marcos, bordes del tablero o de la pantalla, mesas, sillas, personas o sombras, reflejos, carteles, etiquetas y rótulos del salón, otros tableros o pantallas laterales, cables, la marca del proyector, la interfaz del celular o del reproductor (hora, batería, barra de progreso, botones, notificaciones) y marcas de agua.",
    "- Dentro del área, ignora también lo que no aporta al contenido: logos, número de diapositiva, fecha, encabezados y pies de página de la plantilla, nombre de la universidad o del profesor en la plantilla, «gracias», adornos, restos de borrado ilegibles y garabatos sin relación con el tema.",
    "- RELEVANTE = lo que el profesor quiso comunicar sobre el tema: definiciones, esquemas, ecuaciones, datos, listas, ejemplos, nombres de fármacos, indicaciones de tarea o de evaluación, y cualquier cosa que se conecte con este módulo.",
    "- Si en la foto aparece más de una diapositiva o tablero, trabaja solo con el principal (el más nítido, centrado y grande), salvo que mi nota indique otro.",
    "- Si dudas de si algo es relevante y podría serlo (p. ej. una anotación al margen que parece de la clase), inclúyelo marcado «[¿relevante?]». Si es claramente ruido, omítelo SIN mencionarlo y sin describir el entorno (salón, personas, mobiliario).",
    "",
    "QUÉ DEBES ENTREGAR (cuatro bloques, en este orden, y nada antes ni después)",
    "#### 1. Transcripción del contenido relevante",
    "- Copia el texto del área de contenido que sea relevante, tal como está, en orden de lectura (de arriba abajo y de izquierda a derecha), sin resumir, sin corregir y sin completar con lo que «debería» decir.",
    "- Conserva títulos, listas, tablas (con | pipes |), fórmulas, valores, unidades, nombres de fármacos y referencias citadas que formen parte del contenido.",
    "- Esquemas, dibujos, flechas y gráficas del contenido: descríbelos entre corchetes con lo que se ve, p. ej. [Esquema: curva de concentración (eje y) contra tiempo (eje x), con un pico a las 2 h].",
    "- Si no puedes leer algo relevante (letra manuscrita, brillo, texto cortado), escribe [?] en ese lugar. NO adivines.",
    n > 1 ? "- Separa cada imagen con «**Imagen N**» en una línea propia y al final integra todo en un solo hilo coherente." : null,
    "#### 2. Qué significa, paso a paso",
    "- Explica cada idea de la imagen en lenguaje sencillo, sin suponer conocimientos previos; define cada término técnico la primera vez que aparece y usa una analogía cuando ayude.",
    "- Si hay cálculos o ecuaciones: rehazlos completos — qué se calcula y por qué, la fórmula, los datos CON SUS UNIDADES, el factor de conversión (qué unidades se cancelan), el resultado y una conclusión.",
    "- Distingue claramente lo que dice la imagen de lo que añades tú: lo tuyo va precedido de «(aclaración)».",
    "#### 3. Relación con el módulo",
    "- ¿A qué parte del módulo corresponde esta imagen? ¿Qué términos del glosario y qué fórmulas de las listadas arriba aparecen o se usan?",
    "- Si la imagen NO parece pertenecer a este módulo, dilo con claridad y sugiere a qué tema sí.",
    "#### 4. Control de calidad",
    "- Posibles errores en el contenido (unidades, signos, cifras que no cuadran, datos contradictorios) — sin corregirlos en la transcripción: aquí. Solo si de verdad los hay; no rellenes.",
    "- Lo que debo confirmar con el profesor (solo si es algo concreto).",
    "- 3 preguntas de repaso sobre el contenido relevante, cada una con su respuesta breve.",
    "",
    "REGLAS",
    "- Entrega SOLO lo relevante: nada de etiquetas, rótulos ni textos que estén fuera del tablero o de la diapositiva, y nada de descripciones del entorno.",
    "- Responde en español y usa coma decimal (1,19 g/mL).",
    "- Básate solo en la imagen, en el contexto del módulo y en conocimiento técnico verificable. Si falta un dato, dilo y pregúntamelo; no inventes.",
    "",
    "FORMATO DE SALIDA (obligatorio — mi app solo entiende este Markdown)",
    `Entrega TODO dentro de UN solo bloque de código cercado con CUATRO acentos graves (${F}markdown … ${F}) para que pueda copiarlo sin que se pierda el formato. Fuera del bloque no escribas nada.`,
    "- Encabezados: «#### Título» (siempre cuatro #); para separar imágenes una línea «**Imagen N**».",
    "- **negrita** y *cursiva*. NO uses «*» como signo de multiplicación (se confunde con cursiva): usa «×» o «·».",
    "- Listas: una viñeta por línea con «* » o numeradas «1. ». Sin listas anidadas.",
    "- Tablas con | pipes |, una fila por línea, sin saltos de línea dentro de una celda y sin el símbolo | dentro del texto de una celda.",
    "- Subíndices y superíndices dentro de una frase: usa caracteres Unicode (H₂O, Ca²⁺, mol⁻¹, 10⁻³). NO escribas _{2} ni ^{2} en el texto corrido: solo funcionan dentro de un bloque ```formula.",
    "- Ecuaciones y fracciones: usa un bloque ```formula (una línea por renglón) con _{sub}, ^{sup} y #{numerador|denominador}. Ejemplo:",
    "  ```formula",
    "  C_{1} · V_{1} = C_{2} · V_{2}",
    "  n = #{m|PM}",
    "  ```",
    "- Está PROHIBIDO: LaTeX ($…$, \\frac, \\text), HTML, imágenes y enlaces.",
    "",
  ]
    .filter((l): l is string => l !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

/** Markup de fórmulas de la app (#{a|b}, _{x}, ^{x}) → texto plano que cualquier IA lee bien. */
function plainFormula(s: string): string {
  return s
    .replace(/_\{([^{}]+)\}/g, "_$1")
    .replace(/\^\{([^{}]+)\}/g, "^($1)")
    .replace(/#\{([^|{}]+)\|([^{}]+)\}/g, "($1)/($2)");
}

/** Recorta un texto largo dejando constancia, para que el prompt no se salga de la ventana de la IA. */
function clip(s: string, max: number): string {
  const t = s.trim();
  return t.length <= max ? t : `${t.slice(0, max).trimEnd()}\n[…recortado por longitud: ${t.length - max} caracteres más en la app…]`;
}

export type ResearchUse = "podcast" | "tarjetas" | "guia" | "quiz";

/** Un apunte de clase tal como lo guarda la app. */
export interface ResearchSession {
  label: string;
  topic: string;
  /** Apuntes (Cornell). */
  content: string;
  slidesText?: string | null;
  transcript?: string | null;
}

/**
 * «Prompt de investigación» de un módulo: junta TODO lo que la app sabe del módulo
 * (descripción, desarrollo, glosario, fórmulas, ejercicios, apuntes de clase) y le
 * pide a la IA que investigue los términos y escriba un texto científico amplio que
 * sirva de base única para generar después un podcast, tarjetas de estudio, una guía
 * y/o un quiz. La persona lo pega en su IA (idealmente una con búsqueda web).
 */
export function moduleResearchPrompt(opts: {
  subjectName: string;
  subjectSummary?: string | null;
  subjectObjective?: string | null;
  /** Títulos de todos los módulos del curso, en orden. */
  courseModules: string[];
  moduleTitle: string;
  moduleDescription?: string | null;
  chapter?: string | null;
  glossary: { term: string; definition: string }[];
  formulas: { name: string; expression: string; variables?: string; description?: string }[];
  exercises?: string[];
  sessions: ResearchSession[];
  includeChapter?: boolean;
  includeExercises?: boolean;
  includeTranscripts?: boolean;
  uses: ResearchUse[];
  /** Qué quiere la persona que se enfatice (opcional). */
  focus?: string;
}): string {
  const F = "````"; // cerco externo de 4: el interior lleva bloques ```formula
  const sec = (titulo: string, cuerpo: string) => `\n══════════ ${titulo} ══════════\n${cuerpo.trim()}\n`;
  const uses = opts.uses.length ? opts.uses : (["podcast", "tarjetas", "guia", "quiz"] as ResearchUse[]);
  const usos: Record<ResearchUse, string> = {
    podcast: "un PODCAST (guion de conversación o monólogo explicativo)",
    tarjetas: "TARJETAS DE ESTUDIO (pregunta → respuesta)",
    guia: "una GUÍA DE ESTUDIO / mapa conceptual",
    quiz: "un QUIZ de práctica",
  };

  const temario = opts.courseModules
    .map((t, i) => `${t === opts.moduleTitle ? "► " : "  "}${i + 1}. ${t}`)
    .join("\n");

  const glosario = opts.glossary.length
    ? opts.glossary.map((g) => `- ${g.term}: ${stripMarkup(g.definition)}`).join("\n")
    : "(el módulo aún no tiene glosario cargado)";

  const formulas = opts.formulas.length
    ? opts.formulas
        .map(
          (f) =>
            `- ${f.name}: ${plainFormula(f.expression).replace(/\n/g, " ; ")}` +
            (f.variables ? `\n    Variables: ${stripMarkup(plainFormula(f.variables))}` : "") +
            (f.description ? `\n    Qué es: ${stripMarkup(f.description)}` : ""),
        )
        .join("\n")
    : "(sin fórmulas cargadas)";

  const apuntes = opts.sessions.length
    ? opts.sessions
        .map((s) => {
          const partes = [`### ${s.label}${s.topic ? ` — ${s.topic}` : ""}`];
          if (s.content.trim()) partes.push(`APUNTES:\n${clip(stripMarkdownExtras(s.content), 12000)}`);
          if (s.slidesText?.trim()) partes.push(`DIAPOSITIVAS / NOTAS DE CLASE:\n${clip(stripMarkdownExtras(s.slidesText), 12000)}`);
          if (opts.includeTranscripts && s.transcript?.trim())
            partes.push(`TRANSCRIPCIÓN DE LA CLASE:\n${clip(stripMarkdownExtras(s.transcript), 20000)}`);
          return partes.join("\n\n");
        })
        .join("\n\n")
    : "(aún no hay apuntes de clase de este módulo: apóyate en el desarrollo, el glosario y la literatura)";

  const bloquesUso: string[] = [];
  if (uses.includes("podcast"))
    bloquesUso.push(
      [
        "#### Material para podcast",
        "* **Gancho de apertura** (2–3 frases con una pregunta o un dato sorprendente y verificable).",
        "* **Estructura de un episodio de 15–20 minutos:** apertura, tres bloques con su idea central y su analogía hablada, y cierre con la idea que debe quedar.",
        "* **Una historia o caso real** del tema (con año y fuente) que se pueda contar en voz alta.",
        "* **Cómo decir los números y las ecuaciones en voz alta**, sin leer símbolos (ej.: «la concentración se reduce a la mitad cada vez que pasa una vida media»).",
        "* **5 frases memorables** y **5 preguntas retóricas** para engancharse al oyente.",
      ].join("\n"),
    );
  if (uses.includes("tarjetas"))
    bloquesUso.push(
      [
        "#### Material para tarjetas de estudio",
        "Entre 30 y 60 tarjetas ATÓMICAS (una sola idea por tarjeta) en una tabla Markdown `| Frente | Reverso | Tipo |`, mezclando tipos: definición, «¿por qué?», comparación, cálculo corto con unidades, completar la frase y «error común». Los frentes deben ser preguntas concretas, no títulos; los reversos, de 1–3 líneas. Sin repetir el mismo dato en dos tarjetas.",
      ].join("\n"),
    );
  if (uses.includes("guia"))
    bloquesUso.push(
      [
        "#### Material para guía de estudio",
        "* **Mapa conceptual** en viñetas jerárquicas (concepto → subconceptos → relaciones con verbos: «determina», «aumenta», «depende de»).",
        "* **Tabla comparativa** de los conceptos fáciles de confundir.",
        "* **Lista «debo saber hacer»** (verbos de acción: calcular, explicar, clasificar, interpretar) con un nivel de dificultad.",
        "* **Plan de repaso** en 3 pasadas (qué leer, qué practicar, qué autoevaluar).",
      ].join("\n"),
    );
  if (uses.includes("quiz"))
    bloquesUso.push(
      [
        "#### Material para quiz",
        "15 preguntas de práctica (mezcla de opción múltiple con 4 opciones, verdadero/falso con justificación y cálculo corto), cada una con su respuesta y una justificación de 1–3 líneas, ordenadas de fácil a difícil.",
      ].join("\n"),
    );

  return (
    `Eres un investigador y profesor universitario experto en ${opts.subjectName} (pregrado de Química Farmacéutica, Universidad Nacional de Colombia), ` +
    `con rigor científico y gran capacidad didáctica. Voy a darte TODO el material de UN módulo de mi curso. ` +
    `Tu tarea: INVESTIGAR los términos y conceptos del módulo y escribir un TEXTO CIENTÍFICO AMPLIO que sea mi base única para producir después ` +
    `${uses.map((u) => usos[u]).join(", ")}.\n` +
    sec(
      "LA ASIGNATURA",
      `${opts.subjectName}.` +
        (opts.subjectSummary ? `\nDe qué trata: ${stripMarkup(opts.subjectSummary)}` : "") +
        (opts.subjectObjective ? `\nObjetivo general: ${stripMarkup(opts.subjectObjective)}` : ""),
    ) +
    sec("DÓNDE ESTÁ ESTE MÓDULO EN EL TEMARIO (► = el de este texto)", temario) +
    sec(`EL MÓDULO — ${opts.moduleTitle}`, opts.moduleDescription ? stripMarkup(opts.moduleDescription) : "(sin descripción)") +
    (opts.includeChapter && opts.chapter?.trim()
      ? sec("DESARROLLO DEL MÓDULO (material de lectura de la app)", clip(stripMarkdownExtras(opts.chapter), 30000))
      : "") +
    sec("GLOSARIO DEL MÓDULO (respeta esta terminología)", glosario) +
    sec("FÓRMULAS DEL MÓDULO", formulas) +
    (opts.includeExercises && opts.exercises?.length
      ? sec("EJERCICIOS DEL MÓDULO (solo los enunciados: qué se espera que sepa resolver)", opts.exercises.map((q, i) => `${i + 1}. ${clip(stripMarkdownExtras(q), 1500)}`).join("\n"))
      : "") +
    sec("MIS APUNTES DE CLASE DE ESTE MÓDULO (lo que de verdad se vio y se enfatizó)", apuntes) +
    (opts.focus?.trim() ? sec("LO QUE QUIERO QUE ENFATICES", opts.focus.trim()) : "") +
    `\n══════════ QUÉ DEBES HACER ══════════\n` +
    `**A. Investiga.** Para cada término del glosario y para los conceptos importantes que aparezcan en mis apuntes aunque no estén en el glosario: definición precisa, fundamento (fisicoquímico, fisiológico o matemático), contexto histórico si ayuda, magnitudes típicas con unidades, ejemplos con fármacos o productos reales, y los errores o mitos frecuentes. ` +
    `Si tienes acceso a búsqueda web o a literatura, ÚSALA para verificar y enriquecer; si no, dilo en la primera línea y apóyate en conocimiento sólido.\n` +
    `**B. Escribe un texto científico amplio** (mínimo ~3000 palabras; más si el módulo lo exige) con esta estructura, en este orden:\n` +
    `#### 1. Panorama del módulo\n(qué pregunta responde, por qué importa para un químico farmacéutico, cómo se conecta con los módulos anterior y siguiente)\n` +
    `#### 2. Conceptos clave desarrollados\n(UNO por UNO: definición precisa → explicación paso a paso sin suponer bases previas → analogía → ejemplo con un fármaco real → error común)\n` +
    `#### 3. Mecanismos, ecuaciones y cálculos\n(cada ecuación derivada o justificada; qué significa cada símbolo con su unidad; al menos un ejemplo numérico resuelto por ecuación, mostrando el factor de conversión, qué unidades se cancelan y una conclusión)\n` +
    `#### 4. Casos, datos y normas reales\n(estudios, guías, normas o cifras reales, SIEMPRE con año y fuente)\n` +
    `#### 5. Lo que dicen mis apuntes frente a la literatura\n(coincidencias, vacíos, ideas que mis apuntes dejan incompletas y posibles errores, marcados con [CORRECCIÓN])\n` +
    `#### 6. Errores y confusiones frecuentes\n` +
    `#### 7. Resumen ejecutivo\n(10 líneas)\n` +
    `#### 8. Fuentes\n(lista verificable: autores, año, título, revista o editorial, y DOI o URL. SOLO incluye las que realmente conoces o encontraste; NO inventes referencias ni DOI. Marca con [verificar] lo que no puedas confirmar)\n` +
    (bloquesUso.length
      ? `**C. Termina con estas secciones de material de estudio** (todas derivadas del texto anterior, sin datos nuevos):\n${bloquesUso.join("\n")}\n`
      : "") +
    `\n══════════ REGLAS ══════════\n` +
    `- Rigor primero: no inventes cifras, fechas ni referencias. Si dudas de un dato, escribe [verificar].\n` +
    `- Distingue lo que viene de mis apuntes («según tus apuntes») de lo que añade la investigación («la literatura indica»).\n` +
    `- No supongas conocimientos previos: define cada término técnico la primera vez, usa analogías y explica los cálculos con unidades.\n` +
    `- Si algo de mis apuntes parece incorrecto o contradice la literatura, dilo con respeto y justifica.\n` +
    `- Escribe en español, con coma decimal (1,19 g/mL) y unidades en todos los números.\n` +
    `- Si tu respuesta no cabe en un solo mensaje, entrégala por partes: termina cada parte con «[CONTINÚA — escribe sigue]» y espera mi «sigue». No resumas para que quepa.\n\n` +
    `══════════ FORMATO DE SALIDA ══════════\n` +
    `Responde en Markdown legible por mi app: encabezados «#### Título» (siempre cuatro #), **negrita**, listas con «* » o «1. », tablas con | pipes | (una fila por línea), ` +
    `subíndices y superíndices en el texto corrido con caracteres Unicode (H₂O, mol⁻¹, 10⁻³), y las ecuaciones en bloques \`\`\`formula (una línea por renglón) con _{sub}, ^{sup} y #{numerador|denominador}. ` +
    `NO uses «*» como signo de multiplicación (usa «×» o «·»). Prohibido LaTeX ($…$, \\frac), HTML e imágenes. ` +
    `Entrega el texto completo dentro de UN bloque de código cercado con CUATRO acentos graves (${F}markdown … ${F}) para poder copiarlo sin que se pierda el formato.\n`
  );
}

/**
 * Prompt de contexto de un proyecto: lo que cualquier IA necesita saber para
 * ayudar sin tener que preguntar «¿en qué estás trabajando?». Incluye la
 * descripción completa, el avance del checklist, los enlaces y las últimas
 * notas de la bitácora. La persona lo pega en su asistente.
 */
export function projectContextPrompt(opts: {
  subjectName: string;
  subjectCode: string;
  professors: string[];
  projectTitle: string;
  category: string | null;
  status: string;
  description: string | null;
  checklist: { text: string; done: boolean; description?: string | null }[];
  team?: { name: string; role: string | null }[];
  links: { name: string; url: string }[];
  driveUrl: string | null;
  focusNote: string | null;
  notes: { author: string; createdAt: string; body: string; links?: { name: string; url: string }[] }[];
  today: string;
  ask?: string;
}): string {
  const done = opts.checklist.filter((c) => c.done).length;
  const checklist = opts.checklist.length
    ? opts.checklist
        .map((c) => `- [${c.done ? "x" : " "}] ${c.text}${c.description ? ` — ${c.description.replace(/\s*\n\s*/g, " ")}` : ""}`)
        .join("\n")
    : "(sin subtareas registradas)";
  const links = [
    ...(opts.driveUrl ? [{ name: "Documento principal (Drive)", url: opts.driveUrl }] : []),
    ...opts.links.map((l) => ({ name: l.name || "Enlace", url: l.url })),
  ];
  const linkLines = links.length ? links.map((l) => `- ${l.name}: ${l.url}`).join("\n") : "(sin enlaces anexados)";
  const notes = opts.notes.length
    ? opts.notes
        .map((n) => {
          const nl = n.links?.length ? ` [Enlaces: ${n.links.map((l) => `${l.name} ${l.url}`).join("; ")}]` : "";
          return `- ${n.createdAt} · ${n.author}: ${n.body.replace(/\s*\n\s*/g, " ")}${nl}`;
        })
        .join("\n")
    : "(sin notas todavía)";

  return [
    "Voy a pedirte ayuda con un proyecto de mi carrera. Lee primero todo el contexto y, antes de responder, dime en 2–3 líneas qué entendiste que estoy haciendo y qué falta, para confirmar que vamos alineados.",
    "",
    "──────── QUIÉN SOY ────────",
    "Estudiante de pregrado de Química Farmacéutica (Universidad Nacional de Colombia, Facultad de Ciencias). Escríbeme en español, claro, paso a paso y sin dar nada por sabido: si usas un concepto, defínelo; si haces un cálculo, muéstralo completo (datos, fórmula, unidades, conversión de factores y conclusión).",
    "",
    "──────── ASIGNATURA ────────",
    `${opts.subjectName} (${opts.subjectCode})`,
    opts.professors.length ? `Docentes: ${opts.professors.join(", ")}` : null,
    "",
    "──────── PROYECTO ────────",
    `Título: ${opts.projectTitle}`,
    opts.category ? `Categoría: ${opts.category}` : null,
    `Estado: ${opts.status}`,
    `Fecha de hoy: ${opts.today}`,
    "",
    "Descripción y avance (texto del proyecto, en Markdown):",
    opts.description?.trim() || "(el proyecto no tiene descripción)",
    "",
    `──────── SUBTAREAS (${done} de ${opts.checklist.length} hechas) ────────`,
    checklist,
    "",
    opts.team?.length
      ? ["──────── EQUIPO DEL PROYECTO ────────", ...opts.team.map((m) => `- ${m.name}${m.role ? ` (${m.role})` : ""}`), ""].join("\n")
      : null,
    "──────── DOCUMENTOS Y ENLACES ────────",
    linkLines,
    "(No puedes abrir los enlaces; si necesitas su contenido, te lo pego.)",
    "",
    opts.focusNote?.trim() ? `──────── DÓNDE ME QUEDÉ ────────\n${opts.focusNote.trim()}\n` : null,
    "──────── ÚLTIMAS NOTAS DE LA BITÁCORA (la más reciente primero) ────────",
    notes,
    "",
    "──────── REGLAS ────────",
    "- Básate solo en este contexto y en conocimiento verificable. Si falta un dato (concentraciones, normas, resultados), dímelo y pregúntamelo en vez de inventarlo.",
    "- No inventes referencias bibliográficas ni DOI; si propones fuentes, indícame qué debo verificar.",
    "- Si ves contradicciones o vacíos en lo que ya está escrito, señálalos.",
    "",
    "──────── LO QUE NECESITO AHORA ────────",
    opts.ask?.trim() || "[escribe aquí lo que quieres pedirle a la IA]",
    "",
  ]
    .filter((l): l is string => l !== null)
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
