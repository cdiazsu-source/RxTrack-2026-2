import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { FlashcardReview, type ReviewCard } from "@/components/flashcard-review";
import { FlashcardGenerateButton } from "@/components/flashcard-generate-button";
import { HelpHint } from "@/components/help-hint";

export const dynamic = "force-dynamic";

const NEW_PER_SESSION = 15;
const MAX_PER_SESSION = 60;

export default async function SubjectRepasoPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const now = new Date();
  const [due, fresh, total] = await Promise.all([
    prisma.flashcard.findMany({
      where: { subjectId: subject.id, suspended: false, dueDate: { lte: now }, reps: { gt: 0 } },
      orderBy: { dueDate: "asc" },
      take: MAX_PER_SESSION,
    }),
    prisma.flashcard.findMany({
      where: { subjectId: subject.id, suspended: false, reps: 0 },
      orderBy: { createdAt: "asc" },
      take: NEW_PER_SESSION,
    }),
    prisma.flashcard.count({ where: { subjectId: subject.id, suspended: false } }),
  ]);

  const queue = [...due, ...fresh].slice(0, MAX_PER_SESSION);
  const cards: ReviewCard[] = queue.map((c) => ({
    id: c.id,
    front: c.front,
    back: c.back,
    srs: { intervalDays: c.intervalDays, easeFactor: c.easeFactor, reps: c.reps, lapses: c.lapses },
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          {total} tarjeta(s) · {due.length} para repasar · {fresh.length} nuevas
          <HelpHint text="Repaso con repetición espaciada (SM-2). 'Otra vez' la vuelve a mostrar hoy; las demás la programan para más adelante según qué tan fácil fue." />
        </p>
        <FlashcardGenerateButton subjectId={subject.id} />
      </div>

      {cards.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-10 text-center">
          {total === 0 ? (
            <p className="text-sm text-muted-foreground">
              Todavía no hay tarjetas. Genera desde el glosario y las fórmulas con el botón de arriba.
            </p>
          ) : (
            <>
              <p className="text-3xl">✓</p>
              <p className="mt-2 text-sm font-medium">Nada para repasar ahora. Vuelve más tarde.</p>
            </>
          )}
          <Link href={`/${subject.id}`} className="mt-3 inline-block text-sm text-primary hover:underline">Volver al panel</Link>
        </div>
      ) : (
        <FlashcardReview cards={cards} backHref={`/${subject.id}`} />
      )}
    </div>
  );
}
