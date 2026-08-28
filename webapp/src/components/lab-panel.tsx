"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { LabReportStatus } from "@prisma/client";

import { addLabMaterial, deleteLabMaterial, setLabReportStatus, toggleLabMaterial } from "@/lib/actions/lab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpHint } from "@/components/help-hint";
import { useCanEdit } from "@/components/access-context";
import { cn } from "@/lib/utils";
import { LAB_REPORT_STATUS_LABEL } from "@/lib/utils";

const STEPS: LabReportStatus[] = ["PENDIENTE", "ENTREGADO", "CALIFICADO"];

export type LabMaterialView = { id: string; text: string; done: boolean; order: number };

export function LabPanel({
  moduleId,
  protocol,
  reportStatus,
  materials,
}: {
  moduleId: string;
  protocol: string | null;
  reportStatus: LabReportStatus | null;
  materials: LabMaterialView[];
}) {
  const canEdit = useCanEdit();
  const [pending, start] = useTransition();
  const [adding, setAdding] = useState(false);
  const current = reportStatus ?? "PENDIENTE";
  const currentIdx = STEPS.indexOf(current);
  const sorted = [...materials].sort((a, b) => a.order - b.order);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          Laboratorio
          <HelpHint k="laboratorio" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {protocol && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Protocolo / práctica</p>
            <p className="mt-1 text-sm leading-relaxed">{protocol}</p>
          </div>
        )}

        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Informe</p>
          <div className="flex gap-1">
            {STEPS.map((s, i) => (
              <button
                key={s}
                type="button"
                disabled={!canEdit || pending}
                onClick={() => start(() => setLabReportStatus(moduleId, s))}
                className={cn(
                  "flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                  i <= currentIdx
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input text-muted-foreground hover:bg-accent",
                  !canEdit && "cursor-default",
                )}
              >
                {LAB_REPORT_STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Materiales</p>
            {canEdit && (
              <Button size="sm" variant="ghost" onClick={() => setAdding((s) => !s)}>
                <Plus className="h-3.5 w-3.5" /> Agregar
              </Button>
            )}
          </div>
          {canEdit && adding && (
            <form
              action={async (fd) => {
                await addLabMaterial(moduleId, fd);
              }}
              className="mb-2 flex gap-2"
            >
              <Input name="text" placeholder="Material / reactivo" required autoFocus />
              <Button type="submit" size="sm">Agregar</Button>
            </form>
          )}
          {sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sin materiales listados.</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {sorted.map((m) => (
                <li key={m.id} className="group flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={m.done}
                    disabled={!canEdit}
                    onChange={(e) => start(() => toggleLabMaterial(m.id, e.target.checked))}
                    className="h-3.5 w-3.5 rounded border-input accent-[hsl(var(--primary))]"
                  />
                  <span className={cn(m.done && "text-muted-foreground line-through")}>{m.text}</span>
                  {canEdit && (
                    <button type="button" onClick={() => start(() => deleteLabMaterial(m.id))} className="ml-auto text-muted-foreground hover-reveal hover:text-destructive" aria-label="Eliminar">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
