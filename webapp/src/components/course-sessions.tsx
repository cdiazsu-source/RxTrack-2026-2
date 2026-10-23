"use client";

import { useEffect, useState } from "react";
import { Check, ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";

import {
  addCourseLink,
  addCourseSession,
  deleteCourseLink,
  deleteCourseSession,
  setCourseSessionAttended,
  updateCourseLink,
  updateCourseSession,
} from "@/lib/actions/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { NamedLinks, type SessionLinkView } from "@/components/session-links";
import { renderCornell } from "@/lib/markdown-lite";
import { cn, dateInputValue, formatDate, todayInputValue } from "@/lib/utils";
import { relativeDays } from "@/lib/relative-time";

export type CourseSessionView = {
  id: string;
  number: number | null;
  date: string | null; // ISO
  topic: string;
  content: string;
  attended: boolean;
  links: SessionLinkView[];
};

const LABEL = "flex flex-col gap-1 text-xs font-medium text-muted-foreground";

/** Campos de una clase (alta y edición). El borrador del alta se guarda en el navegador. */
function ClassFields({
  defaults,
  draftKey,
}: {
  defaults?: CourseSessionView;
  /** Si se pasa, el contenido se autoguarda en localStorage con esta clave. */
  draftKey?: string;
}) {
  const [content, setContent] = useState(defaults?.content ?? "");

  useEffect(() => {
    if (!draftKey) return;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) setContent(saved);
    } catch {
      /* sin localStorage: el borrador simplemente no se restaura */
    }
  }, [draftKey]);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_9rem_6rem]">
        <label className={LABEL}>
          Tema de la clase
          <Input name="topic" maxLength={200} defaultValue={defaults?.topic ?? ""} placeholder="Estructura organizacional en SAP" autoFocus={!defaults} />
        </label>
        <label className={LABEL}>
          Fecha
          <Input name="date" type="date" defaultValue={defaults ? dateInputValue(defaults.date ? new Date(defaults.date) : null) : todayInputValue()} />
        </label>
        <label className={LABEL}>
          N.º (auto)
          <Input name="number" type="number" min={1} max={999} defaultValue={defaults?.number ?? ""} />
        </label>
      </div>
      <label className={LABEL}>
        Apuntes
        <Textarea
          name="content"
          rows={9}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (draftKey) {
              try {
                localStorage.setItem(draftKey, e.target.value);
              } catch {
                /* ignorar */
              }
            }
          }}
          placeholder={"Lo que dijo el docente, lo que hiciste en el sistema, tus dudas…\n\n**negrita**, listas con -, > para destacar una idea"}
        />
        {draftKey && <span className="text-[11px] font-normal">Se guarda un borrador mientras escribes.</span>}
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="hidden" name="attended" value="off" />
        <input
          type="checkbox"
          name="attended"
          value="on"
          defaultChecked={defaults?.attended ?? true}
          className="h-4 w-4 rounded border-input accent-[hsl(var(--primary))]"
        />
        Asistí a esta clase
      </label>
    </div>
  );
}

function ClassItem({ courseId, s, defaultOpen }: { courseId: string; s: CourseSessionView; defaultOpen: boolean }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="rounded-lg border border-border p-3">
        <form
          action={async (fd) => {
            await updateCourseSession(s.id, fd);
            setEditing(false);
            toast("Clase actualizada");
          }}
          className="flex flex-col gap-3"
        >
          <ClassFields defaults={s} />
          <div className="flex gap-2">
            <Button type="submit" size="sm">Guardar</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li>
      <details open={defaultOpen} className="group rounded-lg border border-border bg-card">
        <summary className="flex cursor-pointer flex-wrap items-center gap-2 p-3 [&::-webkit-details-marker]:hidden">
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
          <span className="min-w-0 flex-1 text-sm font-semibold">
            {s.number ? `Clase ${s.number} · ` : ""}
            {s.topic}
          </span>
          {!s.attended && <span className="rounded bg-warning/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-warning">No asistí</span>}
          {s.links.length > 0 && <span className="text-xs text-muted-foreground">{s.links.length} enlace{s.links.length === 1 ? "" : "s"}</span>}
          {s.date && (
            <span className="text-xs text-muted-foreground">
              {formatDate(s.date)} · {relativeDays(s.date)}
            </span>
          )}
        </summary>
        <div className="border-t border-border p-3 pt-2">
          {s.content.trim() ? (
            <div className="cornell text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(s.content) }} />
          ) : (
            <p className="text-sm text-muted-foreground">Esta clase no tiene apuntes todavía. Pulsa el lápiz para escribirlos.</p>
          )}

          <NamedLinks
            links={s.links}
            canEdit
            onAdd={addCourseLink.bind(null, courseId, s.id)}
            onUpdate={updateCourseLink}
            onDelete={deleteCourseLink}
            addLabel="Enlace de esta clase"
          />

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <label className="inline-flex items-center gap-1.5 text-muted-foreground">
              <input
                type="checkbox"
                checked={s.attended}
                onChange={(e) => setCourseSessionAttended(s.id, e.target.checked)}
                className="h-3.5 w-3.5 rounded border-input accent-[hsl(var(--primary))]"
              />
              Asistí
            </label>
            <span className="ml-auto flex items-center gap-2 text-muted-foreground">
              <button type="button" onClick={() => setEditing(true)} className="hover:text-foreground" aria-label="Editar clase">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (window.confirm("¿Eliminar esta clase con sus apuntes y enlaces?")) {
                    await deleteCourseSession(s.id);
                    toast("Clase eliminada", "info");
                  }
                }}
                className="hover:text-destructive"
                aria-label="Eliminar clase"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </span>
          </div>
        </div>
      </details>
    </li>
  );
}

/** Clases del curso con sus apuntes y enlaces propios. La más reciente va primero y abierta. */
export function CourseSessions({ courseId, sessions }: { courseId: string; sessions: CourseSessionView[] }) {
  const [adding, setAdding] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const draftKey = `rxtrack:course:${courseId}:draft`;

  const sorted = [...sessions].sort((a, b) => {
    const da = a.date ? +new Date(a.date) : 0;
    const db = b.date ? +new Date(b.date) : 0;
    return db - da || (b.number ?? 0) - (a.number ?? 0);
  });

  return (
    <div className="flex flex-col gap-3">
      {adding ? (
        <form
          key={formKey}
          action={async (fd) => {
            await addCourseSession(courseId, fd);
            try {
              localStorage.removeItem(draftKey);
            } catch {
              /* ignorar */
            }
            setAdding(false);
            setFormKey((k) => k + 1);
            toast("Clase guardada");
          }}
          className="flex flex-col gap-3 rounded-lg border border-primary/30 bg-primary/[0.03] p-3"
        >
          <ClassFields draftKey={draftKey} />
          <div className="flex gap-2">
            <Button type="submit" size="sm">
              <Check className="h-3.5 w-3.5" />
              Guardar clase
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setAdding(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <Button type="button" size="sm" onClick={() => setAdding(true)}>
            <Plus className="h-3.5 w-3.5" />
            Nueva clase
          </Button>
        </div>
      )}

      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aún no hay clases. Después de cada sesión, agrega aquí tus apuntes mientras están frescos.</p>
      ) : (
        <ul className={cn("flex flex-col gap-2")}>
          {sorted.map((s, i) => (
            <ClassItem key={s.id} courseId={courseId} s={s} defaultOpen={i === 0} />
          ))}
        </ul>
      )}
    </div>
  );
}
