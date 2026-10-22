"use client";

import { Code2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { setDevMode } from "@/lib/actions/dev-mode";

/**
 * Interruptor del modo desarrollador (solo lo ve Cesar). Con el modo activo, cada sección de una
 * asignatura muestra un panel que arma un prompt para conversar cambios con otra IA.
 */
export function DevModeToggle({ on, variant }: { on: boolean; variant: "side" | "bar" }) {
  return (
    <form action={setDevMode.bind(null, !on)}>
      <button
        type="submit"
        role="switch"
        aria-checked={on}
        title={on ? "Apagar el modo desarrollador" : "Encender el modo desarrollador"}
        className={cn(
          "press inline-flex items-center gap-2 rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          variant === "side" ? "w-full justify-between px-2 py-1.5" : "px-2 py-1",
          on ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <Code2 className={variant === "side" ? "h-4 w-4" : "h-3.5 w-3.5"} strokeWidth={1.75} aria-hidden />
          <span className={variant === "bar" ? "hidden sm:inline" : undefined}>Modo desarrollador</span>
        </span>
        <span
          aria-hidden
          className={cn("relative h-4 w-7 shrink-0 rounded-full transition-colors", on ? "bg-primary" : "bg-border")}
        >
          <span
            className={cn(
              "absolute top-0.5 h-3 w-3 rounded-full bg-background shadow-sm transition-[left]",
              on ? "left-[14px]" : "left-0.5",
            )}
          />
        </span>
      </button>
    </form>
  );
}
