"use client";

import { useTransition } from "react";
import type { ProjectStatus } from "@prisma/client";

import { Select } from "@/components/ui/select";
import { setProjectStatus } from "@/lib/actions/projects";
import { PROJECT_STATUS_LABEL } from "@/lib/utils";
import { useCanEdit } from "@/components/access-context";

const OPTIONS: ProjectStatus[] = ["POR_INICIAR", "EN_CURSO", "COMPLETADO"];

export function ProjectStatusSelect({ projectId, status }: { projectId: string; status: ProjectStatus }) {
  const canEdit = useCanEdit();
  const [pending, start] = useTransition();

  if (!canEdit) return <span className="text-sm font-medium">{PROJECT_STATUS_LABEL[status]}</span>;

  return (
    <Select
      aria-label="Estado del proyecto"
      defaultValue={status}
      disabled={pending}
      onChange={(e) => start(() => setProjectStatus(projectId, e.target.value as ProjectStatus))}
      className="h-8 w-auto text-xs font-medium"
    >
      {OPTIONS.map((o) => (
        <option key={o} value={o}>
          {PROJECT_STATUS_LABEL[o]}
        </option>
      ))}
    </Select>
  );
}
