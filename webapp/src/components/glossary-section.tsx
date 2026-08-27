"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { addGlossaryTerm, deleteGlossaryTerm } from "@/lib/actions/glossary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCanEdit } from "@/components/access-context";
import { inlineLite } from "@/lib/markdown-lite";

export type GlossaryView = { id: string; term: string; definition: string; moduleId: string | null };
export type ModuleRef = { id: string; title: string };

export function GlossarySection({
  subjectId,
  items,
  modules,
}: {
  subjectId: string;
  items: GlossaryView[];
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
            Agregar término
          </Button>
        </div>
      )}
      {canEdit && adding && (
        <Card>
          <CardContent className="pt-5">
            <form
              action={async (fd) => {
                await addGlossaryTerm(subjectId, fd);
                setAdding(false);
              }}
              className="flex flex-col gap-2"
            >
              <Input name="term" placeholder="Término" required />
              <Textarea name="definition" placeholder="Definición (admite **negrita**)" required />
              <Select name="moduleId" defaultValue="">
                <option value="">Sin módulo</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </Select>
              <div className="flex gap-2">
                <Button type="submit" size="sm">Guardar</Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sin términos todavía.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((g) => (
            <li key={g.id} className="group rounded-md border border-border p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">{g.term}</p>
                {canEdit && (
                  <button type="button" onClick={() => deleteGlossaryTerm(g.id)} className="opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100" aria-label="Eliminar">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: inlineLite(g.definition) }} />
              {moduleTitle(g.moduleId) && (
                <span className="mt-1 inline-block rounded bg-secondary px-1.5 py-0.5 text-[11px] text-secondary-foreground">
                  {moduleTitle(g.moduleId)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
