import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { listSubjects } from "@/lib/subjects";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/progress-ring";
import { HelpHint } from "@/components/help-hint";

export const dynamic = "force-dynamic";

export default async function RepasoPage() {
  const subjects = await listSubjects();
  const now = new Date();

  const stats = await Promise.all(
    subjects.map(async (s) => {
      const [due, total] = await Promise.all([
        prisma.flashcard.count({ where: { subjectId: s.id, suspended: false, dueDate: { lte: now } } }),
        prisma.flashcard.count({ where: { subjectId: s.id, suspended: false } }),
      ]);
      return { subject: s, due, total };
    }),
  );

  const totalDue = stats.reduce((a, b) => a + b.due, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="flex items-center gap-1.5 text-2xl font-bold">
          Repaso
          <HelpHint text="Tarjetas con repetición espaciada. Se generan del glosario y las fórmulas de cada asignatura, o las creas a mano. Repasa poco y seguido." />
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalDue === 0 ? "Nada pendiente hoy. 👌" : `${totalDue} tarjeta(s) para hoy en total.`}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ subject, due, total }) => (
          <Link key={subject.id} href={`/${subject.id}/repaso`} className="press-card block">
            <Card className="flex h-full items-center gap-4 p-4 transition-shadow hover:shadow-card-hover">
              <ProgressRing
                value={total ? ((total - due) / total) * 100 : 0}
                size={52}
                stroke={5}
                label={due > 0 ? String(due) : "✓"}
                sublabel="hoy"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-primary">{subject.code}</p>
                <p className="text-sm font-medium leading-snug">{subject.name}</p>
                <p className="text-xs text-muted-foreground">
                  {total === 0 ? "sin tarjetas" : `${total} tarjeta(s)`}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
