import { cache } from "react";

import { prisma } from "@/lib/prisma";

export { SUBJECT_SECTIONS } from "@/lib/subject-sections";

/** Una sola consulta por request gracias a `cache()`. */
export const getSubjectBySlug = cache((slug: string) =>
  prisma.subject.findUnique({ where: { id: slug } }),
);

export const listSubjects = cache(() =>
  prisma.subject.findMany({ orderBy: { order: "asc" } }),
);

/** Marca actividad reciente en la asignatura ("hace N días sin tocar esto"). */
export async function touchSubject(subjectId: string): Promise<void> {
  try {
    await prisma.subject.update({
      where: { id: subjectId },
      data: { lastActivityAt: new Date() },
    });
  } catch {
    /* si la asignatura no existe, no pasa nada */
  }
}
