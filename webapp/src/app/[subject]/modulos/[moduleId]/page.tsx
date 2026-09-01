import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronRight } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { setModuleDriveUrl } from "@/lib/actions/modules";
import { moduleProgress, pct } from "@/lib/progress";
import { ModuleStatusSelect } from "@/components/module-status-select";
import { DriveLinkEditor } from "@/components/drive-link-editor";
import { ProgressRing } from "@/components/progress-ring";
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
    transcript: s.transcript,
    slidesUrl: s.slidesUrl,
    author: s.author,
  }));

  // Progreso del módulo — mismo cálculo que el resto de la app (lib/progress.ts).
  const checklistDone = mod.checklistItems.filter((c) => c.done).length;
  const progress = moduleProgress({
    status: mod.status,
    checklistDone,
    checklistTotal: mod.checklistItems.length,
    sessionCount: mod.sessions.length,
    hasLab: mod.hasLab,
    labReportStatus: mod.labReportStatus,
  });

  // TDAH — criterio 1: UNA sola acción siguiente, decidida por el sistema.
  const firstUndone = mod.checklistItems.find((c) => !c.done);
  const labPending = mod.hasLab && mod.labReportStatus !== "ENTREGADO" && mod.labReportStatus !== "CALIFICADO";
  let nextAction: { label: string; href: string } | null = null;
  if (mod.sessions.length === 0) {
    nextAction = { label: "Escribe los apuntes de la primera sesión", href: "#apuntes" };
  } else if (firstUndone) {
    nextAction = { label: `Marca la subtarea: ${firstUndone.text}`, href: "#checklist" };
  } else if (labPending) {
    nextAction = { label: "Prepara y marca el informe de laboratorio", href: "#lab" };
  } else if (mod.status !== "DOMINADO") {
    nextAction = { label: "Repasa y marca el módulo como dominado", href: "#apuntes" };
  }

  return (
    <div className="flex flex-col gap-5">
      <ResumeTracker route={`/${subject.id}/modulos/${mod.id}`} label={`Apuntes · ${subject.code} · ${mod.title}`} />

      <Link
        href={`/${subject.id}/modulos`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a módulos
      </Link>

      {/* Cabecera: título + avance + la única acción siguiente, siempre arriba. */}
      <div className="flex flex-col gap-4 rounded-xl border border-primary/30 bg-primary/[0.04] p-5 shadow-card">
        <div className="flex items-start gap-4">
          <ProgressRing value={pct(progress)} size={64} stroke={6} sublabel="módulo" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{subject.code}</p>
            <h2 className="text-xl font-bold leading-tight">{mod.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">Estado:</span>
              <ModuleStatusSelect moduleId={mod.id} status={mod.status} />
              <DriveLinkEditor url={mod.driveUrl} action={setModuleDriveUrl.bind(null, mod.id)} />
            </div>
          </div>
        </div>

        {nextAction ? (
          <a
            href={nextAction.href}
            className="rx-next flex items-center justify-between gap-3 rounded-lg px-4 py-3.5"
          >
            <span className="flex flex-col gap-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">Empieza por aquí</span>
              <span className="text-sm font-medium leading-snug">{nextAction.label}</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          </a>
        ) : (
          <p className="flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3.5 text-sm font-medium">
            <Check className="h-4 w-4 shrink-0 text-success" aria-hidden />
            Módulo al día. No hay nada pendiente aquí.
          </p>
        )}
      </div>

      {/* Descripción: plegada por defecto — no es lo primero que hay que hacer. */}
      <details className="group rounded-lg border border-border bg-card [&_summary]:list-none">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-sm font-medium">
          Descripción del módulo
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
        </summary>
        <div
          className="border-t border-border p-4 pt-3 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: inlineLite(mod.description) }}
        />
      </details>

      <section id="apuntes" className="scroll-mt-24">
        <SessionNotes moduleId={mod.id} subjectName={subject.name} moduleTitle={mod.title} sessions={sessions} />
      </section>

      <section id="checklist" className="scroll-mt-24">
        <Checklist
          parent={{ type: "module", id: mod.id }}
          items={mod.checklistItems.map((c) => ({ id: c.id, text: c.text, done: c.done, order: c.order }))}
          title="Checklist del módulo"
        />
      </section>

      <ResourcesPanel moduleId={mod.id} resources={mod.resources} />

      {mod.hasLab && (
        <section id="lab" className="scroll-mt-24">
          <LabPanel
            moduleId={mod.id}
            protocol={mod.labProtocol}
            reportStatus={mod.labReportStatus}
            materials={mod.labMaterials}
          />
        </section>
      )}
    </div>
  );
}
