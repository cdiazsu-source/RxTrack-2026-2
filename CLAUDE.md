# Contexto del proyecto — leer antes de trabajar en este repositorio

RxTrack 2026-2s es un tracker web de las **7 asignaturas** del semestre 2026-2 del
pregrado de Química Farmacéutica (UNAL). Nace de dos proyectos previos:

- **Farmacotecnia2** (`github.com/cdiazsu-source/Farmacotecnia2`) — borrador
  estático de una sola asignatura. De ahí viene el **modelo de dominio**
  (módulos → sesiones Cornell, checklist, recursos, laboratorio; glosario,
  fórmulas con markup propio, fechas, bibliografía, insumos; racha, asistencia)
  y el **patrón de prompts de IA**: la app nunca llama a ninguna API, arma un
  texto para que la persona lo pegue en su asistente.
- **ET en Marcha** (`webapp/` de `cdiazsu-source/UIFCE-2026-2-...`) — de ahí
  viene la **plataforma**: Next.js 14 App Router + TS + Tailwind + Prisma sobre
  Postgres (Neon) en Vercel, Server Actions, auth por cookie firmada + middleware,
  seed idempotente, y el modelo `Project` + `ProjectNote` + feed
  "Últimas actualizaciones".

## Principios rectores (no romper sin razón)

1. **Diseño para uso intensivo con TDAH.** Es prioridad de producto. Prueba:
   *si una pantalla obliga a recordar algo, a elegir entre muchas cosas o a
   empezar de cero, está mal diseñada.* De aquí salen: "Continuar donde ibas"
   (`SemesterMeta.resume*`), autosave de borradores en `localStorage`, panel
   "Ahora" (≤3 ítems), fechas en relativo, racha indulgente, captura rápida,
   copia nunca punitiva.
2. **Progreso siempre visible.** Cada cosa con un "cuánto llevas" muestra una
   barra o un anillo que se llena, con el número crudo al lado. Un solo sistema:
   `lib/progress.ts` + `components/progress-ring.tsx` + `ui/progress.tsx`.
3. **El temario es fuente de verdad editada por personas.** Vive en
   `content/[code].ts`, no en la app. `npm run db:seed` lo sincroniza y **nunca**
   sobrescribe avance: `Module.status`, `ChecklistItem.done`, `Session`,
   `KeyDate.date`, `EvaluationItem.grade`/`QuizGrade`, notas, ni filas con
   `fromContent=false`.
4. **La IA no se llama desde el backend.** `lib/prompts.ts` arma prompts; la
   persona los copia. Cada ⓘ dice explícitamente qué NO hace la app.
5. **Seguridad de texto.** El contenido rico (apuntes Cornell, fórmulas) se
   renderiza con `lib/markdown-lite.ts` / `lib/formula-markup.ts`: se escapa
   todo y luego un safelist reconvierte `**negrita**`, tablas, `_{sub}`, etc.

## Identidad visual

Paleta y tipografía de la **Facultad de Ciencias UNAL** (pregrado en Farmacia): magenta
`#A8009C` como primario, ciruela `#3B0136` para texto sobre tintes, verde `#337561`
para éxito, fondos planos (sin degradados). Los tokens HSL viven en `globals.css`
(`--primary`, `--background`, `--card`…) y se consumen con `hsl(var(--token))`; no uses
hex sueltos en componentes. Fuentes **Ancizar Sans** (cuerpo) y **Ancizar Serif** (títulos),
servidas desde `src/app/fonts` con `next/font/local`. La navegación es un menú lateral
fijo en pantallas `lg+` (`components/site-nav.tsx`; el ítem activo es una pestaña que se
funde con el contenido, clase `.sidebar-tab`) y la barra superior en móvil. Si cambias el
color de marca, actualiza también `icon.svg`, los PNG de `public/`, `manifest.webmanifest`
y `themeColor` en `layout.tsx`.
Los íconos de asignatura del menú lateral están en `lib/subject-icons.ts` (Lucide, por `id`); una
asignatura nueva sin entrada usa el libro abierto, así que añade su fila al crearla.

