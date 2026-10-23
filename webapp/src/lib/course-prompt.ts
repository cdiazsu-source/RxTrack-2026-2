import { COURSE_MODALITY_LABEL, COURSE_STATUS_LABEL, KEEP_TAG_LABEL, asKeepTag, type CourseModality, type CourseStatus } from "@/lib/courses";

/** Datos mínimos de un curso para armar el prompt (todo ya serializado). */
export interface CoursePromptData {
  title: string;
  provider: string | null;
  modality: string | null;
  status: string;
  goal: string | null;
  instructor: string | null;
  schedule: string | null;
  startDate: string | null;
  endDate: string | null;
  totalSessions: number | null;
  sessions: { number: number | null; date: string | null; topic: string; content: string; attended: boolean }[];
  tasks: { text: string; description: string | null; dueDate: string | null; done: boolean }[];
  keeps: { title: string; body: string; tag: string }[];
  links: { name: string; url: string }[];
}

const day = (iso: string | null) => (iso ? iso.slice(0, 10) : "sin fecha");
const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n)}… [recortado]` : s);

/**
 * Prompt de contexto de un curso personal: lo que la persona ya anotó, lo pendiente y lo guardado,
 * más lo que se le puede pedir a la IA. La app nunca llama a una IA: la persona lo copia y lo pega.
 */
export function courseContextPrompt(c: CoursePromptData, ask: string): string {
  const meta = [
    c.provider && `Institución/plataforma: ${c.provider}`,
    c.modality && `Modalidad: ${COURSE_MODALITY_LABEL[c.modality as CourseModality] ?? c.modality}`,
    `Estado: ${COURSE_STATUS_LABEL[c.status as CourseStatus] ?? c.status}`,
    c.instructor && `Docente: ${c.instructor}`,
    c.schedule && `Horario: ${c.schedule}`,
    (c.startDate || c.endDate) && `Fechas: ${day(c.startDate)} a ${day(c.endDate)}`,
    c.totalSessions && `Clases en total: ${c.totalSessions} (asistidas: ${c.sessions.filter((s) => s.attended).length})`,
  ]
    .filter(Boolean)
    .join("\n");

  const clases = c.sessions.length
    ? c.sessions
        .map(
          (s) =>
            `### Clase ${s.number ?? "?"} — ${s.topic} (${day(s.date)}${s.attended ? "" : ", no asistí"})\n${clip(s.content.trim() || "(sin apuntes)", 3500)}`,
        )
        .join("\n\n")
    : "(Todavía no hay apuntes de clase.)";

  const tareas = c.tasks.length
    ? c.tasks
        .map((t) => `- [${t.done ? "x" : " "}] ${t.text}${t.dueDate ? ` (entrega ${day(t.dueDate)})` : ""}${t.description ? ` — ${t.description}` : ""}`)
        .join("\n")
    : "(Sin tareas.)";

  const futuro = c.keeps.length
    ? c.keeps.map((k) => `- [${KEEP_TAG_LABEL[asKeepTag(k.tag)]}] ${k.title}: ${clip(k.body.replace(/\n+/g, " ⏎ "), 600)}`).join("\n")
    : "(Nada guardado todavía.)";

  const enlaces = c.links.length ? c.links.map((l) => `- ${l.name}: ${l.url}`).join("\n") : "(Sin enlaces.)";

  return (
    `Eres un tutor paciente y práctico. Estoy tomando un curso por fuera de mi carrera y quiero sacarle el máximo. ` +
    `Lee todo mi contexto y luego haz lo que te pido al final. No inventes contenido del curso que no esté en mis apuntes: ` +
    `si algo no lo sé o no está claro, dímelo y pregúntame. Explica sin dar nada por sabido y sin siglas sin definir.\n\n` +
    `══════════ MI CURSO: ${c.title} ══════════\n${meta}\n` +
    (c.goal ? `\nPara qué lo tomo: ${c.goal}\n` : "") +
    `\n══════════ MIS APUNTES POR CLASE ══════════\n${clases}\n` +
    `\n══════════ MIS TAREAS ══════════\n${tareas}\n` +
    `\n══════════ LO QUE GUARDÉ PARA EL FUTURO ══════════\n${futuro}\n` +
    `\n══════════ ENLACES DEL CURSO ══════════\n${enlaces}\n` +
    `\n══════════ LO QUE TE PIDO ══════════\n${ask.trim() || "Hazme un resumen de lo que llevo, dime qué me falta repasar y propón qué estudiar primero."}`
  );
}
