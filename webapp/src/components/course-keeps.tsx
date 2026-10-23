"use client";

import { useMemo, useState } from "react";
import { Copy, Pencil, Pin, PinOff, Plus, Search, Trash2 } from "lucide-react";

import { addCourseKeep, deleteCourseKeep, setCourseKeepPinned, updateCourseKeep } from "@/lib/actions/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { KEEP_TAGS, KEEP_TAG_LABEL, asKeepTag, type KeepTag } from "@/lib/courses";
import { cn } from "@/lib/utils";

export type CourseKeepView = { id: string; title: string; body: string; tag: string; pinned: boolean };

const CODE_TAGS: KeepTag[] = ["CODIGO", "FORMULA", "ATAJO"];

function KeepForm({
  keep,
  action,
  onDone,
}: {
  keep?: CourseKeepView;
  action: (fd: FormData) => Promise<void>;
  onDone: () => void;
}) {
  return (
    <form
      action={async (fd) => {
        await action(fd);
        toast(keep ? "Actualizado" : "Guardado para el futuro");
        onDone();
      }}
      className="flex flex-col gap-2 rounded-lg border border-primary/30 bg-primary/[0.03] p-3"
    >
      <div className="flex flex-wrap gap-2">
        <Input name="title" required maxLength={160} defaultValue={keep?.title ?? ""} placeholder="Título (p. ej. Transacción para ver el libro mayor)" className="min-w-0 flex-1 basis-60" autoFocus={!keep} aria-label="Título" />
        <select
          name="tag"
          defaultValue={asKeepTag(keep?.tag)}
          aria-label="Etiqueta"
          className="h-9 rounded-md border border-input bg-background px-2 text-sm"
        >
          {KEEP_TAGS.map((t) => (
            <option key={t} value={t}>
              {KEEP_TAG_LABEL[t]}
            </option>
          ))}
        </select>
      </div>
      <Textarea name="body" required rows={5} maxLength={20000} defaultValue={keep?.body ?? ""} placeholder="Lo que quieres poder encontrar y copiar después: un código, una fórmula, los pasos, un tip…" className="font-mono text-[13px]" />
      <div className="flex gap-2">
        <Button type="submit" size="sm">Guardar</Button>
        <Button type="button" size="sm" variant="ghost" onClick={onDone}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

function KeepCard({ k }: { k: CourseKeepView }) {
  const [editing, setEditing] = useState(false);
  const tag = asKeepTag(k.tag);

  if (editing) return <KeepForm keep={k} action={updateCourseKeep.bind(null, k.id)} onDone={() => setEditing(false)} />;

  return (
    <div className={cn("rounded-lg border bg-card p-3", k.pinned ? "border-primary/40" : "border-border")}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground">
          {KEEP_TAG_LABEL[tag]}
        </span>
        <p className="min-w-0 flex-1 text-sm font-semibold">{k.title}</p>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(k.body);
                toast("Copiado");
              } catch {
                toast("No pude copiar solo: selecciona el texto", "info");
              }
            }}
            className="hover:text-foreground"
            aria-label="Copiar contenido"
            title="Copiar"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => setCourseKeepPinned(k.id, !k.pinned)} className="hover:text-foreground" aria-label={k.pinned ? "Quitar fijado" : "Fijar arriba"} title={k.pinned ? "Quitar fijado" : "Fijar arriba"}>
            {k.pinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
          </button>
          <button type="button" onClick={() => setEditing(true)} className="hover:text-foreground" aria-label="Editar">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={async () => {
              if (window.confirm(`¿Eliminar «${k.title}»?`)) {
                await deleteCourseKeep(k.id);
                toast("Eliminado", "info");
              }
            }}
            className="hover:text-destructive"
            aria-label="Eliminar"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </span>
      </div>
      <p className={cn("mt-1.5 whitespace-pre-wrap break-words text-sm leading-snug", CODE_TAGS.includes(tag) && "rounded bg-muted/50 p-2 font-mono text-[13px]")}>
        {k.body}
      </p>
    </div>
  );
}

/** «Para el futuro»: lo que quieres poder encontrar después, con etiquetas, búsqueda y copia en un clic. */
export function CourseKeeps({ courseId, keeps }: { courseId: string; keeps: CourseKeepView[] }) {
  const [adding, setAdding] = useState(false);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<KeepTag | "">("");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return keeps
      .filter((k) => (!tag || asKeepTag(k.tag) === tag) && (!needle || `${k.title} ${k.body}`.toLowerCase().includes(needle)))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [keeps, q, tag]);

  const usedTags = KEEP_TAGS.filter((t) => keeps.some((k) => asKeepTag(k.tag) === t));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {!adding && (
          <Button type="button" size="sm" onClick={() => setAdding(true)}>
            <Plus className="h-3.5 w-3.5" />
            Guardar algo
          </Button>
        )}
        {keeps.length > 3 && (
          <div className="relative min-w-0 flex-1 basis-48">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar en lo guardado…" className="pl-8" aria-label="Buscar" />
          </div>
        )}
      </div>

      {usedTags.length > 1 && (
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por etiqueta">
          {(["", ...usedTags] as const).map((t) => (
            <button
              key={t || "todas"}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className={cn(
                "rounded-md border px-2 py-1 text-xs",
                tag === t ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-accent",
              )}
            >
              {t ? KEEP_TAG_LABEL[t] : "Todo"}
            </button>
          ))}
        </div>
      )}

      {adding && <KeepForm action={addCourseKeep.bind(null, courseId)} onDone={() => setAdding(false)} />}

      {keeps.length === 0 && !adding && (
        <p className="text-sm text-muted-foreground">
          Aquí guardas lo que no quieres volver a buscar: códigos de transacción, fórmulas, atajos, trucos, el paso a paso de algo difícil.
        </p>
      )}
      {keeps.length > 0 && shown.length === 0 && <p className="text-sm text-muted-foreground">Nada coincide con esa búsqueda.</p>}

      <div className="flex flex-col gap-2">
        {shown.map((k) => (
          <KeepCard key={k.id} k={k} />
        ))}
      </div>
    </div>
  );
}
