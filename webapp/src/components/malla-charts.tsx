"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { SemesterStat } from "@/lib/malla";
import { Card, CardContent } from "@/components/ui/card";
import { AXIS_TICK, CHART_COLOR, TOOLTIP_STYLE } from "@/components/chart-theme";

/** Créditos por semestre (vistos / en curso / por ver) y promedio ponderado por semestre. */
export function MallaCharts({ stats, average }: { stats: SemesterStat[]; average: number | null }) {
  const graded = stats.filter((s) => s.promedio != null);

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <Card>
        <CardContent className="flex flex-col gap-2 pt-5">
          <div>
            <h2 className="text-sm font-semibold">Créditos por semestre</h2>
            <p className="text-xs text-muted-foreground">Verde = vistos, magenta = en curso, gris = por ver.</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid vertical={false} stroke={CHART_COLOR.muted} />
              <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tick={AXIS_TICK} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: CHART_COLOR.secondary }} contentStyle={TOOLTIP_STYLE} labelFormatter={(l) => `Semestre ${l}`} />
              <Bar dataKey="vistos" name="Vistos" stackId="c" fill={CHART_COLOR.success} isAnimationActive={false} />
              <Bar dataKey="enCurso" name="En curso" stackId="c" fill={CHART_COLOR.primary} isAnimationActive={false} />
              <Bar dataKey="porVer" name="Por ver" stackId="c" fill={CHART_COLOR.neutral} radius={[4, 4, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-2 pt-5">
          <div>
            <h2 className="text-sm font-semibold">Promedio por semestre</h2>
            <p className="text-xs text-muted-foreground">
              Ponderado por créditos, solo asignaturas vistas con nota{average != null ? ` · acumulado ${average.toFixed(2)}` : ""}.
            </p>
          </div>
          {graded.length === 0 ? (
            <p className="grid h-[200px] place-items-center px-4 text-center text-xs text-muted-foreground">
              Aún no hay notas: agrégalas al editar una asignatura vista.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={stats} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid vertical={false} stroke={CHART_COLOR.muted} />
                <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={AXIS_TICK} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} labelFormatter={(l) => `Semestre ${l}`} formatter={(v) => [Number(v).toFixed(2), "Promedio"]} />
                {average != null && <ReferenceLine y={average} stroke={CHART_COLOR.primary} strokeDasharray="4 4" />}
                <Line
                  type="monotone"
                  dataKey="promedio"
                  name="Promedio"
                  stroke={CHART_COLOR.success}
                  strokeWidth={2}
                  dot={{ r: 3, fill: CHART_COLOR.success }}
                  connectNulls
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
