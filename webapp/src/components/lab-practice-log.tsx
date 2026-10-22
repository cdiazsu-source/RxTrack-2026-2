"use client";

import { useMemo, useState } from "react";
import { Copy, FileText, ListTree, NotebookText, Pencil, Plus, Trash2 } from "lucide-react";

import { addLabPracticeNote, deleteLabPracticeNote, updateLabPracticeNote } from "@/lib/actions/lab-notes";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  LAB_NOTE_KINDS,
  LAB_NOTE_KIND_LABEL,
  asLabNoteKind,
  parsePracticeSteps,
  stepLabel,
  type LabNoteKind,
  type PracticeStep,
} from "@/lib/lab-log";
import { labStepPrompt, type LabPromptOpts } from "@/lib/prompts";
import { cn, formatDateTime } from "@/lib/utils";

export type LabNoteView = {
  id: string;
  kind: string;
  step: string | null;
  body: string;
  data: string | null;
  why: string | null;
  meaning: string | null;
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

const FIELD_LABEL = "text-[11px] font-semibold uppercase tracking-wide text-muted-foreground";

async function copy(text: string, okMsg: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast(okMsg);
  } catch {
    toast("No pude copiar solo: selecciona el texto y cópialo", "info");
  }
}

/** Campos de una entrada (alta y edición): paso, tipo y los cuatro bloques. */
function EntryFields({
  steps,
  defaults,
  onChange,
}: {
  steps: PracticeStep[];
  defaults?: Partial<LabNoteView>;
  /** Para armar el prompt de «explicar este paso» con el borrador actual. */
  onChange?: (patch: Record<string, string>) => void;
}) {
  const ch = (name: string) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange?.({ [name]: e.target.value });
  let lastGroup = 0;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {steps.length > 0 && (
          <select
            name="step"
            defaultValue={defaults?.step ?? ""}
            onChange={ch("step")}
            aria-label="Paso del procedimiento"
            className="min-w-0 flex-1 basis-64 rounded-md border border-input bg-background px-2 py-2 text-sm"
          >
            <option value="">— sin paso (nota libre) —</option>
            {steps.map((s) => {
              const header = s.groupIndex !== lastGroup;
              lastGroup = s.groupIndex;
              return (
                <option key={s.id} value={s.id}>
                  {header ? `${s.groupTag} · ${s.groupTitle} → ` : ""}
                  {stepLabel(s, 70)}
                </option>
              );
            })}
          </select>
        )}
        <select
          name="kind"
          defaultValue={asLabNoteKind(defaults?.kind)}
          aria-label="Tipo de entrada"
          className="rounded-md border border-input bg-background px-2 py-2 text-sm"
        >
          {LAB_NOTE_KINDS.map((k) => (
            <option key={k} value={k}>
              {LAB_NOTE_KIND_LABEL[k]}
            </option>
          ))}
        </select>
      </div>
      <label className="flex flex-col gap-1">
        <span className={FIELD_LABEL}>Qué hice</span>
        <Textarea name="body" required rows={2} defaultValue={defaults?.body ?? ""} onChange={ch("body")} placeholder="Tomé 500 µL de la madre con micropipeta y aforé a 10 mL" />
      </label>
      <label className="flex flex-col gap-1">
        <span className={FIELD_LABEL}>Dato (con unidades y cálculo)</span>
        <Textarea name="data" rows={2} defaultValue={defaults?.data ?? ""} onChange={ch("data")} placeholder="V₁ = 5 × 10 ÷ 100 = 0,50 mL" />
      </label>
      <label className="flex flex-col gap-1">
        <span className={FIELD_LABEL}>Por qué se hace así</span>
        <Textarea name="why" rows={2} defaultValue={defaults?.why ?? ""} onChange={ch("why")} placeholder="Con tus palabras, o pega la explicación de la IA" />
      </label>
      <label className="flex flex-col gap-1">
        <span className={FIELD_LABEL}>Qué significa</span>
        <Textarea name="meaning" rows={2} defaultValue={defaults?.meaning ?? ""} onChange={ch("meaning")} placeholder="Qué concluyes y qué duda te queda" />
      </label>
    </div>
  );
}

function Block({ label, text, accent }: { label: string; text: string | null; accent?: boolean }) {
  if (!text) return null;
  return (
    <div className="mt-2">
      <p className={FIELD_LABEL}>{label}</p>
      <p className={cn("mt-0.5 whitespace-pre-line text-sm leading-snug", accent && "border-l-2 border-primary/50 pl-2.5")}>{text}</p>
    </div>
  );
}

