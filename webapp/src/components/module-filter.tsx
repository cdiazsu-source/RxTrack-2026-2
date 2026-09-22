"use client";

import { useRouter, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export type ModuleFilterOption = { slug: string; title: string };

/** Chips para elegir de qué módulo(s) repasar. Sin selección = toda la
 *  asignatura. El estado vive en la URL (`?modulos=a,b`) para que el server
 *  component filtre la consulta y respete los topes de tarjetas por sesión. */
export function ModuleFilter({
  modules,
  selected,
}: {
  modules: ModuleFilterOption[];
  selected: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAll = selected.length === 0;

  const go = (slugs: string[]) => {
    const qs = slugs.length ? `?modulos=${slugs.map(encodeURIComponent).join(",")}` : "";
    router.push(`${pathname}${qs}`);
  };

  const toggle = (slug: string) => {
    if (isAll) return go([slug]);
    const next = selected.includes(slug) ? selected.filter((s) => s !== slug) : [...selected, slug];
    go(next);
  };

  const chip = (active: boolean) =>
    cn(
      "press rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    );

  return (
    <div className="flex flex-wrap gap-1.5">
      <button type="button" onClick={() => go([])} className={chip(isAll)}>
        Todos los módulos
      </button>
      {modules.map((m) => (
        <button key={m.slug} type="button" onClick={() => toggle(m.slug)} className={chip(!isAll && selected.includes(m.slug))}>
          {m.title}
        </button>
      ))}
    </div>
  );
}
