"use client";

import { useFormState, useFormStatus } from "react-dom";

import { importMallaList, loadMallaPlan, type ImportMallaResult } from "@/lib/actions/malla";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Submit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Un momento…" : children}
    </Button>
  );
}

/** Carga el plan oficial en un clic (el mismo botón sirve para completar filas que falten). */
export function LoadPlanButton({ primary = false }: { primary?: boolean }) {
  return (
    <form action={loadMallaPlan}>
      <SubmitPlan primary={primary} />
    </form>
  );
}

function SubmitPlan({ primary }: { primary: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" variant={primary ? "default" : "outline"} disabled={pending}>
      {pending ? "Cargando…" : "Cargar el plan de estudios"}
    </Button>
  );
}

/** Pegar una lista propia (otro plan, asignaturas extra): una línea por asignatura. */
export function MallaImport() {
  const [result, action] = useFormState<ImportMallaResult, FormData>(importMallaList, null);
  return (
    <details className="rounded-lg border border-border">
      <summary className="cursor-pointer px-4 py-2 text-sm font-medium text-muted-foreground">Pegar una lista de asignaturas</summary>
      <form action={action} className="flex flex-col gap-2 border-t border-border p-4">
        <p className="text-xs text-muted-foreground">
          Una línea por asignatura: <code>semestre; nombre; créditos; estado</code> (créditos y estado son opcionales; estado:
          vista, en curso o por ver). También puedes poner un encabezado «Semestre 3» y debajo solo <code>nombre; créditos</code>. Lo que
          ya existe en ese semestre con el mismo nombre no se duplica.
        </p>
        <Textarea name="text" rows={6} required placeholder={"Semestre 7\nFarmacología especial; 3\nToxicología; 3; en curso"} />
        <div className="flex items-center gap-3">
          <Submit>Importar</Submit>
          {result && (
            <span className="text-xs text-muted-foreground" role="status">
              {result.added} {result.added === 1 ? "asignatura añadida" : "asignaturas añadidas"}
              {result.skipped.length > 0 && ` · ${result.skipped.length} líneas ignoradas: ${result.skipped.slice(0, 3).join(" / ")}`}
            </span>
          )}
        </div>
      </form>
    </details>
  );
}
