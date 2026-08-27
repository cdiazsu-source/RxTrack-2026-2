import { prisma } from "@/lib/prisma";
import { moduleProgress, subjectProgress } from "@/lib/progress";

/** Módulos de una asignatura con su progreso compuesto ya calculado. */
export async function getModulesWithProgress(subjectId: string) {
  const modules = await prisma.module.findMany({
    where: { subjectId },
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      status: true,
      hasLab: true,
      labReportStatus: true,
      driveUrl: true,
      notesUrl: true,
      fromContent: true,
      _count: { select: { sessions: true } },
      checklistItems: { select: { done: true } },
    },
  });

  return modules.map((m) => {
    const checklistDone = m.checklistItems.filter((c) => c.done).length;
    const checklistTotal = m.checklistItems.length;
    return {
      id: m.id,
      slug: m.slug,
      title: m.title,
      description: m.description,
      status: m.status,
      hasLab: m.hasLab,
      labReportStatus: m.labReportStatus,
      driveUrl: m.driveUrl,
      notesUrl: m.notesUrl,
      fromContent: m.fromContent,
      sessionCount: m._count.sessions,
      checklistDone,
      checklistTotal,
      progress: moduleProgress({
        status: m.status,
        checklistDone,
        checklistTotal,
        sessionCount: m._count.sessions,
        hasLab: m.hasLab,
        labReportStatus: m.labReportStatus,
      }),
    };
  });
}

/** Progreso 0..1 de una asignatura (media de sus módulos). */
export async function getSubjectProgress(subjectId: string): Promise<number> {
  const mods = await getModulesWithProgress(subjectId);
  return subjectProgress(mods.map((m) => m.progress));
}
