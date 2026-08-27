import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { ContextPromptBox } from "@/components/prompt-box";
import { HelpHint } from "@/components/help-hint";

export const dynamic = "force-dynamic";

export default async function PromptIaPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const modules = await prisma.module.findMany({
    where: { subjectId: subject.id },
    orderBy: { order: "asc" },
    select: { title: true, description: true },
  });

  return (
    <div className="flex flex-col gap-4">
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        Arma un prompt con el temario de esta asignatura para pegarlo en tu asistente. La app no se conecta a ninguna IA.
        <HelpHint k="prompt-ia" />
      </p>
      <ContextPromptBox subjectName={subject.name} modules={modules} />
    </div>
  );
}
