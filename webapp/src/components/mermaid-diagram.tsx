"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Renderiza un diagrama de flujo (mermaid.js) a partir de su definición en
 * texto. La definición vive en el content (`content/<code>.ts`), no la
 * escribe la persona — se renderiza con la configuración segura por defecto
 * de mermaid (sanitiza las etiquetas, sin HTML embebido).
 */
export function MermaidDiagram({ title, definition }: { title?: string; definition: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "-");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "neutral",
        securityLevel: "strict",
        fontFamily: "inherit",
        flowchart: { htmlLabels: false, curve: "basis" },
      });
      try {
        const { svg } = await mermaid.render(`mmd-${id}`, definition);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch {
        if (!cancelled) setError("No se pudo dibujar el diagrama.");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [definition, id]);

  return (
    <div className="rounded-lg border border-border bg-card p-3">
      {title && <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>}
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <div ref={ref} className="mermaid-diagram flex justify-center overflow-x-auto [&_svg]:max-w-full" />
      )}
    </div>
  );
}
