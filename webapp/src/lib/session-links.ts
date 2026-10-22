/** Tipos de enlace de una sesión de apuntes (client-safe). El tipo solo elige el ícono y el nombre sugerido. */

export const SESSION_LINK_KINDS = ["ONENOTE", "IA", "DIAPOSITIVAS", "FOTOS", "DRIVE", "VIDEO", "OTRO"] as const;
export type SessionLinkKind = (typeof SESSION_LINK_KINDS)[number];

export const SESSION_LINK_KIND_LABEL: Record<SessionLinkKind, string> = {
  ONENOTE: "OneNote",
  IA: "Gemini / IA",
  DIAPOSITIVAS: "Diapositivas",
  FOTOS: "Fotos",
  DRIVE: "Drive",
  VIDEO: "Video / grabación",
  OTRO: "Otro",
};

/** Nombre que se propone al elegir el tipo (la persona lo puede cambiar). */
export const SESSION_LINK_KIND_NAME: Record<SessionLinkKind, string> = {
  ONENOTE: "OneNote",
  IA: "Gemini",
  DIAPOSITIVAS: "Diapositivas",
  FOTOS: "Fotos de la clase",
  DRIVE: "Carpeta de Drive",
  VIDEO: "Grabación",
  OTRO: "",
};

export function asSessionLinkKind(raw: unknown): SessionLinkKind {
  return (SESSION_LINK_KINDS as readonly string[]).includes(String(raw)) ? (raw as SessionLinkKind) : "OTRO";
}

/** Adivina el tipo por el dominio, para preseleccionarlo al pegar una URL. */
export function guessSessionLinkKind(url: string): SessionLinkKind {
  let host = "";
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return "OTRO";
  }
  if (/onenote|office\.com|sharepoint|live\.com|1drv\.ms/.test(host)) return "ONENOTE";
  if (/gemini|notebooklm|chatgpt|openai|claude\.ai|perplexity/.test(host)) return "IA";
  if (/photos\.google|photos\.app\.goo|flickr|imgur/.test(host)) return "FOTOS";
  if (/youtube|youtu\.be|vimeo|zoom|meet\.google|teams\.microsoft/.test(host)) return "VIDEO";
  if (/slides|canva|prezi|docs\.google\.com\/presentation/.test(url.toLowerCase())) return "DIAPOSITIVAS";
  if (/drive\.google|docs\.google|dropbox/.test(host)) return "DRIVE";
  return "OTRO";
}
