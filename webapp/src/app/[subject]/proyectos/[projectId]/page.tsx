import { SectionRail } from "@/components/section-rail";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Trash2 } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { canEdit } from "@/lib/session";
import { PEOPLE } from "@/lib/auth";
import { deleteProject, setProjectDriveUrl } from "@/lib/actions/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectStatusSelect } from "@/components/project-status-select";
import { DriveLinkEditor } from "@/components/drive-link-editor";
import { ResumeTracker } from "@/components/resume-banner";
import { Checklist } from "@/components/checklist";
import { NotesLog, type NoteView } from "@/components/notes-log";
import { HelpHint } from "@/components/help-hint";
import { FocusMode } from "@/components/focus-mode";
import { ProjectLinks } from "@/components/project-links";
import { ProjectMembers } from "@/components/project-members";
import { renderCornell } from "@/lib/markdown-lite";
import { projectContextPrompt } from "@/lib/prompts";
import { parseNoteLinks } from "@/lib/url";
import { ProjectContextButton } from "@/components/project-context-button";

const STATUS_LABEL = { POR_INICIAR: "Por iniciar", EN_CURSO: "En curso", COMPLETADO: "Completado" } as const;
const fmtDate = (d: Date) => d.toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric", timeZone: "America/Bogota" });

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: { subject: string; projectId: string };
  searchParams?: { enfoque?: string };
}) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const project = await prisma.project.findFirst({
    where: { id: params.projectId, subjectId: subject.id },
    include: {
      checklistItems: { orderBy: { order: "asc" } },
      links: { orderBy: [{ order: "asc" }, { createdAt: "asc" }] },
      members: { orderBy: [{ order: "asc" }, { createdAt: "asc" }] },
      notes: {
        orderBy: { createdAt: "desc" },
        include: { checklistItem: { select: { text: true, done: true } } },
      },
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
    checklistItemId: n.checklistItemId,
    checklistItemText: n.checklistItem?.text ?? null,
    checklistItemDone: n.checklistItem?.done ?? false,
    mentions: n.mentions,
    links: parseNoteLinks(n.links),
  }));
  const checkItems = project.checklistItems.map((c) => ({ id: c.id, text: c.text, done: c.done, description: c.description }));

  const contextBase = projectContextPrompt({
    subjectName: subject.name,
    subjectCode: subject.code,
    professors: subject.professors,
    projectTitle: project.title,
    category: project.category,
    status: STATUS_LABEL[project.status],
    description: project.description,
    checklist: checkItems.map((c) => ({ text: c.text, done: c.done, description: c.description })),
    team: project.members.map((m) => ({ name: m.name, role: m.role })),
    links: project.links.map((l) => ({ name: l.name, url: l.url })),
    driveUrl: project.driveUrl,
    focusNote: project.focusNote,
    notes: project.notes
      .slice(0, 10)
      .map((n) => ({ author: n.author, createdAt: fmtDate(n.createdAt), body: n.body, links: parseNoteLinks(n.links) })),
    today: fmtDate(new Date()),
  });

  return (
    <div className="flex flex-col gap-5 lg:pr-14">
      <SectionRail
        items={[
          ...(project.description ? [{ id: "contexto", label: "Contexto del proyecto", icon: "info" as const }] : []),
          { id: "equipo", label: "Equipo del proyecto", icon: "team" },
          { id: "enlaces", label: "Documentos y enlaces", icon: "link" },
          { id: "enfoque", label: "Modo Enfoque", icon: "target" },
          { id: "checklist", label: "Subtareas", icon: "checks" },
          { id: "bitacora", label: "Bitácora", icon: "chat" },
        ]}
      />
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
          <h2 className="flex items-center gap-1.5 text-xl font-bold leading-tight">
            {project.title}
            <HelpHint k="proyecto-cabecera" />
          </h2>
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

      <ProjectContextButton base={contextBase} />

      {project.description && (
        <details id="contexto" open className="group scroll-mt-24 rounded-lg border border-border bg-card [&_summary]:list-none">
          <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-sm font-medium">
            Contexto del proyecto
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
          </summary>
          <div
            className="cornell border-t border-border p-4 pt-3 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderCornell(project.description) }}
          />
        </details>
      )}

      <section id="equipo" className="scroll-mt-24">
        <ProjectMembers projectId={project.id} members={project.members.map((m) => ({ id: m.id, name: m.name, role: m.role }))} />
      </section>

      <section id="enlaces" className="scroll-mt-24">
        <ProjectLinks projectId={project.id} links={project.links.map((l) => ({ id: l.id, name: l.name, url: l.url }))} />
      </section>

      <section id="enfoque" className="scroll-mt-24">
      <FocusMode
        projectId={project.id}
        projectTitle={project.title}
        subjectId={subject.id}
        subjectName={subject.name}
        driveUrl={project.driveUrl}
        items={project.checklistItems.map((c) => ({ id: c.id, text: c.text, done: c.done }))}
        focusNote={project.focusNote}
        focusMinutes={project.focusMinutes}
        autoOpen={searchParams?.enfoque === "1"}
      />
      </section>

      <section id="checklist" className="scroll-mt-24">
        <Checklist
          parent={{ type: "project", id: project.id }}
          items={project.checklistItems.map((c) => ({ id: c.id, text: c.text, description: c.description, done: c.done, order: c.order }))}
        />
      </section>

      <section id="bitacora" className="scroll-mt-24">
        <NotesLog projectId={project.id} notes={notes} checklistItems={checkItems} people={PEOPLE} members={project.members.map((m) => m.name)} />
      </section>
    </div>
  );
}
