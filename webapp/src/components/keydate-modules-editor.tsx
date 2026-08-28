"use client";

import { useState, useTransition } from "react";

import { setKeyDateModules } from "@/lib/actions/dates";
import { useCanEdit } from "@/components/access-context";
import { cn } from "@/lib/utils";

export function KeyDateModulesEditor({
  keyDateId,
  modules,
  selected,
}: {
  keyDateId: string;
  modules: { id: string; title: string }[];
  selected: string[];
}) {
  const canEdit = useCanEdit();
  const [ids, setIds] = useState<string[]>(selected);
  const [pending, start] = useTransition();

  const toggle = (id: string) => {
    if (!canEdit) return;
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    setIds(next);
    start(() => setKeyDateModules(keyDateId, next));
  };

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Módulos que cubre este parcial {pending && <span className="font-normal">· guardando…</span>}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {modules.map((m) => {
          const on = ids.includes(m.id);
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => toggle(m.id)}
              disabled={!canEdit}
              className={cn(
                "press rounded-md border px-2 py-1 text-xs transition-colors",
                on ? "border-primary bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:bg-accent",
                !canEdit && "cursor-default",
              )}
            >
              {m.title}
            </button>
          );
        })}
        {modules.length === 0 && <span className="text-xs text-muted-foreground">Esta asignatura no tiene módulos cargados.</span>}
      </div>
    </div>
  );
}
