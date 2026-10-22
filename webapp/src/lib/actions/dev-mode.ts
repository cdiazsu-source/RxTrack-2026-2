"use server";

import { cookies } from "next/headers";

import { DEV_MODE_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";
import { canUseDeveloperMode } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

/** Enciende o apaga el modo desarrollador (solo Cesar). Es una preferencia del navegador: una cookie. */
export async function setDevMode(on: boolean) {
  if (!(await canUseDeveloperMode())) return;
  if (on) {
    cookies().set(DEV_MODE_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
  } else {
    cookies().delete(DEV_MODE_COOKIE);
  }
  revalidateAll();
}
