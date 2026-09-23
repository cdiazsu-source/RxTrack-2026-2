import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, landingPath, verifyToken } from "@/lib/auth";

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

  if (profile.scope && profile.scope.length > 0) {
    const { pathname } = req.nextUrl;
    const homes = profile.scope.map((s) => (s.section ? `/${s.subject}/${s.section}` : `/${s.subject}`));
    const allowed =
      PUBLIC_FILE.test(pathname) || homes.some((home) => pathname === home || pathname.startsWith(`${home}/`));
    if (!allowed) {
      const url = req.nextUrl.clone();
      url.pathname = landingPath(profile);
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
