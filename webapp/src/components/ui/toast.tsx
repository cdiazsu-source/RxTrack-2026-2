"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Check, Info } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * TDAH — criterio 3: retroalimentación inmediata. Ninguna acción (marcar una
 * casilla, guardar una nota) debe ser silenciosa. `toast()` se llama desde
 * cualquier componente cliente justo después de la acción; el aviso se anuncia
 * por `aria-live` y se va solo. Sin dependencias, sin animación agresiva
 * (`prefers-reduced-motion` la neutraliza vía globals.css). Copia nunca
 * punitiva: confirma lo que pasó, no regaña.
 */

type ToastKind = "success" | "info" | "error";
type ToastMsg = { id: number; text: string; kind: ToastKind };

const listeners = new Set<(t: ToastMsg) => void>();
let seq = 0;

export function toast(text: string, kind: ToastKind = "success") {
  seq += 1;
  const msg: ToastMsg = { id: seq, text, kind };
  listeners.forEach((l) => l(msg));
}

const ICON: Record<ToastKind, typeof Check> = {
  success: Check,
  info: Info,
  error: AlertTriangle,
};

const ICON_TONE: Record<ToastKind, string> = {
  success: "text-success",
  info: "text-primary",
  error: "text-destructive",
};

const BORDER_TONE: Record<ToastKind, string> = {
  success: "border-success/45",
  info: "border-border",
  error: "border-destructive/45",
};

/** Se monta una sola vez en el layout raíz. */
export function Toaster() {
  const [items, setItems] = useState<ToastMsg[]>([]);

  useEffect(() => {
    const onMsg = (t: ToastMsg) => {
      setItems((prev) => [...prev, t]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== t.id));
      }, 2600);
    };
    listeners.add(onMsg);
    return () => {
      listeners.delete(onMsg);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4"
    >
      {items.map((t) => {
        const Icon = ICON[t.kind];
        return (
          <div
            key={t.id}
            className={cn(
              "rx-toast-in pointer-events-auto flex items-center gap-2.5 rounded-lg border bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-card-hover",
              BORDER_TONE[t.kind],
            )}
          >
            <Icon className={cn("h-4 w-4 shrink-0", ICON_TONE[t.kind])} aria-hidden />
            <span>{t.text}</span>
          </div>
        );
      })}
    </div>
  );
}
