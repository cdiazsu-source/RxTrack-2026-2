"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { reviewFlashcard } from "@/lib/actions/flashcards";
import { previewInterval, type Grade, type SrsState } from "@/lib/srs";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { renderCornell } from "@/lib/markdown-lite";
import { cn } from "@/lib/utils";

export type ReviewCard = {
  id: string;
  front: string;
  back: string;
  srs: SrsState;
};

const GRADES: { g: Grade; label: string; cls: string }[] = [
  { g: "again", label: "Otra vez", cls: "border-destructive/40 text-destructive hover:bg-destructive/10" },
  { g: "hard", label: "Difícil", cls: "border-warning/40 text-warning hover:bg-warning/10" },
  { g: "good", label: "Bien", cls: "border-primary/40 text-primary hover:bg-primary/10" },
  { g: "easy", label: "Fácil", cls: "border-success/40 text-success hover:bg-success/10" },
];

export function FlashcardReview({ cards, backHref }: { cards: ReviewCard[]; backHref: string }) {
  const [queue, setQueue] = useState<ReviewCard[]>(cards);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  const total = useMemo(() => cards.length, [cards.length]);
  const card = queue[idx];

  if (!card) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-10 text-center">
        <p className="text-3xl">✓</p>
        <p className="text-sm font-medium">Repaso terminado — {doneCount} tarjeta(s).</p>
        <Link href={backHref} className="text-sm text-primary hover:underline">Volver</Link>
      </div>
    );
  }

  const grade = (g: Grade) => {
    void reviewFlashcard(card.id, g);
    setDoneCount((n) => n + 1);
    setFlipped(false);
    if (g === "again") {
      // Se re-encola al final de esta sesión.
      setQueue((q) => {
        const rest = q.filter((_, i) => i !== idx);
        return [...rest, card];
      });
      setIdx((i) => (i >= queue.length - 1 ? 0 : i));
    } else {
      setQueue((q) => q.filter((_, i) => i !== idx));
      setIdx((i) => (i >= queue.length - 1 ? 0 : i));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{queue.length} en cola</span>
        <span>{doneCount} hechas</span>
      </div>
      <ProgressBar value={total ? (doneCount / (doneCount + queue.length)) * 100 : 0} />

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="press-card min-h-[220px] rounded-xl border border-border bg-card p-6 text-left shadow-card"
      >
        <div className="cornell text-base" dangerouslySetInnerHTML={{ __html: renderCornell(card.front) }} />
        {flipped && (
          <>
            <hr className="my-4 border-border" />
            <div className="cornell text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderCornell(card.back) }} />
          </>
        )}
        {!flipped && <p className="mt-4 text-xs text-muted-foreground">Toca para ver la respuesta</p>}
      </button>

      {flipped ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {GRADES.map(({ g, label, cls }) => (
            <button
              key={g}
              type="button"
              onClick={() => grade(g)}
              className={cn("press flex flex-col items-center rounded-md border px-2 py-2 text-sm font-medium transition-colors", cls)}
            >
              {label}
              <span className="text-[11px] font-normal opacity-70">{previewInterval(card.srs, g)}</span>
            </button>
          ))}
        </div>
      ) : (
        <Button variant="outline" onClick={() => setFlipped(true)}>
          <RotateCcw className="h-3.5 w-3.5" />
          Mostrar respuesta
        </Button>
      )}
    </div>
  );
}
