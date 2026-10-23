/**
 * Modo desarrollador: texto del prompt que Cesar le entrega a OTRA IA para conversar una idea de
 * cambio sobre una sección de la asignatura y que esa IA lo ayude a adaptarla al proyecto real.
 *
 * Es una comunicación IA → IA: la otra IA no ve el repositorio, así que el prompt le describe el
 * proyecto, la sección (rutas, archivos, datos, permisos, límites) y le pide una respuesta con un
 * formato que luego se le pueda pasar tal cual a la IA que sí trabaja dentro del repo.
 *
 * Mantenimiento: este archivo describe el código a mano. Si cambias una sección (archivos, modelos,
 * permisos, comportamiento), actualiza su ficha aquí. Solo servidor (lo importa la acción dev-prompt).
 * Regla de producto: el texto se muestra en la interfaz, así que nunca nombra ningún diagnóstico.
 */
import type { DevSectionKey } from "@/lib/dev-section";
import { DEV_IDEA_PLACEHOLDER, DEV_SECTION_LABEL } from "@/lib/dev-section";

type SectionInfo = {
  /** Ruta de la sección. */
  route: string;
  /** Para qué existe, en una o dos frases. */
  purpose: string;
  /** Archivos reales (relativos al repositorio). */
  files: string[];
  /** Modelos y campos que toca. */
  data: string[];
  /** Cómo se comporta hoy. */
  behavior: string[];
  /** Quién puede hacer qué. */
  permissions: string[];
  /** Con qué otras secciones se conecta. */
  related: string[];
  /** Límites, rarezas o deuda conocida (honestos: sirven para opinar). */
  notes: string[];
  /** Preguntas de diseño que suelen aparecer al cambiar esta sección. */
  questions: string[];
};

// ---------------------------------------------------------------------------------------------
// Contexto común a todo el proyecto
// ---------------------------------------------------------------------------------------------

