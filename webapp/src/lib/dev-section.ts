/**
 * Modo desarrollador: qué sección de la asignatura se está viendo, a partir de la URL.
 * Módulo pequeño y sin imports de servidor, para poder usarlo en el panel (cliente) y en la
 * acción que arma el prompt (servidor). El texto largo vive en `dev-context.ts`.
 */
export const DEV_SECTION_KEYS = [
  "panel",
  "modulos",
  "modulo-detalle",
  "laboratorio",
  "proyectos",
  "proyecto-detalle",
  "fechas",
  "preparar-parcial",
  "repaso",
  "glosario",
  "formulas",
  "bibliografia",
  "insumos",
  "prompt-ia",
] as const;

export type DevSectionKey = (typeof DEV_SECTION_KEYS)[number];

/** Marcador del prompt que el panel reemplaza con la idea que escribe Cesar. */
export const DEV_IDEA_PLACEHOLDER = "[ESCRIBE AQUÍ TU IDEA O EL CAMBIO QUE QUIERES]";

export const DEV_SECTION_LABEL: Record<DevSectionKey, string> = {
  panel: "Panel",
  modulos: "Módulos (lista)",
  "modulo-detalle": "Módulo (detalle)",
  laboratorio: "Laboratorio",
  proyectos: "Proyectos (lista)",
  "proyecto-detalle": "Proyecto (detalle)",
  fechas: "Fechas",
  "preparar-parcial": "Preparar parcial",
  repaso: "Repaso",
  glosario: "Glosario",
  formulas: "Fórmulas",
  bibliografia: "Bibliografía",
  insumos: "Insumos",
  "prompt-ia": "Prompt IA",
};

export type DevSection = { key: DevSectionKey; entityId: string | null };

/** Sección según la ruta (`/{asignatura}/…`), o null si no es una sección conocida. */
export function devSectionFromPath(pathname: string, slug: string): DevSection | null {
  const prefix = `/${slug}`;
  if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) return null;
  const [seg, id, third] = pathname.slice(prefix.length).split("/").filter(Boolean);

  if (!seg) return { key: "panel", entityId: null };
  if (seg === "modulos") return id ? { key: "modulo-detalle", entityId: id } : { key: "modulos", entityId: null };
  if (seg === "proyectos") return id ? { key: "proyecto-detalle", entityId: id } : { key: "proyectos", entityId: null };
  if (seg === "fechas") {
    return id && third === "preparar" ? { key: "preparar-parcial", entityId: id } : { key: "fechas", entityId: null };
  }
  if ((DEV_SECTION_KEYS as readonly string[]).includes(seg)) return { key: seg as DevSectionKey, entityId: null };
  return null;
}
