"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { ReviewStats } from "@/lib/review-stats";
import { Card, CardContent } from "@/components/ui/card";
import { AXIS_TICK, CHART_COLOR, TOOLTIP_STYLE } from "@/components/chart-theme";

const TONE_COLOR = {
  new: CHART_COLOR.neutral,
  learning: CHART_COLOR.warning,
  young: CHART_COLOR.primary,
  mature: CHART_COLOR.success,
} as const;

/** Tres gráficas del repaso: lo que viene, lo que has respondido y qué tan firmes están las tarjetas. */
export function ReviewCharts({ stats }: { stats: ReviewStats }) {
  const upcoming = stats.forecast.reduce((s, d) => s + d.due, 0);
  const next7 = stats.forecast.slice(0, 7).reduce((s, d) => s + d.due, 0);
  const hasActivity = stats.reviews30 > 0;

  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <ChartCard
        title="Lo que viene"
        summary={upcoming === 0 ? "Sin vencimientos en 14 días." : `${stats.forecast[0].due} hoy · ${next7} en 7 días · ${upcoming} en 14 días`}
        hint="Tarjetas ya vistas que vencen cada día (hoy incluye las atrasadas). Las nuevas no cuentan."
      >
        {upcoming === 0 ? (
          <Empty>Cuando repases tarjetas nuevas verás aquí cuándo te toca volver a verlas.</Empty>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={stats.forecast} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid vertical={false} stroke={CHART_COLOR.muted} />
              <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} axisLine={false} interval={1} />
              <YAxis allowDecimals={false} tick={AXIS_TICK} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: CHART_COLOR.secondary }} contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="due" name="Tarjetas" fill={CHART_COLOR.primary} radius={[4, 4, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title="Tus repasos"
        summary={
          hasActivity
            ? `${stats.reviews30} respuestas en 30 días${stats.retention != null ? ` · retención ${stats.retention} %` : ""}`
            : "Aún sin respuestas registradas."
        }
        hint="Respuestas por día. Retención = porcentaje de tarjetas que ya estaban en repaso y no contestaste «Otra vez»; FSRS apunta a ~90 %."
      >
        {!hasActivity ? (
          <Empty>Desde tu próximo repaso aquí se irá dibujando tu constancia y cuánto recuerdas.</Empty>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={stats.activity} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid vertical={false} stroke={CHART_COLOR.muted} />
              <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} axisLine={false} interval={6} />
              <YAxis allowDecimals={false} tick={AXIS_TICK} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: CHART_COLOR.secondary }} contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="correct" name="Recordadas" stackId="a" fill={CHART_COLOR.success} isAnimationActive={false} />
              <Bar dataKey="again" name="Otra vez" stackId="a" fill={CHART_COLOR.destructive} radius={[4, 4, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title="Qué tan firmes están"
        summary={stats.total === 0 ? "Sin tarjetas." : `${stats.total} tarjetas activas`}
        hint="Nuevas: sin ver. Aprendiendo: en sus primeros pasos. Jóvenes: se recuerdan, pero menos de 21 días. Maduras: se recuerdan 21 días o más."
      >
        {stats.total === 0 ? (
          <Empty>Genera tarjetas desde el glosario y las fórmulas de una asignatura.</Empty>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={stats.maturity} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 8 }}>
              <CartesianGrid horizontal={false} stroke={CHART_COLOR.muted} />
              <XAxis type="number" allowDecimals={false} tick={AXIS_TICK} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" width={84} tick={AXIS_TICK} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: CHART_COLOR.secondary }} contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="value" name="Tarjetas" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                {stats.maturity.map((b) => (
                  <Cell key={b.name} fill={TONE_COLOR[b.tone]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, summary, hint, children }: { title: string; summary: string; hint: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 pt-5">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">{summary}</p>
        </div>
        <div className="min-h-[180px]">{children}</div>
        <p className="text-[11px] leading-snug text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="grid h-[180px] place-items-center px-4 text-center text-xs text-muted-foreground">{children}</p>;
}
