/**
 * Autenticación mínima: una cuenta por persona, sin base de datos.
 * Protege TODO el sitio (middleware.ts): sin cookie válida → /login.
 *
 *  - Cesar (SITE_PASSWORD):        edita todo.
 *  - Diana (SITE_PASSWORD_READ):   ve todo, no edita.
 *  - JOSE  (SITE_PASSWORD_JOSE):   solo /aif/laboratorio, con control total ahí.
 *  - Karen (SITE_PASSWORD_KAREN):  solo /aif (toda la asignatura), con control total.
 *  - Profe (SITE_PASSWORD_PROFE):  /af (Administración Farmacéutica) + la portada en vista
 *                                  reducida (las demás asignaturas, deshabilitadas); solo lectura.
 *  - (cuenta acotada a una asignatura): ve solo /{subject}, no edita.
 *
 * El nombre, el nivel y el alcance viajan firmados (HMAC-SHA256) en la cookie.
 *
 * Este módulo NO importa `next/headers` para poder usarse también en el
 * middleware (Edge). El acceso a cookies vive en src/lib/session.ts.
 */
export const SESSION_COOKIE = "rxtrack_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export type AccessLevel = "full" | "read";

/** Acceso acotado a UNA asignatura, opcionalmente a UNA sola sección de ella
 *  (p. ej. AIF → Laboratorio). `subject` y `section` son los segmentos de la
 *  URL: `/{subject}/{section}`. Sin `section`, ve toda la asignatura. */
export type SubjectScope = { subject: string; section?: string };

/** Persona que inició sesión. Con `scope`, la cuenta solo ve esas asignaturas
 *  (una o varias — p. ej. Paula ve ft2 y fg); sin `scope`, ve todo el sitio. */
export type Profile = { name: string; level: AccessLevel; scope?: SubjectScope[] | null };

/**
 * Cuentas. La lista vive aquí, no en la base. Para añadir a alguien: otra fila.
 * Las contraseñas se pueden sobreescribir con variables de entorno en Vercel.
 */
type Account = {
  username: string;
  password: string;
  profile: Profile;
  /** Saludos propios de la cuenta; con varios, se alternan "escribiéndose". Sin ellos, "Hola, <nombre>." */
  greetings?: string[];
  /** true = se registra cuándo entra (AccountActivity) y Cesar lo ve en la portada. */
  trackAccess?: boolean;
  /** true = además de su alcance, ve la portada en vista reducida (sin datos de otras asignaturas). */
  homeView?: boolean;
  /** false = no aparece entre las personas que se pueden @mencionar en la bitácora. */
  mentionable?: boolean;
};

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
  {
    // Sin fallback en código: la contraseña vive solo en .env (local, sin
    // trackear) y en la variable de entorno del mismo nombre en Vercel.
    // Mismo nivel de acceso que Diana ("read" + colaboración), acotado a
    // Farmacotecnia 2 y Farmacología General.
    username: "paula",
    password: process.env.SITE_PASSWORD_PAULA || "",
    profile: { name: "Paula", level: "read", scope: [{ subject: "ft2" }, { subject: "fg" }] },
  },
  {
    // Jefe de laboratorio de AIF: control total, PERO solo de /aif/laboratorio.
    // El middleware reenvía cualquier otra ruta a esa sección.
    username: "jose",
    password: process.env.SITE_PASSWORD_JOSE || "AIF",
    profile: { name: "JOSE", level: "full", scope: [{ subject: "aif", section: "laboratorio" }] },
  },
  {
    // Compañera de Cesar en el Módulo II de AIF (subgrupo J5): control total,
    // acotado a TODA la asignatura AIF (sin `section`), no al resto del sitio.
    username: "karen",
    password: process.env.SITE_PASSWORD_KAREN || "TQM",
    profile: { name: "Karen", level: "full", scope: [{ subject: "aif" }] },
  },
  {
    // Profesor de Administración Farmacéutica: solo lectura y solo /af. Clave
    // simple a propósito (el repo es público): da acceso de lectura a un curso.
    // Se puede reemplazar con SITE_PASSWORD_PROFE en Vercel.
    username: "profe",
    password: process.env.SITE_PASSWORD_PROFE || "123",
    profile: { name: "Profe", level: "read", scope: [{ subject: "af" }] },
    greetings: ["Hola, profe Zoraya!", "Hola, profe Jesús Becerra!"],
    homeView: true,
    trackAccess: true,
    mentionable: false,
  },
];

/** Nombres de las personas con cuenta — para @menciones en la bitácora. */
export const PEOPLE = ACCOUNTS.filter((a) => a.mentionable !== false).map((a) => a.profile.name);

