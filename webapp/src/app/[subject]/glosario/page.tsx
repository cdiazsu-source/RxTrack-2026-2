import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { GlossarySection, type GlossaryView, type ModuleRef } from "@/components/glossary-section";
import { HelpHint } from "@/components/help-hint";

export const dynamic = "force-dynamic";

export default async function GlossaryPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const [terms, modules] = await Promise.all([
    prisma.glossaryTerm.findMany({ where: { subjectId: subject.id }, orderBy: { term: "asc" } }),
    prisma.module.findMany({ where: { subjectId: subject.id }, orderBy: { order: "asc" }, select: { id: true, title: true } }),
  ]);

  const items: GlossaryView[] = terms.map((t) => ({
    id: t.id,
    term: t.term,
    definition: t.definition,
    moduleId: t.moduleId,
  }));

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        Términos y definiciones. Puedes ligar cada uno a un módulo.
        <HelpHint k="glosario" />
      </p>
      <GlossarySection subjectId={subject.id} items={items} modules={modules as ModuleRef[]} />
    </div>
  );
}
