import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { DatesSection, type KeyDateView } from "@/components/dates-section";
import { HelpHint } from "@/components/help-hint";

export const dynamic = "force-dynamic";

export default async function DatesPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const dates = await prisma.keyDate.findMany({ where: { subjectId: subject.id } });
  const items: KeyDateView[] = dates.map((d) => ({
    id: d.id,
    name: d.name,
    date: d.date ? d.date.toISOString() : null,
    weight: d.weight,
    note: d.note,
    fromContent: d.fromContent,
  }));

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        Parciales y entregas. El nombre y el peso vienen del programa; la fecha la pones tú.
        <HelpHint k="fechas" />
      </p>
      <DatesSection subjectId={subject.id} items={items} />
    </div>
  );
}
