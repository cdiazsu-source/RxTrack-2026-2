# Cómo cargar (o portar) el temario de una asignatura

El temario vive en `content/<code>.ts` — un objeto `SubjectContent` (ver
`content/_schema.ts`). Se edita **en el repo**, no en la app, y se sincroniza con
`npm run db:seed` desde `webapp/`.

## Pasos

1. Abre `content/<code>.ts` (ya existen los 7: `aif`, `ft2`, `fg`, `af`, `spf`,
   `fq2`, `bfc`). Los que están como *stub* solo tienen `code`, `slug`, `name` y
   `modules: []`.

2. Rellena, tomando los datos del **programa oficial** (docente / SIA):

   - `credits`, `professors`, `scheduleTheory`, `scheduleLab`, `totalClasses`
   - `descriptionSummary`, `objectiveGeneral`, `objectivesSpecific`
   - `modules[]` — cada uno con un `slug` **estable** en kebab-case (p. ej.
     `tensioactivos-hlb`). ⚠️ Si cambias un `slug` después de sembrar, el seed
     crea un módulo nuevo en vez de actualizar el viejo.
   - `evaluation[]` — nombre + peso entero (deben sumar 100).
   - `keyDates[]` — nombre + peso (texto). La fecha la pone la persona en la app.
   - `glossary[]`, `formulas[]`, `bibliography[]` — opcionales; pueden llevar
     `moduleSlug` para ligarse a un módulo.
   - `projects[]` — entregables fijos (seminario, producto final, informes…).

3. Guarda y corre:

   ```bash
   cd webapp && npm run db:seed
   ```

## Markup de fórmulas

En `expression`, `variables` y `derivation`:

| Escribe | Se ve |
|---|---|
| `_{s}` | subíndice |
| `^{2}` | superíndice |
| `#{num\|den}` | fracción con línea |
| `\n` | salto de línea |
| `**texto**` | negrita (solo en `description` y `derivation`) |

## Qué es seguro y qué no

`db:seed` **actualiza** título/descr./objetivos/pesos y **agrega** términos,
fórmulas, fechas o proyectos nuevos. **Nunca** toca: estado de módulo, checklist,
apuntes, fechas ya puestas, notas de bitácora, notas de evaluación, ni filas
creadas dentro de la app.