### Menú rápido de secciones

`components/section-rail.tsx` (`<SectionRail items={[{ id, label, icon }]} />`): botones con ícono
fijos al costado derecho para saltar en un clic a cada sección de la página larga (inicio,
panel de asignatura, módulo, proyecto), sin desplazarse. Marca la sección actual, abre los
`<details>` plegados al llegar y trae «Arriba»; en móvil se recoge en un botón flotante. Para
usarlo en otra página: pon `id` + `scroll-mt-24` a cada sección, añade `lg:pr-14` al
contenedor y pasa los `items` (`icon` es un nombre de la lista `ICONS` del componente). Se
dibuja en un portal en `<body>` a propósito: la animación `.page-enter` aplica un transform
que volvería "fixed" relativo al contenido.

## Acceso

Una cuenta por persona, sin base de datos: la lista `ACCOUNTS` vive en
`lib/auth.ts` (edge-safe). La cookie firmada con HMAC lleva `{ name, level, scope }`.

- `cesar` / `SITE_PASSWORD` — `level: "full"`, edita todo.
- `diana` / `SITE_PASSWORD_READ` — `level: "read"`: ve todo, y además puede
  editar checklist, enlaces de Drive, sesiones/transcripciones y **su propia
  nota de evaluación** (`canContribute()`, ver abajo). El resto queda solo para
  `cesar` (`canEdit()`).
- `jose` / `SITE_PASSWORD_JOSE` — `level: "full"` **acotado** por
  `scope: { subject: "aif", section: "laboratorio" }`: solo ve y edita
  `/aif/laboratorio`; el `middleware.ts` reenvía cualquier otra ruta ahí.

- `karen` / `SITE_PASSWORD_KAREN` — `level: "full"` acotado a **toda** la asignatura
  `scope: { subject: "aif" }` (sin `section`); pareja de Cesar en el laboratorio
  del Módulo II de AIF (subgrupo J5).

- `profe` / `SITE_PASSWORD_PROFE` (por defecto `123`) — `level: "read"` acotado a **toda** la
  asignatura `af` (Administración Farmacéutica) más la **portada en vista reducida** (`homeView: true`,
  `canViewHome()`; aterriza en `/`). La portada del profe es `RestrictedHome`: solo saludo y la lista
  de asignaturas, con las que no están en su alcance deshabilitadas («Pídele a Cesar Diaz que te
  brinde acceso a esta asignatura.»); no lee avance, tareas, actividad ni notas, ni toca la racha.
  Su menú lateral es `RestrictedSidebar` (en `site-nav.tsx`): solo Semestre, su asignatura y Salir; sin
  Calendario, Repaso, Bandeja, búsqueda, captura rápida ni «Ver como», y sin listar las demás asignaturas.
  Saludos propios que se alternan «escribiéndose» (`greetings` en la cuenta, `greetingsFor()`,
  componente `typewriter-greeting.tsx`; sale en la portada y en el panel de `/af`) y
  `mentionable: false` (no aparece en las @menciones de la bitácora). El usuario no distingue
  mayúsculas (`checkCredentials` normaliza a minúsculas). Tiene `trackAccess: true`: `AccountActivity`
  (por usuario: `lastLoginAt`, `lastSeenAt`, `loginCount`) se escribe al iniciar sesión (`login`) y, con
  la sesión ya abierta, en el layout raíz como mucho cada 5 min (`lib/activity.ts`); no cuenta cuando
  Cesar la ve con «Ver como». Cesar lo ve en la portada (`guest-access-card.tsx`); para otra cuenta
  basta ponerle `trackAccess: true`.

`getSession()` devuelve `{ authed, level, name, viewingAs, scope }`; `canEdit()`
sigue siendo `level === "full"`. El alcance acotado lo aplica **el middleware**
(no hay authz por recurso en las server actions). La portada saluda con
`Hola, <name>.`. Añadir personas = otra fila en `ACCOUNTS` (con `scope` si su
acceso es parcial). `SiteNav`/`SubjectSubnav` se recortan cuando la sesión tiene
`scope`. `middleware.ts` protege todo salvo `/login`.

