import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarClock, GraduationCap } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
  COURSE_MODALITY_LABEL,
  COURSE_STATUS_LABEL,
  canUseCourses,
  courseProgress,
  type CourseModality,
  type CourseStatus,
} from "@/lib/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/progress-ring";
import { NewCourse } from "@/components/new-course";
import { pct } from "@/lib/progress";
import { formatDate } from "@/lib/utils";
import { daysFromToday, relativeDays, urgencyOf } from "@/lib/relative-time";

export const dynamic = "force-dynamic";

const STATUS_VARIANT: Record<CourseStatus, "default" | "secondary" | "success" | "warning"> = {
  POR_INICIAR: "secondary",
  EN_CURSO: "default",
  PAUSADO: "warning",
  COMPLETADO: "success",
};

export default async function CursosPage() {
  const session = await getSession();
  if (!canUseCourses(session)) redirect("/");

  const courses = await prisma.course.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: {
      sessions: { select: { attended: true, date: true } },
      tasks: { select: { id: true, text: true, done: true, dueDate: true } },
    },
  });

  const rows = courses.map((c) => {
    const attended = c.sessions.filter((s) => s.attended).length;
    const tasksDone = c.tasks.filter((t) => t.done).length;
    const progress = courseProgress({
      totalSessions: c.totalSessions,
      attendedSessions: attended,
      tasksDone,
      tasksTotal: c.tasks.length,
      status: c.status,
    });
    const lastClass = c.sessions.map((s) => s.date).filter((d): d is Date => !!d).sort((a, b) => +b - +a)[0] ?? null;
    return { c, attended, tasksDone, progress, lastClass };
  });

  // Lo que viene: tareas pendientes de todos los cursos activos, las que vencen primero arriba.
  const upcoming = courses
    .filter((c) => c.status !== "COMPLETADO")
    .flatMap((c) => c.tasks.filter((t) => !t.done).map((t) => ({ ...t, courseId: c.id, courseTitle: c.title })))
    .sort((a, b) => (a.dueDate ? +a.dueDate : Infinity) - (b.dueDate ? +b.dueDate : Infinity))
    .slice(0, 6);

  const active = rows.filter((r) => r.c.status !== "COMPLETADO");
  const finished = rows.filter((r) => r.c.status === "COMPLETADO");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <GraduationCap className="h-6 w-6 text-primary" aria-hidden />
            Cursos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tus cursos virtuales y presenciales fuera de la carrera: apuntes por clase, tareas, enlaces y lo que quieres guardar para el futuro.
          </p>
        </div>
        {rows.length > 0 && <NewCourse />}
      </div>

      {rows.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-start gap-3 pt-5">
            <p className="text-sm text-muted-foreground">Todavía no registras ningún curso.</p>
            <NewCourse primary />
          </CardContent>
        </Card>
      )}

      {upcoming.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-base">
              <CalendarClock className="h-4 w-4" aria-hidden />
              Lo que viene
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            {upcoming.map((t) => {
              const u = urgencyOf(t.dueDate);
              const hot = u === "past" || u === "today";
              return (
                <Link key={t.id} href={`/cursos/${t.courseId}#tareas`} className="flex flex-wrap items-baseline gap-x-2 rounded-md px-1 py-1 text-sm hover:bg-muted/50">
                  <span className="min-w-0 flex-1">{t.text}</span>
                  <span className="text-xs text-muted-foreground">{t.courseTitle}</span>
                  <span className={hot ? "text-xs font-semibold text-warning" : "text-xs text-muted-foreground"}>
                    {t.dueDate ? `${formatDate(t.dueDate)} · ${relativeDays(t.dueDate)}` : "sin fecha"}
                  </span>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      )}

      {active.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {active.map(({ c, attended, tasksDone, progress, lastClass }) => {
            const pending = c.tasks.length - tasksDone;
            const nextDue = c.tasks
              .filter((t) => !t.done && t.dueDate)
              .sort((a, b) => +a.dueDate! - +b.dueDate!)[0];
            return (
              <Link key={c.id} href={`/cursos/${c.id}`} className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Card className="h-full transition-colors group-hover:border-primary/40">
                  <CardContent className="flex items-start gap-4 pt-5">
                    <ProgressRing value={pct(progress)} size={64} />
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold leading-tight">{c.title}</p>
                      {c.provider && <p className="text-xs text-muted-foreground">{c.provider}</p>}
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {c.modality && <Badge variant="outline">{COURSE_MODALITY_LABEL[c.modality as CourseModality] ?? c.modality}</Badge>}
                        <Badge variant={STATUS_VARIANT[c.status as CourseStatus] ?? "secondary"}>
                          {COURSE_STATUS_LABEL[c.status as CourseStatus] ?? c.status}
                        </Badge>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {attended}
                        {c.totalSessions ? `/${c.totalSessions}` : ""} clases · {tasksDone}/{c.tasks.length} tareas
                        {pending > 0 && nextDue?.dueDate && (
                          <>
                            {" · "}
                            <span className={(daysFromToday(nextDue.dueDate) ?? 1) <= 0 ? "font-semibold text-warning" : undefined}>
                              próxima entrega {relativeDays(nextDue.dueDate)}
                            </span>
                          </>
                        )}
                      </p>
                      {lastClass && <p className="text-xs text-muted-foreground">Última clase: {formatDate(lastClass)} ({relativeDays(lastClass)})</p>}
                      {c.schedule && <p className="text-xs text-muted-foreground">{c.schedule}</p>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {finished.length > 0 && (
        <details className="rounded-lg border border-border">
          <summary className="cursor-pointer px-4 py-2 text-sm font-medium text-muted-foreground">Completados ({finished.length})</summary>
          <ul className="flex flex-col divide-y divide-border border-t border-border">
            {finished.map(({ c }) => (
              <li key={c.id}>
                <Link href={`/cursos/${c.id}`} className="block px-4 py-2 text-sm hover:bg-muted/40">
                  {c.title}
                  {c.provider ? <span className="text-muted-foreground"> · {c.provider}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