const PROJECT_CONTEXT = `## 1. Qué es el proyecto
RxTrack 2026-2s es una aplicación web personal de seguimiento académico de las asignaturas del semestre 2026-2 del pregrado de Química Farmacéutica (Universidad Nacional de Colombia). Por asignatura lleva: módulos del temario con apuntes de clase en formato Cornell, checklist, ejercicios, laboratorio, proyectos con bitácora, fechas de parciales, evaluación y notas, glosario, fórmulas, bibliografía, tarjetas de repaso con repetición espaciada, y "prompts" para que la persona los copie a un asistente de IA.
Lo usa principalmente su autor (Cesar, acceso total). Otras personas entran con cuentas propias y permisos distintos (ver sección 5). El idioma de la interfaz y del código de dominio es español (Colombia).

## 2. Stack y arquitectura (resumen)
- Next.js 14 (App Router) + TypeScript + Tailwind CSS. Componentes de UI propios en \`webapp/src/components/ui/\` (estilo shadcn). Íconos de lucide-react.
- Prisma 5 sobre PostgreSQL (Neon). Despliegue en Vercel (cada push a \`main\` despliega).
- SIN API REST: las páginas son Server Components (\`export const dynamic = "force-dynamic"\`) que leen con Prisma; toda mutación es una Server Action en \`webapp/src/lib/actions/*.ts\`; tras cada mutación se llama \`revalidateAll()\` (revalida todo el layout). Los componentes interactivos son Client Components ("use client") que reciben datos serializables por props y llaman a las acciones.
- Alias: \`@/\` = \`webapp/src/\`; \`@content/\` = \`content/\` (en la raíz del repo).
- Contenido del temario: la fuente de verdad vive en \`content/<codigo>.ts\` (tipos en \`content/_schema.ts\`), editada por personas. Un seed idempotente (\`webapp/prisma/seed.ts\`, \`npx tsx prisma/seed.ts\` desde \`webapp/\`) lo sincroniza con la BD: actualiza el contenido, agrega lo que falte y NUNCA pisa el avance (estado de módulo, checklist marcado, sesiones/apuntes, fechas puestas a mano, notas, notas de evaluación). Las filas creadas desde la app llevan \`fromContent=false\` (o \`isManual=true\`) y el seed las ignora. El seed empareja por clave natural (glosario por término, bibliografía por texto de referencia, módulos por slug, evaluación por nombre+dueño) y poda lo \`fromContent\` que ya no está en el archivo: renombrar una clave natural equivale a borrar y crear.
- Migraciones: SQL escrito a mano en \`webapp/prisma/migrations/<fecha>_<nombre>/migration.sql\` + actualización de \`webapp/prisma/schema.prisma\` + \`node scripts/apply-sql.mjs <carpeta>\` + \`npx prisma generate\`. IMPORTANTE: la base que usa el desarrollo es la misma de producción, así que un cambio de esquema se aplica en vivo; por eso solo se admiten cambios ADITIVOS (columnas nuevas con valor por defecto, tablas nuevas). Nada de borrar o renombrar columnas con datos sin un plan de migración explícito.
- Render seguro de texto rico: \`lib/markdown-lite.ts\` (apuntes Cornell: encabezados \`####\`, tablas con barras, listas \`*\`, citas \`>\`, **negrita**) y \`lib/formula-markup.ts\` (fórmulas: \`_{sub}\`, \`^{sup}\`, \`#{numerador|denominador}\`, \`\\n\`). Escapan todo y luego reconvierten una lista permitida.
- Prompts de IA: \`webapp/src/lib/prompts.ts\` arma textos; la persona los copia a su asistente. La aplicación NUNCA llama a ninguna API de IA ni envía datos fuera.
- Progreso: un solo sitio define "cuánto llevas" (\`lib/progress.ts\`: peso del módulo = 0.4 checklist + 0.3 estado + 0.2 tener ≥1 apunte + 0.1 laboratorio), dibujado con \`components/progress-ring.tsx\` y \`components/ui/progress.tsx\`.
- Identidad visual: paleta de la Facultad de Ciencias UNAL (magenta \`#A8009C\` primario, ciruela, verde de éxito), fondos planos sin degradados, tokens HSL en \`globals.css\` consumidos como \`hsl(var(--token))\` (sin hex sueltos en componentes), fuentes Ancizar Sans/Serif. Menú lateral fijo en pantallas grandes (\`components/site-nav.tsx\`) y barra superior en móvil. Las páginas largas usan un riel de secciones (\`components/section-rail.tsx\`).
- Ayudas: los iconos "ⓘ" (\`components/help-hint.tsx\`, textos en \`lib/help.ts\`) explican cada bloque y siempre aclaran qué NO hace la app.

## 3. Principios rectores (no romper sin una razón explícita)
1. Diseño de baja carga cognitiva para uso intensivo y atención difícil de sostener. Prueba: si una pantalla obliga a recordar algo, a elegir entre muchas cosas o a empezar de cero, está mal diseñada. De aquí salen: "Continuar donde ibas", borradores guardados en el navegador, un panel "Ahora" con máximo 3 ítems, fechas en relativo ("en 3 días"), racha indulgente, captura rápida, nada punitivo, UNA acción siguiente clara por pantalla, el Modo Enfoque por proyecto. La interfaz NUNCA nombra ningún diagnóstico: solo habla de "Modo Enfoque", "pasos", "bloques".
2. Progreso siempre visible: todo lo que tenga un "cuánto llevas" muestra una barra o un anillo con el número crudo al lado.
3. El temario es fuente de verdad editada por personas y vive en \`content/\`; la app guarda solo el avance.
4. La IA no se llama desde el backend; la app solo arma prompts.
5. Seguridad de texto: todo el contenido rico pasa por los renderizadores seguros.
6. Cambios de esquema solo aditivos (ver arriba). Antes de hacer commit y push se pide confirmación.

## 4. Mapa de datos (modelos de Prisma, resumen)
- Subject (id = slug, ej. "aif"; code; name; credits; professors[]; scheduleTheory/Lab; descriptionSummary; objectiveGeneral; objectivesSpecific[]; hasLab; totalClasses; sections[] = secciones visibles; attendanceMissed; weeklyGoal; driveUrl; order).
- Module (subjectId, slug, title, description, hasLab, status NO_VISTO|EN_PROGRESO|DOMINADO puesto A MANO, order, driveUrl, notesUrl, labProtocol, labReportStatus, chapter = desarrollo extenso en Markdown, fromContent) → Session[], ChecklistItem[], Resource[], LabMaterial[], Exercise[].
- Course (título, provider, modality, status, goal, instructor, schedule, location, startDate, endDate, totalSessions) con CourseSession (clase + apuntes + attended), CourseTask (dueDate, done), CourseLink (courseId, sessionId opcional, kind) y CourseKeep («para el futuro»: title, body, tag, pinned): cursos personales solo de Cesar en /cursos (canUseCourses).
- Session = apuntes de una clase (moduleId, number, date, topic, content Cornell en Markdown, transcript, slidesUrl, slidesText, author, status CRUDA→TRANSCRITA→CORNELL_IA→REVISADA) y SessionLink (sessionId, name, url, kind ONENOTE|IA|DIAPOSITIVAS|FOTOS|DRIVE|VIDEO|OTRO, order): enlaces con nombre propio por sesión.
- ChecklistItem (cuelga de UN módulo, proyecto o informe de laboratorio; text, description ≤600, done, order). Exercise (moduleId, question, solution en Markdown, order, fromContent). Resource (moduleId, name, url). LabMaterial (moduleId, text, done).
- LabReport (subjectId, number, title, status PENDIENTE|ENTREGADO|CALIFICADO, grade, dueDate, driveUrl, content Markdown) y LabModuleLink (enlace por agrupación de laboratorio). LabPracticeNote (subjectId, practiceKey "<agrupación>|<número>", kind OBSERVACION|DATO|INCIDENTE|PENDIENTE, body, author): bitácora por práctica (las prácticas viven en el content, por eso la clave).
- Project (subjectId, title, category, status POR_INICIAR|EN_CURSO|COMPLETADO, driveUrl, order, isManual, focusNote, focusMinutes, description Markdown) → ProjectLink[], ProjectMember[] (solo control de equipo, sin usuario), ProjectNote[] (bitácora: body, author, authorRole, checklistItemId?, mentions[], links Json), ChecklistItem[].
- GlossaryTerm (subjectId, moduleId?, term, definition, fromContent). Formula (subjectId, moduleId?, name, expression, variables, description, derivation, examples[], order, fromContent). BibliographyItem (subjectId, moduleId?, kind libro|revista, reference, url, fromContent). PastMaterial = "insumos" (subjectId, moduleId?, kind taller|simulacro, title, semester, url, patterns).
- KeyDate (subjectId, name, date?, weight, note, moduleIds[], fromContent). EvaluationItem (subjectId, name, weight, grade?, gradeNote, order, owner "Cesar"|"Diana" → una fila por componente y por persona) → QuizGrade[] (grade, date, description; si existen, la nota del componente es su promedio).
- Flashcard (subjectId, moduleId?, front, back, source GLOSARIO|FORMULA|MANUAL, sourceId, suspended, estado SM-2: dueDate, intervalDays, easeFactor, reps, lapses, lastReviewedAt).
- Globales: SemesterMeta (fila única: racha, "continuar donde ibas", ajustes de enfoque), InboxItem (bandeja de captura rápida), AssignedTask (tareas que Cesar asigna), PersonalEvent (calendario), AccountActivity (último ingreso de cuentas invitadas).
- Las referencias a módulo desde glosario/fórmulas/bibliografía/insumos/tarjetas son "blandas" (moduleId opcional, sin obligación).

## 5. Acceso y permisos
- Sin tabla de usuarios: las cuentas viven en \`webapp/src/lib/auth.ts\` y la sesión es una cookie firmada con { nombre, nivel, alcance }. \`webapp/src/middleware.ts\` protege todo el sitio y aplica el alcance (una cuenta acotada que pida otra ruta es redirigida).
- Niveles: "full" (edita todo: Cesar; también las cuentas acotadas de laboratorio) y "read" (ve todo lo que su alcance permita, pero solo puede escribir en las áreas colaborativas).
- Dos compuertas en las Server Actions: \`blockedForRead()\` = solo nivel "full" puede escribir; \`blockedForContribute()\` = basta cualquier sesión válida (áreas colaborativas: checklist, sesiones/apuntes, enlaces de Drive, bitácora y equipo de proyecto, la propia nota de evaluación, enlaces de laboratorio). En el cliente: \`useCanEdit()\` y \`useCanContribute()\` (\`components/access-context.tsx\`).
- Cuentas acotadas por asignatura o por sección (laboratorio de AIF, una asignatura completa, o dos asignaturas) y una cuenta docente de solo lectura con portada reducida. Cesar puede "ver como" cualquiera de ellas (cookie aparte) y entonces actúa con sus permisos.
- No hay autorización por recurso dentro de las acciones: el alcance lo hace el middleware.`;

// ---------------------------------------------------------------------------------------------
// Fichas por sección
// ---------------------------------------------------------------------------------------------

