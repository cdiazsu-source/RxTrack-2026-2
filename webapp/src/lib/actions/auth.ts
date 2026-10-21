"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE, SESSION_MAX_AGE, checkCredentials, landingPath, signToken, trackedUsername } from "@/lib/auth";
import { recordLogin } from "@/lib/activity";

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const profile = checkCredentials(username, password);
  if (!profile) redirect("/login?error=1");

  cookies().set(SESSION_COOKIE, await signToken(profile), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  const tracked = trackedUsername(profile.name);
  if (tracked) await recordLogin(tracked);

  redirect(landingPath(profile));
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect("/login");
}
