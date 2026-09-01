"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Eye, Pencil, Plus, Trash2 } from "lucide-react";

import { addExercise, deleteExercise, updateExercise } from "@/lib/actions/exercises";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { HelpHint } from "@/components/help-hint";
import { toast } from "@/components/ui/toast";
import { useCanEdit } from "@/components/access-context";
import { renderCornell } from "@/lib/markdown-lite";
import { cn } from "@/lib/utils";

export type ExerciseView = { id: string; question: string; solution: string; order: number };

const MD_HINT = "Markdown: #### subtítulo · **negrita** · tablas con | | · listas · `código`.";

function ExerciseForm({
  moduleId,
  exercise,
  onDone,
}: {
  moduleId: string;
  exercise?: ExerciseView;
  onDone: () => void;
}) {
  return (
    <form
      action={async (fd) => {
        if (exercise) await updateExercise(exercise.id, fd);
        else await addExercise(moduleId, fd);
        toast(exercise ? "Ejercicio actualizado" : "Ejercicio agregado");
        onDone();
      }}
      className="flex flex-col gap-2 rounded-md border border-dashed border-input p-3"
    >
      <label className="text-xs font-medium text-muted-foreground">Enunciado</label>
      <Textarea
        name="question"
        defaultValue={exercise?.question ?? ""}
        rows={4}
        required
        placeholder="El problema, tal cual. Una sola pregunta."
        className="font-mono text-xs"
      />
      <label className="text-xs font-medium text-muted-foreground">Solución paso a paso</label>
      <Textarea
        name="solution"
        defaultValue={exercise?.solution ?? ""}
        rows={8}
        required
        placeholder={"#### Paso 1 — …\n…"}
        className="font-mono text-xs"
      />
      <p className="text-[11px] text-muted-foreground">{MD_HINT}</p>
      <div className="flex gap-2">
        <Button type="submit" size="sm">{exercise ? "Guardar cambios" : "Agregar"}</Button>
        <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}

export function ExercisesPanel({
  moduleId,
  exercises,
}: {
  moduleId: string;
  exercises: ExerciseView[];
}) {
  const canEdit = useCanEdit();
  const sorted = [...exercises].sort((a, b) => a.order - b.order);
  const total = sorted.length;

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);

  // Si cambia el número de ejercicios (agregar / borrar), mantener idx en rango.
  useEffect(() => {
    setIdx((i) => Math.min(i, Math.max(0, total - 1)));
  }, [total]);

  const go = (next: number) => {
    setIdx(next);
    setRevealed(false);
    setEditing(false);
  };

  const current = sorted[idx];

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          Ejercicios
          {total > 0 && <span className="font-normal text-muted-foreground">({idx + 1}/{total})</span>}
          <HelpHint k="ejercicios" />
        </CardTitle>
        {canEdit && !adding && (
          <Button size="sm" variant="outline" onClick={() => setAdding(true)}>
            <Plus className="h-3.5 w-3.5" />
            Agregar
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {canEdit && adding && (
          <ExerciseForm moduleId={moduleId} onDone={() => { setAdding(false); go(total); }} />
        )}

        {total === 0 && !adding && (
          <p className="text-sm text-muted-foreground">
            {canEdit
              ? "Aún no hay ejercicios en este módulo. Agrega el primero — un problema con su solución paso a paso."
              : "Aún no hay ejercicios en este módulo."}
          </p>
        )}

        {current && (
          <>
            <ProgressBar value={total ? ((idx + 1) / total) * 100 : 0} label={`${idx + 1}/${total}`} inline />

            {editing && canEdit ? (
              <ExerciseForm moduleId={moduleId} exercise={current} onDone={() => setEditing(false)} />
            ) : (
              <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  Ejercicio {idx + 1}
                </p>
                <div
                  className="cornell text-sm"
                  dangerouslySetInnerHTML={{ __html: renderCornell(current.question) }}
                />

                {revealed ? (
                  <div className="mt-3 border-t border-border pt-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Solución
                    </p>
                    <div
                      className="cornell text-sm"
                      dangerouslySetInnerHTML={{ __html: renderCornell(current.solution) }}
                    />
                    <button
                      type="button"
                      onClick={() => setRevealed(false)}
                      className="mt-2 inline-flex items-center gap-1 text-xs text-primary"
                    >
                      <ChevronDown className="h-3.5 w-3.5 rotate-180" />
                      Ocultar solución
                    </button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setRevealed(true)}>
                    <Eye className="h-3.5 w-3.5" />
                    Ver solución
                  </Button>
                )}

                {canEdit && (
                  <div className="mt-3 flex gap-1 border-t border-border pt-2">
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="tap rounded-md text-muted-foreground hover:bg-accent"
                      aria-label="Editar ejercicio"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteExercise(current.id);
                        toast("Ejercicio eliminado", "info");
                        go(Math.max(0, idx - 1));
                      }}
                      className="tap rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Eliminar ejercicio"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {total > 1 && (
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={idx === 0}
                  onClick={() => go(idx - 1)}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Anterior
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={idx >= total - 1}
                  onClick={() => go(idx + 1)}
                >
                  Siguiente
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
