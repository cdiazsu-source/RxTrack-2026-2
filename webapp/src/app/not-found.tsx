import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">RxTrack 2026-2s</p>
      <h1 className="text-2xl font-bold">No encontramos eso</h1>
      <p className="text-sm text-muted-foreground">La asignatura, el módulo o el proyecto no existe (o cambió de dirección).</p>
      <Link href="/" className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        Volver al panel del semestre
      </Link>
    </div>
  );
}
