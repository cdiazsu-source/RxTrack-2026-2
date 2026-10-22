"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight, ClipboardCopy, Microscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { HelpHint } from "@/components/help-hint";
import { cn } from "@/lib/utils";
import { moduleResearchPrompt, type ResearchSession, type ResearchUse } from "@/lib/prompts";

export type ModuleResearchData = {
  subjectName: string;
  subjectSummary?: string | null;
  subjectObjective?: string | null;
  courseModules: string[];
  moduleTitle: string;
  moduleDescription?: string | null;
  chapter?: string | null;
  glossary: { term: string; definition: string }[];
  formulas: { name: string; expression: string; variables?: string; description?: string }[];
  exercises: string[];
  sessions: ResearchSession[];
};

const USES: { value: ResearchUse; label: string }[] = [
  { value: "podcast", label: "Podcast" },
  { value: "tarjetas", label: "Tarjetas de estudio" },
  { value: "guia", label: "Guía / mapa conceptual" },
  { value: "quiz", label: "Quiz" },
];

function Toggle({
  checked,
  onChange,
  children,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" />
      <span className="flex flex-col">
        <span>{children}</span>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </span>
    </label>
  );
}

/**
 * «Prompt de investigación» del módulo: junta descripción, desarrollo, glosario, fórmulas,
 * ejercicios y apuntes, y le pide a la IA un texto científico amplio, con los términos
 * investigados, que sirva de base para podcast, tarjetas, guía y quiz. La app no llama a
 * ninguna IA: solo arma el texto para que lo pegues en tu asistente.
 */
export function ModuleResearchPrompt({ data }: { data: ModuleResearchData }) {
  const hasChapter = !!data.chapter?.trim();
  const hasTranscripts = data.sessions.some((s) => s.transcript?.trim());
  const [includeChapter, setIncludeChapter] = useState(hasChapter);
  const [includeExercises, setIncludeExercises] = useState(false);
  const [includeTranscripts, setIncludeTranscripts] = useState(false);
  const [uses, setUses] = useState<ResearchUse[]>(["podcast", "tarjetas", "guia", "quiz"]);
  const [focus, setFocus] = useState("");
  const [showText, setShowText] = useState(false);
  const [copied, setCopied] = useState(false);

  const text = useMemo(
    () => moduleResearchPrompt({ ...data, includeChapter, includeExercises, includeTranscripts, uses, focus }),
    [data, includeChapter, includeExercises, includeTranscripts, uses, focus],
  );
  const words = text.trim().split(/\s+/).length;
  const tokens = Math.round(text.length / 3.6); // estimado grueso para español
  const hasNotes = data.sessions.some((s) => s.content.trim() || s.slidesText?.trim() || s.transcript?.trim());

  function toggleUse(u: ResearchUse) {
    setUses((cur) => (cur.includes(u) ? cur.filter((x) => x !== u) : [...cur, u]));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      toast("Prompt copiado: pégalo en tu IA (mejor una con búsqueda web)");
    } catch {
      setShowText(true);
      toast("No pude copiar solo: selecciona el texto y cópialo", "info");
    }
  }

  return (
    <details id="investigacion" className="group scroll-mt-24 rounded-lg border border-border bg-card [&_summary]:list-none">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-sm font-medium">
        <span className="flex items-center gap-1.5">
          <Microscope className="h-4 w-4 text-primary" aria-hidden />
          Prompt de investigación — texto científico del módulo
          <HelpHint k="modulo-investigacion" />
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
      </summary>

      <div className="flex flex-col gap-4 border-t border-border p-4 pt-3">
        <ol className="list-decimal space-y-0.5 pl-5 text-xs text-muted-foreground">
          <li>Elige qué material entra y para qué quieres el texto.</li>
          <li>Copia el prompt y pégalo en tu IA (si tiene búsqueda web, mejor: verificará los términos).</li>
          <li>
            Guarda la respuesta: de ahí salen el guion del podcast, las tarjetas de estudio, la guía y el quiz. Si la IA la entrega por
            partes, escríbele «sigue».
          </li>
        </ol>

        <div className="flex flex-col gap-2 rounded-md border border-dashed border-input p-3">
          <p className="text-xs font-medium text-muted-foreground">Qué material incluir</p>
          <p className="text-xs text-muted-foreground">
            Siempre entran: descripción, glosario, fórmulas y tus apuntes{hasNotes ? "" : " (este módulo aún no tiene apuntes)"}.
          </p>
          <Toggle checked={includeChapter} onChange={setIncludeChapter} hint={hasChapter ? "El capítulo de lectura del módulo (puede ser largo; se recorta a 30 000 caracteres)." : "Este módulo no tiene desarrollo."}>
            Desarrollo del módulo
          </Toggle>
          <Toggle checked={includeExercises} onChange={setIncludeExercises} hint={data.exercises.length ? `${data.exercises.length} enunciados, para que la IA sepa qué se espera resolver.` : "Este módulo no tiene ejercicios."}>
            Enunciados de los ejercicios
          </Toggle>
          <Toggle
            checked={includeTranscripts}
            onChange={setIncludeTranscripts}
            hint={hasTranscripts ? "Pueden ser muy largas: cada una se recorta a 20 000 caracteres." : "No hay transcripciones guardadas en este módulo."}
          >
            Transcripciones de las clases
          </Toggle>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground">El texto debe servir de base para:</p>
          <div className="flex flex-wrap gap-2">
            {USES.map((u) => (
              <button
                key={u.value}
                type="button"
                aria-pressed={uses.includes(u.value)}
                onClick={() => toggleUse(u.value)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  uses.includes(u.value) ? "border-primary bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:bg-accent",
                )}
              >
                {u.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">Si no marcas ninguno, se piden los cuatro.</p>
        </div>

        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Qué quieres que enfatice (opcional)
          <Textarea
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            rows={2}
            placeholder="Ej. Hazme énfasis en bioequivalencia y en la normativa colombiana; el examen es el jueves."
            className="text-sm font-normal text-foreground"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" size="sm" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
            {copied ? "Copiado" : "Copiar prompt"}
          </Button>
          <button
            type="button"
            onClick={() => setShowText((s) => !s)}
            aria-expanded={showText}
            className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            {showText ? "Ocultar prompt" : "Ver prompt"}
          </button>
          <span className="text-[11px] text-muted-foreground">
            ≈ {words.toLocaleString("es-CO")} palabras · ≈ {tokens.toLocaleString("es-CO")} tokens
          </span>
        </div>
        {tokens > 60000 && (
          <p className="text-[11px] font-medium text-foreground">
            Es muy largo: algunas IA no lo aceptarán completo. Desmarca las transcripciones o el desarrollo.
          </p>
        )}
        <p className="text-[11px] text-muted-foreground">La app no llama a ninguna IA: solo arma el texto para que lo pegues en tu asistente.</p>

        {showText && <Textarea readOnly value={text} rows={14} className="font-mono text-xs leading-relaxed" />}
      </div>
    </details>
  );
}
