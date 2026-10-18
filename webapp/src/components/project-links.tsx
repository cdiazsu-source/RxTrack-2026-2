"use client";

import { useState } from "react";
import { ExternalLink, Link2, Pencil, Plus, Trash2 } from "lucide-react";

import { addProjectLink, deleteProjectLink, updateProjectLink } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useCanContribute } from "@/components/access-context";

export type ProjectLinkView = { id: string; name: string; url: string };

function LinkForm({
  link,
  action,
  onDone,
}: {
  link?: ProjectLinkView;
  action: (fd: FormData) => Promise<void>;
  onDone: () => void;
}) {
  return (
    <form
      action={async (fd) => {
        await action(fd);
        toast(link ? "Enlace actualizado" : "Enlace agregado");
        onDone();
      }}
      className="flex flex-wrap items-center gap-2"
    >
      <Input name="name" defaultValue={link?.name ?? ""} placeholder="Nombre (p. ej. Preinforme v1)" maxLength={120} className="w-52" />
      <Input
        name="url"
        type="url"
        required
        defaultValue={link?.url ?? ""}
        placeholder="https://docs.google.com/…"
        className="min-w-0 flex-1 basis-60"
        autoFocus={!link}
      />
      <Button type="submit" size="sm">Guardar</Button>
      <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancelar</Button>
    </form>
  );
}

/** Enlaces anexados al proyecto (documentos de Google Drive, referencias). */
export function ProjectLinks({ projectId, links }: { projectId: string; links: ProjectLinkView[] }) {
  const canEdit = useCanContribute();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader className="flex-row flex-wrap items-center justify-between gap-2 p-4 pb-2">
        <CardTitle className="flex items-center gap-1.5 text-sm">
          <Link2 className="h-4 w-4" aria-hidden />
          Documentos y enlaces
        </CardTitle>
        {canEdit && !adding && (
          <Button type="button" size="sm" variant="outline" onClick={() => setAdding(true)}>
            <Plus className="h-3.5 w-3.5" />
            Anexar enlace
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4 pt-0">
        {adding && (
          <LinkForm action={addProjectLink.bind(null, projectId)} onDone={() => setAdding(false)} />
        )}
        {links.length === 0 && !adding && (
          <p className="text-sm text-muted-foreground">
            Sin enlaces todavía. Anexa aquí el documento de Google Drive (preinforme, hojas de cálculo, referencias).
          </p>
        )}
        {links.map((l) =>
          editingId === l.id ? (
            <LinkForm key={l.id} link={l} action={updateProjectLink.bind(null, l.id)} onDone={() => setEditingId(null)} />
          ) : (
            <div key={l.id} className="flex items-center gap-2 text-sm">
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-0 items-center gap-1.5 text-primary hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{l.name}</span>
              </a>
              {canEdit && (
                <span className="ml-auto flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => setEditingId(l.id)}
                    className="rounded p-1 text-muted-foreground hover:bg-accent"
                    aria-label={`Modificar enlace ${l.name}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteProjectLink(l.id);
                      toast("Enlace eliminado", "info");
                    }}
                    className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
                    aria-label={`Eliminar enlace ${l.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}
            </div>
          ),
        )}
      </CardContent>
    </Card>
  );
}
