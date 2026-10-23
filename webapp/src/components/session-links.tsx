"use client";

import { useState } from "react";
import {
  ExternalLink,
  FileText,
  FolderOpen,
  Globe,
  Image as ImageIcon,
  Link2,
  NotebookText,
  Pencil,
  Plus,
  Presentation,
  Sparkles,
  Trash2,
  Video,
  type LucideIcon,
} from "lucide-react";

import { addSessionLink, deleteSessionLink, updateSessionLink } from "@/lib/actions/sessions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useCanContribute } from "@/components/access-context";
import {
  SESSION_LINK_KINDS,
  SESSION_LINK_KIND_LABEL,
  SESSION_LINK_KIND_NAME,
  asSessionLinkKind,
  guessSessionLinkKind,
  type SessionLinkKind,
} from "@/lib/session-links";

export type SessionLinkView = { id: string; name: string; url: string; kind: string };

export const LINK_KIND_ICON: Record<SessionLinkKind, LucideIcon> = {
  ONENOTE: NotebookText,
  IA: Sparkles,
  DIAPOSITIVAS: Presentation,
  FOTOS: ImageIcon,
  DRIVE: FolderOpen,
  VIDEO: Video,
  PLATAFORMA: Globe,
  ARCHIVO: FileText,
  OTRO: Link2,
};

function LinkForm({
  link,
  action,
  onDone,
}: {
  link?: SessionLinkView;
  action: (fd: FormData) => Promise<void>;
  onDone: () => void;
}) {
  const [kind, setKind] = useState<SessionLinkKind>(asSessionLinkKind(link?.kind));
  const [name, setName] = useState(link?.name ?? "");
  // El nombre sugerido sigue al tipo mientras la persona no lo haya escrito a mano.
  const [nameTouched, setNameTouched] = useState(!!link);

  const pickKind = (k: SessionLinkKind) => {
    setKind(k);
    if (!nameTouched) setName(SESSION_LINK_KIND_NAME[k]);
  };

  return (
    <form
      action={async (fd) => {
        await action(fd);
        toast(link ? "Enlace actualizado" : "Enlace agregado");
        onDone();
      }}
      className="flex flex-col gap-2 rounded-md border border-border p-2.5"
    >
      <input type="hidden" name="kind" value={kind} />
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tipo de enlace">
        {SESSION_LINK_KINDS.map((k) => {
          const Icon = LINK_KIND_ICON[k];
          const on = k === kind;
          return (
            <button
              key={k}
              type="button"
              onClick={() => pickKind(k)}
              aria-pressed={on}
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs ${
                on ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {SESSION_LINK_KIND_LABEL[k]}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameTouched(true);
          }}
          placeholder="Nombre (p. ej. OneNote — clase 5)"
          maxLength={120}
          className="w-56"
          aria-label="Nombre del enlace"
        />
        <Input
          name="url"
          type="url"
          required
          defaultValue={link?.url ?? ""}
          onChange={(e) => {
            if (!link && kind === "OTRO") pickKind(guessSessionLinkKind(e.target.value));
          }}
          placeholder="https://…"
          className="min-w-0 flex-1 basis-60"
          autoFocus={!link}
          aria-label="URL del enlace"
        />
        <Button type="submit" size="sm">Guardar</Button>
        <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}

/** Enlaces con nombre propio (OneNote, Gemini, diapositivas, fotos, plataforma…). Genérico: lo usan las sesiones
 *  de apuntes y los cursos, cada uno con sus propias acciones del servidor. */
export function NamedLinks({
  links,
  canEdit,
  onAdd,
  onUpdate,
  onDelete,
  addLabel = "Agregar enlace",
}: {
  links: SessionLinkView[];
  canEdit: boolean;
  onAdd: (fd: FormData) => Promise<void>;
  onUpdate: (linkId: string, fd: FormData) => Promise<void>;
  onDelete: (linkId: string) => Promise<void>;
  addLabel?: string;
}) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!canEdit && links.length === 0) return null;

  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {links.map((l) => {
          const Icon = LINK_KIND_ICON[asSessionLinkKind(l.kind)];
          return editingId === l.id ? null : (
            <span key={l.id} className="inline-flex max-w-full items-center gap-0.5 rounded-md border border-border bg-muted/30 pl-2 text-sm">
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-0 items-center gap-1.5 py-1 pr-1.5 text-primary hover:underline"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="truncate">{l.name}</span>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-60" aria-hidden />
              </a>
              {canEdit && (
                <>
                  <button
                    type="button"
                    onClick={() => setEditingId(l.id)}
                    className="rounded p-1 text-muted-foreground hover:bg-accent"
                    aria-label={`Modificar enlace ${l.name}`}
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await onDelete(l.id);
                      toast("Enlace eliminado", "info");
                    }}
                    className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
                    aria-label={`Eliminar enlace ${l.name}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </>
              )}
            </span>
          );
        })}
        {canEdit && !adding && (
          <Button type="button" size="sm" variant="outline" onClick={() => setAdding(true)}>
            <Plus className="h-3.5 w-3.5" />
            {addLabel}
          </Button>
        )}
      </div>
      {editingId && (
        <LinkForm
          link={links.find((l) => l.id === editingId)}
          action={onUpdate.bind(null, editingId)}
          onDone={() => setEditingId(null)}
        />
      )}
      {adding && <LinkForm action={onAdd} onDone={() => setAdding(false)} />}
    </div>
  );
}

/** Enlaces de una sesión de apuntes. */
export function SessionLinks({ sessionId, links }: { sessionId: string; links: SessionLinkView[] }) {
  const canEdit = useCanContribute();
  return (
    <NamedLinks
      links={links}
      canEdit={canEdit}
      onAdd={addSessionLink.bind(null, sessionId)}
      onUpdate={updateSessionLink}
      onDelete={deleteSessionLink}
    />
  );
}
