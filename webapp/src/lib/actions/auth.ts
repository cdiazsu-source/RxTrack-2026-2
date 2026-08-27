"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE, SESSION_MAX_AGE, checkCredentials, signToken } from "@/lib/auth";

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const level = checkCredentials(username, password);
  if (!level) redirect("/login?error=1");

  cookies().set(SESSION_COOKIE, await signToken(level), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/");
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect("/login");
}
