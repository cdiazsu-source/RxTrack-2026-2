"use client";

import { useState } from "react";
import { Check, ExternalLink, RotateCcw, Trash2 } from "lucide-react";

import { deleteInboxItem, inboxToChecklist, reopenInboxItem, triageInboxItem } from "@/lib/actions/inbox";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { useCanEdit } from "@/components/access-context";

export type InboxItemView = { id: string; text: string; url: string | null; subjectId: string | null; triagedAt: string | null; createdAt: string };
export type SubjectRef = { id: string; code: string; name: string; modules: { id: string; title: string }[] };

function Row({ item, subjects }: { item: InboxItemView; subjects: SubjectRef[] }) {
  const canEdit = useCanEdit();
  const [subjectId, setSubjectId] = useState(item.subjectId ?? "");
  const [moduleId, setModuleId] = useState("");
  const modules = subjects.find((s) => s.id === subjectId)?.modules ?? [];

  return (
    <li className="flex flex-col gap-2 rounded-md border border-border p-3">
      <p className="whitespace-pre-line text-sm">{item.text}</p>
      {item.url && (
        <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
          <ExternalLink className="h-3 w-3" /> {item.url}
        </a>
      )}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{formatDateTime(item.createdAt)}</span>

        {!item.triagedAt ? (
          <>
            <Select value={subjectId} onChange={(e) => { setSubjectId(e.target.value); setModuleId(""); }} className="h-7 w-auto text-xs">
              <option value="">Asignatura…</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.code}</option>
              ))}
            </Select>
            {canEdit && subjectId && modules.length > 0 && (
              <Select value={moduleId} onChange={(e) => setModuleId(e.target.value)} className="h-7 w-auto max-w-[12rem] text-xs">
                <option value="">→ módulo (subtarea)…</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </Select>
            )}
            {canEdit && moduleId && (
              <Button size="sm" onClick={() => inboxToChecklist(item.id, moduleId)}>Crear subtarea</Button>
            )}
            <button type="button" onClick={() => triageInboxItem(item.id, subjectId || null)} className="inline-flex items-center gap-1 rounded border border-input px-2 py-1 hover:bg-accent">
              <Check className="h-3 w-3" /> Listo
            </button>
          </>
        ) : (
          <button type="button" onClick={() => reopenInboxItem(item.id)} className="inline-flex items-center gap-1 rounded border border-input px-2 py-1 hover:bg-accent">
            <RotateCcw className="h-3 w-3" /> Reabrir
          </button>
        )}

        <button type="button" onClick={() => deleteInboxItem(item.id)} className="ml-auto text-muted-foreground hover:text-destructive" aria-label="Eliminar">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </li>
  );
}

export function InboxList({ items, subjects }: { items: InboxItemView[]; subjects: SubjectRef[] }) {
  const pending = items.filter((i) => !i.triagedAt);
  const done = items.filter((i) => i.triagedAt);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Sin clasificar ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground">Bandeja vacía. Usa el botón + o Ctrl+Shift+K para capturar.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {pending.map((it) => <Row key={it.id} item={it} subjects={subjects} />)}
          </ul>
        )}
      </section>

      {done.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Procesadas ({done.length})</h2>
          <ul className="flex flex-col gap-2 opacity-70">
            {done.map((it) => <Row key={it.id} item={it} subjects={subjects} />)}
          </ul>
        </section>
      )}
    </div>
  );
}
