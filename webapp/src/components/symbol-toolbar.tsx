"use client";

import type { RefObject } from "react";

/**
 * Mini menú de símbolos de química/física para insertar en un textarea en la
 * posición del cursor (letras griegas, super/subíndices Unicode, flechas de
 * reacción). Pensado para los apuntes de clase: no depende de ningún markup
 * propio de la app — son caracteres Unicode normales, así que se ven bien en
 * cualquier lado (apuntes, transcripción, exportado, etc.).
 */
const GROUPS: { label: string; items: string[] }[] = [
  { label: "Griegas", items: ["Δ", "δ", "γ", "ε", "α", "β", "θ", "λ", "μ", "π", "Σ", "σ", "ω", "η", "φ", "χ", "ν", "τ"] },
  { label: "Superíndice", items: ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹", "⁺", "⁻", "ⁿ"] },
  { label: "Subíndice", items: ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉", "₊", "₋"] },
  { label: "Otros", items: ["±", "×", "÷", "·", "°", "→", "⇌", "≈", "≠", "≤", "≥", "√", "∞", "‰"] },
];

export function SymbolToolbar({
  targetRef,
  onInsert,
}: {
  /** Ref al <textarea> donde se inserta el símbolo, en la posición del cursor. */
  targetRef: RefObject<HTMLTextAreaElement>;
  /** Recibe el texto completo ya con el símbolo insertado (para el estado controlado). */
  onInsert: (next: string) => void;
}) {
  const insert = (sym: string) => {
    const el = targetRef.current;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const next = el.value.slice(0, start) + sym + el.value.slice(end);
    onInsert(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + sym.length;
      el.setSelectionRange(pos, pos);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-md border border-dashed border-input bg-muted/30 px-2 py-1.5">
      {GROUPS.map((g) => (
        <div key={g.label} className="flex flex-wrap items-center gap-0.5">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {g.label}
          </span>
          {g.items.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => insert(s)}
              title={`Insertar ${s}`}
              className="press inline-flex h-6 w-6 items-center justify-center rounded text-sm leading-none hover:bg-accent hover:text-accent-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
