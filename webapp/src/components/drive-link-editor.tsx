"use client";

import { useState } from "react";
import { ExternalLink, Link2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCanEdit } from "@/components/access-context";

/**
 * Editor de un enlace (carpeta de Drive, PDF). `action` es una server action que
 * recibe un FormData con el campo `driveUrl`.
 */
export function DriveLinkEditor({
  url,
  action,
  label = "Carpeta de Drive",
}: {
  url: string | null;
  action: (formData: FormData) => Promise<void>;
  label?: string;
}) {
  const canEdit = useCanEdit();
  const [editing, setEditing] = useState(false);

  if (editing && canEdit) {
    return (
      <form
        action={async (fd) => {
          await action(fd);
          setEditing(false);
        }}
        className="flex items-center gap-2"
      >
        <Input name="driveUrl" type="url" defaultValue={url ?? ""} placeholder="https://drive.google.com/…" className="w-64" autoFocus />
        <Button type="submit" size="sm">Guardar</Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancelar</Button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
          <ExternalLink className="h-3.5 w-3.5" />
          {label}
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Link2 className="h-3.5 w-3.5" />
          Sin {label.toLowerCase()}
        </span>
      )}
      {canEdit && (
        <button type="button" onClick={() => setEditing(true)} className="rounded p-1 text-muted-foreground hover:bg-accent" aria-label="Editar enlace">
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
