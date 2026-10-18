"use client";

import { useState } from "react";
import { ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";

import {
  addEvaluationItem,
  addQuizGrade,
  clearEvaluationGrade,
  deleteEvaluationItem,
  deleteQuizGrade,
  setEvaluationGrade,
  updateQuizGrade,
} from "@/lib/actions/evaluation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpHint } from "@/components/help-hint";
import { toast } from "@/components/ui/toast";
import { useCanContribute, useCanEdit } from "@/components/access-context";
import { cn, formatDate, todayInputValue } from "@/lib/utils";

export type QuizGradeView = { id: string; date: string | null; grade: number; description: string | null };
export type EvaluationView = {
  id: string;
  name: string;
  weight: number;
  grade: number | null;
  gradeNote: string | null;
  order: number;
  quizzes: QuizGradeView[];
};

function fmt(n: number) {
  return n.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
}

/** La fecha llega como Date desde el servidor (o como texto ISO): "2026-09-13". */
function toDateInput(d: string | Date | null): string {
  if (!d) return "";
  const x = new Date(d);
  return Number.isNaN(x.getTime()) ? "" : x.toISOString().slice(0, 10);
}

/** Nota efectiva de un componente: si tiene quizzes, su promedio simple
 *  (todos pesan igual); si no, la nota manual. */
function effectiveGrade(it: EvaluationView): number | null {
  if (it.quizzes.length > 0) return it.quizzes.reduce((a, q) => a + q.grade, 0) / it.quizzes.length;
  return it.grade;
}

const DESC_PLACEHOLDER = "Descripción (opcional): tema, formato, observaciones…";

/** Alta y edición de un quiz: nota, fecha y descripción. */
function QuizForm({
  itemId,
  quiz,
  onDone,
}: {
  itemId: string;
  quiz?: QuizGradeView;
  onDone: () => void;
}) {
  return (
    <form
      action={async (fd) => {
        if (quiz) await updateQuizGrade(quiz.id, fd);
        else await addQuizGrade(itemId, fd);
        toast(quiz ? "Quiz actualizado" : "Quiz agregado");
        onDone();
      }}
      className="flex flex-col gap-2 border-l border-border pl-3"
    >
      <div className="flex flex-wrap items-end gap-2">
        <Input
          name="grade"
          defaultValue={quiz ? String(quiz.grade).replace(".", ",") : ""}
          placeholder="Nota"
          inputMode="decimal"
          required
          className="h-7 w-16 text-center text-xs"
        />
        <Input
          name="date"
          type="date"
          defaultValue={quiz ? toDateInput(quiz.date) : todayInputValue()}
          className="h-7 w-36 text-xs"
        />
      </div>
      <Input
        name="description"
        defaultValue={quiz?.description ?? ""}
        placeholder={DESC_PLACEHOLDER}
        maxLength={300}
        className="h-8 text-xs"
        aria-label="Descripción del quiz"
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm" variant="outline">{quiz ? "Guardar cambios" : "Agregar quiz"}</Button>
        <Button type="button" size="sm" variant="ghost" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
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
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [editingGrade, setEditingGrade] = useState(false);
  const hasQuizzes = it.quizzes.length > 0;
  const avg = effectiveGrade(it);
  const hasManual = it.grade !== null || !!it.gradeNote;

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
          ) : (
            <>
              <span className="tabular-nums text-sm">{it.grade === null ? "—" : fmt(it.grade)}</span>
              {canContribute && (
                <button
                  type="button"
                  onClick={() => setEditingGrade((v) => !v)}
                  className="text-muted-foreground hover:text-primary"
                  aria-label={hasManual ? "Modificar nota" : "Poner nota"}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
              {canContribute && hasManual && (
                <button
                  type="button"
                  onClick={() => {
                    clearEvaluationGrade(it.id);
                    setEditingGrade(false);
                    toast("Nota eliminada", "info");
                  }}
                  className="text-muted-foreground hover-reveal hover:text-destructive"
                  aria-label="Eliminar nota"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </>
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

      {!hasQuizzes && it.gradeNote && !editingGrade && (
        <p className="whitespace-pre-line break-words text-xs text-muted-foreground">{it.gradeNote}</p>
      )}

      {!hasQuizzes && canContribute && editingGrade && (
        <form
          action={async (fd) => {
            await setEvaluationGrade(it.id, fd);
            toast("Nota guardada");
            setEditingGrade(false);
          }}
          className="flex flex-col gap-2 border-l border-border pl-3"
        >
          <Input
            name="grade"
            defaultValue={it.grade !== null ? String(it.grade).replace(".", ",") : ""}
            placeholder="Nota (0 a 5)"
            inputMode="decimal"
            className="h-7 w-28 text-center text-sm"
            aria-label="Nota"
          />
          <Input
            name="description"
            defaultValue={it.gradeNote ?? ""}
            placeholder={DESC_PLACEHOLDER}
            maxLength={300}
            className="h-8 text-xs"
            aria-label="Descripción de la nota"
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm" variant="outline">Guardar</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setEditingGrade(false)}>Cancelar</Button>
          </div>
        </form>
      )}

      {expanded && hasQuizzes && (
        <ul className="ml-1 flex flex-col gap-1.5 border-l border-border pl-3">
          {it.quizzes.map((q, i) =>
            editingQuizId === q.id && canContribute ? (
              <li key={q.id}>
                <QuizForm itemId={it.id} quiz={q} onDone={() => setEditingQuizId(null)} />
              </li>
            ) : (
              <li key={q.id} className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-14 shrink-0">Quiz {i + 1}</span>
                  <span className="w-24 shrink-0">{q.date ? formatDate(q.date) : "sin fecha"}</span>
                  <span className="tabular-nums font-medium text-foreground">{fmt(q.grade)}</span>
                  {canContribute && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingQuizId(q.id);
                          setAddingQuiz(false);
                        }}
                        className="hover-reveal hover:text-primary"
                        aria-label="Modificar quiz"
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteQuizGrade(q.id);
                          toast("Quiz eliminado", "info");
                        }}
                        className="hover-reveal hover:text-destructive"
                        aria-label="Eliminar quiz"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </>
                  )}
                </div>
                {q.description && <p className="whitespace-pre-line break-words pl-0.5">{q.description}</p>}
              </li>
            ),
          )}
        </ul>
      )}

      {canContribute && addingQuiz && (
        <div className="ml-1">
          <QuizForm itemId={it.id} onDone={() => setAddingQuiz(false)} />
        </div>
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
