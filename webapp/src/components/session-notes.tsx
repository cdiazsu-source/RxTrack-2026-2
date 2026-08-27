"use client";

import { useEffect, useRef, useState } from "react";
import { Pencil, Plus, Sparkles, Trash2 } from "lucide-react";

import { addSession, deleteSession, updateSession } from "@/lib/actions/sessions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpHint } from "@/components/help-hint";
import { PromptBox } from "@/components/prompt-box";
import { useCanEdit } from "@/components/access-context";
import { renderCornell } from "@/lib/markdown-lite";
import { cornellPrompt } from "@/lib/prompts";
import { formatDate } from "@/lib/utils";
import { clearDraft, draftAge, loadDraft, saveDraft } from "@/lib/draft";

export type SessionView = {
  id: string;
  number: number | null;
  date: string | null; // ISO
  topic: string;
  content: string;
  author: string | null;
};

function SessionForm({
  moduleId,
  subjectName,
  moduleTitle,
  session,
  onDone,
}: {
  moduleId: string;
  subjectName: string;
  moduleTitle: string;
  session?: SessionView;
  onDone: () => void;
}) {
  const draftKey = session ? `session:${session.id}` : `session:new:${moduleId}`;
  const [content, setContent] = useState(session?.content ?? "");
  const [restored, setRestored] = useState<null | { value: string; savedAt: number }>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [topic, setTopic] = useState(session?.topic ?? "");

  useEffect(() => {
    const d = loadDraft(draftKey);
    if (d && d.value !== (session?.content ?? "")) setRestored(d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      action={async (fd) => {
        fd.set("content", content);
        if (session) await updateSession(session.id, fd);
        else await addSession(moduleId, fd);
        clearDraft(draftKey);
        onDone();
      }}
      className="flex flex-col gap-3 rounded-md border border-border p-4"
    >
      {restored && (
        <div className="flex flex-wrap items-center gap-2 rounded-md bg-warning/10 p-2 text-xs">
          <span>Hay un borrador sin guardar de {draftAge(restored.savedAt)}.</span>
          <button type="button" className="font-medium text-primary underline" onClick={() => { setContent(restored.value); setRestored(null); }}>
            Restaurar
          </button>
          <button type="button" className="text-muted-foreground underline" onClick={() => { clearDraft(draftKey); setRestored(null); }}>
            Descartar
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Input name="number" type="number" min={1} placeholder="N.º" defaultValue={session?.number ?? ""} className="w-20" />
        <Input name="date" type="date" defaultValue={session?.date ? session.date.slice(0, 10) : ""} className="w-40" />
        <Input name="author" placeholder="Tu nombre (opcional)" defaultValue={session?.author ?? ""} className="w-44" />
      </div>
      <Input name="topic" placeholder="Tema de la clase" value={topic} onChange={(e) => setTopic(e.target.value)} required />

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Apuntes (método Cornell)</label>
        <Button type="button" size="sm" variant="ghost" onClick={() => setShowPrompt((s) => !s)}>
          <Sparkles className="h-3.5 w-3.5" />
          Prompt para IA
        </Button>
      </div>
      {showPrompt && (
        <PromptBox
          rows={10}
          text={cornellPrompt({ subjectName, moduleTitle, topic })}
        />
      )}
      <Textarea
        name="content-visible"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          saveDraft(draftKey, e.target.value);
        }}
        rows={12}
        placeholder={"#### 2. Tabla del método Cornell\n\n| Preguntas clave | Notas |\n| --- | --- |\n| ... | ... |"}
        className="font-mono text-xs leading-relaxed"
      />

      <div className="flex gap-2">
        <Button type="submit" size="sm">{session ? "Guardar cambios" : "Guardar sesión"}</Button>
        <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}

export function SessionNotes({
  moduleId,
  subjectName,
  moduleTitle,
  sessions,
}: {
  moduleId: string;
  subjectName: string;
  moduleTitle: string;
  sessions: SessionView[];
}) {
  const canEdit = useCanEdit();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const sorted = [...sessions].sort((a, b) => (a.number ?? 0) - (b.number ?? 0) || a.id.localeCompare(b.id));

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          Apuntes
          <span className="font-normal text-muted-foreground">({sorted.length})</span>
          <HelpHint k="apuntes" />
        </CardTitle>
        {canEdit && !adding && (
          <Button size="sm" variant="outline" onClick={() => setAdding(true)}>
            <Plus className="h-3.5 w-3.5" />
            Nueva sesión
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {adding && (
          <SessionForm
            moduleId={moduleId}
            subjectName={subjectName}
            moduleTitle={moduleTitle}
            onDone={() => setAdding(false)}
          />
        )}

        {sorted.length === 0 && !adding && (
          <p className="text-sm text-muted-foreground">
            {canEdit ? "Sin apuntes todavía. Empieza por copiar el prompt de una clase reciente." : "Sin apuntes."}
          </p>
        )}

        {sorted.map((s) =>
          editingId === s.id ? (
            <SessionForm
              key={s.id}
              moduleId={moduleId}
              subjectName={subjectName}
              moduleTitle={moduleTitle}
              session={s}
              onDone={() => setEditingId(null)}
            />
          ) : (
            <article key={s.id} className="rounded-md border border-border p-4">
              <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-sm font-semibold">
                  {s.number ? `Sesión ${s.number} — ` : ""}
                  {s.topic}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {[s.date ? formatDate(s.date) : null, s.author].filter(Boolean).join(" · ")}
                </span>
              </header>
              <div
                className="cornell text-sm"
                dangerouslySetInnerHTML={{ __html: renderCornell(s.content) }}
              />
              {canEdit && (
                <div className="mt-3 flex gap-1">
                  <button type="button" onClick={() => setEditingId(s.id)} className="rounded p-1 text-muted-foreground hover:bg-accent" aria-label="Editar sesión">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => deleteSession(s.id)} className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Eliminar sesión">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </article>
          ),
        )}
      </CardContent>
    </Card>
  );
}
