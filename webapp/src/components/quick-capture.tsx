"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

import { addInboxItem } from "@/lib/actions/inbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SIDE_ICON_BTN, SIDE_ICON_TIP } from "@/components/side-icon";

/**
 * Captura rápida (TDAH): botón "+" siempre visible. Sueltas una idea o un enlace
 * sin decidir dónde va; cae en la bandeja (/inbox) para clasificar después.
 * Atajo: Ctrl/Cmd + Shift + K.
 */
export function QuickCapture({ variant = "bar" }: { variant?: "bar" | "icon" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => ref.current?.focus(), 20);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Captura rápida (Ctrl+Shift+K)"
        title="Captura rápida"
        className={
          variant === "icon"
            ? SIDE_ICON_BTN
            : "press inline-flex h-7 w-7 items-center justify-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
        }
      >
        {variant === "icon" ? (
          <>
            <Plus className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            <span className={SIDE_ICON_TIP}>Captura rápida (Ctrl+Shift+K)</span>
          </>
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/20 p-4 pt-[14vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            action={async (fd) => {
              await addInboxItem(fd);
              setOpen(false);
            }}
            className="flex w-full max-w-md flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-2xl"
          >
            <p className="text-sm font-semibold">Captura rápida</p>
            <Textarea ref={ref} name="text" rows={3} required placeholder="Una idea, una duda, algo que no quieres perder…" />
            <Input name="url" type="url" placeholder="Enlace (opcional)" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Va a tu bandeja, la clasificas luego.</span>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" size="sm">Guardar</Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
