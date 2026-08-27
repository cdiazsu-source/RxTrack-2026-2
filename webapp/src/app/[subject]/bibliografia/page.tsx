import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { BibliographySection, type BibliographyView } from "@/components/bibliography-section";
import { HelpHint } from "@/components/help-hint";

export const dynamic = "force-dynamic";

export default async function BibliographyPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const rows = await prisma.bibliographyItem.findMany({
    where: { subjectId: subject.id },
    orderBy: [{ kind: "asc" }, { createdAt: "asc" }],
  });
  const items: BibliographyView[] = rows.map((b) => ({
    id: b.id,
    kind: b.kind,
    reference: b.reference,
    url: b.url,
    fromContent: b.fromContent,
  }));

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        Referencias del curso. El enlace es para tu propio PDF/Drive.
        <HelpHint k="bibliografia" />
      </p>
      <BibliographySection subjectId={subject.id} items={items} />
    </div>
  );
}