/** Saludos de una persona (uno o varios). */
export function greetingsFor(name: string): string[] {
  return ACCOUNTS.find((a) => a.profile.name === name)?.greetings ?? [`Hola, ${name}.`];
}

/** ¿La cuenta tiene saludos propios? (las que no, no muestran saludo en su asignatura) */
export function hasCustomGreeting(name: string): boolean {
  return !!ACCOUNTS.find((a) => a.profile.name === name)?.greetings;
}

/** Cuentas con seguimiento de accesos (sin contraseñas). */
export const ACCOUNT_DIRECTORY = ACCOUNTS.map((a) => ({
  username: a.username,
  name: a.profile.name,
  detail: describeProfile(a.profile),
  trackAccess: !!a.trackAccess,
}));

/** Usuario de la cuenta con seguimiento que tiene ese nombre, o null. */
export function trackedUsername(name: string): string | null {
  const a = ACCOUNTS.find((x) => x.profile.name === name);
  return a?.trackAccess ? a.username : null;
}

/** ¿La cuenta acotada también puede ver la portada (en vista reducida)? */
export function canViewHome(name: string): boolean {
  return !!ACCOUNTS.find((a) => a.profile.name === name)?.homeView;
}

/** Cookie de "Ver como": guarda el usuario del perfil que Cesar está viendo. */
export const VIEW_AS_COOKIE = "rxtrack_view_as";

/** Perfil que se puede "ver como". Sin contraseñas: es seguro enviarlo al cliente. */
export type ViewProfile = {
  key: string;
  name: string;
  level: AccessLevel;
  scope: SubjectScope[] | null;
  /** Una línea con lo que esa persona puede hacer, p. ej. "Solo lectura · FT2, FG". */
  detail: string;
};

function describeProfile(p: Profile): string {
  const what = p.level === "read" ? "Solo lectura" : "Edita";
  const where = p.scope?.length
    ? p.scope
        .map((s) => (s.section ? `${s.subject.toUpperCase()} · ${s.section[0].toUpperCase()}${s.section.slice(1)}` : s.subject.toUpperCase()))
        .join(", ")
    : "todo el sitio";
  return `${what} · ${where}`;
}

/** Perfiles que Cesar puede ver: todas las cuentas salvo las de acceso total sin alcance (la suya). */
export function listViewProfiles(): ViewProfile[] {
  return ACCOUNTS.filter((a) => a.profile.level === "read" || a.profile.scope)
    .map((a) => ({
      key: a.username,
      name: a.profile.name,
      level: a.profile.level,
      scope: a.profile.scope ?? null,
      detail: describeProfile(a.profile),
    }));
}

/** Perfil de "Ver como" por su clave. Acepta el valor antiguo "read" (= Diana). */
export function viewProfileByKey(key: string | undefined | null): ViewProfile | null {
  if (!key) return null;
  const k = key === "read" ? "diana" : key;
  return listViewProfiles().find((p) => p.key === k) ?? null;
}

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
  if (!acc || !acc.password || password !== acc.password) return null;
  return acc.profile;
}

/** A dónde llevar a la persona tras iniciar sesión: la primera asignatura (y
 *  sección, si aplica) de su alcance; la portada si no tiene alcance. */
export function landingPath(profile: Profile): string {
  if (canViewHome(profile.name)) return "/";
  const first = profile.scope?.[0];
  if (!first) return "/";
  return first.section ? `/${first.subject}/${first.section}` : `/${first.subject}`;
}

/** Token firmado para la cookie de sesión, con el nombre y el nivel de acceso. */
export async function signToken(profile: Profile): Promise<string> {
  const payload = b64url(
    enc.encode(
      JSON.stringify({
        v: 2,
        t: Date.now(),
        a: profile.level,
        n: profile.name,
        s: profile.scope ?? undefined,
      }),
    ).buffer,
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
    // `s` puede venir como arreglo (formato actual) o como un solo objeto
    // (cookies emitidas antes de soportar varias asignaturas por cuenta) —
    // se normaliza a arreglo para no invalidar sesiones ya activas.
    const raw = json.s;
    const entries: unknown[] = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const scope: SubjectScope[] | null =
      entries.length > 0
        ? entries
            .filter((e): e is { subject: string; section?: unknown } => !!e && typeof (e as { subject?: unknown }).subject === "string")
            .map((e) => ({ subject: e.subject, section: typeof e.section === "string" ? e.section : undefined }))
        : null;
    return { name, level, scope: scope && scope.length > 0 ? scope : null };
  } catch {
    return null;
  }
}
