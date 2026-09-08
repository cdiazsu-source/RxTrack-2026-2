"use client";

import { useState } from "react";
import { AtSign, ListChecks, Pencil, Trash2 } from "lucide-react";

import { addProjectNote, deleteProjectNote, updateProjectNote } from "@/lib/actions/notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";

export type NoteView = {
  id: string;
  body: string;
  author: string;
  authorRole: string | null;
  createdAt: string;
  checklistItemId: string | null;
  checklistItemText: string | null;
  checklistItemDone: boolean;
  mentions: string[];
};

type CheckItem = { id: string; text: string; done: boolean };

/** Selector de subtarea + casillas de mención, compartido por el alta y la edición. */
function LinkFields({
  checklistItems,
  people,
  defaultChecklistItemId,
  defaultMentions,
}: {
  checklistItems: CheckItem[];
  people: string[];
  defaultChecklistItemId?: string | null;
  defaultMentions?: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {checklistItems.length > 0 && (
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Subtarea relacionada (opcional)
          <select
            name="checklistItemId"
            defaultValue={defaultChecklistItemId ?? ""}
            className="rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground"
          >
            <option value="">— sin subtarea —</option>
            {checklistItems.map((c) => (
              <option key={c.id} value={c.id}>
                {c.done ? "✓ " : ""}
                {c.text}
              </option>
            ))}
          </select>
        </label>
      )}
      {people.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>Mencionar:</span>
          {people.map((p) => (
            <label key={p} className="inline-flex items-center gap-1.5">
              <input
                type="checkbox"
                name="mentions"
                value={p}
                defaultChecked={defaultMentions?.includes(p)}
                className="h-3.5 w-3.5 rounded border-input accent-[hsl(var(--primary))]"
              />
              {p}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export function NotesLog({
  projectId,
  notes,
  checklistItems = [],
  people = [],
}: {
  projectId: string;
  notes: NoteView[];
  checklistItems?: CheckItem[];
  people?: string[];
}) {
  const sorted = [...notes].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bitácora</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form
          action={async (fd) => {
            await addProjectNote(projectId, fd);
            (document.getElementById(`note-form-${projectId}`) as HTMLFormElement | null)?.reset();
          }}
          id={`note-form-${projectId}`}
          className="flex flex-col gap-2"
        >
          <Textarea name="body" placeholder="Nota de avance: qué se hizo, qué sigue, algún bloqueo…" required />
          <LinkFields checklistItems={checklistItems} people={people} />
          <div className="flex flex-wrap items-center gap-2">
            <Input name="author" placeholder="Tu nombre" required className="w-48" />
            <Button type="submit" size="sm">Publicar nota</Button>
          </div>
        </form>

        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay notas.</p>
        ) : (
          <ul className="flex flex-col gap-3 border-t border-border pt-3">
            {sorted.map((n) =>
              editingId === n.id ? (
                <li key={n.id} className="rounded-md border border-border p-3">
                  <form
                    action={async (fd) => {
                      await updateProjectNote(n.id, projectId, fd);
                      setEditingId(null);
                    }}
                    className="flex flex-col gap-2"
                  >
                    <Textarea name="body" defaultValue={n.body} required />
                    <LinkFields
                      checklistItems={checklistItems}
                      people={people}
                      defaultChecklistItemId={n.checklistItemId}
                      defaultMentions={n.mentions}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">Guardar</Button>
                      <Button type="button" size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </li>
              ) : (
                <li key={n.id} className="group rounded-md bg-muted/40 p-3">
                  {n.checklistItemText && (
                    <p className="mb-1 flex items-start gap-1.5 text-xs text-primary/90">
                      <ListChecks className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                      <span className={n.checklistItemDone ? "line-through" : undefined}>{n.checklistItemText}</span>
                    </p>
                  )}
                  <p className="whitespace-pre-line text-sm leading-snug">{n.body}</p>
                  {n.mentions.length > 0 && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <AtSign className="h-3 w-3 shrink-0" aria-hidden />
                      {n.mentions.join(", ")}
                    </p>
                  )}
                  <p className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{[n.author, n.authorRole, formatDateTime(n.createdAt)].filter(Boolean).join(" · ")}</span>
                    <span className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(n.id)}
                        className="hover-reveal hover:text-foreground"
                        aria-label="Editar nota"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProjectNote(n.id)}
                        className="hover-reveal hover:text-destructive"
                        aria-label="Eliminar nota"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  </p>
                </li>
              ),
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
