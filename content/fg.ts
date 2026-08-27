import type { SubjectContent } from "./_schema";

/**
 * Farmacología General (UNAL) — STUB.
 * La asignatura existe y es navegable en la app, pero todavía no tiene temario.
 * Para cargarlo: rellena `modules`, `glossary`, `evaluation`, `keyDates`,
 * `bibliography` con el programa oficial y corre `npm run db:seed`.
 */
export const fg: SubjectContent = {
  code: "FG",
  slug: "fg",
  name: "Farmacología General",
  hasLab: false,
  totalClasses: 32,
  descriptionSummary: "",
  modules: [],
};
