import type { Metadata } from "next";

import { SiteNav } from "@/components/site-nav";
import { AccessProvider } from "@/components/access-context";
import { canEdit } from "@/lib/session";
import { listSubjects } from "@/lib/subjects";

import "./globals.css";

export const metadata: Metadata = {
  title: "RxTrack 2026-2s",
  description: "Seguimiento de las 7 asignaturas del semestre — Química Farmacéutica UNAL",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [editable, subjects] = await Promise.all([canEdit(), listSubjects()]);
  const navSubjects = subjects.map((s) => ({ id: s.id, code: s.code, name: s.name }));

  return (
    <html lang="es">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AccessProvider canEdit={editable}>
          <SiteNav canEdit={editable} subjects={navSubjects} />
          <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
        </AccessProvider>
      </body>
    </html>
  );
}