**Ver como.** Cesar (acceso total sin alcance) puede ver la app como cualquier otra cuenta
desde el ícono del ojo del menú lateral (`components/view-as-menu.tsx`). La lista sale de
`listViewProfiles()` en `lib/auth.ts` (todas las cuentas salvo las de acceso total sin
alcance), así que una cuenta nueva aparece sola. La cookie `rxtrack_view_as` guarda el
usuario elegido; `getSession()` y `middleware.ts` aplican su nivel, nombre y **alcance**
(Cesar rebota igual que esa persona), y `startViewAs(key)` lo lleva a su `landingPath`.
Mientras se ve como otro perfil aparece «Viendo como X — volver» (también en la barra mínima
de los perfiles acotados). Por cómo funciona, Cesar actúa con los permisos de ese perfil.

**Evaluación, por persona.** `EvaluationItem` tiene `owner: "Cesar" | "Diana"`:
cada quien tiene su propia fila por componente (mismo `name`/`weight`/`order`,
nota aparte) — son dos seguimientos independientes del mismo curso. Estructura
(agregar/borrar componente, `addEvaluationItem`/`deleteEvaluationItem`) sigue
siendo solo de Cesar y crea/borra la fila de ambos a la vez para no
desincronizarlas; la nota (`setEvaluationGrade`) la pone cada quien en la suya,
gateado por dueño (`item.owner === session.name`), no por `canEdit`. Un
componente puede además tener varios `QuizGrade` (nota + fecha, botón «+
Quiz»): si los tiene, su nota es el promedio simple de todos y la `grade`
manual se ignora. `db:seed` empareja por `(subjectId, name, owner)` y nunca
toca notas ni quizzes existentes. Cada nota manual (`EvaluationItem.gradeNote`) y cada quiz
(`QuizGrade.description`) lleva una descripción libre opcional (≤300 car.) y se puede modificar
(`setEvaluationGrade`/`updateQuizGrade`) y eliminar (`clearEvaluationGrade`/`deleteQuizGrade`),
siempre solo por el dueño de la fila.

**Nota rápida (portada).** Caja al final de `/` (`quick-note-box.tsx`): texto + asignatura
opcional. Escribe en `InboxItem` (misma bandeja que el botón «+»), con `subjectId` blando.

**Modo Enfoque (por proyecto).** `focus-mode.tsx` en `/[subject]/proyectos/[id]` (también
`?enfoque=1` lo abre solo): overlay a pantalla completa con un paso a la vez, bloques de
2/10/15/25/45 min, pausas, «Se me complicó» (dividir / prompt de IA / dejar para después),
estacionamiento de ideas (→ bandeja) y nota «para retomar». El temporizador vive en
`localStorage` (`rxtrack:focus:<projectId>`); en BD solo `Project.focusNote` y
`Project.focusMinutes`. **Regla de producto: la interfaz nunca menciona el diagnóstico
(TDAH) ni lo describe como tal** — es solo «Modo Enfoque».

**Proyectos: contexto y enlaces.** Cada proyecto puede llevar `description` (Markdown de `renderCornell`; en los sembrados la escribe `projects[].description` de `content/<code>.ts` y el seed la mantiene) y varios enlaces `ProjectLink` (nombre + URL http/https; anexar/modificar/eliminar con `canContribute`). Cada `ChecklistItem` admite `description` (texto breve opcional, máx. 600 caracteres; se muestra bajo el título y entra en «Copiar contexto para IA»). Equipo del proyecto: `ProjectMember` (nombre + rol opcional, sin usuario; solo control del equipo; CRUD con `canContribute`). La bitácora exige autor y solo acepta integrantes del proyecto (validado en `addProjectNote`); `ProjectNote.links` (Json `[{name,url}]`) guarda enlaces con nombre por nota. Renombrar un proyecto sembrado: dejar el título viejo en `formerTitles` para que el seed conserve su checklist y bitácora.

