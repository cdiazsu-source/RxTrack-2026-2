"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Check, ChevronRight, ClipboardCopy, Code2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { getDevPrompt } from "@/lib/actions/dev-prompt";
import { DEV_IDEA_PLACEHOLDER, DEV_SECTION_LABEL, devCourseSectionFromPath, devSectionFromPath } from "@/lib/dev-section";

const ideaKey = (key: string) => `rxtrack:dev:idea:${key}`;

/**
 * Modo desarrollador: bajo las pestañas de la asignatura, un prompt para llevarle a OTRA IA la
 * sección que se está viendo (rutas, archivos, datos, permisos, límites y estado real) junto con una
 * idea de cambio. El texto lo arma el servidor (`getDevPrompt`); aquí solo se pide, se le pone la
 * idea y se copia. La app no llama a ninguna IA.
 */
export function DevPromptPanel({ slug }: { slug: string | null }) {
  const pathname = usePathname();
  // slug null = fuera de las asignaturas (la sección «Cursos»).
  const section = slug ? devSectionFromPath(pathname, slug) : devCourseSectionFromPath(pathname);
  const key = section?.key ?? null;
  const entityId = section?.entityId ?? null;

  const [open, setOpen] = useState(false);
  const [base, setBase] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [idea, setIdea] = useState("");
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  const load = useCallback(() => {
    if (!key) return;
    startTransition(async () => {
      try {
        const text = await getDevPrompt(slug, key, entityId);
        setBase(text);
        setFailed(text === null);
      } catch {
        setBase(null);
        setFailed(true);
      }
    });
  }, [slug, key, entityId]);

  // La idea se guarda en el navegador por sección (no se pierde al cambiar de página).
  useEffect(() => {
    if (!key) return;
    try {
      setIdea(window.localStorage.getItem(ideaKey(key)) ?? "");
    } catch {
      setIdea("");
    }
  }, [key]);

  // Con el panel abierto, cada cambio de sección (o de módulo/proyecto) trae su prompt.
  useEffect(() => {
    if (open) load();
    else setBase(null);
  }, [open, load]);

  function onIdea(v: string) {
    setIdea(v);
    if (!key) return;
    try {
      if (v) window.localStorage.setItem(ideaKey(key), v);
      else window.localStorage.removeItem(ideaKey(key));
    } catch {
      /* sin almacenamiento: la idea solo vive mientras la página esté abierta */
    }
  }

  if (!key) return null;

  const text = base ? (idea.trim() ? base.replace(DEV_IDEA_PLACEHOLDER, idea.trim()) : base) : "";
  const hasIdea = idea.trim().length > 0;

  async function copy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast("Prompt copiado: pégalo en otra IA");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("No pude copiar solo: selecciona el texto y cópialo", "info");
    }
  }

  return (
    <section
      aria-label="Modo desarrollador"
      className="rounded-lg border border-dashed border-primary/50 bg-primary/[0.03]"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 p-3 text-left"
      >
        <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-sm font-medium">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
            <Code2 className="h-3 w-3" aria-hidden />
            Modo desarrollador
          </span>
          <span>Prompt de esta sección: {DEV_SECTION_LABEL[key]}</span>
          {hasIdea && <span className="text-xs font-normal text-muted-foreground">· idea guardada</span>}
        </span>
        <ChevronRight className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`} aria-hidden />
      </button>

      {open && (
        <div className="flex flex-col gap-3 border-t border-primary/20 p-3 pt-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Le explica a otra IA cómo está armada esta sección (archivos, datos, permisos, límites y el estado real de los
            datos) y le pide consejos para adaptar tu idea. Al final te devuelve un «brief» que le pasas tal cual a la
            IA del proyecto. La app no llama a ninguna IA: tú copias y pegas.
          </p>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Tu idea o cambio
            <Textarea
              value={idea}
              onChange={(e) => onIdea(e.target.value)}
              rows={3}
              placeholder="Ej. Quiero que cada insumo se ligue a un módulo y que el quiz de «Preparar parcial» use sus patrones."
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" size="sm" onClick={copy} disabled={!text}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
              {copied ? "Copiado" : "Copiar prompt"}
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={load} disabled={pending}>
              <RefreshCw className={`h-3.5 w-3.5 ${pending ? "animate-spin" : ""}`} aria-hidden />
              Actualizar datos
            </Button>
            {text && (
              <span className="text-xs text-muted-foreground">
                {text.length.toLocaleString("es-CO")} caracteres (~{Math.round(text.length / 4).toLocaleString("es-CO")} tokens)
                {hasIdea ? "" : " · falta tu idea"}
              </span>
            )}
          </div>

          {failed ? (
            <p className="text-sm text-destructive">No pude armar el prompt. Revisa que el modo desarrollador siga activo.</p>
          ) : (
            <Textarea
              readOnly
              value={pending && !text ? "Armando el prompt…" : text}
              rows={14}
              className="font-mono text-xs leading-relaxed"
            />
          )}
        </div>
      )}
    </section>
  );
}
