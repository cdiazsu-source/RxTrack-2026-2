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

`getSession()` devuelve `{ authed, level, name, viewingAs, scope }`; `canEdit()`
sigue siendo `level === "full"`. El alcance acotado lo aplica **el middleware**
(no hay authz por recurso en las server actions). La portada saluda con
`Hola, <name>.`. Añadir personas = otra fila en `ACCOUNTS` (con `scope` si su
acceso es parcial). `SiteNav`/`SubjectSubnav` se recortan cuando la sesión tiene
`scope`. `middleware.ts` protege todo salvo `/login`.

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
toca notas ni quizzes existentes.

## Estado

Fase 0 (andamiaje) y Fase 1 (una asignatura de punta a punta) implementadas.
Temario cargado en `content/*.ts` desde el programa oficial, las **7 asignaturas**:
FT2, AIF, FG, AF, SPF, BFC (sin laboratorio). FQ2 se retiró en 2026-2 (no se cursa).
