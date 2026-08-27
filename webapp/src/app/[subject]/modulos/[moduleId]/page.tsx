import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { setModuleDriveUrl } from "@/lib/actions/modules";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleStatusSelect } from "@/components/module-status-select";
import { DriveLinkEditor } from "@/components/drive-link-editor";
import { ResumeTracker } from "@/components/resume-banner";
import { SessionNotes, type SessionView } from "@/components/session-notes";
import { Checklist } from "@/components/checklist";
import { ResourcesPanel } from "@/components/resources-panel";
import { LabPanel } from "@/components/lab-panel";
import { inlineLite } from "@/lib/markdown-lite";

export const dynamic = "force-dynamic";

export default async function ModuleDetailPage({
  params,
}: {
  params: { subject: string; moduleId: string };
}) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const mod = await prisma.module.findFirst({
    where: { id: params.moduleId, subjectId: subject.id },
    include: {
      sessions: { orderBy: { number: "asc" } },
      checklistItems: { orderBy: { order: "asc" } },
      resources: { orderBy: { order: "asc" } },
      labMaterials: { orderBy: { order: "asc" } },
    },
  });
  if (!mod) notFound();

  const sessions: SessionView[] = mod.sessions.map((s) => ({
    id: s.id,
    number: s.number,
    date: s.date ? s.date.toISOString() : null,
    topic: s.topic,
    content: s.content,
    author: s.author,
  }));

  return (
    <div className="flex flex-col gap-5">
      <ResumeTracker route={`/${subject.id}/modulos/${mod.id}`} label={`Apuntes · ${subject.code} · ${mod.title}`} />

      <Link href={`/${subject.id}/modulos`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver a módulos
      </Link>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold leading-tight">{mod.title}</h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">Estado:</span>
          <ModuleStatusSelect moduleId={mod.id} status={mod.status} />
          <DriveLinkEditor url={mod.driveUrl} action={setModuleDriveUrl.bind(null, mod.id)} />
        </div>
      </div>

      <Card>
        <CardContent className="pt-5">
          <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: inlineLite(mod.description) }} />
        </CardContent>
      </Card>

      <SessionNotes moduleId={mod.id} subjectName={subject.name} moduleTitle={mod.title} sessions={sessions} />

      <Checklist
        parent={{ type: "module", id: mod.id }}
        items={mod.checklistItems.map((c) => ({ id: c.id, text: c.text, done: c.done, order: c.order }))}
        title="Checklist del módulo"
      />

      <ResourcesPanel moduleId={mod.id} resources={mod.resources} />

      {mod.hasLab && (
        <LabPanel
          moduleId={mod.id}
          protocol={mod.labProtocol}
          reportStatus={mod.labReportStatus}
          materials={mod.labMaterials}
        />
      )}
    </div>
  );
}
