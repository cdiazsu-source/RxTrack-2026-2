import { NextResponse, type NextRequest } from "next/server";

import {
  SESSION_COOKIE,
  VIEW_AS_COOKIE,
  canViewHome,
  hiddenSectionsFor,
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
