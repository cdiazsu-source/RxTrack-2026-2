"use client";

import { useState, useTransition } from "react";
import { ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import type { LabReportStatus } from "@prisma/client";

import {
  addLabReport,
  deleteLabReport,
  setLabReportDriveUrl,
  setLabReportGrade,
  setLabReportStatus,
  updateLabReport,
} from "@/lib/actions/lab-reports";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { HelpHint } from "@/components/help-hint";
import { DriveLinkEditor } from "@/components/drive-link-editor";
import { toast } from "@/components/ui/toast";
import { Checklist, type ChecklistItemView } from "@/components/checklist";
import { useCanEdit } from "@/components/access-context";
import { renderCornell } from "@/lib/markdown-lite";
import { cn, formatDate, LAB_REPORT_STATUS_LABEL } from "@/lib/utils";

const STEPS: LabReportStatus[] = ["PENDIENTE", "ENTREGADO", "CALIFICADO"];

export type LabReportView = {
  id: string;
  number: number | null;
  title: string;
  status: LabReportStatus;
  grade: number | null;
  dueDate: string | null; // ISO
  driveUrl: string | null;
  content: string;
  order: number;
  checklistItems: ChecklistItemView[];
};

function fmtGrade(n: number) {
  return n.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
}

function ReportForm({
  subjectId,
  report,
  onDone,
}: {
  subjectId: string;
  report?: LabReportView;
  onDone: () => void;
}) {
  return (
    <form
      action={async (fd) => {
        if (report) await updateLabReport(report.id, fd);
        else await addLabReport(subjectId, fd);
        toast(report ? "Informe actualizado" : "Informe agregado");
        onDone();
      }}
      className="flex flex-col gap-2 rounded-md border border-dashed border-input p-3"
    >
      <div className="flex flex-wrap gap-2">
        <Input name="number" type="number" min={1} placeholder="N.º" defaultValue={report?.number ?? ""} className="w-20" />
        <Input name="title" placeholder="Título del informe" defaultValue={report?.title ?? ""} required className="min-w-[10rem] flex-1" />
        <Input name="dueDate" type="date" defaultValue={report?.dueDate ? report.dueDate.slice(0, 10) : ""} className="w-40" />
      </div>
      {report && (
        <>
          <label className="text-xs font-medium text-muted-foreground">Desarrollo / notas (Markdown)</label>
          <Textarea
            name="content"
            defaultValue={report.content}
            rows={8}
            className="font-mono text-xs"
            placeholder={"#### Objetivo\n…\n\n#### Resultados\n…"}
          />
        </>
      )}
      <div className="flex gap-2">
        <Button type="submit" size="sm">{report ? "Guardar cambios" : "Agregar"}</Button>
        <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}

function ReportRow({ subjectId, r }: { subjectId: string; r: LabReportView }) {
  const canEdit = useCanEdit();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [pending, start] = useTransition();
  const currentIdx = STEPS.indexOf(r.status);

  if (editing && canEdit) {
    return <ReportForm subjectId={subjectId} report={r} onDone={() => setEditing(false)} />;
  }

  return (
    <div className="group rounded-md border border-border">
      <div className="flex flex-wrap items-center gap-3 p-3">
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex flex-1 items-center gap-2 text-left">
          <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
          <span className="text-sm font-semibold">
            {r.number ? `Informe ${r.number}` : "Informe"}
            <span className="ml-1.5 font-normal text-muted-foreground">— {r.title}</span>
          </span>
        </button>

        <div className="flex shrink-0 gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              disabled={!canEdit || pending}
              onClick={() => start(() => setLabReportStatus(r.id, s))}
              className={cn(
                "rounded-md border px-2 py-1 text-[11px] font-medium transition-colors",
                i <= currentIdx
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input text-muted-foreground hover:bg-accent",
                !canEdit && "cursor-default",
              )}
            >
              {LAB_REPORT_STATUS_LABEL[s]}
            </button>
          ))}
        </div>

        {canEdit ? (
          <form action={(fd) => setLabReportGrade(r.id, fd)} className="flex shrink-0 items-center gap-1">
            <Input name="grade" defaultValue={r.grade ?? ""} placeholder="Nota" inputMode="decimal" className="h-7 w-16 text-center text-xs" />
            <Button type="submit" size="sm" variant="ghost">OK</Button>
          </form>
        ) : (
          <span className="w-16 shrink-0 text-center text-xs tabular-nums">{r.grade === null ? "—" : fmtGrade(r.grade)}</span>
        )}

        {canEdit && (
          <div className="hover-reveal flex shrink-0 items-center gap-1">
            <button type="button" onClick={() => setEditing(true)} className="tap rounded-md text-muted-foreground hover:bg-accent" aria-label="Editar informe">
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                deleteLabReport(r.id);
                toast("Informe eliminado", "info");
              }}
              className="tap rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              aria-label="Eliminar informe"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-border p-3">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span>Entrega: {r.dueDate ? formatDate(r.dueDate) : "sin fecha"}</span>
            <DriveLinkEditor url={r.driveUrl} action={setLabReportDriveUrl.bind(null, r.id)} label="Informe en Drive" />
          </div>

          <Checklist parent={{ type: "labReport", id: r.id }} items={r.checklistItems} title="Preparación" />

          {r.content ? (
            <div className="cornell text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(r.content) }} />
          ) : (
            <p className="text-sm text-muted-foreground">
              {canEdit ? "Sin desarrollo todavía — pulsa el lápiz para agregarlo." : "Sin desarrollo."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function LabReportsPanel({ subjectId, reports }: { subjectId: string; reports: LabReportView[] }) {
  const canEdit = useCanEdit();
  const [adding, setAdding] = useState(false);
  const sorted = [...reports].sort((a, b) => a.order - b.order);
  const graded = sorted.filter((r) => r.status === "CALIFICADO").length;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          Laboratorio
          <span className="font-normal text-muted-foreground">
            ({sorted.length} informe{sorted.length === 1 ? "" : "s"})
          </span>
          <HelpHint text="Informes de laboratorio de la asignatura. Los agregas tú a mano, uno por práctica; cada uno lleva estado, nota, fecha de entrega, enlace a Drive, checklist de preparación y desarrollo en Markdown." />
        </CardTitle>
        {canEdit && (
          <Button size="sm" variant="outline" onClick={() => setAdding((s) => !s)}>
            <Plus className="h-3.5 w-3.5" />
            Agregar informe
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {sorted.length > 0 && (
          <ProgressBar value={sorted.length ? (graded / sorted.length) * 100 : 0} label={`${graded}/${sorted.length} calificados`} inline />
        )}

        {canEdit && adding && <ReportForm subjectId={subjectId} onDone={() => setAdding(false)} />}

        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {canEdit ? "Aún no hay informes. Agrega el primero — número y título bastan para empezar." : "Sin informes todavía."}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {sorted.map((r) => (
              <ReportRow key={r.id} subjectId={subjectId} r={r} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
