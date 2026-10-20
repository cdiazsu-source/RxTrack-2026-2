"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2, Users } from "lucide-react";

import { addProjectMember, deleteProjectMember, updateProjectMember } from "@/lib/actions/members";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useCanContribute } from "@/components/access-context";

export type ProjectMemberView = { id: string; name: string; role: string | null };

function MemberForm({
  member,
  action,
  onDone,
}: {
  member?: ProjectMemberView;
  action: (fd: FormData) => Promise<void>;
  onDone: () => void;
}) {
  return (
    <form
      action={async (fd) => {
        await action(fd);
        toast(member ? "Integrante actualizado" : "Integrante agregado");
        onDone();
      }}
      className="flex flex-wrap items-center gap-2"
    >
      <Input
        name="name"
        required
        defaultValue={member?.name ?? ""}
        placeholder="Nombre"
        maxLength={80}
        className="w-48"
        autoFocus
      />
      <Input name="role" defaultValue={member?.role ?? ""} placeholder="Aporte o rol (opcional)" maxLength={80} className="min-w-0 flex-1 basis-48" />
      <Button type="submit" size="sm">Guardar</Button>
      <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancelar</Button>
    </form>
  );
}

/**
 * Equipo del proyecto. Son solo nombres para llevar el control de quién participa:
 * no tienen usuario. Quien publica una nota de la bitácora se elige de esta lista.
 */
export function ProjectMembers({ projectId, members }: { projectId: string; members: ProjectMemberView[] }) {
  const canEdit = useCanContribute();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader className="flex-row flex-wrap items-center justify-between gap-2 p-4 pb-2">
        <CardTitle className="flex items-center gap-1.5 text-sm">
          <Users className="h-4 w-4" aria-hidden />
          Equipo del proyecto
        </CardTitle>
        {canEdit && !adding && (
          <Button type="button" size="sm" variant="outline" onClick={() => setAdding(true)}>
            <Plus className="h-3.5 w-3.5" />
            Agregar integrante
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4 pt-0">
        {adding && <MemberForm action={addProjectMember.bind(null, projectId)} onDone={() => setAdding(false)} />}
        {members.length === 0 && !adding && (
          <p className="text-sm text-muted-foreground">
            Aún no hay integrantes. Agrégalos aquí: solo ellos podrán aparecer como autores de las notas de la bitácora. No necesitan usuario.
          </p>
        )}
        {members.map((m) =>
          editingId === m.id ? (
            <MemberForm key={m.id} member={m} action={updateProjectMember.bind(null, m.id)} onDone={() => setEditingId(null)} />
          ) : (
            <div key={m.id} className="flex items-center gap-2 text-sm">
              <span className="font-medium">{m.name}</span>
              {m.role && <span className="min-w-0 truncate text-muted-foreground">· {m.role}</span>}
              {canEdit && (
                <span className="ml-auto flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => setEditingId(m.id)}
                    className="rounded p-1 text-muted-foreground hover:bg-accent"
                    aria-label={`Modificar a ${m.name}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteProjectMember(m.id);
                      toast("Integrante eliminado", "info");
                    }}
                    className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
                    aria-label={`Quitar a ${m.name} del equipo`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}
            </div>
          ),
        )}
      </CardContent>
    </Card>
  );
}
