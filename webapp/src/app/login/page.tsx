import { redirect } from "next/navigation";
import { Lock, Pill, User } from "lucide-react";

import { getSession } from "@/lib/session";
import { landingPath } from "@/lib/auth";
import { BRAND_CREDIT, BRAND_SUBTITLE } from "@/lib/brand";
import { login } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

/** Trama de hexágonos (anillos de benceno) muy tenue, para el panel institucional. */
const HEX_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='27.713' height='48' viewBox='0 0 27.713 48'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='.08' stroke-width='1'%3E%3Cpath d='M0 8 13.856 0 27.713 8M0 8V24M27.713 8V24M0 24 13.856 32 27.713 24M13.856 32V48'/%3E%3C/g%3E%3C/svg%3E\")";

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const session = await getSession();
  if (session.authed) redirect(landingPath({ name: session.name, level: session.level, scope: session.scope }));

  return (
    <div className="fixed inset-0 z-50 grid overflow-y-auto bg-background lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* Panel institucional */}
      <aside
        className="relative flex flex-col justify-between gap-6 bg-secondary-foreground px-6 py-6 lg:gap-10 text-white sm:px-10 lg:px-14 lg:py-12"
        style={{ backgroundImage: HEX_PATTERN }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Pill className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">RxTrack</span>
        </div>

        <div className="flex max-w-xl flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Facultad de Ciencias · Farmacia</p>
          <h1 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Universidad Nacional de Colombia
          </h1>
          <span className="h-1 w-16 rounded-full bg-[#94B43B]" aria-hidden />
          <p className="hidden max-w-md text-base leading-relaxed text-white/80 lg:block">
            Seguimiento académico del semestre 2026-2 del pregrado en Química Farmacéutica: asignaturas, proyectos,
            fechas y apuntes en un solo lugar.
          </p>
        </div>

        <div className="flex flex-col gap-0.5 text-sm text-white/70">
          <span className="font-medium text-white/90">{BRAND_SUBTITLE}</span>
          <span>{BRAND_CREDIT}</span>
        </div>
      </aside>

      {/* Formulario */}
      <main className="flex items-center justify-center px-6 py-10 sm:px-10 lg:py-12">
        <div className="w-full max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">RxTrack 2026-2s</p>
          <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight text-secondary-foreground">Ingreso</h2>
          <p className="mt-2 text-sm text-muted-foreground">Ingresa con tu usuario y contraseña para continuar.</p>

          <form action={login} className="mt-7 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Usuario
              <span className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input
                  name="username"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  className="h-11 pl-9"
                />
              </span>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Contraseña
              <span className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input name="password" type="password" autoComplete="current-password" required className="h-11 pl-9" />
              </span>
            </label>
            {searchParams.error && (
              <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                Usuario o contraseña incorrectos.
              </p>
            )}
            <Button type="submit" className="mt-1 h-11 text-base">
              Entrar
            </Button>
          </form>

          <p className="mt-8 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            Acceso restringido a los integrantes y docentes autorizados del curso.
          </p>
        </div>
      </main>
    </div>
  );
}