/** Bitácora de una práctica: entradas por paso, con fundamento, y hoja de estudio. */
export function LabPracticeLog({
  subjectId,
  practiceKey,
  notes,
  canWrite,
  procedure,
  promptOpts,
}: {
  subjectId: string;
  practiceKey: string;
  notes: LabNoteView[];
  canWrite: boolean;
  procedure: string;
  promptOpts: LabPromptOpts;
}) {
  const steps = useMemo(() => parsePracticeSteps(procedure), [procedure]);
  const stepById = useMemo(() => new Map(steps.map((s) => [s.id, s])), [steps]);
  const sorted = useMemo(() => [...notes].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)), [notes]);

  const [view, setView] = useState<"timeline" | "study">("timeline");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [formKey, setFormKey] = useState(0);
  const formId = `lab-log-${subjectId}-${practiceKey.replace(/\W/g, "_")}`;

  // Actividades (grupos del procedimiento) con su conteo; la de la última entrada es la «en curso».
  const groups = useMemo(() => {
    const m = new Map<number, { tag: string; title: string; total: number }>();
    for (const s of steps) {
      const g = m.get(s.groupIndex) ?? { tag: s.groupTag, title: s.groupTitle, total: 0 };
      g.total += 1;
      m.set(s.groupIndex, g);
    }
    return [...m.entries()].map(([index, g]) => ({
      index,
      ...g,
      entries: notes.filter((n) => n.step && stepById.get(n.step)?.groupIndex === index).length,
    }));
  }, [steps, notes, stepById]);
  const currentGroup = sorted.map((n) => (n.step ? stepById.get(n.step)?.groupIndex : undefined)).find((g) => g !== undefined);

  const stepText = (id: string | null | undefined) => {
    const s = id ? stepById.get(id) : undefined;
    return s ? stepLabel(s, 140) : null;
  };

  const stepPrompt = (d: { step?: string | null; body?: string | null; data?: string | null; why?: string | null; meaning?: string | null }) =>
    labStepPrompt({
      ...promptOpts,
      step: stepText(d.step),
      draft: { body: d.body ?? "", data: d.data ?? "", why: d.why ?? "", meaning: d.meaning ?? "" },
    });

  const asText = () =>
    [...notes]
      .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
      .map((n) =>
        [
          `[${formatDateTime(n.createdAt)}] ${LAB_NOTE_KIND_LABEL[asLabNoteKind(n.kind)]} — ${n.author}${n.step && stepText(n.step) ? ` — ${stepText(n.step)}` : ""}`,
          `Qué hice: ${n.body}`,
          n.data && `Dato: ${n.data}`,
          n.why && `Por qué: ${n.why}`,
          n.meaning && `Qué significa: ${n.meaning}`,
        ]
          .filter(Boolean)
          .join("\n"),
      )
      .join("\n\n");

  return (
    <div className="mt-1 flex flex-col gap-3">
      {groups.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5" aria-label="Actividades de la práctica">
          {groups.map((g) => (
            <span
              key={g.index}
              title={g.title}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs",
                g.entries > 0 && g.index === currentGroup && "border-primary/40 bg-primary/10 text-primary",
                g.entries > 0 && g.index !== currentGroup && "border-success/40 bg-success/10 text-success",
                g.entries === 0 && "border-border text-muted-foreground",
              )}
            >
              {g.tag} · {g.title.length > 28 ? `${g.title.slice(0, 27)}…` : g.title} ({g.entries})
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" variant={view === "timeline" ? "secondary" : "ghost"} onClick={() => setView("timeline")}>
          <ListTree className="h-3.5 w-3.5" />
          Línea de tiempo
        </Button>
        <Button type="button" size="sm" variant={view === "study" ? "secondary" : "ghost"} onClick={() => setView("study")}>
          <NotebookText className="h-3.5 w-3.5" />
          Hoja de estudio
        </Button>
        {notes.length > 0 && (
          <Button type="button" size="sm" variant="ghost" className="ml-auto" onClick={() => copy(asText(), "Bitácora copiada como texto")}>
            <FileText className="h-3.5 w-3.5" />
            Copiar bitácora como texto
          </Button>
        )}
      </div>

      {canWrite && (
        <details className="group/new rounded-lg border border-border bg-muted/20">
          <summary className="flex cursor-pointer items-center gap-1.5 px-3 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
            <Plus className="h-4 w-4" />
            Nueva entrada
            <span className="font-normal text-muted-foreground">— paso, tipo y los cuatro bloques</span>
          </summary>
          <form
            id={formId}
            key={formKey}
            action={async (fd) => {
              await addLabPracticeNote(subjectId, practiceKey, fd);
              setDraft({});
              setFormKey((k) => k + 1);
            }}
            className="flex flex-col gap-2 border-t border-border p-3"
          >
            <EntryFields steps={steps} onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))} />
            <div className="flex flex-wrap items-center gap-2">
              <Button type="submit" size="sm">Agregar a la bitácora</Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => copy(stepPrompt(draft), "Prompt copiado: pégalo en una IA")}>
                <Copy className="h-3.5 w-3.5" />
                Copiar prompt para explicar este paso
              </Button>
            </div>
          </form>
        </details>
      )}

      {view === "timeline" ? (
        sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay entradas en la bitácora de esta práctica.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {sorted.map((n, i) =>
              canWrite && editingId === n.id ? (
                <li key={n.id} className="rounded-md border border-border p-3">
                  <form
                    action={async (fd) => {
                      await updateLabPracticeNote(n.id, fd);
                      setEditingId(null);
                    }}
                    className="flex flex-col gap-2"
                  >
                    <EntryFields steps={steps} defaults={n} />
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">Guardar</Button>
                      <Button type="button" size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </li>
              ) : (
                <li key={n.id}>
                  <details open={i === 0} className="group/entry rounded-md border border-border bg-card">
                    <summary className="flex cursor-pointer flex-wrap items-center gap-2 px-3 py-2 text-sm [&::-webkit-details-marker]:hidden">
                      <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide", KIND_STYLE[asLabNoteKind(n.kind)])}>
                        {LAB_NOTE_KIND_LABEL[asLabNoteKind(n.kind)]}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-medium">{stepText(n.step) ?? n.body}</span>
                      <span className="text-xs text-muted-foreground">{formatDateTime(n.createdAt)} · {n.author}</span>
                    </summary>
                    <div className="border-t border-border px-3 pb-3">
                      <Block label="Qué hice" text={n.body} />
                      <Block label="Dato" text={n.data} />
                      <Block label="Por qué se hace así" text={n.why} accent />
                      <Block label="Qué significa" text={n.meaning} />
                      {!n.why && (
                        <p className="mt-2 text-xs text-muted-foreground">Falta explicar el porqué de este paso.</p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Button type="button" size="sm" variant="ghost" onClick={() => copy(stepPrompt(n), "Prompt copiado: pégalo en una IA")}>
                          <Copy className="h-3.5 w-3.5" />
                          Prompt de este paso
                        </Button>
                        {canWrite && (
                          <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                            <button type="button" onClick={() => setEditingId(n.id)} className="hover:text-foreground" aria-label="Editar entrada">
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button type="button" onClick={() => deleteLabPracticeNote(n.id)} className="hover:text-destructive" aria-label="Eliminar entrada">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        )}
                      </div>
                    </div>
                  </details>
                </li>
              ),
            )}
          </ul>
        )
      ) : (
        <StudySheet steps={steps} notes={sorted} />
      )}
    </div>
  );
}

