import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, verifyToken } from "@/lib/auth";

/** Todo el sitio requiere sesión. Sin cookie válida → /login. */
export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (await verifyToken(token)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