const SECTIONS: Record<DevSectionKey, SectionInfo> = {
  panel: {
    route: "/{asignatura}",
    purpose:
      "Pantalla de entrada de una asignatura: resumen de la materia, avance real vs. avance marcado, meta de la semana, asistencia, evaluación y notas, resumen de módulos y próximas fechas.",
    files: [
      "webapp/src/app/[subject]/page.tsx (la página)",
      "webapp/src/app/[subject]/layout.tsx (cabecera de la asignatura + sub-navegación; la comparten TODAS las secciones)",
      "webapp/src/components/subject-subnav.tsx (pestañas; lista en webapp/src/lib/subject-sections.ts)",
      "webapp/src/components/evaluation-panel.tsx, attendance-panel.tsx, weekly-goal.tsx, progress-ring.tsx, ui/progress.tsx, section-rail.tsx",
      "webapp/src/lib/queries.ts (getModulesWithProgress), lib/progress.ts, lib/relative-time.ts",
      "webapp/src/lib/actions/evaluation.ts, lib/actions/semester.ts (setAttendanceMissed, setWeeklyGoal)",
    ],
    data: [
      "Subject: descriptionSummary, objectiveGeneral, credits, scheduleTheory/Lab, professors[], weeklyGoal, attendanceMissed, totalClasses.",
      "Module (+ conteo de Session y ChecklistItem hechos/total) vía getModulesWithProgress.",
      "EvaluationItem filtrado por owner = nombre de la persona con sesión (+ QuizGrade). KeyDate con fecha puesta (las 4 próximas).",
    ],
    behavior: [
      "Dos barras de avance: «por datos» = media de módulos con 0.5·checklist + 0.3·(tiene ≥1 apunte) + 0.2·(Dominado), y «por estado marcado a mano» (NO_VISTO 0 / EN_PROGRESO 0.5 / DOMINADO 1).",
      "Aviso naranja si hay módulos «Dominado» sin ningún apunte guardado, con enlaces a esos módulos.",
      "Meta semanal (texto) y asistencia (faltas vs. clases totales). Panel de evaluación con pesos, nota por componente, quizzes y proyección.",
      "Riel de secciones a la derecha (avance, evaluación, módulos y fechas). Los 5 primeros módulos con anillo de progreso y las 4 próximas fechas.",
    ],
    permissions: [
      "Meta semanal y asistencia: solo nivel «full». Estructura de la evaluación (agregar/borrar componente): solo «full».",
      "La nota de cada componente y los quizzes: cada persona edita únicamente la SUYA (filas con owner = su nombre); cualquier sesión válida.",
    ],
    related: ["Módulos (los anillos y el aviso enlazan al detalle)", "Fechas (próximas fechas)", "Evaluación y notas (viven aquí)"],
    notes: [
      "El cálculo «por datos» del panel usa pesos propios (0.5/0.3/0.2) distintos de MODULE_WEIGHTS en lib/progress.ts (0.4/0.3/0.2/0.1): hay dos definiciones de «avance» que conviene unificar si se toca el avance.",
      "Si la persona con sesión no tiene filas de evaluación (cuentas acotadas), el panel de evaluación no aparece.",
    ],
    questions: [
      "¿Qué decisión debe poder tomar la persona con un solo vistazo a esta pantalla?",
      "¿Cómo se relaciona lo nuevo con el avance (¿cuenta para el progreso? ¿con qué peso?).",
      "¿Es para todas las asignaturas o solo algunas (la lista de secciones se define por asignatura en content/<codigo>.ts → sections)?",
    ],
  },

  modulos: {
    route: "/{asignatura}/modulos",
    purpose: "Lista de los módulos (temas) del curso con su avance; cada tarjeta lleva al detalle del módulo.",
    files: [
      "webapp/src/app/[subject]/modulos/page.tsx",
      "webapp/src/lib/queries.ts (getModulesWithProgress), lib/progress.ts, lib/utils.ts (MODULE_STATUS_LABEL)",
      "webapp/src/components/progress-ring.tsx, help-hint.tsx",
      "webapp/src/lib/actions/modules.ts (setModuleStatus, setModuleDriveUrl, createModule, deleteModule — las dos últimas existen pero esta página no tiene formulario para crear módulos)",
    ],
    data: ["Module: slug, title, description, status, hasLab, labReportStatus, order, fromContent; conteos de sesiones y checklist."],
    behavior: [
      "Cuadrícula de tarjetas con anillo de progreso, estado, «hechos/total de checklist» y número de apuntes; descripción recortada a 3 líneas.",
      "Si no hay módulos, explica que se cargan en content/<codigo>.ts y se siembran con el seed.",
    ],
    permissions: ["Solo lectura en esta página. El estado del módulo (setModuleStatus) lo cambia únicamente nivel «full», desde el detalle."],
    related: ["Detalle del módulo", "Panel (resumen de módulos)", "Glosario/Fórmulas/Bibliografía/Insumos (se pueden ligar a un módulo)"],
    notes: [
      "El temario real se edita en content/<codigo>.ts; los módulos creados en la app (fromContent=false) no los toca el seed.",
      "Los módulos siguen el orden (order) del archivo de contenido.",
    ],
    questions: [
      "¿Qué debería verse en la tarjeta para decidir por cuál módulo seguir sin abrirlo?",
      "¿Agrupar por unidades/semanas o mantener la lista plana?",
    ],
  },

  "modulo-detalle": {
    route: "/{asignatura}/modulos/{moduleId}",
    purpose:
      "Centro de trabajo de un módulo: una sola «acción siguiente», apuntes de clase en formato Cornell, desarrollo del módulo, checklist, ejercicios resueltos, recursos y laboratorio, más dos prompts de IA (foto rápida e investigación).",
    files: [
      "webapp/src/app/[subject]/modulos/[moduleId]/page.tsx (página; calcula la «acción siguiente»)",
      "webapp/src/components/session-notes.tsx (apuntes: estados, transcripción, prompts Cornell/diapositivas)",
      "webapp/src/components/checklist.tsx, exercises-panel.tsx, resources-panel.tsx, lab-panel.tsx, module-status-select.tsx, drive-link-editor.tsx",
      "webapp/src/components/photo-quick-prompt.tsx, module-research-prompt.tsx, section-rail.tsx, resume-banner.tsx (ResumeTracker)",
      "webapp/src/lib/prompts.ts (cornellPrompt, slidesExtractPrompt, photoExtractPrompt, moduleResearchPrompt, exerciseSolutionPrompt)",
      "webapp/src/lib/markdown-lite.ts (renderCornell, inlineLite), lib/formula-markup.ts, lib/progress.ts (moduleProgress), lib/session-status.ts, lib/draft.ts",
      "webapp/src/lib/actions/sessions.ts, checklist.ts, exercises.ts, resources.ts, lab.ts, modules.ts",
    ],
    data: [
      "Module (+ chapter) con Session[] (estado CRUDA/TRANSCRITA/CORNELL_IA/REVISADA), ChecklistItem[], Resource[], LabMaterial[], Exercise[].",
      "GlossaryTerm y Formula ligados al módulo (alimentan los prompts); lista de títulos de los demás módulos para contexto.",
    ],
    behavior: [
      "Cabecera con anillo de progreso, selector de estado (a mano), enlace de Drive y el bloque «Empieza por aquí»: decide UNA acción (escribir apuntes → completar la sesión pendiente → marcar la siguiente subtarea → preparar el informe de laboratorio → marcar dominado).",
      "Secciones con riel lateral: foto rápida, investigación, descripción (plegada), desarrollo (capítulo extenso, plegado), apuntes, checklist, ejercicios (solución oculta hasta pedirla), recursos y laboratorio (si hasLab).",
      "El prompt de foto y el de investigación ensamblan descripción, desarrollo, glosario, fórmulas, ejercicios y apuntes del módulo para que la persona los pegue en su IA; la foto nunca se sube.",
      "El flujo de apuntes: transcripción → apuntes Cornell generados con IA → revisión; el estado sube solo y «REVISADA» se marca a mano.",
      "Registra «Continuar donde ibas» (ResumeTracker) con la ruta del módulo.",
    ],
    permissions: [
      "Cualquier sesión válida: checklist, apuntes/sesiones, enlace de Drive del módulo.",
      "Solo «full»: estado del módulo, ejercicios, recursos, materiales de laboratorio, crear/borrar módulos.",
    ],
    related: [
      "Glosario/Fórmulas (los ligados al módulo entran en los prompts)",
      "Fechas → Preparar parcial (usa apuntes, checklist, fórmulas y glosario de los módulos que entran)",
      "Panel y lista de módulos (avance)",
      "Laboratorio (informe del módulo)",
    ],
    notes: [
      "La página es larga y muy densa; el riel de secciones existe para compensarlo.",
      "El módulo se considera «Dominado» solo si la persona lo marca; el panel avisa si no hay apuntes.",
      "Los recortes por longitud de los prompts (apuntes, transcripciones) están definidos dentro de lib/prompts.ts.",
    ],
    questions: [
      "¿El cambio altera la «acción siguiente» (qué debe pasar a ser lo primero que se ve)?",
      "¿La información nueva es por módulo, por sesión o por asignatura (afecta el esquema)?",
      "¿Debe entrar al prompt de investigación y/o a las tarjetas de repaso?",
    ],
  },

  laboratorio: {
    route: "/{asignatura}/laboratorio (solo asignaturas con laboratorio)",
    purpose:
      "Reglas y prácticas de laboratorio de la asignatura (material de referencia que viene del archivo de contenido) más el seguimiento de los informes de laboratorio que la persona crea a mano.",
    files: [
      "webapp/src/app/[subject]/laboratorio/page.tsx",
      "webapp/src/components/lab-practices-panel.tsx (reglas, agrupaciones, prácticas y su prompt de contexto)",
      "webapp/src/components/lab-reports-panel.tsx (informes, estado, nota, preparación con checklist)",
      "webapp/src/components/lab-module-link-button.tsx",
      "webapp/src/lib/subject-content.ts (lee content/<codigo>.ts SIN pasar por la BD), lib/prompts.ts (labPracticePrompt)",
      "webapp/src/lib/actions/lab-reports.ts, lab-module-links.ts",
    ],
    data: [
      "Desde el archivo de contenido (no BD): labRules[], labModules[], labPractices[].",
      "BD (entradas de bitácora con paso, dato, porqué y significado): LabReport (number, title, status, grade, dueDate, driveUrl, content Markdown) con ChecklistItem[] (preparación), LabModuleLink (enlace por agrupación, único por asignatura+nombre), LabPracticeNote (bitácora de cada práctica, clave practiceKey).",
    ],
    behavior: [
      "Las prácticas y reglas son de solo lectura y salen de content/<codigo>.ts; cada práctica trae un prompt de contexto copiable y su propia «Bitácora de la práctica» (entradas con tipo Observación/Dato medido/Incidente/Pendiente, autor = quien inició sesión, fecha y hora; editable/borrable; escribe cualquier sesión salvo el profe, que solo lee) y un prompt copiable (labLogPrompt) que combina el contexto de la práctica con esa bitácora para que una IA diga en qué paso va la persona, qué sigue y explique el fundamento de cada paso.",
      "Los informes se crean, se les cambia el estado (PENDIENTE/ENTREGADO/CALIFICADO), nota y fecha, y cada uno tiene su checklist de preparación.",
      "Está oculta si la asignatura no la incluye en sections (isSectionVisible).",
    ],
    permissions: [
      "Crear/editar/borrar informes y su nota: solo «full». Enlace de Drive del informe y enlaces por agrupación: cualquier sesión (colaborativo).",
      "Hay una cuenta acotada exclusivamente a esta sección en AIF (el middleware la confina aquí).",
    ],
    related: ["Detalle del módulo (el panel de laboratorio del módulo y su estado de informe)", "Proyectos (entregables)", "Evaluación (quices/informes de laboratorio)"],
    notes: [
      "Mezcla dos fuentes de datos: archivo de contenido (prácticas) y BD (informes): un cambio que cruce ambas debe decidir de dónde sale la verdad.",
      "labReportStatus también existe a nivel de Module (estado del informe del módulo) y de LabReport (informes de la asignatura): conceptos parecidos en dos lugares.",
    ],
    questions: [
      "¿La información nueva vive en content/<codigo>.ts (editada por personas) o en la BD (creada en la app)?",
      "¿Quién debe poder editarla: solo Cesar o también quien tiene la cuenta de laboratorio?",
    ],
  },

  proyectos: {
    route: "/{asignatura}/proyectos",
    purpose: "Entregables, informes, parciales a preparar y producto final de la asignatura, cada uno con checklist, bitácora y estado; más la actividad reciente de la asignatura.",
    files: [
      "webapp/src/app/[subject]/proyectos/page.tsx",
      "webapp/src/components/project-card.tsx, new-project-form.tsx, updates-feed.tsx, project-status-select.tsx",
      "webapp/src/lib/feed.ts (buildFeed: mezcla notas de bitácora y subtareas completadas)",
      "webapp/src/lib/actions/projects.ts",
    ],
    data: ["Project: title, category, status, isManual, order + conteo de ChecklistItem hechos/total.", "Feed: ProjectNote y ChecklistItem con done=true (de proyectos y módulos)."],
    behavior: [
      "Tarjetas con categoría, estado, insignia «Propio» si lo creó la persona y barra de subtareas.",
      "Formulario para crear un proyecto nuevo; el feed «Actividad de la asignatura» muestra lo último (con la siguiente subtarea pendiente).",
    ],
    permissions: ["Crear/editar/cambiar estado/borrar proyecto: solo «full». Dentro del proyecto, checklist, bitácora, enlaces y equipo son colaborativos."],
    related: ["Detalle del proyecto", "Portada (feed cruzado entre asignaturas)", "Laboratorio / Fechas (entregables con fecha)"],
    notes: ["Los proyectos sembrados vienen de content/<codigo>.ts → projects[] (isManual=false); renombrar uno exige dejar el título viejo en formerTitles para no perder su checklist y bitácora."],
    questions: ["¿Un proyecto necesita fecha límite propia o debe colgar de una KeyDate?", "¿Cómo se refleja en el avance de la asignatura?"],
  },

  "proyecto-detalle": {
    route: "/{asignatura}/proyectos/{projectId}",
    purpose: "Trabajo de un proyecto: contexto, equipo, enlaces, Modo Enfoque, subtareas y bitácora, con un botón que copia todo el contexto para una IA.",
    files: [
      "webapp/src/app/[subject]/proyectos/[projectId]/page.tsx",
      "webapp/src/components/focus-mode.tsx (Modo Enfoque), checklist.tsx, notes-log.tsx, project-members.tsx, project-links.tsx, project-context-button.tsx, drive-link-editor.tsx, project-status-select.tsx, section-rail.tsx",
      "webapp/src/lib/prompts.ts (projectContextPrompt, focusSplitPrompt), lib/url.ts (parseNoteLinks)",
      "webapp/src/lib/actions/projects.ts, notes.ts, checklist.ts, members.ts, focus.ts",
    ],
    data: [
      "Project (description Markdown, focusNote, focusMinutes, driveUrl) → ChecklistItem[], ProjectNote[] (author, authorRole, mentions[], links Json, checklistItemId?), ProjectLink[], ProjectMember[].",
    ],
    behavior: [
      "Modo Enfoque: pantalla completa con un paso a la vez, bloques de 2/10/15/25/45 min, pausas, «se me complicó» (dividir en pasos, prompt de IA, dejar para después), estacionamiento de ideas hacia la bandeja y nota «para retomar». El temporizador vive en el navegador (localStorage); en BD solo focusNote y focusMinutes.",
      "La bitácora exige autor y solo acepta integrantes registrados del proyecto; permite @menciones y enlaces con nombre; una nota puede ligarse a una subtarea.",
      "«Copiar contexto para IA» arma el estado completo del proyecto (descripción, subtareas con avance, enlaces, dónde me quedé, últimas 10 notas) y deja añadir qué se le pide.",
    ],
    permissions: ["Cambiar estado/borrar proyecto: solo «full». Checklist, bitácora, enlaces, equipo y Modo Enfoque: cualquier sesión válida."],
    related: ["Lista de proyectos", "Bandeja (las ideas del Modo Enfoque)", "Portada (feed y «continuar donde ibas»)"],
    notes: ["El texto de la interfaz nunca debe describir el Modo Enfoque como una herramienta para un diagnóstico.", "El marcador «[escribe aquí lo que quieres pedirle a la IA]» del contexto está duplicado en projectContextPrompt y en project-context-button.tsx: si se cambia, cambiar ambos."],
    questions: ["¿Es un cambio del flujo de trabajo del proyecto o del Modo Enfoque (el temporizador es solo del cliente)?", "¿Hay que guardar algo nuevo en BD o basta estado del navegador?"],
  },

  fechas: {
    route: "/{asignatura}/fechas",
    purpose: "Parciales y entregas de la asignatura: el nombre y el peso vienen del programa; la fecha la pone la persona. Cada fecha lleva a «Preparar».",
    files: [
      "webapp/src/app/[subject]/fechas/page.tsx",
      "webapp/src/components/dates-section.tsx",
      "webapp/src/lib/relative-time.ts (relativeDays, urgencyOf), lib/utils.ts (formatDate)",
      "webapp/src/lib/actions/dates.ts (setKeyDate, addKeyDate, setKeyDateModules, deleteKeyDate)",
    ],
    data: ["KeyDate: name, date (nullable), weight, note, fromContent, moduleIds[] (módulos que cubre)."],
    behavior: [
      "Lista ordenada por fecha (las que no tienen fecha, al final por nombre); la fecha se muestra en relativo con color de urgencia; enlace «preparar →» a la página de preparación.",
      "Se pueden agregar fechas propias; las del programa (fromContent) conservan nombre y peso, y el seed nunca toca la fecha.",
    ],
    permissions: ["Poner/cambiar/borrar fechas y módulos cubiertos: solo «full»."],
    related: ["Preparar parcial", "Panel (próximas fechas)", "Calendario global (/calendario)", "Evaluación (los parciales suelen ser componentes de nota)"],
    notes: ["KeyDate (fecha) y EvaluationItem (nota) son entidades separadas sin vínculo explícito: un parcial en «Fechas» y su componente en «Evaluación» se relacionan solo por nombre y a ojo."],
    questions: ["¿Una fecha debe poder ligarse a un componente de evaluación?", "¿Recordatorios o avisos? (hoy la app no envía notificaciones)."],
  },

  "preparar-parcial": {
    route: "/{asignatura}/fechas/{keyDateId}/preparar",
    purpose: "Preparación de un parcial: reúne checklist, apuntes, fórmulas, glosario e insumos de los módulos que entran y arma un prompt para que una IA haga un quiz de práctica.",
    files: [
      "webapp/src/app/[subject]/fechas/[keyDateId]/preparar/page.tsx",
      "webapp/src/components/keydate-modules-editor.tsx (elegir qué módulos entran), prompt-box.tsx, ui/progress.tsx",
      "webapp/src/lib/prompts.ts (quizPrompt), lib/formula-markup.ts, lib/markdown-lite.ts",
      "webapp/src/lib/actions/dates.ts (setKeyDateModules)",
    ],
    data: ["KeyDate (moduleIds) + de esos módulos: ChecklistItem, Session (solo tema), Formula, GlossaryTerm, PastMaterial."],
    behavior: [
      "Con módulos marcados, filtra todo por esos módulos; con ninguno marcado, muestra todo el temario de la asignatura.",
      "Tarjetas: checklist en alcance (con barra), clases y apuntes, fórmulas renderizadas, glosario, insumos de semestres previos.",
      "El prompt de quiz recibe: temas de las sesiones, checklist, fórmulas (nombre+expresión) y términos del glosario. Enlaza a Repaso (tarjetas).",
    ],
    permissions: ["Solo lectura salvo elegir los módulos del parcial (eso es solo del nivel «full»)."],
    related: ["Insumos (se muestran aquí)", "Repaso (enlace «repasa las tarjetas»)", "Módulos, Glosario, Fórmulas"],
    notes: [
      "quizPrompt NO recibe los patrones de los insumos: lo que el profesor suele preguntar no llega al quiz.",
      "Los insumos se filtran por moduleId, pero el formulario de Insumos nunca lo envía: con módulos marcados, ningún insumo aparece.",
      "Tampoco hay relación con las tarjetas de repaso más allá de un enlace.",
    ],
    questions: [
      "¿El quiz debe usar los patrones de insumos y los errores reales de la persona?",
      "¿Se registra el resultado de la preparación (nota del quiz, tiempo) o sigue siendo solo un prompt?",
    ],
  },

  repaso: {
    route: "/{asignatura}/repaso (y /repaso como índice global)",
    purpose: "Repaso de tarjetas con repetición espaciada (variante de SM-2): tarjetas generadas del glosario y de las fórmulas, o creadas a mano.",
    files: [
      "webapp/src/app/[subject]/repaso/page.tsx (cola de la sesión), webapp/src/app/repaso/page.tsx (índice global)",
      "webapp/src/components/flashcard-review.tsx (sesión de repaso), flashcard-generate-button.tsx, module-filter.tsx",
      "webapp/src/lib/srs.ts (función pura de intervalos), lib/actions/flashcards.ts",
    ],
    data: ["Flashcard: front, back (Markdown), source, sourceId, suspended, dueDate, intervalDays, easeFactor, reps, lapses, lastReviewedAt, moduleId?."],
    behavior: [
      "Cola de la sesión = tarjetas vencidas (reps>0, dueDate≤ahora, hasta 60) + tarjetas nuevas (reps=0, hasta 15). Filtro opcional por módulos (?modulos=slug1,slug2).",
      "Calificación en 4 niveles (otra vez / difícil / bien / fácil): «otra vez» reprograma en ~10 min; el resto calcula intervalo y facilidad.",
      "«Generar» crea o actualiza tarjetas desde glosario y fórmulas de forma idempotente (por source+sourceId) y no borra las ya repasadas.",
    ],
    permissions: ["Responder tarjetas: cualquier sesión válida. Generar/crear/editar/suspender/borrar tarjetas: solo «full»."],
    related: ["Glosario y Fórmulas (origen de las tarjetas)", "Preparar parcial (enlace)", "Menú lateral «Repaso» (índice global)"],
    notes: [
      "El estado SM-2 es una sola fila por tarjeta, compartida por todas las personas (no hay estado de repaso por usuario).",
      "Los insumos y los apuntes de clase no generan tarjetas; solo glosario y fórmulas.",
    ],
    questions: [
      "¿De qué otras fuentes deberían salir tarjetas (apuntes Cornell, ejercicios, errores en quizzes)?",
      "¿Estado de repaso por persona o compartido?",
    ],
  },

  glosario: {
    route: "/{asignatura}/glosario",
    purpose: "Términos y definiciones de la asignatura, opcionalmente ligados a un módulo.",
    files: [
      "webapp/src/app/[subject]/glosario/page.tsx",
      "webapp/src/components/glossary-section.tsx",
      "webapp/src/lib/actions/glossary.ts, lib/markdown-lite.ts",
    ],
    data: ["GlossaryTerm: term, definition (Markdown corto), moduleId?, fromContent."],
    behavior: [
      "Lista en orden alfabético (lo ordena la consulta), con el módulo ligado visible y alta/edición/borrado. No tiene buscador ni filtro propio (solo la búsqueda global del menú).",
      "Los términos ligados a un módulo entran a los prompts de ese módulo y de preparar parcial; todos generan tarjetas de repaso.",
    ],
    permissions: ["Agregar/editar/borrar: solo «full». Lectura: todos."],
    related: ["Repaso (genera tarjetas)", "Detalle del módulo (prompts)", "Preparar parcial", "Fórmulas"],
    notes: ["El seed empareja por término: renombrar un término de content/<codigo>.ts lo borra y lo crea de nuevo (y pierde sus tarjetas ya repasadas)."],
    questions: ["¿Un término necesita ejemplos, sinónimos, imágenes o relación con otros términos?", "¿Debe poder agregarse desde los apuntes?"],
  },

  formulas: {
    route: "/{asignatura}/formulas (solo asignaturas que la incluyen)",
    purpose: "Fórmulas de referencia con su markup, variables, descripción, desarrollo y ejemplos resueltos.",
    files: [
      "webapp/src/app/[subject]/formulas/page.tsx",
      "webapp/src/components/formula-section.tsx",
      "webapp/src/lib/formula-markup.ts (renderFormula), lib/actions/formulas.ts",
    ],
    data: ["Formula: name, expression (markup propio), variables, description, derivation, examples[] (Markdown), order, moduleId?, fromContent."],
    behavior: [
      "Cada fórmula se dibuja con el markup (_{sub}, ^{sup}, #{num|den}, \\n) y muestra variables, descripción, desarrollo y «Ejemplos resueltos».",
      "Las ligadas a un módulo entran a los prompts; todas generan tarjetas de repaso.",
    ],
    permissions: ["Agregar/editar/borrar: solo «full». Lectura: todos."],
    related: ["Repaso", "Detalle del módulo y Preparar parcial (prompts)", "Glosario"],
    notes: ["El markup de fórmulas es propio y limitado: cualquier notación nueva exige ampliar formula-markup.ts y las reglas de formato que se le dan a la IA en los prompts."],
    questions: ["¿Hace falta una calculadora o un ejemplo numérico interactivo? (hoy es solo texto)", "¿Unidades y conversiones como dato estructurado?"],
  },

  bibliografia: {
    route: "/{asignatura}/bibliografia",
    purpose: "Referencias del curso (libros y revistas) con un enlace opcional al PDF o carpeta propia.",
    files: [
      "webapp/src/app/[subject]/bibliografia/page.tsx",
      "webapp/src/components/bibliography-section.tsx",
      "webapp/src/lib/actions/bibliography.ts",
    ],
    data: ["BibliographyItem: kind (libro|revista), reference (texto completo), url, moduleId?, fromContent."],
    behavior: ["Lista ordenada por tipo y fecha de creación; el enlace solo se abre (la app no guarda archivos)."],
    permissions: ["Agregar/editar/borrar y poner enlaces: solo «full». Lectura: todos."],
    related: ["Módulos (referencia ligada)", "Prompt de investigación del módulo (exige no inventar referencias)"],
    notes: ["El seed empareja por el TEXTO de la referencia: cambiarlo en content/<codigo>.ts borra y recrea el registro (y su enlace)."],
    questions: ["¿Estructurar la referencia (autor, año, editorial, DOI) en campos separados?", "¿Marcar qué capítulos corresponden a cada módulo?"],
  },

  insumos: {
    route: "/{asignatura}/insumos",
    purpose: "Talleres y simulacros de semestres anteriores que la persona sube, con un campo «patrones» (qué temas se repiten y qué errores castiga el profesor) que alimenta un prompt de análisis.",
    files: [
      "webapp/src/app/[subject]/insumos/page.tsx",
      "webapp/src/components/insumos-section.tsx (lista + formulario «Agregar insumo»)",
      "webapp/src/lib/actions/past-materials.ts (addPastMaterial, updatePastMaterial, deletePastMaterial)",
      "webapp/src/lib/prompts.ts (patternsPrompt), components/prompt-box.tsx",
      "webapp/src/app/[subject]/fechas/[keyDateId]/preparar/page.tsx (los muestra)",
    ],
    data: ["PastMaterial: kind (taller|simulacro), title, semester, url (Drive, opcional), patterns (texto libre), moduleId? (sin usar desde la UI), createdAt/updatedAt. No lo crea el seed."],
    behavior: [
      "Lista de tarjetas (más recientes primero) con tipo, título, semestre, patrones y enlace; formulario de alta con tipo, título, semestre, enlace y patrones.",
      "Debajo, un prompt ya armado (patternsPrompt) que junta título+semestre+patrones de todos los insumos y pide a una IA: temas y tipos de pregunta que se repiten, errores que castiga el profesor y un plan de estudio priorizado de dos semanas.",
      "En «Preparar parcial» aparecen como lista de títulos con su campo patrones.",
    ],
    permissions: ["Agregar/editar/borrar: solo «full». Lectura: todos. La sección puede ocultarse por asignatura (sections)."],
    related: ["Preparar parcial", "Repaso (hoy sin relación)", "Prompt IA / Módulos (podrían usar los patrones)"],
    notes: [
      "El formulario no pide módulo: todos los insumos quedan con moduleId = null, así que «Preparar parcial» los oculta cuando hay módulos marcados.",
      "updatePastMaterial existe pero la UI no tiene edición: para corregir un insumo hay que borrarlo y crearlo de nuevo.",
      "El archivo en sí no se guarda (solo un enlace) y los patrones son texto libre sin estructura (no se pueden filtrar ni contar).",
      "Los patrones no llegan al quiz de «Preparar parcial» ni a las tarjetas de repaso.",
    ],
    questions: [
      "¿Estructurar cada insumo por pregunta (tema, módulo, tipo, error cometido) en lugar de un campo de texto libre?",
      "¿Ligar insumos a módulos para usarlos en Preparar parcial, en el quiz y en las tarjetas?",
      "¿Subir el archivo o seguir con enlace a Drive?",
    ],
  },

  "prompt-ia": {
    route: "/{asignatura}/prompt-ia",
    purpose: "Arma un prompt con el temario de la asignatura para pegarlo en un asistente de IA, con un campo opcional de «qué quieres profundizar».",
    files: [
      "webapp/src/app/[subject]/prompt-ia/page.tsx",
      "webapp/src/components/prompt-box.tsx (ContextPromptBox, PromptBox)",
      "webapp/src/lib/prompts.ts (contextPrompt)",
    ],
    data: ["Module: title y description de la asignatura (nada más)."],
    behavior: ["El texto del prompt se recalcula en el navegador mientras se escribe el tema; botón «Copiar prompt». La app no llama a ninguna IA."],
    permissions: ["Lectura para cualquier sesión que vea la sección."],
    related: ["Prompt de investigación y prompt de foto (dentro de cada módulo)", "Todos los demás prompts (lib/prompts.ts)"],
    notes: ["Es el prompt más simple de la app (solo títulos y descripciones de módulos); los prompts por módulo, proyecto y ejercicio llevan mucho más contexto."],
    questions: ["¿Debe incluir glosario, fórmulas, apuntes o insumos?", "¿Prompts guardados/personalizados por asignatura?"],
  },

  cursos: {
    route: "/cursos",
    purpose:
      "Lista de los cursos personales de Cesar fuera de la carrera (hoy SAP y Power BI Avanzado; virtuales o presenciales): tarjetas con avance, el resumen «Lo que viene» con las tareas pendientes de todos los cursos y el alta de cursos nuevos. NO es una asignatura: no cuelga de /{asignatura} ni del seed.",
    files: [
      "webapp/src/app/cursos/page.tsx (la lista; calcula avance y «Lo que viene»)",
      "webapp/src/app/cursos/layout.tsx (solo aloja el panel del modo desarrollador)",
      "webapp/src/components/new-course.tsx, course-form.tsx (alta de curso)",
      "webapp/src/components/progress-ring.tsx, ui/badge.tsx, ui/card.tsx",
      "webapp/src/lib/courses.ts (constantes de modalidad/estado/etiquetas, canUseCourses, courseProgress)",
      "webapp/src/lib/actions/courses.ts (createCourse y el resto de acciones de cursos)",
      "webapp/src/components/site-nav.tsx (ítem «Cursos» del menú lateral y de la barra móvil, solo con canEdit)",
    ],
    data: [
      "Course: title, provider, modality (VIRTUAL|PRESENCIAL|HIBRIDO, opcional), status (POR_INICIAR|EN_CURSO|PAUSADO|COMPLETADO), goal, instructor, schedule, location, startDate, endDate, totalSessions, order.",
      "Para las tarjetas: conteo de CourseSession (y cuántas con attended) y CourseTask (done, dueDate). La última clase sale de CourseSession.date.",
      "Las modalidades y estados son strings validados en lib/courses.ts (no enums de Postgres), para poder añadir valores sin migración.",
    ],
    behavior: [
      "Avance de un curso (courseProgress): promedio de (clases asistidas ÷ totalSessions, solo si totalSessions está definido) y (tareas hechas ÷ tareas); COMPLETADO = 100 %; sin datos = 0.",
      "«Lo que viene»: hasta 6 tareas pendientes de los cursos no completados, ordenadas por fecha de entrega (las sin fecha al final); vencidas o de hoy en ámbar.",
      "Los cursos completados salen en una lista plegada aparte. Crear un curso redirige a su página de detalle.",
      "Los cursos son datos manuales: no vienen de content/*.ts ni los toca el seed.",
    ],
    permissions: [
      "Solo la sesión «full» sin alcance acotado (canUseCourses): Cesar. La página redirige a / a cualquier otra sesión y todas las acciones cortan en silencio.",
      "Diana, el profe y las cuentas acotadas no lo ven; «Ver como» otra cuenta tampoco (toma su nivel). El ítem del menú sale solo con canEdit y fuera del menú acotado.",
    ],
    related: [
      "Detalle de cada curso (/cursos/{id})",
      "Calendario y búsqueda global: HOY no incluyen los cursos (ni sus tareas o fechas)",
      "Portada «Semestre»: no muestra cursos",
      "Bandeja de captura: independiente",
    ],
    notes: [
      "Es la única sección fuera del esquema por asignatura: el panel del modo desarrollador la aloja en app/cursos/layout.tsx (no en [subject]/layout.tsx).",
      "Las fechas de entrega de las tareas de curso no aparecen en el calendario ni en los recordatorios de la portada.",
      "Un solo usuario (Cesar): no hay dueño por fila; si se compartiera con Diana habría que añadir owner a Course o permisos por curso.",
      "El avance mezcla clases y tareas con el mismo peso; un curso sin totalSessions ni tareas muestra 0 %.",
    ],
    questions: [
      "¿Los cursos deben aparecer en el calendario y en la búsqueda global?",
      "¿Se comparten con otra cuenta (Diana) o siguen siendo privados?",
      "¿Hace falta una vista «agenda» que junte las clases presenciales por horario?",
      "¿Plantillas por tipo de curso (SAP, Power BI) con tareas o etiquetas precargadas?",
    ],
  },

  "curso-detalle": {
    route: "/cursos/{courseId}",
    purpose:
      "Página de un curso personal: cabecera con datos y avance, clases con sus apuntes y enlaces, tareas con fecha de entrega, «Para el futuro» (lo que Cesar quiere poder encontrar después: códigos, fórmulas, atajos, tips) y enlaces del curso. Incluye un prompt de contexto del curso para pegar en una IA.",
    files: [
      "webapp/src/app/cursos/[courseId]/page.tsx (la página; arma todos los datos y el CoursePromptData)",
      "webapp/src/components/course-header.tsx (cabecera, cambio de estado, editar, eliminar, «Copiar contexto del curso para una IA»)",
      "webapp/src/components/course-form.tsx (edición de los datos del curso)",
      "webapp/src/components/course-sessions.tsx (clases y apuntes; borrador autoguardado en localStorage rxtrack:course:{id}:draft)",
      "webapp/src/components/course-tasks.tsx (tareas con captura rápida y fecha)",
      "webapp/src/components/course-keeps.tsx (Para el futuro: etiquetas, búsqueda, fijar, copiar)",
      "webapp/src/components/course-links.tsx y session-links.tsx (NamedLinks: editor de enlaces con nombre propio, compartido con las sesiones de apuntes)",
      "webapp/src/components/section-rail.tsx (menú rápido de secciones)",
      "webapp/src/lib/actions/courses.ts, lib/courses.ts, lib/course-prompt.ts (courseContextPrompt), lib/session-links.ts (tipos de enlace)",
    ],
    data: [
      "Course (ver la lista) con CourseSession (number auto = máximo + 1, date, topic, content en Markdown de renderCornell, attended), CourseTask (text, description ≤600, dueDate, done, doneAt, order), CourseLink (name, url http/https, kind; sessionId null = enlace del curso, con valor = de esa clase) y CourseKeep (title, body ≤20 000, tag TIP|CODIGO|FORMULA|ATAJO|IDEA|ENLACE_UTIL|OTRO, pinned).",
      "kind de CourseLink comparte vocabulario con SessionLink: ONENOTE, IA, DIAPOSITIVAS, FOTOS, DRIVE, VIDEO, PLATAFORMA, ARCHIVO, OTRO; el tipo solo elige ícono y nombre sugerido, y se adivina por el dominio (guessSessionLinkKind).",
      "Todo cuelga de Course con onDelete Cascade: borrar un curso borra sus clases, tareas, enlaces y guardados.",
    ],
    behavior: [
      "Cinco secciones con ancla: resumen, clases, tareas, futuro y enlaces. La clase más reciente aparece abierta; los apuntes se muestran con renderCornell (render seguro).",
      "Tareas: se agregan con Enter, las pendientes se ordenan por fecha de entrega, las hechas quedan plegadas, hay barra de avance.",
      "Para el futuro: filtro por etiqueta (solo las usadas), buscador (aparece con más de 3 ítems), fijados arriba, copiar con un clic; CODIGO/FORMULA/ATAJO se muestran en monoespaciado.",
      "«Copiar contexto del curso para una IA» arma courseContextPrompt con apuntes (recortados a 3500 caracteres por clase), tareas, guardados y enlaces, más lo que Cesar escriba que quiere pedir. La app no llama a ninguna IA.",
      "Cambiar el estado desde la cabecera es inmediato; eliminar pide confirmación.",
    ],
    permissions: [
      "Igual que la lista: solo canUseCourses (Cesar). Cada acción de lib/actions/courses.ts lo comprueba por su cuenta; no hay autorización por recurso.",
    ],
    related: [
      "Lista de cursos (/cursos)",
      "Sesiones de apuntes de las asignaturas (/{asignatura}/modulos/{id}): comparten el editor de enlaces NamedLinks y la idea de apuntes por clase, pero los modelos son distintos (CourseSession ≠ Session)",
      "Prompts de IA (lib/prompts.ts): este es el único prompt de contexto que vive en lib/course-prompt.ts",
    ],
    notes: [
      "CourseSession es un modelo aparte de Session: no tiene transcripción, diapositivas en texto, etapas (CRUDA→REVISADA) ni autor, ni pasa por el prompt Cornell.",
      "No hay recordatorios: las fechas de entrega solo se ven aquí y en «Lo que viene» de /cursos.",
      "Los apuntes y guardados son texto plano/Markdown; no hay adjuntar archivos ni imágenes (solo enlaces).",
      "El borrador autoguardado es solo de la clase NUEVA, por curso, en el navegador.",
      "Si se quisiera repaso espaciado (tarjetas), hoy Flashcard solo nace de glosario/fórmulas de una asignatura.",
    ],
    questions: [
      "¿Tarjetas de repaso a partir de «Para el futuro»?",
      "¿Adjuntar imágenes o capturas de pantalla (SAP/Power BI) y dónde guardarlas?",
      "¿Una plantilla de apuntes por tipo de curso (objetivo de la clase, pasos hechos, dudas)?",
      "¿Exportar el curso (Markdown/PDF) al terminar?",
    ],
  },
};

