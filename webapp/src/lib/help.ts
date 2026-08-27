/**
 * Registro de textos de ayuda contextual (ⓘ). Convención de "honestidad radical"
 * heredada del borrador: cada entrada dice explícitamente lo que la app NO hace
 * (sin llamadas a IA ocultas, sin sync automática, sin subir archivos).
 */
export const HELP: Record<string, string> = {
  "modulos-general":
    "Los temas del curso. El estado (No visto / En progreso / Dominado) lo marcas tú a mano: no se calcula solo. El anillo de progreso sí combina estado + checklist + si hay apuntes + laboratorio.",
  apuntes:
    "Tus apuntes de cada clase, en formato Cornell. El texto se guarda tal cual; se renderiza de forma segura (**negrita**, tablas con | pipes |, viñetas, casillas). La app no llama a ninguna IA: el botón de 'prompt' solo arma un texto para que TÚ lo pegues en tu asistente.",
  checklist:
    "Subtareas del módulo o del proyecto. Las marcas, editas, borras o agregas libremente. Un `db:seed` nunca las desmarca ni las borra. La barra cuenta hechas / total.",
  recursos: "Enlaces externos (videos, artículos, guías). La app solo los abre en una pestaña nueva; no descarga ni guarda nada.",
  laboratorio:
    "Protocolo de la práctica, lista de materiales y estado del informe (Pendiente → Entregado → Calificado). El estado lo pones tú.",
  fechas:
    "Parciales y entregas de la asignatura. El nombre y el peso vienen del programa; la FECHA la pones tú y el `db:seed` no la toca nunca.",
  glosario: "Términos y definiciones. Puedes ligar cada uno a un módulo (cross-link opcional).",
  formulas:
    "Fórmulas de referencia con su desarrollo. Usa _{sub}, ^{sup} y #{numerador|denominador} en el campo de la fórmula. Si la ligas a un módulo, entra en el prompt de quiz de ese módulo.",
  bibliografia: "Referencias del curso. El campo de enlace es para tu propio PDF/Drive; la app solo abre el enlace.",
  insumos:
    "Talleres y simulacros de semestres anteriores. El campo 'patrones' (cómo evalúa el profe) es el que alimenta el prompt de análisis de patrones.",
  "prompt-ia":
    "Arma un texto con tu temario para que lo pegues en tu asistente de IA. La app NO se conecta a ninguna IA, no envía nada y no guarda la respuesta por ti: tú la copias y la pegas donde quieras.",
  "resume-banner":
    "Recuerda en qué estabas la última vez, para que no tengas que reconstruirlo. Se actualiza solo al navegar. 'Empezar otra cosa' lo descarta.",
  racha: "Días seguidos con actividad. Es indulgente: fallar un día no la manda a 0 (queda 'en riesgo'). Puedes ocultarla en Ajustes.",
  "avance-real":
    "Dos señales distintas a propósito: la de 'estado' es lo que marcaste a mano en cada módulo; la 'real' sale de datos (apuntes guardados, % de checklist). Si no coinciden, algo hay que revisar.",
};
