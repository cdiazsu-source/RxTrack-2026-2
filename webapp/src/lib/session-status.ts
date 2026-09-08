import type { SessionStatus } from "@prisma/client";

export const SESSION_STATUS_ORDER: SessionStatus[] = ["CRUDA", "TRANSCRITA", "CORNELL_IA", "REVISADA"];

export const SESSION_STATUS_LABEL: Record<SessionStatus, string> = {
  CRUDA: "Apuntes crudos",
  TRANSCRITA: "Transcrita",
  CORNELL_IA: "Cornell IA",
  REVISADA: "Revisada",
};

/** Qué falta para llegar a "lista para estudiar". */
export const SESSION_STATUS_NEXT: Record<SessionStatus, string> = {
  CRUDA: "falta la transcripción",
  TRANSCRITA: "falta generar los apuntes Cornell con IA",
  CORNELL_IA: "falta revisar los apuntes",
  REVISADA: "lista para estudiar",
};

/** Clases Tailwind para la píldora de estado (usa tokens del tema). */
export const SESSION_STATUS_PILL: Record<SessionStatus, string> = {
  CRUDA: "bg-muted text-muted-foreground",
  TRANSCRITA: "bg-secondary text-secondary-foreground",
  CORNELL_IA: "bg-primary/15 text-primary",
  REVISADA: "bg-success/15 text-success",
};
