import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { canUseCourses, courseProgress } from "@/lib/courses";
import { SectionRail } from "@/components/section-rail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseHeader } from "@/components/course-header";
import { CourseSessions, type CourseSessionView } from "@/components/course-sessions";
import { CourseTasks, type CourseTaskView } from "@/components/course-tasks";
import { CourseKeeps, type CourseKeepView } from "@/components/course-keeps";
import { CourseLinks } from "@/components/course-links";
import type { CoursePromptData } from "@/lib/course-prompt";
import { pct } from "@/lib/progress";

export const dynamic = "force-dynamic";

export default async function CursoPage({ params }: { params: { courseId: string } }) {
  const session = await getSession();
  if (!canUseCourses(session)) redirect("/");

  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    include: {
      sessions: { orderBy: [{ date: "desc" }, { number: "desc" }], include: { links: { orderBy: { order: "asc" } } } },
      tasks: { orderBy: [{ order: "asc" }, { createdAt: "asc" }] },
      links: { where: { sessionId: null }, orderBy: { order: "asc" } },
      keeps: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!course) notFound();

  const iso = (d: Date | null) => (d ? d.toISOString() : null);
  const linkView = (l: { id: string; name: string; url: string; kind: string }) => ({ id: l.id, name: l.name, url: l.url, kind: l.kind });

  const sessions: CourseSessionView[] = course.sessions.map((s) => ({
    id: s.id,
    number: s.number,
    date: iso(s.date),
    topic: s.topic,
    content: s.content,
    attended: s.attended,
    links: s.links.map(linkView),
  }));
  const tasks: CourseTaskView[] = course.tasks.map((t) => ({
    id: t.id,
    text: t.text,
    description: t.description,
    dueDate: iso(t.dueDate),
    done: t.done,
  }));
  const keeps: CourseKeepView[] = course.keeps.map((k) => ({ id: k.id, title: k.title, body: k.body, tag: k.tag, pinned: k.pinned }));
  const links = course.links.map(linkView);

  const attended = sessions.filter((s) => s.attended).length;
  const tasksDone = tasks.filter((t) => t.done).length;
  const progress = courseProgress({
    totalSessions: course.totalSessions,
    attendedSessions: attended,
    tasksDone,
    tasksTotal: tasks.length,
    status: course.status,
  });

  const courseValues = {
    title: course.title,
    provider: course.provider,
    modality: course.modality,
    status: course.status,
    goal: course.goal,
    instructor: course.instructor,
    schedule: course.schedule,
    location: course.location,
    startDate: iso(course.startDate),
    endDate: iso(course.endDate),
    totalSessions: course.totalSessions,
  };

  const promptData: CoursePromptData = {
    ...courseValues,
    sessions: [...sessions]
      .sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
      .map((s) => ({ number: s.number, date: s.date, topic: s.topic, content: s.content, attended: s.attended })),
    tasks: tasks.map((t) => ({ text: t.text, description: t.description, dueDate: t.dueDate, done: t.done })),
    keeps: keeps.map((k) => ({ title: k.title, body: k.body, tag: k.tag })),
    links: [...links, ...sessions.flatMap((s) => s.links)].map((l) => ({ name: l.name, url: l.url })),
  };

  return (
    <div className="flex flex-col gap-5 lg:pr-14">
      <SectionRail
        items={[
          { id: "resumen", label: "Resumen", icon: "info" },
          { id: "clases", label: "Clases y apuntes", icon: "notes" },
          { id: "tareas", label: "Tareas", icon: "checks" },
          { id: "futuro", label: "Para el futuro", icon: "note" },
          { id: "enlaces", label: "Enlaces", icon: "link" },
        ]}
      />

      <Link href="/cursos" className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Todos los cursos
      </Link>

      <section id="resumen" className="scroll-mt-24">
        <CourseHeader
          courseId={course.id}
          course={courseValues}
          progress={pct(progress)}
          stats={{ attended, sessions: sessions.length, tasksDone, tasksTotal: tasks.length }}
          promptData={promptData}
        />
      </section>

      <section id="clases" className="scroll-mt-24">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Clases y apuntes ({sessions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseSessions courseId={course.id} sessions={sessions} />
          </CardContent>
        </Card>
      </section>

      <section id="tareas" className="scroll-mt-24">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseTasks courseId={course.id} tasks={tasks} />
          </CardContent>
        </Card>
      </section>

      <section id="futuro" className="scroll-mt-24">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Para el futuro ({keeps.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseKeeps courseId={course.id} keeps={keeps} />
          </CardContent>
        </Card>
      </section>

      <section id="enlaces" className="scroll-mt-24">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Enlaces del curso</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseLinks courseId={course.id} links={links} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
