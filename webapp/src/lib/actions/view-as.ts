"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_MAX_AGE, landingPath, viewProfileByKey } from "@/lib/auth";
import { VIEW_AS_COOKIE, realLevel } from "@/lib/session";

/** Cesar entra en "Ver como" otro perfil (Diana, Paula, JOSE, Karen…). Solo el nivel real "full" puede. */
export async function startViewAs(key: string) {
  if ((await realLevel()) !== "full") return;
  const target = viewProfileByKey(key);
  if (!target) return;
  cookies().set(VIEW_AS_COOKIE, target.key, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  // Los perfiles con alcance acotado aterrizan donde aterrizan ellos (p. ej. /aif/laboratorio).
  redirect(landingPath({ name: target.name, level: target.level, scope: target.scope }));
}

/** Salir del modo vista (sin guardas: solo borra la cookie). */
export async function stopViewAs() {
  cookies().delete(VIEW_AS_COOKIE);
  redirect("/");
}
