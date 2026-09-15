/**
 * Registro de textos de ayuda contextual (ⓘ). Cada entrada explica, para quien
 * va a MODIFICAR esa parte: qué es, qué se edita ahí, y qué cuidar — sobre todo
 * qué toca y qué respeta `npm run db:seed` (que sincroniza el temario desde
 * `content/<code>.ts`) y qué campos son "de la persona".
 *
 * Convención heredada: la app NUNCA llama a una IA ni sube archivos; los botones
 * de "prompt" solo arman texto para copiar.
 */
export const HELP: Record<string, string> = {
  // ---- Panel de la asignatura ----
  "avance-real":
    "Dos medidas a propósito. «Por estado» = lo que marcaste a mano en cada módulo (No visto / En progreso / Dominado). «Real» = sale de datos: apuntes guardados, % de checklist, laboratorio. Si no coinciden, hay algo por poner al día. No se edita aquí; cambia solo al trabajar.",
  asistencia:
    "Contador de faltas de esta asignatura. Lo subes/bajas con − y +. El total de clases sale de `totalClasses` en `content/<code>.ts` (16 para clases semanales, 32 para dos por semana). El `db:seed` NO toca tu número de faltas.",
  "meta-semanal":
    "Una frase con lo que quieres lograr esta semana en esta materia. Texto libre, la escribes y editas tú. No sale del temario ni la toca el seed; es solo un recordatorio.",
  evaluacion:
    "Componentes de la nota y su peso. El nombre y el peso vienen de `evaluation[]` en `content/<code>.ts` (los pesos deben sumar 100); el `db:seed` los actualiza. Cesar y Diana ven y editan CADA UNO su propia nota — son seguimientos independientes del mismo curso. La NOTA (0 a 5) de cada componente la registras tú, a mano, o como el promedio de varios quices sueltos (botón «+ Quiz»: uno por uno, con su fecha; todos pesan igual). El seed nunca borra notas ni quices. Con las notas puestas calcula acumulada y proyección.",
  "proximas-fechas":
    "Las fechas de esta asignatura que ya tienen día puesto, ordenadas. Se ponen/editan en la pestaña «Fechas». Aquí solo se muestran.",

  // ---- Módulos ----
  "modulos-general":
    "Los temas del curso (uno por módulo). El título y la descripción vienen de `modules[]` en `content/<code>.ts` y el `db:seed` los reescribe. El ESTADO (No visto / En progreso / Dominado) lo marcas tú y el seed no lo toca. ⚠️ El `slug` de cada módulo debe ser estable: si lo cambias en el content, el seed crea un módulo nuevo en vez de actualizar el viejo.",
  "modulo-cabecera":
    "Estado del módulo (lo marcas tú; no se calcula) + enlace a su carpeta de Drive (lo pones tú; la app solo lo abre) + «Empieza por aquí», que el sistema decide solo: apunte sin revisar → subtarea pendiente → informe de lab → marcar dominado.",
  "modulo-descripcion":
    "Resumen del tema. Sale de `modules[].description` en `content/<code>.ts` y el `db:seed` lo reescribe en cada corrida: NO lo edites aquí, edítalo en el archivo del content.",
  apuntes:
    "Un apunte por clase, con tres campos independientes (cada uno guarda borrador local en cada tecla): «Apuntes» (Cornell, Markdown), «Transcripción» (texto del audio) y «Diapositivas / Notas de clase» (texto de las diapositivas o el PDF; suele llegar después). La «Etapa» (Crudos → Transcrita → Cornell IA → Revisada) sube sola al agregar transcripción/Cornell; «Revisada» la marcas tú y ya no baja. Los dos botones de prompt solo arman texto para tu IA: uno extrae el texto de las diapositivas, otro redacta los apuntes Cornell.",
  checklist:
    "Subtareas del módulo o del proyecto. Las agregas, marcas, editas, reordenas o borras libremente; el perfil de solo lectura también puede. El `db:seed` nunca las crea, desmarca ni borra: son 100% de la persona. La barra cuenta hechas / total y alimenta el «Sigue esto».",
  ejercicios:
    "Problemas resueltos del módulo, de uno en uno. El enunciado se ve siempre; la solución aparece al pulsar «Ver solución». Vienen de `modules[].exercises[]` en el content y el `db:seed` los sincroniza (empareja por el texto del enunciado); los que agregues dentro de la app se quedan. No guarda tu progreso por ejercicio.",
  recursos:
    "Enlaces externos del módulo (videos, artículos, guías). Los agregas y borras tú. La app solo los abre en una pestaña nueva: no descarga ni guarda nada.",
  laboratorio:
    "Protocolo de la práctica (de `modules[].labProtocol` en el content), lista de materiales (la haces tú) y estado del informe (Pendiente → Entregado → Calificado, lo pones tú). El seed reescribe el protocolo; lo demás es tuyo.",
  "lab-reports":
    "Informes de laboratorio de la asignatura. Los agregas tú a mano, uno por práctica. Cada uno lleva estado, nota, fecha de entrega, enlace a Drive, checklist de preparación y un desarrollo en Markdown. Nada de esto viene del content ni lo toca el seed.",
  "lab-reglas":
    "Reglas y contexto del laboratorio + una sección por cada práctica (fundamento, lo que hay que saber, procedimiento, ecuaciones, datos a registrar y un prompt para preguntarle a una IA). Es material de referencia: sale de `content/<code>.ts` (`labRules`, `labPractices`), NO se guarda en la base ni tiene avance. Para desarrollar una práctica y llevar su estado, crea un «Informe de laboratorio» más abajo.",

  // ---- Proyectos ----
  proyectos:
    "Entregables fijos de la asignatura (seminario, informe, producto final). Los de `projects[]` en `content/<code>.ts` los sincroniza el seed; los que crees con «Nuevo proyecto» son tuyos y el seed no los toca. Cada proyecto tiene estado, checklist y bitácora propios.",
  "proyecto-cabecera":
    "Estado del proyecto (lo pones tú) + enlace a Drive (solo se abre) + «Eliminar», que solo aparece en proyectos creados a mano y borra también su checklist y su bitácora.",
  bitacora:
    "Notas de avance del proyecto: qué se hizo, qué sigue, algún bloqueo. Puede escribir cualquier sesión con acceso (también el perfil de solo lectura). Cada nota guarda quién la escribió y su cargo, puede ligarse a una subtarea del checklist y mencionar a Cesar / Diana. Todo esto alimenta «Últimas actualizaciones» de la portada.",

  // ---- Otras secciones de la asignatura ----
  fechas:
    "Parciales y entregas de la asignatura. El nombre y el peso vienen de `keyDates[]` en el content; la FECHA la pones tú y el `db:seed` NO la toca nunca. Un parcial con fecha puesta enlaza a «Preparar».",
  glosario:
    "Términos y definiciones. Vienen de `glossary[]` en el content (emparejados por el término) y el seed los sincroniza; los que agregues en la app se quedan. Cada término puede ligarse a un módulo (`moduleSlug`), lo que lo mete en el prompt de quiz de ese módulo.",
  formulas:
    "Fórmulas de referencia con su desarrollo y ejemplos. Vienen de `formulas[]` en el content. En el campo de la fórmula usa el markup: `_{sub}`, `^{sup}`, `#{numerador|denominador}`, `\\n` para salto. Si la ligas a un módulo entra en los prompts de ese módulo.",
  bibliografia:
    "Referencias del curso, de `bibliography[]` en el content (tipo libro / revista). El campo de enlace es para tu propio PDF o carpeta de Drive; la app solo lo abre.",
  insumos:
    "Talleres y simulacros de semestres anteriores que subes tú. El campo «patrones» (qué repite y qué castiga el profe) es el que alimenta el prompt de análisis de patrones.",
  "prompt-ia":
    "Arma un texto con el temario de la asignatura para que lo pegues en tu asistente de IA. La app NO se conecta a ninguna IA, no envía nada y no guarda la respuesta: tú la copias y la usas donde quieras.",
  repaso:
    "Tarjetas con repetición espaciada (SM-2). Se generan del glosario y las fórmulas de la asignatura, o las creas a mano. Al repasar: «Otra vez» la vuelve a mostrar hoy; las demás la programan más adelante según qué tan fácil te resultó.",

  // ---- Portada ----
  ahora:
    "Lo más cercano en el tiempo de todas las asignaturas: parciales y entregas con fecha puesta. Máximo 3, para no abrumar. No se edita aquí; las fechas se ponen en cada asignatura → «Fechas».",
  tareas:
    "Encargos concretos que Cesar le asigna a Diana (extraer el texto de unas diapositivas, transcribir un audio con Buzz…). Cesar crea, edita y borra; Diana mueve el estado Pendiente → En curso → Hecha y pega el resultado donde corresponda (apuntes, transcripción). El panel se oculta si no hay tareas y no eres Cesar.",
  feed:
    "«Últimas actualizaciones»: notas de bitácora, subtareas completadas, proyectos nuevos y apuntes de clase trabajados, mezclados por fecha. Toda la fila enlaza a su proyecto o módulo; debajo, titilando, aparece lo que sigue. Es donde ves qué hizo la otra persona y qué falta.",
  "resume-banner":
    "«Seguías en…»: recuerda en qué estabas la última vez para no reconstruirlo. Se actualiza solo al navegar. «Descartar» lo borra.",
  racha:
    "Días seguidos con actividad. Es indulgente: fallar un día no la manda a 0 (queda «en riesgo»). Se puede ocultar en Ajustes.",

  // ---- Vistas globales ----
  calendario:
    "Todas las fechas de las asignaturas + las fechas de clase + tus eventos personales, en un solo mes. Los parciales enlazan a «Preparar». Tus eventos los agregas y borras aquí; las fechas de asignatura se editan en cada «Fechas».",
  inbox:
    "Bandeja de captura. Todo lo que anotas con + o Ctrl+Shift+K cae aquí sin decidir dónde va. Después lo clasificas a una asignatura, lo conviertes en subtarea de un módulo, o lo marcas como resuelto.",
};
