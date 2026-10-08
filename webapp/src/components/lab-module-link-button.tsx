"use client";

import { useState } from "react";
import { FileSpreadsheet, Link2, Pencil } from "lucide-react";

import { setLabModuleLink } from "@/lib/actions/lab-module-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCanContribute } from "@/components/access-context";

/**
 * Botón "Abrir Excel" de una agrupación del laboratorio (Módulo I / II…).
 * - Con enlace: abre el documento en otra pestaña; si puedes editar, un lápiz
 *   permite cambiar o quitar el enlace.
 * - Sin enlace y con permiso: «Enlazar Excel» abre un campo para pegar la URL.
 * - Sin enlace y solo lectura: no se muestra.
 */
export function LabModuleLinkButton({
  subjectId,
  name,
  url,
}: {
  subjectId: string;
  name: string;
  url: string | null;
}) {
  const canEdit = useCanContribute();
  const [editing, setEditing] = useState(false);

  if (editing && canEdit) {
    return (
      <form
        action={async (fd) => {
          await setLabModuleLink(subjectId, name, fd);
          setEditing(false);
        }}
        className="flex flex-wrap items-center gap-2"
      >
        <Input
          name="url"
          type="url"
          defaultValue={url ?? ""}
          placeholder="https://docs.google.com/spreadsheets/…"
          className="h-8 w-72 max-w-full"
          autoFocus
        />
        <Button type="submit" size="sm">Guardar</Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(false)}>
          Cancelar
        </Button>
        <span className="w-full text-[11px] text-muted-foreground">Déjalo vacío y guarda para quitar el enlace.</span>
      </form>
    );
  }

  if (!url && !canEdit) return null;

  return (
    <div className="flex items-center gap-1.5">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="press inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent"
        >
          <FileSpreadsheet className="h-3.5 w-3.5" />
          Abrir Excel de {name}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="press inline-flex items-center gap-1.5 rounded-md border border-dashed border-input px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
        >
          <Link2 className="h-3.5 w-3.5" />
          Enlazar Excel de {name}
        </button>
      )}
      {url && canEdit && (
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label={`Cambiar enlace del Excel de ${name}`}
          className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-primary"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
