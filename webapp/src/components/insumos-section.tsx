"use client";

import { useState } from "react";
import { ExternalLink, Plus, Trash2 } from "lucide-react";

import { addPastMaterial, deletePastMaterial } from "@/lib/actions/past-materials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCanEdit } from "@/components/access-context";

export type PastMaterialView = {
  id: string;
  kind: string;
  title: string;
  semester: string;
  url: string | null;
  patterns: string;
};

export function InsumosSection({ subjectId, items }: { subjectId: string; items: PastMaterialView[] }) {
  const canEdit = useCanEdit();
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {canEdit && (
        <div>
          <Button size="sm" variant="outline" onClick={() => setAdding((s) => !s)}>
            <Plus className="h-3.5 w-3.5" />
            Agregar insumo
          </Button>
        </div>
      )}
      {canEdit && adding && (
        <Card>
          <CardContent className="pt-5">
            <form
              action={async (fd) => {
                await addPastMaterial(subjectId, fd);
                setAdding(false);
              }}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-wrap gap-2">
                <Select name="kind" defaultValue="taller" className="w-36">
                  <option value="taller">Taller</option>
                  <option value="simulacro">Simulacro</option>
                </Select>
                <Input name="title" placeholder="Título" required className="flex-1" />
                <Input name="semester" placeholder="Semestre (2025-1)" className="w-36" />
              </div>
              <Input name="url" type="url" placeholder="Enlace a Drive (opcional)" />
              <Textarea name="patterns" placeholder="Patrones: qué temas y errores parece castigar el profesor…" rows={3} />
              <div className="flex gap-2">
                <Button type="submit" size="sm">Guardar</Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Sin insumos. Agrega talleres y simulacros de semestres pasados: el campo &ldquo;patrones&rdquo; alimenta el prompt de análisis.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((m) => (
            <li key={m.id} className="group rounded-md border border-border p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">
                  <span className="mr-2 rounded bg-secondary px-1.5 py-0.5 text-[11px] font-normal text-secondary-foreground">
                    {m.kind === "simulacro" ? "Simulacro" : "Taller"}
                  </span>
                  {m.title}
                  {m.semester && <span className="ml-2 text-xs font-normal text-muted-foreground">{m.semester}</span>}
                </p>
                {canEdit && (
                  <button type="button" onClick={() => deletePastMaterial(m.id)} className="hover-reveal hover:text-destructive" aria-label="Eliminar">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              {m.patterns && <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{m.patterns}</p>}
              {m.url && (
                <a href={m.url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <ExternalLink className="h-3 w-3" /> Abrir
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
