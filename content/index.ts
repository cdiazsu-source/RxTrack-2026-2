import type { SubjectContent } from "./_schema";
import { aif } from "./aif";
import { ft2 } from "./ft2";
import { fg } from "./fg";
import { af } from "./af";
import { spf } from "./spf";
import { bfc } from "./bfc";

/**
 * Todas las asignaturas del semestre, EN EL ORDEN en que aparecen en el selector
 * y en la vista "Semestre". El seed usa este arreglo como única entrada.
 *
 * Nota: quitar una asignatura de aquí NO la borra de la base (el seed solo
 * agrega/actualiza). Para eliminarla hay que borrar la fila `Subject` a mano.
 * FQ2 (Farmacia Química 2) se retiró en 2026-2 — no se cursa.
 */
export const ALL_SUBJECTS: SubjectContent[] = [aif, ft2, fg, af, spf, bfc];

export type { SubjectContent } from "./_schema";
