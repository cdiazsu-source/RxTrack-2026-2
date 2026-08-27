"use client";

import { useState } from "react";
import { ExternalLink, Plus, Trash2 } from "lucide-react";

import { addBibliography, deleteBibliography, setBibliographyUrl } from "@/lib/actions/bibliography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCanEdit } from "@/components/access-context";

export type BibliographyView = {
  id: string;
  kind: string;
  reference: string;
  url: string | null;
  fromContent: boolean;
};

export function BibliographySection({ subjectId, items }: { subjectId: string; items: BibliographyView[] }) {
  const canEdit = useCanEdit();
  const [adding, setAdding] = useState(false);
  const [editingUrlId, setEditingUrlId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {canEdit && (
        <div>
          <Button size="sm" variant="outline" onClick={() => setAdding((s) => !s)}>
            <Plus className="h-3.5 w-3.5" />
            Agregar referencia
          </Button>
        </div>
      )}
      {canEdit && adding && (
        <Card>
          <CardContent className="pt-5">
            <form
              action={async (fd) => {
                await addBibliography(subjectId, fd);
                setAdding(false);
              }}
              className="flex flex-col gap-2"
            >
              <Select name="kind" defaultValue="libro" className="w-40">
                <option value="libro">Libro</option>
                <option value="revista">Revista</option>
              </Select>
              <Textarea name="reference" placeholder="Referencia completa" required rows={2} />
              <Input name="url" type="url" placeholder="Enlace a PDF / Drive (opcional)" />
              <div className="flex gap-2">
                <Button type="submit" size="sm">Guardar</Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <ul className="flex flex-col divide-y divide-border rounded-md border border-border">
        {items.map((b) => (
          <li key={b.id} className="group flex items-start gap-3 p-3">
            <span className="mt-0.5 shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[11px] text-secondary-foreground">
              {b.kind === "revista" ? "Revista" : "Libro"}
            </span>
            <div className="flex-1">
              <p className="text-sm">{b.reference}</p>
              {editingUrlId === b.id && canEdit ? (
                <form
                  action={async (fd) => {
                    await setBibliographyUrl(b.id, fd);
                    setEditingUrlId(null);
                  }}
                  className="mt-1 flex items-center gap-2"
                >
                  <Input name="url" type="url" defaultValue={b.url ?? ""} placeholder="https://…" className="w-64" />
                  <Button type="submit" size="sm">OK</Button>
                </form>
              ) : (
                <p className="mt-1 flex items-center gap-2 text-xs">
                  {b.url ? (
                    <a href={b.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                      <ExternalLink className="h-3 w-3" /> Abrir
                    </a>
                  ) : (
                    <span className="text-muted-foreground">sin enlace</span>
                  )}
                  {canEdit && (
                    <button type="button" onClick={() => setEditingUrlId(b.id)} className="text-primary hover:underline">
                      {b.url ? "cambiar enlace" : "agregar enlace"}
                    </button>
                  )}
                </p>
              )}
            </div>
            {canEdit && !b.fromContent && (
              <button type="button" onClick={() => deleteBibliography(b.id)} className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100" aria-label="Eliminar">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
