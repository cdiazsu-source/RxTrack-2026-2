import type { CSSProperties } from "react";

/** Colores y estilos compartidos por las gráficas (recharts), tomados de los tokens del tema. */
export const CHART_COLOR = {
  primary: "hsl(var(--primary))",
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  destructive: "hsl(var(--destructive))",
  /** Líneas de la cuadrícula (suaves). */
  muted: "hsl(var(--border))",
  /** Barras «sin empezar»: más oscuro que la cuadrícula para que se distingan del fondo. */
  neutral: "hsl(var(--muted-foreground) / 0.4)",
  secondary: "hsl(var(--secondary))",
} as const;

export const AXIS_TICK = { fontSize: 11, fill: "hsl(var(--muted-foreground))" } as const;

export const TOOLTIP_STYLE: CSSProperties = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
  color: "hsl(var(--card-foreground))",
};
