"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

import { addSession, deleteSession, setSessionSlidesUrl, updateSession } from "@/lib/actions/sessions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpHint } from "@/components/help-hint";
import { PromptBox } from "@/components/prompt-box";
import { DriveLinkEditor } from "@/components/drive-link-editor";
import { useCanEdit } from "@/components/access-context";
import { renderCornell } from "@/lib/markdown-lite";
import { cornellPrompt } from "@/lib/prompts";
import { cn, formatDate } from "@/lib/utils";
import { relativeDays } from "@/lib/relative-time";
import { clearDraft, draftAge, loadDraft, saveDraft } from "@/lib/draft";

// El apunte SIEMPRE lleva un nombre de usuario. Se recuerda el último y se
// sugieren los ya usados (por ahora solo "Cesar Diaz Suarez").
const DEFAULT_AUTHOR = "Cesar Diaz Suarez";
const LAST_AUTHOR_KEY = "rxtrack:lastAuthor";
const AUTHORS_KEY = "rxtrack:authors";

function loadKnownAuthors(): string[] {
  try {
    const raw = localStorage.getItem(AUTHORS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    const list = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string" && x.trim() !== "") : [];
    return list.includes(DEFAULT_AUTHOR) ? list : [DEFAULT_AUTHOR, ...list];
  } catch {
    return [DEFAULT_AUTHOR];
  }
}

function loadLastAuthor(): string {
  try {
    return localStorage.getItem(LAST_AUTHOR_KEY) || DEFAULT_AUTHOR;
  } catch {
    return DEFAULT_AUTHOR;
  }
}

function rememberAuthor(name: string): void {
  const n = name.trim();
  if (!n) return;
  try {
    localStorage.setItem(LAST_AUTHOR_KEY, n);
    const known = loadKnownAuthors();
    if (!known.includes(n)) localStorage.setItem(AUTHORS_KEY, JSON.stringify([...known, n]));
  } catch {
    /* noop */
  }
}

export type SessionView = {
  id: string;
  number: number | null;
  date: string | null; // ISO
  topic: string;
  content: string;
  transcript: string | null;
  slidesUrl: string | null;
  author: string | null;
};

function SessionForm({
  moduleId,
  subjectName,
  moduleTitle,
  session,
  previous,
  onDone,
}: {
  moduleId: string;
  subjectName: string;
  moduleTitle: string;
  session?: SessionView;
  /** Última sesión guardada del módulo — se muestra al empezar una nueva. */
  previous?: SessionView;
  onDone: () => void;
}) {
  const draftKey = session ? `session:${session.id}` : `session:new:${moduleId}`;
  const topicKey = `${draftKey}:topic`;
  const transcriptKey = `${draftKey}:transcript`;
  const [content, setContent] = useState(session?.content ?? "");
  const [transcript, setTranscript] = useState(session?.transcript ?? "");
  const [restored, setRestored] = useState<null | { value: string; savedAt: number }>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [topic, setTopic] = useState(session?.topic ?? "");
  const [author, setAuthor] = useState(session?.author ?? "");
  const [knownAuthors, setKnownAuthors] = useState<string[]>([]);

  useEffect(() => {
    // Apuntes: el borrador se ofrece con botón (puede diferir mucho del guardado).
    const d = loadDraft(draftKey);
    if (d && d.value !== (session?.content ?? "")) setRestored(d);
    // Tema y transcripción: se rellenan solos si el campo está vacío (criterio 6).
    const dt = loadDraft(topicKey);
    if (dt?.value && !(session?.topic ?? "")) setTopic(dt.value);
    const dtr = loadDraft(transcriptKey);
    if (dtr?.value && !(session?.transcript ?? "")) setTranscript(dtr.value);
    // Usuario: obligatorio. En una sesión nueva se precarga el último usado.
    setKnownAuthors(loadKnownAuthors());
    if (!session) setAuthor((a) => a || loadLastAuthor());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevDays = previous?.date ? relativeDays(previous.date) : "";

  const clearAllDrafts = () => {
    clearDraft(draftKey);
    clearDraft(topicKey);
    clearDraft(transcriptKey);
  };

  return (
    <form
      action={async (fd) => {
        const name = author.trim();
        if (!name) return;
        fd.set("author", name);
        fd.set("content", content);
        fd.set("transcript", transcript);
        if (session) await updateSession(session.id, fd);
        else await addSession(moduleId, fd);
        rememberAuthor(name);
        clearAllDrafts();
        toast(session ? "Apuntes guardados" : "Sesión guardada");
        onDone();
      }}
      className="flex flex-col gap-3 rounded-md border border-border p-4"
    >
      {!session && previous && (
        <div className="rounded-md border border-border bg-muted/40 p-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Sesión anterior</p>
          <p className="mt-0.5 text-sm font-medium leading-snug">
            {previous.number != null ? `N.º ${previous.number} — ` : ""}
            {previous.topic}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {previous.date ? `${formatDate(previous.date)}${prevDays ? ` · ${prevDays}` : ""}` : "sin fecha registrada"}
          </p>
        </div>
      )}

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
        <Input
          name="number"
          type="number"
          min={1}
          placeholder="N.º"
          defaultValue={session?.number ?? (previous?.number != null ? previous.number + 1 : "")}
          className="w-20"
        />
        <Input name="date" type="date" defaultValue={session?.date ? session.date.slice(0, 10) : ""} className="w-40" />
        <Input
          name="author"
          list="rxtrack-authors"
          placeholder="Tu nombre de usuario"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-44"
        />
        <datalist id="rxtrack-authors">
          {knownAuthors.map((a) => (
            <option key={a} value={a} />
          ))}
        </datalist>
      </div>
      <Input
        name="topic"
        placeholder="Tema de la clase"
        value={topic}
        onChange={(e) => {
          setTopic(e.target.value);
          saveDraft(topicKey, e.target.value);
        }}
        required
      />

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Apuntes (método Cornell · Markdown)</label>
        <Button type="button" size="sm" variant="ghost" onClick={() => setShowPrompt((s) => !s)}>
          <Sparkles className="h-3.5 w-3.5" />
          Prompt para IA
        </Button>
      </div>
      {showPrompt && (
        <PromptBox
          rows={10}
          text={cornellPrompt({ subjectName, moduleTitle, topic, transcription: transcript })}
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
        placeholder={"#### Tabla del método Cornell\n\n| Preguntas clave | Notas |\n| --- | --- |\n| ... | ... |"}
        className="font-mono text-[13px] leading-relaxed"
      />
      <p className="-mt-1 text-[11px] text-muted-foreground">
        Se guarda un borrador local en cada tecla. Puedes cerrar y volver sin perder nada; para que quede
        registrado, pulsa Guardar.
      </p>

      <label className="text-sm font-medium">Transcripción de la clase (Markdown, opcional)</label>
      <Textarea
        name="transcript-visible"
        value={transcript}
        onChange={(e) => {
          setTranscript(e.target.value);
          saveDraft(transcriptKey, e.target.value);
        }}
        rows={6}
        placeholder="Pega aquí la transcripción (p. ej. de Buzz/Whisper). Se guarda como texto y alimenta el prompt de apuntes."
        className="font-mono text-xs leading-relaxed"
      />

      <div className="flex gap-2">
        <Button type="submit" size="sm">{session ? "Guardar cambios" : "Guardar sesión"}</Button>
        <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}

function SessionArticle({
  s,
  canEdit,
  onEdit,
}: {
  s: SessionView;
  canEdit: boolean;
  onEdit: () => void;
}) {
  const [showTranscript, setShowTranscript] = useState(false);
  // TDAH — criterio 4: los apuntes largos empiezan plegados; nada de muro de texto.
  const isLong = s.content.length > 700;
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="rounded-md border border-border p-4">
      <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-sm font-semibold">
          {s.number ? `Sesión ${s.number} — ` : ""}
          {s.topic}
        </h4>
        <span className="text-xs text-muted-foreground">
          {[s.date ? formatDate(s.date) : null, s.author].filter(Boolean).join(" · ")}
        </span>
      </header>

      <div className="relative">
        <div
          className={cn("cornell text-sm", isLong && !expanded && "max-h-72 overflow-hidden")}
          dangerouslySetInnerHTML={{ __html: renderCornell(s.content) }}
        />
        {isLong && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
        )}
      </div>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 rounded-md py-1 text-xs font-medium text-primary"
        >
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
          {expanded ? "Ver menos" : "Ver apunte completo"}
        </button>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <DriveLinkEditor url={s.slidesUrl} action={setSessionSlidesUrl.bind(null, s.id)} label="Diapositivas" />
        {s.transcript && (
          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            className="inline-flex items-center gap-1 text-xs text-primary"
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showTranscript ? "rotate-180" : ""}`} />
            {showTranscript ? "Ocultar transcripción" : "Ver transcripción"}
          </button>
        )}
      </div>

      {showTranscript && s.transcript && (
        <div
          className="cornell mt-2 border-t border-border pt-2 text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: renderCornell(s.transcript) }}
        />
      )}

      {canEdit && (
        <div className="mt-3 flex gap-1">
          <button type="button" onClick={onEdit} className="tap rounded-md text-muted-foreground hover:bg-accent" aria-label="Editar sesión">
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              deleteSession(s.id);
              toast("Sesión eliminada", "info");
            }}
            className="tap rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            aria-label="Eliminar sesión"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </article>
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
  const previous = sorted.length ? sorted[sorted.length - 1] : undefined;

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
            previous={previous}
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
            <SessionArticle key={s.id} s={s} canEdit={canEdit} onEdit={() => setEditingId(s.id)} />
          ),
        )}
      </CardContent>
    </Card>
  );
}
