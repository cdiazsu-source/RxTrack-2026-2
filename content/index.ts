import type { SubjectContent } from "./_schema";
import { aif } from "./aif";
import { ft2 } from "./ft2";
import { fg } from "./fg";
import { af } from "./af";
import { spf } from "./spf";
import { fq2 } from "./fq2";
import { bfc } from "./bfc";

/**
 * Todas las asignaturas del semestre, EN EL ORDEN en que aparecen en el selector
 * y en la vista "Semestre". El seed usa este arreglo como única entrada.
 */
export const ALL_SUBJECTS: SubjectContent[] = [aif, ft2, fg, af, spf, fq2, bfc];

export type { SubjectContent } from "./_schema";
