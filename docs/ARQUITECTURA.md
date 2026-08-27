# Arquitectura — resumen

Detalle completo y decisiones: la propuesta de arquitectura (artefacto). Aquí, lo
mínimo para orientarse en el código.

## Capas

```
content/<code>.ts   ──(npm run db:seed, idempotente)──►   Postgres (Neon)
                                                              ▲
webapp/  Next 14 App Router ── Server Actions (Prisma) ───────┘
         └─ RSC leen; los mutadores son server actions con gate canEdit()
```

- **Sin API REST.** Cada mutación es una server action en `src/lib/actions/*`.
- **Revalidación:** tras cada acción, `revalidateAll()` (`revalidatePath("/", "layout")`).
  Volumen diminuto → es más barato que rastrear rutas y evita UI vieja.
- **Auth:** cookie firmada HMAC (`src/lib/auth.ts`, edge-safe) + `middleware.ts`.
  Perfiles `full` (edita) / `read` (lectura). `canEdit()` / `blockedForRead()`.

## Rutas

| Ruta | Qué es |
|---|---|
| `/` | Semestre: anillo global, racha, "Ahora" (≤3 fechas), grid de asignaturas, feed cruzado |
| `/login` | Ingreso (fuera del middleware) |
| `/[subject]` | Panel de la asignatura (avance real vs estado, evaluación, asistencia, meta) |
| `/[subject]/modulos` · `/[subject]/modulos/[moduleId]` | Módulos y detalle (apuntes Cornell, checklist, recursos, laboratorio) |
| `/[subject]/proyectos` · `/[subject]/proyectos/[projectId]` | Proyectos (checklist + bitácora + estado) + feed de la asignatura |
| `/[subject]/{fechas,glosario,formulas,bibliografia,insumos,prompt-ia}` | Secciones de referencia |

## Piezas transversales

- **Progreso** (`src/lib/progress.ts`): `moduleProgress` = 0.4·checklist + 0.3·estado
  + 0.2·(≥1 sesión) + 0.1·lab; `subjectProgress` = media de módulos; `semesterProgress`
  = media de asignaturas. Se deriva, no se guarda. Componentes: `ProgressBar`
  (`ui/progress.tsx`) y `ProgressRing`.
- **TDAH:** `ResumeTracker` / `ResumeBanner` ("Continuar donde ibas",
  `SemesterMeta.resume*`), autosave de borradores (`src/lib/draft.ts`,
  `localStorage`), fechas en relativo (`src/lib/relative-time.ts`), racha
  indulgente (`tickStreak` en `actions/semester.ts`).
- **IA:** `src/lib/prompts.ts` arma prompts; nunca se llama a una API.
- **Render seguro:** `src/lib/markdown-lite.ts` (apuntes Cornell),
  `src/lib/formula-markup.ts` (fórmulas). Escapan todo y reconvierten un safelist.

## Feed "Últimas actualizaciones"

`src/lib/feed.ts` → `buildFeed({ subjectId? })`: mezcla `ProjectNote` +
`ChecklistItem` con `done=true` (de proyectos y módulos), ordena por fecha, y por
cada subtarea completada calcula la barra del padre y la **siguiente pendiente**
(que la UI muestra titilando).
