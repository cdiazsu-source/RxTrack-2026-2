import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { getModulesWithProgress } from "@/lib/queries";
import { pct } from "@/lib/progress";
import { relativeDays, urgencyOf } from "@/lib/relative-time";
import { formatDate, MODULE_STATUS_LABEL } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { ProgressRing } from "@/components/progress-ring";
import { HelpHint } from "@/components/help-hint";
import { EvaluationPanel, type EvaluationView } from "@/components/evaluation-panel";
import { AttendancePanel } from "@/components/attendance-panel";
import { WeeklyGoal } from "@/components/weekly-goal";
import { inlineLite } from "@/lib/markdown-lite";

export const dynamic = "force-dynamic";

const STATUS_SCORE: Record<string, number> = { NO_VISTO: 0, EN_PROGRESO: 0.5, DOMINADO: 1 };

export default async function SubjectDashboard({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const [modules, evaluation, keyDates] = await Promise.all([
    getModulesWithProgress(subject.id),
    prisma.evaluationItem.findMany({ where: { subjectId: subject.id }, orderBy: { order: "asc" } }),
    prisma.keyDate.findMany({ where: { subjectId: subject.id, date: { not: null } }, orderBy: { date: "asc" } }),
  ]);

  const n = modules.length;
  const estadoBar = n ? modules.reduce((a, m) => a + STATUS_SCORE[m.status], 0) / n : 0;
  const realBar = n
    ? modules.reduce((a, m) => {
        const cr = m.checklistTotal ? m.checklistDone / m.checklistTotal : 0;
        return a + (0.5 * cr + 0.3 * (m.sessionCount > 0 ? 1 : 0) + 0.2 * (m.status === "DOMINADO" ? 1 : 0));
      }, 0) / n
    : 0;
  const dominadosSinApuntes = modules.filter((m) => m.status === "DOMINADO" && m.sessionCount === 0);
  const dominados = modules.filter((m) => m.status === "DOMINADO").length;

  const upcoming = keyDates
    .filter((d) => d.date && new Date(d.date).getTime() >= Date.now() - 86400000)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      {subject.descriptionSummary && (
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: inlineLite(subject.descriptionSummary) }} />
            {subject.objectiveGeneral && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: inlineLite(subject.objectiveGeneral) }} />
            )}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {subject.credits && <span>{subject.credits} créditos</span>}
              {subject.scheduleTheory && <span>Teoría: {subject.scheduleTheory}</span>}
              {subject.scheduleLab && <span>Lab: {subject.scheduleLab}</span>}
              {subject.professors.length > 0 && <span>{subject.professors.join(" · ")}</span>}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1.5">
              Avance
              <HelpHint k="avance-real" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-5">
            <ProgressRing value={pct(realBar)} size={72} sublabel="real" />
            <div className="flex-1 space-y-3">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Por datos (apuntes + checklist + dominados)</p>
                <ProgressBar value={pct(realBar)} label={`${pct(realBar)}%`} inline />
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Por estado marcado a mano</p>
                <ProgressBar value={pct(estadoBar)} label={`${pct(estadoBar)}%`} inline />
              </div>
              <p className="text-xs text-muted-foreground">
                {dominados}/{n} módulos dominados
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Esta semana</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <WeeklyGoal subjectId={subject.id} goal={subject.weeklyGoal} />
            <AttendancePanel subjectId={subject.id} total={subject.totalClasses} missed={subject.attendanceMissed} />
          </CardContent>
        </Card>
      </div>

      {dominadosSinApuntes.length > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-warning/40 bg-warning/10 p-3 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <span>
            {dominadosSinApuntes.length === 1 ? "Un módulo está" : `${dominadosSinApuntes.length} módulos están`} marcado(s)
            como &ldquo;Dominado&rdquo; pero sin ningún apunte guardado:{" "}
            {dominadosSinApuntes.map((m, i) => (
              <span key={m.id}>
                {i > 0 && ", "}
                <Link href={`/${subject.id}/modulos/${m.id}`} className="font-medium text-primary hover:underline">
                  {m.title}
                </Link>
              </span>
            ))}
            .
          </span>
        </div>
      )}

      {evaluation.length > 0 && (
        <EvaluationPanel subjectId={subject.id} items={evaluation as EvaluationView[]} />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Módulos</CardTitle>
            <Link href={`/${subject.id}/modulos`} className="text-xs text-primary hover:underline">Ver todos</Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {modules.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin temario cargado todavía.</p>
            ) : (
              modules.slice(0, 5).map((m) => (
                <Link key={m.id} href={`/${subject.id}/modulos/${m.id}`} className="flex items-center gap-3 rounded-md p-2 hover:bg-muted/50">
                  <ProgressRing value={pct(m.progress)} size={38} stroke={4} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{MODULE_STATUS_LABEL[m.status]}</p>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas fechas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Sin fechas puestas.{" "}
                <Link href={`/${subject.id}/fechas`} className="text-primary hover:underline">Agrégalas</Link>.
              </p>
            ) : (
              upcoming.map((d) => (
                <div key={d.id} className="flex items-center justify-between text-sm">
                  <span>{d.name}</span>
                  <span className={urgencyOf(d.date) === "past" || urgencyOf(d.date) === "today" ? "font-semibold text-warning" : "text-muted-foreground"}>
                    {formatDate(d.date)} ({relativeDays(d.date)})
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
