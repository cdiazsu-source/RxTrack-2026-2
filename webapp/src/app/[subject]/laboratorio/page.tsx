import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { isSectionVisible } from "@/lib/subject-sections";
import { LabReportsPanel, type LabReportView } from "@/components/lab-reports-panel";

export const dynamic = "force-dynamic";

export default async function LaboratorioPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();
  if (!isSectionVisible(subject.sections, "laboratorio")) notFound();

  const reports = await prisma.labReport.findMany({
    where: { subjectId: subject.id },
    orderBy: { order: "asc" },
    include: { checklistItems: { orderBy: { order: "asc" } } },
  });

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

  return <LabReportsPanel subjectId={subject.id} reports={items} />;
}
