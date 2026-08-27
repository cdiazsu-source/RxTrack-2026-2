"use client";

import { useTransition } from "react";
import { Minus, Plus } from "lucide-react";

import { setAttendanceMissed } from "@/lib/actions/semester";
import { ProgressBar } from "@/components/ui/progress";
import { useCanEdit } from "@/components/access-context";

export function AttendancePanel({
  subjectId,
  total,
  missed,
}: {
  subjectId: string;
  total: number;
  missed: number;
}) {
  const canEdit = useCanEdit();
  const [pending, start] = useTransition();
  const attended = Math.max(0, total - missed);
  const pctAttended = total > 0 ? (attended / total) * 100 : 0;
  const nearLimit = total > 0 && missed / total >= 0.15; // ~15% suele ser el tope

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Asistencia</span>
        {canEdit && (
          <span className="flex items-center gap-1">
            <button
              type="button"
              disabled={pending || missed === 0}
              onClick={() => start(() => setAttendanceMissed(subjectId, missed - 1))}
              className="rounded border border-input p-1 disabled:opacity-40"
              aria-label="Una falta menos"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-16 text-center text-xs tabular-nums">{missed} falta{missed === 1 ? "" : "s"}</span>
            <button
              type="button"
              disabled={pending}
              onClick={() => start(() => setAttendanceMissed(subjectId, missed + 1))}
              className="rounded border border-input p-1"
              aria-label="Una falta más"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </span>
        )}
      </div>
      <ProgressBar value={pctAttended} label={`${attended}/${total}`} inline />
      {nearLimit && (
        <p className="text-xs font-medium text-warning">
          Vas en {missed} de {total} clases perdidas — ojo con el tope de fallas.
        </p>
      )}
    </div>
  );
}
