import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { canEdit } from "@/lib/session";
import { deleteProject, setProjectDriveUrl } from "@/lib/actions/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectStatusSelect } from "@/components/project-status-select";
import { DriveLinkEditor } from "@/components/drive-link-editor";
import { ResumeTracker } from "@/components/resume-banner";
import { Checklist } from "@/components/checklist";
import { NotesLog, type NoteView } from "@/components/notes-log";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: { subject: string; projectId: string };
}) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const project = await prisma.project.findFirst({
    where: { id: params.projectId, subjectId: subject.id },
    include: {
      checklistItems: { orderBy: { order: "asc" } },
      notes: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!project) notFound();

  const editable = await canEdit();
  const notes: NoteView[] = project.notes.map((n) => ({
    id: n.id,
    body: n.body,
    author: n.author,
    authorRole: n.authorRole,
    createdAt: n.createdAt.toISOString(),
  }));

  return (
    <div className="flex flex-col gap-5">
      <ResumeTracker route={`/${subject.id}/proyectos/${project.id}`} label={`Proyecto · ${subject.code} · ${project.title}`} />

      <Link href={`/${subject.id}/proyectos`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver a proyectos
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.category && <Badge variant="outline">{project.category}</Badge>}
          {project.isManual && <Badge variant="secondary">Propio</Badge>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold leading-tight">{project.title}</h2>
          <DriveLinkEditor url={project.driveUrl} action={setProjectDriveUrl.bind(null, project.id)} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Estado:</span>
          <ProjectStatusSelect projectId={project.id} status={project.status} />
          {editable && project.isManual && (
            <form action={deleteProject.bind(null, project.id, subject.id)} className="ml-auto">
              <Button type="submit" size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
                Eliminar
              </Button>
            </form>
          )}
        </div>
      </div>

      <Checklist
        parent={{ type: "project", id: project.id }}
        items={project.checklistItems.map((c) => ({ id: c.id, text: c.text, done: c.done, order: c.order }))}
      />

      <NotesLog projectId={project.id} notes={notes} />
    </div>
  );
}
