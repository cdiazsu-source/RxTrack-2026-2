"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { search, KIND_LABEL, type SearchHit } from "@/lib/actions/search";
import { cn } from "@/lib/utils";

/**
 * Buscador global. Se abre con Ctrl/Cmd + K desde cualquier parte y busca en
 * apuntes, glosario, fórmulas, bitácora, recursos, fechas, proyectos y tarjetas
 * de las 7 asignaturas.
 */
export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [sel, setSel] = useState(0);
  const [pending, start] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20);
    else {
      setQ("");
      setHits([]);
      setSel(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (q.trim().length < 2) {
        setHits([]);
        return;
      }
      start(async () => {
        const r = await search(q);
        setHits(r);
        setSel(0);
      });
    }, 180);
    return () => clearTimeout(t);
  }, [q, open]);

  const go = (h: SearchHit) => {
    setOpen(false);
    router.push(h.href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="press inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent"
        aria-label="Buscar (Ctrl+K)"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Buscar</span>
        <kbd className="hidden rounded bg-muted px-1 font-mono text-[10px] sm:inline">Ctrl K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/20 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-border px-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, hits.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
                  if (e.key === "Enter" && hits[sel]) { e.preventDefault(); go(hits[sel]); }
                }}
                placeholder="Buscar en todo el semestre…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {pending && <span className="text-xs text-muted-foreground">…</span>}
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-1.5">
              {q.trim().length >= 2 && hits.length === 0 && !pending && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">Sin resultados.</p>
              )}
              {hits.map((h, i) => (
                <button
                  key={`${h.kind}-${h.href}-${i}`}
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onClick={() => go(h)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left",
                    i === sel ? "bg-accent" : "hover:bg-muted/60",
                  )}
                >
                  <span className="mt-0.5 shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">
                    {h.subjectCode} · {KIND_LABEL[h.kind]}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{h.title}</span>
                    {h.snippet && <span className="block truncate text-xs text-muted-foreground">{h.snippet}</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
