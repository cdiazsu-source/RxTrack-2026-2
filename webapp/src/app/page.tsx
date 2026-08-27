import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { listSubjects } from "@/lib/subjects";
import { getSubjectProgress } from "@/lib/queries";
import { buildFeed } from "@/lib/feed";
import { tickStreak } from "@/lib/actions/semester";
import { pct, semesterProgress, nextStreakMilestone } from "@/lib/progress";
import { relativeDays, urgencyOf, daysFromToday } from "@/lib/relative-time";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/progress-ring";
import { UpdatesFeed } from "@/components/updates-feed";
import { ResumeBanner } from "@/components/resume-banner";
import { HelpHint } from "@/components/help-hint";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SemesterPage() {
  const subjects = await listSubjects();

  const [progressBySubject, meta, feed, allDates, streakDays] = await Promise.all([
    Promise.all(subjects.map((s) => getSubjectProgress(s.id))),
    prisma.semesterMeta.findUnique({ where: { id: "singleton" } }),
    buildFeed({ limit: 18 }),
    prisma.keyDate.findMany({
      where: { date: { not: null } },
      orderBy: { date: "asc" },
      select: { id: true, name: true, date: true, subject: { select: { id: true, code: true } } },
    }),
    tickStreak().catch(() => 0),
  ]);

  const semPct = pct(semesterProgress(progressBySubject));
  const showStreak = meta?.showStreak ?? true;
  const milestone = nextStreakMilestone(streakDays);

  const ahora = allDates
    .filter((d) => {
      const n = daysFromToday(d.date);
      return n !== null && n >= -3 && n <= 21;
    })
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <ResumeBanner route={meta?.resumeRoute ?? null} label={meta?.resumeLabel ?? null} note={meta?.resumeNote ?? null} />

      <div className="grid gap-4 md:grid-cols-[auto_1fr]">
        <Card>
          <CardContent className="flex items-center gap-4 py-5">
            <ProgressRing value={semPct} size={84} stroke={7} sublabel="semestre" />
            {showStreak && (
              <div className="text-sm">
                <p className="text-2xl font-bold tabular-nums">{streakDays}</p>
                <p className="text-xs text-muted-foreground">
                  día{streakDays === 1 ? "" : "s"} de racha
                  <br />
                  próximo hito: {milestone}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1.5">
              Ahora
              <HelpHint text="Lo más cercano en el tiempo, de todas las asignaturas. Máximo 3, para no abrumar." />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {ahora.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nada urgente a la vista. Buen momento para adelantar apuntes.</p>
            ) : (
              ahora.map((d) => (
                <Link
                  key={d.id}
                  href={`/${d.subject.id}/fechas`}
                  className="flex items-center justify-between rounded-md p-2 text-sm hover:bg-muted/50"
                >
                  <span>
                    <span className="font-semibold text-primary">{d.subject.code}</span> · {d.name}
                  </span>
                  <span className={cn(["past", "today"].includes(urgencyOf(d.date)) ? "font-semibold text-warning" : "text-muted-foreground")}>
                    {formatDate(d.date)} ({relativeDays(d.date)})
                  </span>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Asignaturas</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s, i) => (
            <Link key={s.id} href={`/${s.id}`}>
              <Card className="flex h-full items-center gap-4 p-4 transition-shadow hover:shadow-card-hover">
                <ProgressRing value={pct(progressBySubject[i])} size={52} stroke={5} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-primary">{s.code}</p>
                  <p className="text-sm font-medium leading-snug">{s.name}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <UpdatesFeed items={feed} />
    </div>
  );
}
