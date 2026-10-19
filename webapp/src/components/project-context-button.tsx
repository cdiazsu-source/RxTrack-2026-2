"use client";

import { useState } from "react";
import { Check, ClipboardCopy, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

/**
 * Copia el contexto completo del proyecto para pegarlo en cualquier IA.
 * El texto base lo arma el servidor (`projectContextPrompt`); aquí solo se le
 * añade, si se quiere, lo que se le va a pedir.
 */
export function ProjectContextButton({ base }: { base: string }) {
  const [open, setOpen] = useState(false);
  const [ask, setAsk] = useState("");
  const [copied, setCopied] = useState(false);

  const placeholder = "[escribe aquí lo que quieres pedirle a la IA]";
  const text = ask.trim() ? base.replace(placeholder, ask.trim()) : base;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast("Contexto copiado: pégalo en tu IA");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setOpen(true);
      toast("No pude copiar solo: selecciona el texto y cópialo", "info");
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" onClick={copy}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
          {copied ? "Copiado" : "Copiar contexto para IA"}
        </Button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
          {open ? "Ocultar" : "Ver y personalizar"}
        </button>
        <span className="text-xs text-muted-foreground">La app no llama a ninguna IA: pega esto en tu asistente.</span>
      </div>
      {open && (
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1 text-sm font-medium">
            ¿Qué quieres pedirle? (opcional)
            <Textarea
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
              rows={2}
              placeholder="Ej. Ayúdame a calcular el HLB requerido de la fase oleosa"
            />
          </label>
          <Textarea readOnly value={text} rows={12} className="font-mono text-xs leading-relaxed" />
        </div>
      )}
    </div>
  );
}
