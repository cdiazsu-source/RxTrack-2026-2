import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { isBlocked, landingPath } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";

export const dynamic = "force-dynamic";

// Sin marca a propósito: ni nombre del proyecto ni su ícono (favicon gris neutro).
export const metadata: Metadata = {
  title: "402: User limit exceeded",
  description: "402 Payment Required",
  manifest: null,
  appleWebApp: { capable: false, title: "Error" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='6' fill='%239ca3af'/%3E%3C/svg%3E",
    apple: [],
  },
};

const SYSTEM_SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const SYSTEM_MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

/** Única pantalla que ve una cuenta bloqueada (`blocked` en lib/auth.ts), con aspecto de página de error
 *  de plataforma (402). El layout raíz no pinta menú ni consulta datos para ella, y el middleware la
 *  trae aquí desde cualquier otra ruta, con estado HTTP 402. */
export default async function PaymentRequiredPage() {
  const session = await getSession();
  if (!session.authed) redirect("/login");
  // Quien no está bloqueada no tiene nada que hacer aquí.
  if (!isBlocked(session.name)) redirect(landingPath({ name: session.name, level: session.level, scope: session.scope }));

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-neutral-900"
      style={{ fontFamily: SYSTEM_SANS }}
    >
      <div className="w-full max-w-lg">
        <p className="text-sm font-medium tracking-wide text-neutral-500" style={{ fontFamily: SYSTEM_MONO }}>
          402 · Payment Required
        </p>
        {/* fontFamily en línea: globals.css pone a todo h1 la tipografía serif del proyecto. */}
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: SYSTEM_SANS }}>
          User limit exceeded
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600">
          This project has exceeded the number of logins allowed on its current plan. Upgrade to a higher plan to
          continue using this service.
        </p>

        <p className="mt-8 border-t border-neutral-200 pt-4 text-xs text-neutral-400" style={{ fontFamily: SYSTEM_MONO }}>
          USER_QUOTA_EXCEEDED · Ref a41f-7c92-e03b
        </p>
      </div>

      <form action={logout} className="absolute bottom-6">
        <button type="submit" className="text-xs text-neutral-400 underline-offset-2 hover:text-neutral-600 hover:underline">
          Change account
        </button>
      </form>
    </main>
  );
}
