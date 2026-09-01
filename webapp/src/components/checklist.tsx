"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";

import {
  addChecklistItem,
  deleteChecklistItem,
  moveChecklistItem,
  toggleChecklistItem,
  updateChecklistItem,
  type ChecklistParent,
} from "@/lib/actions/checklist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { HelpHint } from "@/components/help-hint";
import { toast } from "@/components/ui/toast";
import { clearDraft, loadDraft, saveDraft } from "@/lib/draft";
import { cn } from "@/lib/utils";
import { useCanEdit } from "@/components/access-context";

export type ChecklistItemView = { id: string; text: string; done: boolean; order: number };

function Row({
  item,
  isFirst,
  isLast,
  isNext,
}: {
  item: ChecklistItemView;
  isFirst: boolean;
  isLast: boolean;
  /** TDAH — criterio 1: la ÚNICA subtarea pendiente que toca ahora. */
  isNext: boolean;
}) {
  const canEdit = useCanEdit();
  const [editing, setEditing] = useState(false);
  const [pending, start] = useTransition();
  // Optimista: la casilla responde al instante y luego confirma con el servidor.
  const [done, setDone] = useState(item.done);
  useEffect(() => setDone(item.done), [item.done]);

  if (editing && canEdit) {
    return (
      <form
        action={async (fd) => {
          await updateChecklistItem(item.id, fd);
          toast("Subtarea actualizada");
          setEditing(false);
        }}
        className="flex flex-col gap-2 rounded-md border border-border p-3"
      >
        <Input name="text" defaultValue={item.text} required />
        <div className="flex gap-2">
          <Button type="submit" size="sm">Guardar</Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      </form>
    );
  }

  return (
    <li
      className={cn(
        "group flex items-start gap-1 rounded-md pr-1 transition-colors",
        isNext && !done ? "rx-next" : "hover:bg-muted/50",
      )}
    >
      <label
        className={cn(
          "flex min-h-[44px] flex-1 items-start gap-3 py-2.5 pl-2",
          canEdit ? "cursor-pointer" : "cursor-default",
        )}
      >
        <input
          type="checkbox"
          checked={done}
          disabled={!canEdit}
          onChange={(e) => {
            if (!canEdit) return;
            const next = e.target.checked;
            setDone(next);
            start(() => {
              toggleChecklistItem(item.id, next);
            });
            toast(next ? "Subtarea completada" : "Marca quitada", next ? "success" : "info");
          }}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-input accent-[hsl(var(--primary))]"
        />
        <span className="flex flex-col gap-0.5">
          {isNext && !done && (
            <span className="inline-flex w-fit items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              <ArrowRight className="h-3 w-3" aria-hidden />
              Sigue esto
            </span>
          )}
          <span className={cn("text-sm leading-snug", done && "text-muted-foreground line-through")}>{item.text}</span>
        </span>
      </label>
      {canEdit && (
        <div className="hover-reveal flex shrink-0 items-center self-center">
          <button
            type="button"
            disabled={isFirst || pending}
            onClick={() => start(() => moveChecklistItem(item.id, "up"))}
            className="tap rounded-md text-muted-foreground hover:bg-accent disabled:opacity-30"
            aria-label="Subir"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={isLast || pending}
            onClick={() => start(() => moveChecklistItem(item.id, "down"))}
            className="tap rounded-md text-muted-foreground hover:bg-accent disabled:opacity-30"
            aria-label="Bajar"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="tap rounded-md text-muted-foreground hover:bg-accent"
            aria-label="Editar"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              start(() => deleteChecklistItem(item.id));
              toast("Subtarea eliminada", "info");
            }}
            className="tap rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            aria-label="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </li>
  );
}

function AddItemForm({ parent, onAdded }: { parent: ChecklistParent; onAdded: () => void }) {
  const draftKey = `checklist-add:${parent.type}:${parent.id}`;
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // TDAH — criterio 6: lo que escribes aquí no se pierde si te vas a media frase.
  useEffect(() => {
    const d = loadDraft(draftKey);
    if (d?.value) {
      setText(d.value);
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      action={async (fd) => {
        fd.set("text", text);
        await addChecklistItem(parent, fd);
        clearDraft(draftKey);
        setText("");
        toast("Subtarea agregada");
        onAdded();
      }}
      className="flex flex-col gap-1.5 rounded-md border border-dashed border-input p-3"
    >
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            saveDraft(draftKey, e.target.value);
          }}
          placeholder="Un paso pequeño y concreto…"
          required
          autoFocus
        />
        <Button type="submit" size="sm">Agregar</Button>
      </div>
      <span className="text-[11px] text-muted-foreground">Se guarda un borrador mientras escribes.</span>
    </form>
  );
}

export function Checklist({
  parent,
  items,
  title = "Checklist",
}: {
  parent: ChecklistParent;
  items: ChecklistItemView[];
  title?: string;
}) {
  const canEdit = useCanEdit();
  const [showForm, setShowForm] = useState(false);
  const sorted = [...items].sort((a, b) => a.order - b.order);
  const done = sorted.filter((i) => i.done).length;
  const nextId = sorted.find((i) => !i.done)?.id ?? null;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          {title}
          <span className="font-normal text-muted-foreground">
            ({done}/{sorted.length})
          </span>
          <HelpHint k="checklist" />
        </CardTitle>
        {canEdit && (
          <Button size="sm" variant="outline" onClick={() => setShowForm((s) => !s)}>
            <Plus className="h-3.5 w-3.5" />
            Agregar
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {sorted.length > 0 && (
          <ProgressBar value={sorted.length ? (done / sorted.length) * 100 : 0} label={`${done}/${sorted.length}`} inline />
        )}

        {canEdit && showForm && <AddItemForm parent={parent} onAdded={() => setShowForm(false)} />}

        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {canEdit ? "Aún no hay subtareas. Agrega la primera — un paso pequeño y concreto." : "Sin subtareas."}
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {sorted.map((item, i) => (
              <Row
                key={item.id}
                item={item}
                isFirst={i === 0}
                isLast={i === sorted.length - 1}
                isNext={item.id === nextId}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
