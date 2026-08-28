"use client";

import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

import { addFormula, deleteFormula } from "@/lib/actions/formulas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCanEdit } from "@/components/access-context";
import { renderDerivation, renderFormula } from "@/lib/formula-markup";
import { inlineLite } from "@/lib/markdown-lite";
import type { ModuleRef } from "@/components/glossary-section";

export type FormulaView = {
  id: string;
  name: string;
  expression: string;
  variables: string;
  description: string;
  derivation: string;
  moduleId: string | null;
};

function FormulaRow({ f, moduleTitle, canEdit }: { f: FormulaView; moduleTitle: string | null; canEdit: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="group rounded-md border border-border p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">
            {f.name}
            {moduleTitle && (
              <span className="ml-2 rounded bg-secondary px-1.5 py-0.5 text-[11px] font-normal text-secondary-foreground">
                {moduleTitle}
              </span>
            )}
          </p>
          <div className="formula mt-1" dangerouslySetInnerHTML={{ __html: renderFormula(f.expression) }} />
          {f.description && (
            <p className="mt-1 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: inlineLite(f.description) }} />
          )}
        </div>
        {canEdit && (
          <button type="button" onClick={() => deleteFormula(f.id)} className="hover-reveal hover:text-destructive" aria-label="Eliminar">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {(f.variables || f.derivation) && (
        <button type="button" onClick={() => setOpen((o) => !o)} className="mt-2 inline-flex items-center gap-1 text-xs text-primary">
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          {open ? "Ocultar desarrollo" : "Ver desarrollo"}
        </button>
      )}
      {open && (
        <div className="mt-2 border-t border-border pt-2">
          {f.variables && (
            <div className="formula mb-2" dangerouslySetInnerHTML={{ __html: renderFormula(f.variables) }} />
          )}
          {f.derivation && (
            <div className="formula-prose" dangerouslySetInnerHTML={{ __html: renderDerivation(f.derivation) }} />
          )}
        </div>
      )}
    </li>
  );
}

export function FormulaSection({
  subjectId,
  items,
  modules,
}: {
  subjectId: string;
  items: FormulaView[];
  modules: ModuleRef[];
}) {
  const canEdit = useCanEdit();
  const [adding, setAdding] = useState(false);
  const moduleTitle = (id: string | null) => modules.find((m) => m.id === id)?.title ?? null;

  return (
    <div className="flex flex-col gap-4">
      {canEdit && (
        <div>
          <Button size="sm" variant="outline" onClick={() => setAdding((s) => !s)}>
            <Plus className="h-3.5 w-3.5" />
            Agregar fórmula
          </Button>
        </div>
      )}
      {canEdit && adding && (
        <Card>
          <CardContent className="pt-5">
            <form
              action={async (fd) => {
                await addFormula(subjectId, fd);
                setAdding(false);
              }}
              className="flex flex-col gap-2"
            >
              <Input name="name" placeholder="Nombre (ej. Ley de Stokes)" required />
              <Input name="expression" placeholder="Fórmula: v = #{2r^{2}(...)|9η}" required className="font-mono text-xs" />
              <Textarea name="variables" placeholder="Variables (usa el mismo markup, una por línea)" rows={2} className="font-mono text-xs" />
              <Textarea name="description" placeholder="¿Para qué sirve? (admite **negrita**)" rows={2} />
              <Textarea name="derivation" placeholder="Desarrollo e interpretación (una línea por idea)" rows={4} className="font-mono text-xs" />
              <Select name="moduleId" defaultValue="">
                <option value="">Sin módulo</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </Select>
              <p className="text-xs text-muted-foreground">
                Markup: <code>_{"{x}"}</code> subíndice, <code>^{"{x}"}</code> superíndice, <code>#{"{num|den}"}</code> fracción.
              </p>
              <div className="flex gap-2">
                <Button type="submit" size="sm">Guardar</Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sin fórmulas todavía.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((f) => (
            <FormulaRow key={f.id} f={f} moduleTitle={moduleTitle(f.moduleId)} canEdit={canEdit} />
          ))}
        </ul>
      )}
    </div>
  );
}
