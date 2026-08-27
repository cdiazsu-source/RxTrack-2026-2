"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

import { clearResumePoint, setResumePoint } from "@/lib/actions/semester";
import { HelpHint } from "@/components/help-hint";

/**
 * TDAH — "Continuar donde ibas". Se coloca en las páginas profundas (detalle de
 * módulo, de proyecto): al montarse, registra la ruta y una etiqueta legible
 * como punto de retorno. No renderiza nada.
 */
export function ResumeTracker({ route, label }: { route: string; label: string }) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const t = setTimeout(() => {
      void setResumePoint(route, label);
    }, 1200); // si solo pasabas de largo, no lo registra
    return () => clearTimeout(t);
  }, [route, label]);
  return null;
}

/** Banner del panel "Semestre". */
export function ResumeBanner({
  route,
  label,
  note,
}: {
  route: string | null;
  label: string | null;
  note: string | null;
}) {
  if (!route || !label) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
      <div className="flex-1">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Seguías en <HelpHint text="Se actualiza solo al navegar. 'Descartar' lo borra." />
        </p>
        <p className="text-sm font-medium">{label}</p>
        {note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}
      </div>
      <Link
        href={route}
        className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
      >
        Continuar
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
      <button
        type="button"
        onClick={() => clearResumePoint()}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent"
      >
        <X className="h-3.5 w-3.5" />
        Descartar
      </button>
    </div>
  );
}
