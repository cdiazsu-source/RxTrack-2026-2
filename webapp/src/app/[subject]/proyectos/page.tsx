import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { buildFeed } from "@/lib/feed";
import { ProjectCard, type ProjectCardView } from "@/components/project-card";
import { NewProjectForm } from "@/components/new-project-form";
import { UpdatesFeed } from "@/components/updates-feed";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const [projects, feed] = await Promise.all([
    prisma.project.findMany({
      where: { subjectId: subject.id },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        title: true,
        category: true,
        status: true,
        isManual: true,
        checklistItems: { select: { done: true } },
      },
    }),
    buildFeed({ subjectId: subject.id, limit: 12 }),
  ]);

  const cards: ProjectCardView[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    isManual: p.isManual,
    done: p.checklistItems.filter((c) => c.done).length,
    total: p.checklistItems.length,
  }));

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        Entregables, informes, parciales a preparar, producto final. Cada uno con su checklist, su bitácora y su estado.
      </p>

      <NewProjectForm subjectId={subject.id} subjectSlug={subject.id} />

      {cards.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sin proyectos todavía.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((p) => (
            <ProjectCard key={p.id} project={p} subjectSlug={subject.id} />
          ))}
        </div>
      )}

      <UpdatesFeed items={feed} title="Actividad de la asignatura" />
    </div>
  );
}
