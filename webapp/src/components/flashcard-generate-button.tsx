"use client";

import { useTransition } from "react";
import { Sparkles } from "lucide-react";

import { generateFlashcards } from "@/lib/actions/flashcards";
import { Button } from "@/components/ui/button";
import { useCanEdit } from "@/components/access-context";

export function FlashcardGenerateButton({ subjectId }: { subjectId: string }) {
  const canEdit = useCanEdit();
  const [pending, start] = useTransition();
  if (!canEdit) return null;

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={() => start(() => generateFlashcards(subjectId))}
    >
      <Sparkles className="h-3.5 w-3.5" />
      {pending ? "Generando…" : "Generar tarjetas del glosario y las fórmulas"}
    </Button>
  );
}
