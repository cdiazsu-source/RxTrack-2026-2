"use client";

import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

import {
  addEvaluationItem,
  addQuizGrade,
  deleteEvaluationItem,
  deleteQuizGrade,
  setEvaluationGrade,
} from "@/lib/actions/evaluation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpHint } from "@/components/help-hint";
import { useCanContribute, useCanEdit } from "@/components/access-context";
import { cn, formatDate, todayInputValue } from "@/lib/utils";

export type QuizGradeView = { id: string; date: string | null; grade: number };
export type EvaluationView = {
  id: string;
  name: string;
  weight: number;
  grade: number | null;
  order: number;
  quizzes: QuizGradeView[];
};

function fmt(n: number) {
  return n.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
}

/** Nota efectiva de un componente: si tiene quizzes, su promedio simple
 *  (todos pesan igual); si no, la nota manual. */
function effectiveGrade(it: EvaluationView): number | null {
  if (it.quizzes.length > 0) return it.quizzes.reduce((a, q) => a + q.grade, 0) / it.quizzes.length;
  return it.grade;
}

function EvaluationRow({
  it,
  canEdit,
  canContribute,
}: {
  it: EvaluationView;
  /** Estructura del componente (nombre/peso): solo Cesar. */
  canEdit: boolean;
  /** Su propia nota (manual o quizzes): Cesar y Diana, cada quien la suya. */
  canContribute: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [addingQuiz, setAddingQuiz] = useState(false);
  const hasQuizzes = it.quizzes.length > 0;
  const avg = effectiveGrade(it);

  return (
    <li className="flex flex-col gap-2 py-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-sm font-medium">{it.name}</span>
        <span className="text-xs text-muted-foreground">{it.weight}%</span>
        <span className="ml-auto flex items-center gap-2">
          {hasQuizzes ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 text-sm"
            >
              <span className="tabular-nums font-medium">{avg === null ? "—" : fmt(avg)}</span>
              <span className="text-xs text-muted-foreground">
                (promedio de {it.quizzes.length} quiz{it.quizzes.length === 1 ? "" : "zes"})
              </span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
            </button>
          ) : canContribute ? (
            <form action={(fd) => setEvaluationGrade(it.id, fd)} className="flex items-center gap-1">
              <Input
                name="grade"
                defaultValue={it.grade ?? ""}
                placeholder="—"
                inputMode="decimal"
                className="h-7 w-16 text-center text-sm"
              />
              <Button type="submit" size="sm" variant="ghost">OK</Button>
            </form>
          ) : (
            <span className="tabular-nums text-sm">{it.grade === null ? "—" : fmt(it.grade)}</span>
          )}
          {canContribute && (
            <button
              type="button"
              onClick={() => {
                setAddingQuiz((v) => !v);
                setExpanded(true);
              }}
              className="text-xs text-primary hover:underline"
            >
              + Quiz
            </button>
          )}
          {canEdit && (
            <button
              type="button"
              onClick={() => deleteEvaluationItem(it.id)}
              className="text-muted-foreground hover-reveal hover:text-destructive"
              aria-label="Eliminar componente"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </span>
      </div>

      {expanded && hasQuizzes && (
        <ul className="ml-1 flex flex-col gap-1 border-l border-border pl-3">
          {it.quizzes.map((q, i) => (
            <li key={q.id} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-14 shrink-0">Quiz {i + 1}</span>
              <span className="w-24 shrink-0">{q.date ? formatDate(q.date) : "sin fecha"}</span>
              <span className="tabular-nums font-medium text-foreground">{fmt(q.grade)}</span>
              {canContribute && (
                <button
                  type="button"
                  onClick={() => deleteQuizGrade(q.id)}
                  className="hover-reveal hover:text-destructive"
                  aria-label="Eliminar quiz"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {canContribute && addingQuiz && (
        <form
          action={async (fd) => {
            await addQuizGrade(it.id, fd);
            setAddingQuiz(false);
          }}
          className="ml-1 flex flex-wrap items-end gap-2 border-l border-border pl-3"
        >
          <Input
            name="grade"
            placeholder="Nota"
            inputMode="decimal"
            required
            className="h-7 w-16 text-center text-xs"
          />
          <Input name="date" type="date" defaultValue={todayInputValue()} className="h-7 w-36 text-xs" />
          <Button type="submit" size="sm" variant="outline">Agregar quiz</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setAddingQuiz(false)}>Cancelar</Button>
        </form>
      )}
    </li>
  );
}

export function EvaluationPanel({ subjectId, items }: { subjectId: string; items: EvaluationView[] }) {
  const canEdit = useCanEdit();
  const canContribute = useCanContribute();
  const [adding, setAdding] = useState(false);
  const sorted = [...items].sort((a, b) => a.order - b.order);

  const totalWeight = sorted.reduce((a, b) => a + b.weight, 0);
  const withGrade = sorted
    .map((it) => ({ it, grade: effectiveGrade(it) }))
    .filter((x) => x.grade !== null) as { it: EvaluationView; grade: number }[];
  const gradedWeight = withGrade.reduce((a, x) => a + x.it.weight, 0);
  const accumulated = withGrade.reduce((a, x) => a + x.grade * x.it.weight, 0) / 100;
  const projection = gradedWeight > 0 ? accumulated / (gradedWeight / 100) : null;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          Evaluación
          <span className="font-normal text-muted-foreground">({totalWeight}%)</span>
          <HelpHint k="evaluacion" />
        </CardTitle>
        {canEdit && (
          <Button size="sm" variant="outline" onClick={() => setAdding((s) => !s)}>
            <Plus className="h-3.5 w-3.5" />
            Componente
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ProgressBar value={gradedWeight} label={`${gradedWeight}% calificado`} inline />

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span>
            Nota acumulada: <strong className="tabular-nums">{fmt(accumulated)}</strong> / 5,0
          </span>
          {projection !== null && (
            <span className={cn("tabular-nums", projection < 3 ? "font-semibold text-warning" : "")}>
              Proyección si mantienes el promedio: <strong>{fmt(projection)}</strong>
            </span>
          )}
        </div>

        {canEdit && adding && (
          <form
            action={async (fd) => {
              await addEvaluationItem(subjectId, fd);
              setAdding(false);
            }}
            className="flex flex-wrap items-end gap-2 rounded-md border border-dashed border-input p-3"
          >
            <Input name="name" placeholder="Nombre" required className="w-48" />
            <Input name="weight" type="number" min={1} max={100} placeholder="% peso" required className="w-24" />
            <Button type="submit" size="sm">Agregar</Button>
          </form>
        )}

        <ul className="flex flex-col divide-y divide-border">
          {sorted.map((it) => (
            <EvaluationRow key={it.id} it={it} canEdit={canEdit} canContribute={canContribute} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