// ---------------------------------------------------------------------------------------------
// Armado del prompt
// ---------------------------------------------------------------------------------------------

export type DevPromptInput = {
  key: DevSectionKey;
  /** null en las secciones que no cuelgan de una asignatura («Cursos»). */
  subject: { id: string; code: string; name: string; sections: string[] } | null;
  /** Líneas con datos reales de ESTA asignatura/página (conteos, títulos…). */
  live: string[];
  /** Fecha de hoy, ya formateada. */
  today: string;
};

const bullets = (items: string[]) => items.map((x) => `- ${x}`).join("\n");

export function buildDevPrompt({ key, subject, live, today }: DevPromptInput): string {
  const s = SECTIONS[key];
  const label = DEV_SECTION_LABEL[key];
  const visible = subject && subject.sections.length ? subject.sections.join(", ") : "todas";
  const where = subject
    ? `Asignatura abierta ahora: ${subject.code} · ${subject.name} (slug «${subject.id}»). Secciones visibles en esa asignatura: ${visible}. Fecha de hoy: ${today}.`
    : `Esta sección NO pertenece a ninguna asignatura: es un módulo personal de Cesar, aparte del temario y del seed. Fecha de hoy: ${today}.`;

  return `# ROL Y OBJETIVO
Eres un asesor senior de producto y arquitectura de software. NO tienes acceso al repositorio ni a la aplicación: todo lo que sabes del proyecto está en este mensaje. Mi nombre es Cesar y soy el autor de la aplicación.
Quiero que converses conmigo sobre una idea de cambio en la sección «${label}» y que me ayudes a ADAPTARLA al proyecto real: qué conviene hacer, qué no, cómo encajarla con lo que ya existe y en qué orden implementarla. Tu respuesta final se la voy a pasar a OTRA IA (la que sí trabaja dentro del repositorio y puede leer y editar el código), así que debes dejarla en un formato que esa IA pueda ejecutar sin preguntarme lo que ya se resolvió aquí.

# MI IDEA
${DEV_IDEA_PLACEHOLDER}

# CÓMO QUIERO QUE RESPONDAS
Habla conmigo en español, directo y sin relleno. Responde SIEMPRE con estas partes, en este orden:
1. **Lo que entendí** — mi idea en 2 o 3 líneas y los supuestos que estás haciendo.
2. **Preguntas** — máximo 5, numeradas, las que de verdad cambian el diseño. A cada una ponle tu recomendación por defecto: no esperes mis respuestas para darme un primer borrador.
3. **Consejos para adaptar mi idea a ESTE proyecto** — qué encaja con los principios y la arquitectura de abajo, qué choca, y alternativas más simples. Marca cada consejo con prioridad Alta/Media/Baja. Si mi idea es mejor sin cambios, dilo.
4. **Impacto por capa** — datos (modelos y campos nuevos; recuerda que solo se admiten migraciones ADITIVAS sobre una base que ya está en producción), acciones y permisos, interfaz (rutas y componentes), contenido y seed, prompts de IA, textos de ayuda (ⓘ) y documentación.
5. **Riesgos** — qué pasa con los datos existentes, con los permisos, con las demás secciones relacionadas y con el principio de baja carga cognitiva.
6. **Plan en pasos pequeños** — cada paso verificable por separado.
7. **BRIEF PARA LA IA DEL PROYECTO** — un único bloque de código Markdown, autocontenido, que yo pueda copiar tal cual. Debe llevar: objetivo; decisiones ya tomadas; archivos a tocar (usa las rutas reales de este mensaje); cambios de datos; cambios de acciones y permisos; cambios de interfaz; criterios de aceptación comprobables; qué queda FUERA de alcance; preguntas abiertas. Sin código completo: solo firmas, tipos y nombres clave.
Si te falta información del código para opinar con seguridad, pídemela citando el archivo exacto (de la lista de abajo) y yo te pego su contenido; no la inventes. Si algo de lo que digo contradice los principios del proyecto, dímelo en lugar de seguir.

${PROJECT_CONTEXT}

# CONTEXTO DE LA SECCIÓN «${label.toUpperCase()}»
${where}
Ruta: ${s.route}

**Para qué sirve:** ${s.purpose}

**Archivos reales (rutas desde la raíz del repositorio):**
${bullets(s.files)}

**Datos que usa:**
${bullets(s.data)}

**Cómo se comporta hoy:**
${bullets(s.behavior)}

**Permisos:**
${bullets(s.permissions)}

**Se conecta con:**
${bullets(s.related)}

**Límites y rarezas conocidas (honestas, úsalas para opinar):**
${bullets(s.notes)}

**Preguntas de diseño que suelen aparecer al cambiar esta sección:**
${bullets(s.questions)}

# ESTADO ACTUAL (datos reales ${subject ? "de esta asignatura" : "de esta sección"})
${live.length ? bullets(live) : "- (sin datos)"}

# RECORDATORIOS FINALES
- La interfaz y los textos están en español (Colombia) y nunca nombran ningún diagnóstico.
- La app no llama a ninguna IA: cualquier función de IA se implementa como un prompt que la persona copia.
- Todo cambio debe poder desplegarse sin romper el avance ya guardado.
- Antes de que la IA del proyecto haga commit y push, yo confirmo.`;
}
