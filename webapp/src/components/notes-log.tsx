"use client";

import { Trash2 } from "lucide-react";

import { addProjectNote, deleteProjectNote } from "@/lib/actions/notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";

export type NoteView = { id: string; body: string; author: string; authorRole: string | null; createdAt: string };

export function NotesLog({ projectId, notes }: { projectId: string; notes: NoteView[] }) {
  const sorted = [...notes].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

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
          <div className="flex flex-wrap items-center gap-2">
            <Input name="author" placeholder="Tu nombre" required className="w-48" />
            <Button type="submit" size="sm">Publicar nota</Button>
          </div>
        </form>

        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay notas.</p>
        ) : (
          <ul className="flex flex-col gap-3 border-t border-border pt-3">
            {sorted.map((n) => (
              <li key={n.id} className="group rounded-md bg-muted/40 p-3">
                <p className="whitespace-pre-line text-sm leading-snug">{n.body}</p>
                <p className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{[n.author, n.authorRole, formatDateTime(n.createdAt)].filter(Boolean).join(" · ")}</span>
                  <button
                    type="button"
                    onClick={() => deleteProjectNote(n.id)}
                    className="opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                    aria-label="Eliminar nota"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
