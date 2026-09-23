import { cookies } from "next/headers";

import { type AccessLevel, type SubjectScope, SESSION_COOKIE, verifyToken } from "@/lib/auth";

/** Cookie de "ver como Diana": Cesar baja su nivel efectivo a "read" para
 *  revisar la interfaz tal como la ve ella. */
export const VIEW_AS_COOKIE = "rxtrack_view_as";

export type Session =
  | { authed: true; level: AccessLevel; name: string; viewingAs: boolean; scope: SubjectScope[] | null }
  | { authed: false };

/** Sesión actual (server components / server actions). Aplica "ver como Diana". */
export async function getSession(): Promise<Session> {
  const profile = await verifyToken(cookies().get(SESSION_COOKIE)?.value);
  if (!profile) return { authed: false };
  // "Ver como Diana" es solo para Cesar (full, sin alcance acotado).
  const viewingAs =
    profile.level === "full" && !profile.scope && cookies().get(VIEW_AS_COOKIE)?.value === "read";
  return {
    authed: true,
    level: viewingAs ? "read" : profile.level,
    name: viewingAs ? "Diana" : profile.name,
    viewingAs,
    scope: profile.scope ?? null,
  };
}

/** Nivel REAL del token, sin aplicar "ver como Diana". Para saber si mostrar el
 *  botón de vista previa y para permitir salir de ella. */
export async function realLevel(): Promise<AccessLevel | null> {
  const profile = await verifyToken(cookies().get(SESSION_COOKIE)?.value);
  return profile?.level ?? null;
}

/** ¿La sesión puede editar? Solo el perfil "full" (y no en modo vista). */
export async function canEdit(): Promise<boolean> {
  const s = await getSession();
  return s.authed && s.level === "full";
}

/** ¿La sesión puede colaborar en las áreas abiertas al perfil "read"
 *  (checklist, enlaces de Drive, sesiones/transcripciones, bitácora)?
 *  Basta con tener sesión válida. */
export async function canContribute(): Promise<boolean> {
  return (await getSession()).authed;
}

/** Al inicio de cada server action de escritura: si la sesión no puede editar,
 *  corta en silencio (devuelve true = "bloqueado"). */
export async function blockedForRead(): Promise<boolean> {
  return !(await canEdit());
}

/** Igual que `blockedForRead` pero para las áreas colaborativas: solo bloquea a
 *  quien no tiene sesión. */
export async function blockedForContribute(): Promise<boolean> {
  return !(await canContribute());
}
