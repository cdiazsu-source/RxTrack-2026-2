"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { addLabPracticeNote, deleteLabPracticeNote, updateLabPracticeNote } from "@/lib/actions/lab-notes";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LAB_NOTE_KINDS, LAB_NOTE_KIND_LABEL, asLabNoteKind, type LabNoteKind } from "@/lib/lab-log";
import { cn, formatDateTime } from "@/lib/utils";

export type LabNoteView = {
  id: string;
  kind: string;
  body: string;
  author: string;
  authorRole: string | null;
  createdAt: string;
};

const KIND_STYLE: Record<LabNoteKind, string> = {
  OBSERVACION: "bg-secondary text-secondary-foreground",
  DATO: "bg-primary/15 text-primary",
  INCIDENTE: "bg-destructive/15 text-destructive",
  PENDIENTE: "bg-warning/20 text-warning",
};

function KindSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <select
      name="kind"
      defaultValue={asLabNoteKind(defaultValue)}
      aria-label="Tipo de entrada"
      className="rounded-md border border-input bg-background px-2 py-2 text-sm"
    >
      {LAB_NOTE_KINDS.map((k) => (
        <option key={k} value={k}>
          {LAB_NOTE_KIND_LABEL[k]}
        </option>
      ))}
    </select>
  );
}

/** Bitácora de una práctica: entradas con fecha y hora, de la más reciente a la más antigua. */
export function LabPracticeLog({
  subjectId,
  practiceKey,
  notes,
  canWrite,
}: {
  subjectId: string;
  practiceKey: string;
  notes: LabNoteView[];
  canWrite: boolean;
}) {
  const sorted = [...notes].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const [editingId, setEditingId] = useState<string | null>(null);
  const formId = `lab-log-${subjectId}-${practiceKey.replace(/\W/g, "_")}`;

  return (
    <div className="mt-1 flex flex-col gap-3">
      {canWrite && (
        <form
          id={formId}
          action={async (fd) => {
            await addLabPracticeNote(subjectId, practiceKey, fd);
            (document.getElementById(formId) as HTMLFormElement | null)?.reset();
          }}
          className="flex flex-col gap-2"
        >
          <Textarea name="body" required placeholder="¿Qué está pasando? Lo que hiciste, lo que observaste, un dato medido, un problema…" />
          <div className="flex flex-wrap items-center gap-2">
            <KindSelect />
            <Button type="submit" size="sm">Agregar a la bitácora</Button>
          </div>
        </form>
      )}

      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground">Todavía no hay entradas en la bitácora de esta práctica.</p>
      ) : (
        <ul className={cn("flex flex-col gap-2", canWrite && "border-t border-border pt-3")}>
          {sorted.map((n) =>
            canWrite && editingId === n.id ? (
              <li key={n.id} className="rounded-md border border-border p-3">
                <form
                  action={async (fd) => {
                    await updateLabPracticeNote(n.id, fd);
                    setEditingId(null);
                  }}
                  className="flex flex-col gap-2"
                >
                  <Textarea name="body" defaultValue={n.body} required />
                  <div className="flex flex-wrap items-center gap-2">
                    <KindSelect defaultValue={n.kind} />
                    <Button type="submit" size="sm">Guardar</Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </li>
            ) : (
              <li key={n.id} className="group rounded-md bg-muted/40 p-3">
                <span
                  className={cn(
                    "mb-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    KIND_STYLE[asLabNoteKind(n.kind)],
                  )}
                >
                  {LAB_NOTE_KIND_LABEL[asLabNoteKind(n.kind)]}
                </span>
                <p className="whitespace-pre-line text-sm leading-snug">{n.body}</p>
                <p className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{[n.author, n.authorRole, formatDateTime(n.createdAt)].filter(Boolean).join(" · ")}</span>
                  {canWrite && (
                    <span className="flex items-center gap-2">
                      <button type="button" onClick={() => setEditingId(n.id)} className="hover-reveal hover:text-foreground" aria-label="Editar entrada">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => deleteLabPracticeNote(n.id)} className="hover-reveal hover:text-destructive" aria-label="Eliminar entrada">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  )}
                </p>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
