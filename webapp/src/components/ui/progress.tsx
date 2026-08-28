import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0..100 */
  value: number;
  /** Texto crudo al lado ("4/7", "58 %"). Una barra sin número es decoración. */
  label?: React.ReactNode;
  /** Barra + etiqueta en la misma fila. */
  inline?: boolean;
}

/**
 * Barra de progreso. Se anima del valor anterior al nuevo (CSS transition);
 * `prefers-reduced-motion` la neutraliza vía globals.css. Al 100 % el relleno
 * cambia a `success`.
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, label, inline = false, ...props }, ref) => {
    const v = Math.min(100, Math.max(0, Math.round(value)));
    const bar = (
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Se anima con transform (GPU, sin layout) — patrón de Radix Progress. */}
        <div
          className={cn(
            "h-full w-full rounded-full transition-transform duration-300 ease-out-strong",
            v >= 100 ? "bg-success" : "bg-primary",
          )}
          style={{ transform: `translateX(-${100 - v}%)` }}
        />
      </div>
    );

    if (!label) {
      return (
        <div ref={ref} className={className} {...props}>
          {bar}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(inline ? "flex items-center gap-2" : "flex flex-col gap-1", className)}
        {...props}
      >
        <div className={inline ? "flex-1" : ""}>{bar}</div>
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{label}</span>
      </div>
    );
  },
);
ProgressBar.displayName = "ProgressBar";
