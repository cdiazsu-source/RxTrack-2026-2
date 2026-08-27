"use client";

import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { HELP } from "@/lib/help";

/** ⓘ contextual. Pásale una `key` del registro `HELP` o un `text` directo. */
export function HelpHint({ k, text, className }: { k?: keyof typeof HELP | string; text?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const body = text ?? (k ? HELP[k] : "") ?? "";

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!body) return null;

  return (
    <span ref={ref} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Qué hace (y qué no hace) esta sección"
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground/70 transition-colors hover:text-primary focus-visible:text-primary"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-30 mt-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-card p-3 text-xs font-normal normal-case leading-relaxed tracking-normal text-card-foreground shadow-lg"
        >
          {body}
        </span>
      )}
    </span>
  );
}
