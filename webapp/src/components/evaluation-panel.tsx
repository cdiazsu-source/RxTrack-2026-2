"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { addEvaluationItem, deleteEvaluationItem, setEvaluationGrade } from "@/lib/actions/evaluation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpHint } from "@/components/help-hint";
import { useCanEdit } from "@/components/access-context";
import { cn } from "@/lib/utils";

export type EvaluationView = { id: string; name: string; weight: number; grade: number | null; order: number };

function fmt(n: number) {
  return n.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
}

export function EvaluationPanel({ subjectId, items }: { subjectId: string; items: EvaluationView[] }) {
  const canEdit = useCanEdit();
  const [adding, setAdding] = useState(false);
  const sorted = [...items].sort((a, b) => a.order - b.order);

  const totalWeight = sorted.reduce((a, b) => a + b.weight, 0);
  const graded = sorted.filter((i) => i.grade !== null);
  const gradedWeight = graded.reduce((a, b) => a + b.weight, 0);
  const accumulated = graded.reduce((a, b) => a + (b.grade as number) * b.weight, 0) / 100;
  const projection = gradedWeight > 0 ? accumulated / (gradedWeight / 100) : null;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          Evaluación
          <span className="font-normal text-muted-foreground">({totalWeight}%)</span>
          <HelpHint text="Registra la nota (0 a 5) de cada componente a medida que las recibas. Se calcula la nota acumulada y, si mantienes el promedio, la proyección final. Nada de esto lo toca el db:seed." />
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
            <li key={it.id} className="group flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
              <span className="text-sm font-medium">{it.name}</span>
              <span className="text-xs text-muted-foreground">{it.weight}%</span>
              <span className="ml-auto flex items-center gap-2">
                {canEdit ? (
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
                {canEdit && (
                  <button type="button" onClick={() => deleteEvaluationItem(it.id)} className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100" aria-label="Eliminar">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
