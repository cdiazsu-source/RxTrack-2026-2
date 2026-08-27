"use client";

import { useState } from "react";
import { ExternalLink, Plus, Trash2 } from "lucide-react";

import { addResource, deleteResource } from "@/lib/actions/resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpHint } from "@/components/help-hint";
import { useCanEdit } from "@/components/access-context";

export type ResourceView = { id: string; name: string; url: string; order: number };

export function ResourcesPanel({ moduleId, resources }: { moduleId: string; resources: ResourceView[] }) {
  const canEdit = useCanEdit();
  const [adding, setAdding] = useState(false);
  const sorted = [...resources].sort((a, b) => a.order - b.order);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          Recursos
          <HelpHint k="recursos" />
        </CardTitle>
        {canEdit && (
          <Button size="sm" variant="outline" onClick={() => setAdding((s) => !s)}>
            <Plus className="h-3.5 w-3.5" /> Agregar
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {canEdit && adding && (
          <form
            action={async (fd) => {
              await addResource(moduleId, fd);
            }}
            className="flex flex-wrap gap-2"
          >
            <Input name="name" placeholder="Nombre" required className="w-44" />
            <Input name="url" type="url" placeholder="https://…" required className="flex-1" />
            <Button type="submit" size="sm">Agregar</Button>
          </form>
        )}
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin recursos.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {sorted.map((r) => (
              <li key={r.id} className="group flex items-center gap-2 py-2 text-sm">
                <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                  <ExternalLink className="h-3.5 w-3.5" />
                  {r.name}
                </a>
                {canEdit && (
                  <button type="button" onClick={() => deleteResource(r.id)} className="ml-auto text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100" aria-label="Eliminar">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
