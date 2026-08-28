"use client";

import { useEffect, useRef, useState } from "react";
import { Folder, FolderPlus } from "lucide-react";

import { setSubjectDriveUrl } from "@/lib/actions/subjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCanEdit } from "@/components/access-context";
import { cn } from "@/lib/utils";

/**
 * Botón minimalista de carpeta que enlaza a la carpeta de Drive de la asignatura.
 * - Con enlace: la carpeta abre Drive en otra pestaña. Si puedes editar, un clic
 *   largo (o el botón de editar que aparece al pasar el mouse) abre el editor.
 * - Sin enlace y con permiso de edición: el clic abre un campo para pegar la URL.
 * - Sin enlace y solo lectura: no se muestra.
 */
export function SubjectFolderButton({ subjectId, url }: { subjectId: string; url: string | null }) {
  const canEdit = useCanEdit();
  const [editing, setEditing] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editing) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setEditing(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setEditing(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [editing]);

  if (!url && !canEdit) return null;

  return (
    <div ref={wrapRef} className="relative inline-flex">
      {editing && canEdit ? (
        <form
          action={async (fd) => {
            await setSubjectDriveUrl(subjectId, fd);
            setEditing(false);
          }}
          className="absolute right-0 top-0 z-30 flex items-center gap-1.5 rounded-md border border-border bg-card p-1.5 shadow-lg"
        >
          <Input
            name="driveUrl"
            type="url"
            defaultValue={url ?? ""}
            placeholder="https://drive.google.com/…"
            className="h-8 w-64"
            autoFocus
          />
          <Button type="submit" size="sm">Guardar</Button>
        </form>
      ) : null}

      <div className={cn("group inline-flex items-center", editing && "invisible")}>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Abrir carpeta de Drive de la asignatura"
            aria-label="Abrir carpeta de Drive"
            className="press inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Folder className="h-[18px] w-[18px]" />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            title="Enlazar carpeta de Drive"
            aria-label="Enlazar carpeta de Drive"
            className="press inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FolderPlus className="h-[18px] w-[18px]" />
          </button>
        )}

        {url && canEdit && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label="Cambiar enlace de Drive"
            className="ml-0.5 hidden rounded p-1 text-xs text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:inline-flex group-focus-within:inline-flex"
          >
            editar
          </button>
        )}
      </div>
    </div>
  );
}
