import { cookies } from "next/headers";

import { type AccessLevel, SESSION_COOKIE, verifyToken } from "@/lib/auth";

export type Session =
  | { authed: true; level: AccessLevel; name: string }
  | { authed: false };

/** Sesión actual (server components / server actions). */
export async function getSession(): Promise<Session> {
  const profile = await verifyToken(cookies().get(SESSION_COOKIE)?.value);
  return profile ? { authed: true, level: profile.level, name: profile.name } : { authed: false };
}

/** ¿La sesión puede editar? Solo el perfil "full". */
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
