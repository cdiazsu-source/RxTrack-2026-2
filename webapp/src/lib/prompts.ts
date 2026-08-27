/**
 * Constructores de prompts de IA. Principio rector 4: la app NUNCA llama a una
 * API. Estas funciones puras arman un texto; la persona lo copia y lo pega en su
 * asistente, y pega la respuesta de vuelta para guardarla.
 */

export interface PromptModule {
  title: string;
  description: string;
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

/** Plantilla de apuntes método Cornell a partir de una transcripción + diapositivas. */
export function cornellPrompt(opts: {
  subjectName: string;
  moduleTitle: string;
  topic?: string;
  transcription?: string;
  slides?: string;
}): string {
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
    `--- MATERIAL DE LA CLASE ---\n\n` +
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
