import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { login } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  if ((await getSession()).authed) redirect("/");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 py-12">
      <Card>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">RxTrack 2026-2s</p>
          <CardTitle className="text-lg">Ingreso</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={login} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1 text-sm">
              Usuario
              <Input name="username" autoComplete="username" required autoFocus />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Contraseña
              <Input name="password" type="password" autoComplete="current-password" required />
            </label>
            {searchParams.error && <p className="text-sm text-destructive">Usuario o contraseña incorrectos.</p>}
            <Button type="submit" className="mt-1">
              Entrar
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Acceso compartido del grupo. Dos perfiles: uno que edita y uno de solo lectura.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
