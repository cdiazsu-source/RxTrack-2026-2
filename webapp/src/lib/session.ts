import { cookies } from "next/headers";

import {
  type AccessLevel,
  type SubjectScope,
  SESSION_COOKIE,
  VIEW_AS_COOKIE,
  verifyToken,
  viewProfileByKey,
} from "@/lib/auth";

export { VIEW_AS_COOKIE };

export type Session =
  | { authed: true; level: AccessLevel; name: string; viewingAs: boolean; scope: SubjectScope[] | null }
  | { authed: false };

/** Sesión actual (server components / server actions). Aplica "Ver como": con la cookie
 *  puesta, Cesar ve (y puede) lo mismo que el perfil elegido: su nivel, nombre y alcance. */
export async function getSession(): Promise<Session> {
  const profile = await verifyToken(cookies().get(SESSION_COOKIE)?.value);
  if (!profile) return { authed: false };
  // "Ver como" es solo para Cesar (full, sin alcance acotado).
  const target =
    profile.level === "full" && !profile.scope ? viewProfileByKey(cookies().get(VIEW_AS_COOKIE)?.value) : null;
  if (target) {
    return { authed: true, level: target.level, name: target.name, viewingAs: true, scope: target.scope };
  }
  return { authed: true, level: profile.level, name: profile.name, viewingAs: false, scope: profile.scope ?? null };
}

/** Nivel REAL del token, sin aplicar "Ver como". Para saber si mostrar el
 *  selector de perfiles y para permitir salir de la vista previa. */
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
