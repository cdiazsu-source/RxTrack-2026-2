"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { contextPrompt, type PromptModule } from "@/lib/prompts";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* el usuario puede seleccionar y copiar a mano */
        }
      }}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copiado" : "Copiar prompt"}
    </Button>
  );
}

/** Prompt ya armado (quiz, patrones, Cornell). Solo mostrar + copiar. */
export function PromptBox({ text, rows = 12 }: { text: string; rows?: number }) {
  return (
    <div className="flex flex-col gap-2">
      <Textarea readOnly value={text} rows={rows} className="font-mono text-xs leading-relaxed" />
      <div className="flex items-center gap-2">
        <CopyButton text={text} />
        <span className="text-xs text-muted-foreground">
          La app no llama a ninguna IA: pega esto en tu asistente.
        </span>
      </div>
    </div>
  );
}

/** Prompt de contexto de la asignatura, con campo de tema editable en vivo. */
export function ContextPromptBox({
  subjectName,
  modules,
}: {
  subjectName: string;
  modules: PromptModule[];
}) {
  const [topic, setTopic] = useState("");
  const text = useMemo(() => contextPrompt(subjectName, modules, topic), [subjectName, modules, topic]);

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm font-medium">
        ¿Qué quieres profundizar?
        <Textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={2}
          placeholder="Ej. ¿Por qué el HLB requerido cambia con la temperatura?"
        />
      </label>
      <PromptBox text={text} />
    </div>
  );
}
