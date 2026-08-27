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
   `KeyDate.date`, `EvaluationItem.grade`, notas, ni filas con `fromContent=false`.
4. **La IA no se llama desde el backend.** `lib/prompts.ts` arma prompts; la
   persona los copia. Cada ⓘ dice explícitamente qué NO hace la app.
5. **Seguridad de texto.** El contenido rico (apuntes Cornell, fórmulas) se
   renderiza con `lib/markdown-lite.ts` / `lib/formula-markup.ts`: se escapa
   todo y luego un safelist reconvierte `**negrita**`, tablas, `_{sub}`, etc.

## Acceso

Acceso compartido de grupo, sin cuenta por persona. Dos perfiles, misma cookie
firmada con HMAC (`lib/auth.ts`, edge-safe):

- `full` (`SITE_PASSWORD`) — edita todo.
- `read` (`SITE_PASSWORD_READ`) — ve todo; no edita.

`middleware.ts` protege todo salvo `/login`. Diseñado para migrar a magic-link
por persona sin tocar los call-sites (`getSession()` pasaría a `{ userId, role }`).

## Estado

Fase 0 (andamiaje) y Fase 1 (una asignatura de punta a punta) implementadas.
Contenido cargado: **FT2** completo (portado del borrador) y **AIF** como
esqueleto (verificar contra el programa oficial). FG/AF/SPF/FQ2/BFC son `Subject`
stub sin temario — se llenan en `content/*.ts` (Fase 4).
