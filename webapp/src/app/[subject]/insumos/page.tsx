import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { InsumosSection, type PastMaterialView } from "@/components/insumos-section";
import { PromptBox } from "@/components/prompt-box";
import { patternsPrompt } from "@/lib/prompts";
import { HelpHint } from "@/components/help-hint";

export const dynamic = "force-dynamic";

export default async function InsumosPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const rows = await prisma.pastMaterial.findMany({
    where: { subjectId: subject.id },
    orderBy: { createdAt: "desc" },
  });
  const items: PastMaterialView[] = rows.map((m) => ({
    id: m.id,
    kind: m.kind,
    title: m.title,
    semester: m.semester,
    url: m.url,
    patterns: m.patterns,
  }));

  const prompt = patternsPrompt(
    subject.name,
    items.map((m) => ({ title: m.title, semester: m.semester, patterns: m.patterns })),
  );

  return (
    <div className="flex flex-col gap-5">
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        Talleres y simulacros de semestres anteriores. El campo &ldquo;patrones&rdquo; alimenta el prompt de análisis.
        <HelpHint k="insumos" />
      </p>
      <InsumosSection subjectId={subject.id} items={items} />

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Prompt: análisis de patrones de evaluación</h3>
        <PromptBox text={prompt} rows={10} />
      </div>
    </div>
  );
}
