import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { getSubjectContent } from "@/lib/subject-content";
import { isSectionVisible } from "@/lib/subject-sections";
import { LabPracticesPanel } from "@/components/lab-practices-panel";
import { LabReportsPanel, type LabReportView } from "@/components/lab-reports-panel";

export const dynamic = "force-dynamic";

export default async function LaboratorioPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();
  if (!isSectionVisible(subject.sections, "laboratorio")) notFound();

  const content = getSubjectContent(params.subject);
  const labPractices = content?.labPractices ?? [];
  const labRules = content?.labRules ?? [];
  const labModules = content?.labModules ?? [];

  const [reports, modules, moduleLinkRows] = await Promise.all([
    prisma.labReport.findMany({
      where: { subjectId: subject.id },
      orderBy: { order: "asc" },
      include: { checklistItems: { orderBy: { order: "asc" } } },
    }),
    labPractices.length
      ? prisma.module.findMany({ where: { subjectId: subject.id }, select: { slug: true, title: true } })
      : Promise.resolve([]),
    prisma.labModuleLink.findMany({ where: { subjectId: subject.id } }),
  ]);

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
    checklistItems: r.checklistItems.map((c) => ({ id: c.id, text: c.text, done: c.done, order: c.order })),
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
        />
      )}
      <LabReportsPanel subjectId={subject.id} reports={items} />
    </div>
  );
}
