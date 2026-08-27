import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { FormulaSection, type FormulaView } from "@/components/formula-section";
import type { ModuleRef } from "@/components/glossary-section";
import { HelpHint } from "@/components/help-hint";

export const dynamic = "force-dynamic";

export default async function FormulasPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const [formulas, modules] = await Promise.all([
    prisma.formula.findMany({ where: { subjectId: subject.id }, orderBy: { createdAt: "asc" } }),
    prisma.module.findMany({ where: { subjectId: subject.id }, orderBy: { order: "asc" }, select: { id: true, title: true } }),
  ]);

  const items: FormulaView[] = formulas.map((f) => ({
    id: f.id,
    name: f.name,
    expression: f.expression,
    variables: f.variables,
    description: f.description,
    derivation: f.derivation,
    moduleId: f.moduleId,
  }));

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        Fórmulas de referencia con su desarrollo.
        <HelpHint k="formulas" />
      </p>
      <FormulaSection subjectId={subject.id} items={items} modules={modules as ModuleRef[]} />
    </div>
  );
}
