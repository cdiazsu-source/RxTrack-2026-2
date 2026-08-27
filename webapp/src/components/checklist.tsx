"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { useCanEdit } from "@/components/access-context";

export type ChecklistItemView = { id: string; text: string; done: boolean; order: number };

function Row({
  item,
  isFirst,
  isLast,
}: {
  item: ChecklistItemView;
  isFirst: boolean;
  isLast: boolean;
}) {
  const canEdit = useCanEdit();
  const [editing, setEditing] = useState(false);
  const [pending, start] = useTransition();

  if (editing && canEdit) {
    return (
      <form
        action={async (fd) => {
          await updateChecklistItem(item.id, fd);
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
    <li className="group flex items-start gap-3 rounded-md px-2 py-2 hover:bg-muted/50">
      <input
        type="checkbox"
        checked={item.done}
        disabled={pending || !canEdit}
        onChange={(e) => {
          if (!canEdit) return;
          const done = e.target.checked;
          start(() => {
            toggleChecklistItem(item.id, done);
          });
        }}
        className="mt-1 h-4 w-4 rounded border-input accent-[hsl(var(--primary))]"
      />
      <p className={cn("flex-1 text-sm", item.done && "text-muted-foreground line-through")}>{item.text}</p>
      {canEdit && (
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button type="button" disabled={isFirst} onClick={() => start(() => moveChecklistItem(item.id, "up"))} className="rounded p-1 text-muted-foreground hover:bg-accent disabled:opacity-30" aria-label="Subir">
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button type="button" disabled={isLast} onClick={() => start(() => moveChecklistItem(item.id, "down"))} className="rounded p-1 text-muted-foreground hover:bg-accent disabled:opacity-30" aria-label="Bajar">
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => setEditing(true)} className="rounded p-1 text-muted-foreground hover:bg-accent" aria-label="Editar">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => start(() => deleteChecklistItem(item.id))} className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Eliminar">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </li>
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

        {canEdit && showForm && (
          <form
            action={async (fd) => {
              await addChecklistItem(parent, fd);
            }}
            className="flex gap-2 rounded-md border border-dashed border-input p-3"
          >
            <Input name="text" placeholder="Nueva subtarea…" required autoFocus />
            <Button type="submit" size="sm">Agregar</Button>
          </form>
        )}

        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {canEdit ? "Aún no hay subtareas. Agrega la primera — un paso pequeño y concreto." : "Sin subtareas."}
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {sorted.map((item, i) => (
              <Row key={item.id} item={item} isFirst={i === 0} isLast={i === sorted.length - 1} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
