"use client";

import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ViewProfile } from "@/lib/auth";
import { startViewAs } from "@/lib/actions/view-as";
import { SIDE_ICON_BTN, SIDE_ICON_TIP } from "@/components/side-icon";

/**
 * "Ver como": Cesar elige a qué perfil quiere ver la app (Diana, Paula, JOSE, Karen…) para revisar
 * la interfaz tal como la ve esa persona, con sus mismos permisos y alcance. La lista sale de las
 * cuentas (lib/auth.ts), así que una cuenta nueva aparece sola.
 */
export function ViewAsMenu({ profiles, variant }: { profiles: ViewProfile[]; variant: "icon" | "bar" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (profiles.length === 0) return null;

  return (
    <div ref={ref} className="relative">
      {variant === "icon" ? (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Ver como"
          aria-haspopup="menu"
          aria-expanded={open}
          className={cn(SIDE_ICON_BTN, open && "bg-accent text-accent-foreground")}
        >
          <Eye className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
          {!open && <span className={SIDE_ICON_TIP}>Ver como</span>}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
          title="Ver la interfaz como la ve otra persona"
          className="press inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Eye className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Ver como</span>
        </button>
      )}

      {open && (
        <div
          role="menu"
          aria-label="Ver como"
          className={cn(
            "absolute z-50 w-64 rounded-xl border border-border bg-card p-1.5 shadow-card-hover",
            variant === "icon" ? "bottom-full left-0 mb-2" : "right-0 top-full mt-2",
          )}
        >
          <p className="px-2.5 pb-1 pt-1.5 text-xs font-semibold text-muted-foreground">Ver la app como…</p>
          {profiles.map((p) => (
            <form key={p.key} action={startViewAs.bind(null, p.key)}>
              <button
                type="submit"
                role="menuitem"
                className="press flex min-h-11 w-full flex-col justify-center rounded-lg px-2.5 text-left transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="text-sm font-medium leading-tight">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.detail}</span>
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
