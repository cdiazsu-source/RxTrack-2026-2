import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { getSession } from "@/lib/session";
import { hidesPastExams } from "@/lib/auth";
import { getSubjectContent } from "@/lib/subject-content";
import { isSectionVisible } from "@/lib/subject-sections";
import { LabPracticesPanel } from "@/components/lab-practices-panel";
import { canWriteLabLog } from "@/lib/lab-log";
import type { LabNoteView } from "@/components/lab-practice-log";
import { LabReportsPanel, type LabReportView } from "@/components/lab-reports-panel";

export const dynamic = "force-dynamic";

export default async function LaboratorioPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();
  if (!isSectionVisible(subject.sections, "laboratorio")) notFound();

  const content = getSubjectContent(params.subject);
  // Cuentas que no ven nada de exámenes anteriores (profe): se quitan los simulacros de examen de las prácticas.
  const session = await getSession();
  const hidePast = session.authed && hidesPastExams(session.name);
  const labPractices = (content?.labPractices ?? []).map((p) => (hidePast ? { ...p, examExercises: undefined } : p));
  const labRules = content?.labRules ?? [];
  const labModules = content?.labModules ?? [];

  const [reports, modules, moduleLinkRows, noteRows] = await Promise.all([
    prisma.labReport.findMany({
      where: { subjectId: subject.id },
      orderBy: { order: "asc" },
      include: { checklistItems: { orderBy: { order: "asc" } } },
    }),
    labPractices.length
      ? prisma.module.findMany({ where: { subjectId: subject.id }, select: { slug: true, title: true } })
      : Promise.resolve([]),
    prisma.labModuleLink.findMany({ where: { subjectId: subject.id } }),
    prisma.labPracticeNote.findMany({ where: { subjectId: subject.id }, orderBy: { createdAt: "desc" } }),
  ]);

  const notesByPractice: Record<string, LabNoteView[]> = {};
  for (const n of noteRows) {
    (notesByPractice[n.practiceKey] ??= []).push({
      id: n.id,
      kind: n.kind,
      body: n.body,
      author: n.author,
      authorRole: n.authorRole,
      createdAt: n.createdAt.toISOString(),
    });
  }

  const moduleLinks = Object.fromEntries(moduleLinkRows.map((l) => [l.name, l.url]));
  const moduleTitleBySlug = Object.fromEntries(modules.map((m) => [m.slug, m.title]));

  const items: LabReportView[] = reports.map((r) => ({
    id: r.id,
    number: r.number,
    title: r.title,
    status: r.status,
    grade: r.grade,
    dueDate: r.dueDate ? r.dueDate.toISOString() : null,
    driveUrl: r.driveUrl,
    content: r.content,
    order: r.order,
    checklistItems: r.checklistItems.map((c) => ({ id: c.id, text: c.text, description: c.description, done: c.done, order: c.order })),
  }));

  return (
    <div className="flex flex-col gap-5">
      {(labRules.length > 0 || labPractices.length > 0) && (
        <LabPracticesPanel
          labRules={labRules}
          labModules={labModules}
          moduleLinks={moduleLinks}
          practices={labPractices}
          subjectName={subject.name}
          subjectSummary={content?.descriptionSummary ?? null}
          subjectObjective={content?.objectiveGeneral ?? null}
          subjectSlug={subject.id}
          moduleTitleBySlug={moduleTitleBySlug}
          notesByPractice={notesByPractice}
          canWriteLog={canWriteLabLog(session)}
        />
      )}
      <LabReportsPanel subjectId={subject.id} reports={items} />
    </div>
  );
}
