"use client";

import { useTransition } from "react";
import type { ModuleStatus } from "@prisma/client";

import { Select } from "@/components/ui/select";
import { setModuleStatus } from "@/lib/actions/modules";
import { MODULE_STATUS_LABEL } from "@/lib/utils";
import { useCanEdit } from "@/components/access-context";

const OPTIONS: ModuleStatus[] = ["NO_VISTO", "EN_PROGRESO", "DOMINADO"];

export function ModuleStatusSelect({ moduleId, status }: { moduleId: string; status: ModuleStatus }) {
  const canEdit = useCanEdit();
  const [pending, start] = useTransition();

  if (!canEdit) {
    return <span className="text-sm font-medium">{MODULE_STATUS_LABEL[status]}</span>;
  }

  return (
    <Select
      aria-label="Estado del módulo"
      defaultValue={status}
      disabled={pending}
      onChange={(e) => start(() => setModuleStatus(moduleId, e.target.value as ModuleStatus))}
      className="h-8 w-auto text-xs font-medium"
    >
      {OPTIONS.map((o) => (
        <option key={o} value={o}>
          {MODULE_STATUS_LABEL[o]}
        </option>
      ))}
    </Select>
  );
}
