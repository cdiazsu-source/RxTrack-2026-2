/** Solo http(s): evita `javascript:` y similares en un href. */
export function cleanHttpUrl(raw: string): string | null {
  try {
    const u = new URL(raw.trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}

/** Lee la columna Json `ProjectNote.links` como [{ name, url }], ignorando lo que no tenga forma. */
export function parseNoteLinks(raw: unknown): { name: string; url: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((x) => {
    const o = x as { name?: unknown; url?: unknown } | null;
    return o && typeof o.url === "string" ? [{ name: typeof o.name === "string" && o.name ? o.name : o.url, url: o.url }] : [];
  });
}
