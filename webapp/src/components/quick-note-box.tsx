"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Check, Trash2 } from "lucide-react";

import { addInboxItem, deleteInboxItem, triageInboxItem } from "@/lib/actions/inbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HelpHint } from "@/components/help-hint";
import { toast } from "@/components/ui/toast";
import { clearDraft, loadDraft, saveDraft } from "@/lib/draft";
import { formatDateTime } from "@/lib/utils";

export type QuickNoteView = {
  id: string;
  text: string;
  subjectId: string | null;
  subjectCode: string | null;
  createdAt: string;
};
export type QuickNoteSubject = { id: string; code: string; name: string };

const DRAFT_KEY = "home-quick-note";

/**
 * Nota rápida al final de la portada: escribes lo que se te ocurre, recuerdas o
 * tienes que hacer, y (si quieres) la ligas a una asignatura. Cae en la misma
 * bandeja que el botón «+», así que no hay un segundo lugar donde buscar.
 * Se guarda un borrador mientras escribes. Ctrl/Cmd + Enter guarda.
 */
export function QuickNoteBox({
  subjects,
  notes,
  pendingCount,
}: {
  subjects: QuickNoteSubject[];
  notes: QuickNoteView[];
  pendingCount: number;
}) {
  const [text, setText] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [saving, startSave] = useTransition();
  const [busy, startRow] = useTransition();
  const ref = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const d = loadDraft(DRAFT_KEY);
    if (d?.value) setText(d.value);
  }, []);

  function submit(fd: FormData) {
    const body = text.trim();
    if (!body) return;
    fd.set("text", body);
    fd.set("subjectId", subjectId);
    startSave(async () => {
      await addInboxItem(fd);
      clearDraft(DRAFT_KEY);
      setText("");
      toast(subjectId ? "Nota guardada y ligada a la asignatura" : "Nota guardada");
      ref.current?.focus();
    });
  }

  const extra = pendingCount - notes.length;

  return (
    <Card>
      <CardHeader className="space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          Nota rápida
          <HelpHint k="nota-rapida" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form ref={formRef} action={submit} className="flex flex-col gap-2">
          <Textarea
            ref={ref}
            rows={2}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              saveDraft(DRAFT_KEY, e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                formRef.current?.requestSubmit();
              }
            }}
            placeholder="Algo que se te ocurrió, que recordaste o que tienes que hacer…"
            aria-label="Nota rápida"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="h-8 w-auto max-w-[16rem] text-xs"
              aria-label="Asignatura de la nota"
            >
              <option value="">Sin asignatura</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} · {s.name}
                </option>
              ))}
            </Select>
            <span className="hidden text-[11px] text-muted-foreground sm:inline">Ctrl + Enter para guardar</span>
            <Button type="submit" size="sm" className="ml-auto" disabled={saving || !text.trim()}>
              Guardar
            </Button>
          </div>
        </form>

        {notes.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-muted-foreground">Pendientes de revisar</p>
            <ul className="flex flex-col gap-1">
              {notes.map((n) => (
                <li key={n.id} className="group flex items-start gap-2 rounded-md px-1.5 py-1.5 hover:bg-muted/50">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      startRow(async () => {
                        await triageInboxItem(n.id, n.subjectId);
                      });
                      toast("Nota resuelta", "info");
                    }}
                    className="tap -my-2 shrink-0 rounded-md text-muted-foreground hover:text-primary"
                    aria-label="Marcar como resuelta"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="whitespace-pre-line break-words text-sm leading-snug">{n.text}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                      {n.subjectCode && (
                        <Link href={`/${n.subjectId}`} className="rounded bg-primary/10 px-1.5 py-0.5 font-semibold text-primary">
                          {n.subjectCode}
                        </Link>
                      )}
                      {formatDateTime(n.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      startRow(async () => {
                        await deleteInboxItem(n.id);
                      });
                      toast("Nota eliminada", "info");
                    }}
                    className="hover-reveal tap -my-2 shrink-0 rounded-md text-muted-foreground hover:text-destructive"
                    aria-label="Eliminar nota"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <Link href="/inbox" className="self-start text-xs text-primary hover:underline">
              {extra > 0 ? `Ver las ${pendingCount} notas en la bandeja` : "Abrir la bandeja"}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
