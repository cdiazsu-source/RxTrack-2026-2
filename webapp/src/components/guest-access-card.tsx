import { UserCheck } from "lucide-react";

import type { GuestActivity } from "@/lib/activity";
import { relativeAgo } from "@/lib/relative-time";
import { formatDateTime } from "@/lib/utils";

/** Cuándo entraron por última vez las cuentas invitadas (p. ej. el profe). Solo la ve Cesar. */
export function GuestAccessCard({ guests }: { guests: GuestActivity[] }) {
  if (guests.length === 0) return null;
  return (
    <section aria-label="Accesos de invitados" className="rounded-lg border border-border bg-card px-4 py-3">
      <ul className="flex flex-col gap-2">
        {guests.map((g) => {
          const last = g.lastSeenAt && g.lastLoginAt && g.lastSeenAt > g.lastLoginAt ? g.lastSeenAt : g.lastLoginAt;
          return (
            <li key={g.username} className="flex flex-wrap items-start gap-x-3 gap-y-0.5 text-sm">
              <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0 flex-1">
                <p>
                  <span className="font-semibold">{g.name}</span>
                  <span className="text-muted-foreground"> · {g.detail}</span>
                </p>
                {g.lastLoginAt ? (
                  <p className="text-xs text-muted-foreground">
                    Último ingreso: <span className="text-foreground">{formatDateTime(g.lastLoginAt)}</span> ({relativeAgo(g.lastLoginAt)})
                    {last && last !== g.lastLoginAt && (
                      <>
                        {" "}
                        · Última visita: <span className="text-foreground">{formatDateTime(last)}</span> ({relativeAgo(last)})
                      </>
                    )}
                    {" "}· {g.loginCount} ingreso{g.loginCount === 1 ? "" : "s"}
                  </p>
                ) : g.lastSeenAt ? (
                  <p className="text-xs text-muted-foreground">
                    Última visita: <span className="text-foreground">{formatDateTime(g.lastSeenAt)}</span> ({relativeAgo(g.lastSeenAt)})
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">Aún no ha entrado.</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
