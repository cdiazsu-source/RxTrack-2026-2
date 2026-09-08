"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_MAX_AGE } from "@/lib/auth";
import { VIEW_AS_COOKIE, realLevel } from "@/lib/session";

/** Cesar entra en "ver como Diana". Solo el nivel real "full" puede. */
export async function startViewAs() {
  if ((await realLevel()) !== "full") return;
  cookies().set(VIEW_AS_COOKIE, "read", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/");
}

/** Salir del modo vista (sin guardas: solo borra la cookie). */
export async function stopViewAs() {
  cookies().delete(VIEW_AS_COOKIE);
  redirect("/");
}