/** Todos los pasos del procedimiento con el «porqué» que ya escribiste; los que no tienen, en gris. */
function StudySheet({ steps, notes }: { steps: PracticeStep[]; notes: LabNoteView[] }) {
  const free = notes.filter((n) => !n.step || !steps.some((s) => s.id === n.step));
  let lastGroup = 0;
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-muted-foreground">
        Cada paso del procedimiento con lo que ya explicaste. Los que dicen «sin explicar» son los que te faltan por entender.
      </p>
      <ul className="flex flex-col divide-y divide-border rounded-md border border-border text-sm">
        {steps.map((s) => {
          const header = s.groupIndex !== lastGroup;
          lastGroup = s.groupIndex;
          const why = notes.filter((n) => n.step === s.id && n.why);
          const done = notes.some((n) => n.step === s.id);
          return (
            <li key={s.id}>
              {header && (
                <p className="bg-muted/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.groupTag} · {s.groupTitle}
                </p>
              )}
              <div className="grid gap-1 px-3 py-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-3">
                <p className={cn(!done && "text-muted-foreground")}>
                  Paso {s.n}: {s.text}
                </p>
                {why.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {why.map((n) => (
                      <p key={n.id} className="whitespace-pre-line border-l-2 border-primary/50 pl-2.5">
                        {n.why}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">{done ? "Hecho, sin explicar todavía" : "Aún sin entradas"}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {free.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Además hay {free.length} {free.length === 1 ? "nota libre" : "notas libres"} sin paso (se ven en la línea de tiempo).
        </p>
      )}
    </div>
  );
}
