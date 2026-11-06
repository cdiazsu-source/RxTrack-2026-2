import { NextResponse, type NextRequest } from "next/server";

import {
  BLOCKED_PATH,
  SESSION_COOKIE,
  VIEW_AS_COOKIE,
  canViewHome,
  hiddenSectionsFor,
  isBlocked,
  landingPath,
  verifyToken,
  viewProfileByKey,
} from "@/lib/auth";

/** Archivos estáticos servidos desde /public que no pasan por el control de acceso. */
const PUBLIC_FILE = /\.(?:svg|png|ico|webmanifest|js|json|txt|woff2?|map)$/;

/**
 * Todo el sitio requiere sesión. Sin cookie válida → /login.
 *
 * Una sesión con `scope` (p. ej. JOSE → aif/laboratorio; Paula → ft2 y fg)
 * solo puede ver esas asignaturas/secciones: cualquier otra ruta la reenvía
 * a la primera de su alcance.
 */
export async function middleware(req: NextRequest) {
  const profile = await verifyToken(req.cookies.get(SESSION_COOKIE)?.value);

  if (!profile) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Cuenta bloqueada («plan superior»): solo puede ver BLOCKED_PATH. Se comprueba por nombre en cada
  // petición (no en el token), así que también corta sesiones ya abiertas, páginas y server actions.
  if (isBlocked(profile.name)) {
    const { pathname } = req.nextUrl;
    if (PUBLIC_FILE.test(pathname)) return NextResponse.next();
    if (pathname === BLOCKED_PATH) {
      // Carga completa del documento: estado HTTP 402 real. Las peticiones RSC (navegación suave tras el
      // login) quedan en 200 para que Next no las trate como un fallo de red.
      const isRsc = req.headers.get("rsc") === "1" || req.nextUrl.searchParams.has("_rsc");
      return isRsc ? NextResponse.next() : NextResponse.rewrite(req.nextUrl, { status: 402 });
    }
    const url = req.nextUrl.clone();
    url.pathname = BLOCKED_PATH;
    url.search = "";
    return NextResponse.redirect(url);
  }

  // "Ver como" (solo Cesar): si el perfil elegido tiene alcance acotado, se aplica el suyo.
  const viewing =
    profile.level === "full" && !profile.scope ? viewProfileByKey(req.cookies.get(VIEW_AS_COOKIE)?.value) : null;
  const scope = viewing ? viewing.scope : profile.scope;

  if (scope && scope.length > 0) {
    const { pathname } = req.nextUrl;
    const who = viewing?.name ?? profile.name;
    const homes = scope.map((s) => (s.section ? `/${s.subject}/${s.section}` : `/${s.subject}`));
    const allowed =
      PUBLIC_FILE.test(pathname) ||
      (pathname === "/" && canViewHome(who)) ||
      homes.some((home) => pathname === home || pathname.startsWith(`${home}/`));
    if (!allowed) {
      const url = req.nextUrl.clone();
      url.pathname = landingPath({ name: who, level: profile.level, scope });
      url.search = "";
      return NextResponse.redirect(url);
    }
    // Secciones ocultas para esta cuenta (p. ej. Insumos): vuelve al panel de la asignatura.
    const [subjectSeg, sectionSeg] = pathname.split("/").filter(Boolean);
    if (sectionSeg && hiddenSectionsFor(who).includes(sectionSeg)) {
      const url = req.nextUrl.clone();
      url.pathname = `/${subjectSeg}`;
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
