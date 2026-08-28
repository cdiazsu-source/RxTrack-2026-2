import { cn } from "@/lib/utils";

/**
 * Anillo de progreso para los sitios "titular" (tarjeta de asignatura, semestre,
 * racha, tarjeta de módulo). SVG puro, sin dependencias. El trazo se anima al
 * cambiar el valor; `prefers-reduced-motion` lo neutraliza vía globals.css.
 */
export function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  label,
  sublabel,
  className,
}: {
  /** 0..100 */
  value: number;
  size?: number;
  stroke?: number;
  /** Contenido central; por defecto el porcentaje. */
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  className?: string;
}) {
  const v = Math.min(100, Math.max(0, Math.round(value)));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const done = v >= 100;

  return (
    <div
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--secondary))" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={done ? "hsl(var(--success))" : "hsl(var(--primary))"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v / 100)}
          className="transition-[stroke-dashoffset] [transition-duration:400ms] ease-out-strong motion-reduce:transition-none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center leading-none">
        <span className="text-xs font-semibold tabular-nums">{label ?? `${v}%`}</span>
        {sublabel ? <span className="mt-0.5 text-[10px] text-muted-foreground">{sublabel}</span> : null}
      </div>
    </div>
  );
}