**Contexto de proyecto para IA.** En `/[subject]/proyectos/[id]`, el botón «Copiar contexto para IA»
(`project-context-button.tsx`; el texto lo arma el servidor con `projectContextPrompt` en
`lib/prompts.ts`) copia asignatura, descripción completa, subtareas con su avance, enlaces,
«dónde me quedé» y las últimas 10 notas, más reglas para la IA. «Ver y personalizar» deja añadir
qué se le va a pedir (reemplaza el marcador `[escribe aquí lo que quieres pedirle a la IA]`; si
cambias ese texto en el prompt, cámbialo también en el componente). No menciona TDAH.

**Prompt rápido: foto de diapositiva o tablero.** Cada módulo (`/[subject]/modulos/[id]`) tiene una
tarjeta plegable «Prompt rápido» (`photo-quick-prompt.tsx`, ancla `#foto-rapida`, ícono `camera` del
`SectionRail`): se agrega una foto (cámara, galería, pegar o arrastrar; hasta 6), se elige si es
diapositiva o tablero y se escribe una nota opcional. `photoExtractPrompt` (`lib/prompts.ts`) arma el
prompt con el contexto del módulo (descripción, glosario, fórmulas) y pide cuatro bloques —
transcripción fiel, qué significa, relación con el módulo, control de calidad— en un solo bloque
Markdown listo para pegar en «Diapositivas / notas» de los apuntes. **La foto nunca se sube ni la app
llama a una IA** (las imágenes viven como `URL.createObjectURL` en el navegador). Para llevarla a la IA:
«Copiar prompt» (y adjuntar la foto a mano), «Copiar imagen + prompt» (`ClipboardItem`, solo con una
imagen y si el navegador lo permite) o «Compartir con mi IA» (`navigator.share` con archivos, en el
teléfono). Las dos últimas se detectan en el cliente: si no aparecen, el navegador no las soporta.

**Prompt de investigación del módulo.** Segunda tarjeta plegable de cada módulo (`module-research-prompt.tsx`,
ancla `#investigacion`, ícono `sparkles`). `moduleResearchPrompt` (`lib/prompts.ts`) junta descripción,
desarrollo (`chapter`), glosario con definiciones, fórmulas, enunciados de ejercicios y los apuntes de
clase (apuntes Cornell, diapositivas y, opcionalmente, transcripciones; todo recortado por longitud) y
le pide a la IA que investigue los términos y escriba un texto científico amplio de 8 secciones
(panorama, conceptos, ecuaciones con cálculos, casos reales, contraste con los apuntes, errores,
resumen, fuentes) más secciones de insumos según lo marcado: podcast, tarjetas, guía, quiz. Exige no
inventar referencias ni DOI (marcar [verificar]) y permite entregarlo por partes («sigue»). Los toggles
de material y de usos viven en el cliente; la página del módulo pasa los datos como props.

**Prompt de ejercicios.** El panel «Ejercicios» de cada módulo tiene el botón «Prompt para IA»
(`exerciseSolutionPrompt` en `lib/prompts.ts`): arma un texto con el contexto del módulo
(glosario, fórmulas, descripción) + el enunciado que pegues, y exige que la IA devuelva dos
bloques ya en el Markdown de `renderCornell` (enunciado y solución con Interpretación / Factor de
conversión / Conclusión), listos para pegar en «Agregar». Si cambia `markdown-lite.ts`, actualizar
las reglas de formato dentro de ese prompt (p. ej. `_{ }` solo funciona dentro de ```formula).

## Estado

Fase 0 (andamiaje) y Fase 1 (una asignatura de punta a punta) implementadas.
Temario cargado en `content/*.ts` desde el programa oficial, las **7 asignaturas**:
FT2, AIF, FG, AF, SPF, BFC (sin laboratorio). FQ2 se retiró en 2026-2 (no se cursa).
