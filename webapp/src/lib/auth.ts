/**
 * Autenticación mínima: una cuenta por persona, sin base de datos.
 * Protege TODO el sitio (middleware.ts): sin cookie válida → /login.
 *
 *  - Cesar (SITE_PASSWORD):      edita todo.
 *  - Diana (SITE_PASSWORD_READ): ve todo, no edita.
 *
 * El nombre y el nivel viajan firmados (HMAC-SHA256) en la cookie.
 *
 * Este módulo NO importa `next/headers` para poder usarse también en el
 * middleware (Edge). El acceso a cookies vive en src/lib/session.ts.
 */
export const SESSION_COOKIE = "rxtrack_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export type AccessLevel = "full" | "read";

/** Persona que inició sesión. */
export type Profile = { name: string; level: AccessLevel };

/**
 * Cuentas. La lista vive aquí, no en la base. Para añadir a alguien: otra fila.
 * Las contraseñas se pueden sobreescribir con variables de entorno en Vercel.
 */
type Account = { username: string; password: string; profile: Profile };

const ACCOUNTS: Account[] = [
  {
    username: "cesar",
    password: process.env.SITE_PASSWORD || "cesar2026",
    profile: { name: "Cesar", level: "full" },
  },
  {
    username: "diana",
    password: process.env.SITE_PASSWORD_READ || "diana2026",
    profile: { name: "Diana", level: "read" },
  },
];

const SECRET = process.env.AUTH_SECRET || "rxtrack-dev-secret-cambiar-en-vercel";

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer): string {
  let s = "";
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return b64url(sig);
}

/** Devuelve el perfil (nombre + nivel) si usuario+contraseña son válidos, o null. */
export function checkCredentials(username: string, password: string): Profile | null {
  const u = username.trim().toLowerCase();
  const acc = ACCOUNTS.find((a) => a.username === u);
  if (!acc || password !== acc.password) return null;
  return acc.profile;
}

/** Token firmado para la cookie de sesión, con el nombre y el nivel de acceso. */
export async function signToken(profile: Profile): Promise<string> {
  const payload = b64url(
    enc.encode(JSON.stringify({ v: 2, t: Date.now(), a: profile.level, n: profile.name })).buffer,
  );
  return `${payload}.${await hmac(payload)}`;
}

/** Perfil del token si es válido (firma + antigüedad), o null.
 *  Sirve en Edge (middleware) y en Node. */
export async function verifyToken(token: string | undefined | null): Promise<Profile | null> {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  if (sig !== (await hmac(payload))) return null;
  try {
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    if (typeof json.t !== "number") return null;
    if (Date.now() - json.t >= SESSION_MAX_AGE * 1000) return null;
    const level: AccessLevel = json.a === "read" ? "read" : "full";
    const name =
      typeof json.n === "string" && json.n.trim() ? json.n : level === "read" ? "Diana" : "Cesar";
    return { name, level };
  } catch {
    return null;
  }
}
