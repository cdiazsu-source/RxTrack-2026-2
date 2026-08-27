import { cookies } from "next/headers";

import { type AccessLevel, SESSION_COOKIE, verifyToken } from "@/lib/auth";

export type Session = { authed: true; level: AccessLevel } | { authed: false };

/** Sesión actual (server components / server actions). */
export async function getSession(): Promise<Session> {
  const level = await verifyToken(cookies().get(SESSION_COOKIE)?.value);
  return level ? { authed: true, level } : { authed: false };
}

/** ¿La sesión puede editar? Solo el perfil "full". */
export async function canEdit(): Promise<boolean> {
  const s = await getSession();
  return s.authed && s.level === "full";
}

/** Al inicio de cada server action de escritura: si la sesión no puede editar,
 *  corta en silencio (devuelve true = "bloqueado"). */
export async function blockedForRead(): Promise<boolean> {
  return !(await canEdit());
}
