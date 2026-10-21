import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SiteNav, MainFrame } from "@/components/site-nav";
import { PwaRegister } from "@/components/pwa-register";
import { Toaster } from "@/components/ui/toast";
import { AccessProvider } from "@/components/access-context";
import { canEdit, canContribute, getSession, realLevel } from "@/lib/session";
import { listSubjects } from "@/lib/subjects";
import { prisma } from "@/lib/prisma";
import { canViewHome, listViewProfiles, trackedUsername } from "@/lib/auth";
import { recordSeen } from "@/lib/activity";

import "./globals.css";

// Tipografía de la Facultad de Ciencias (UNAL): Ancizar Sans (cuerpo) y Ancizar Serif (títulos).
// Variables de 400 a 700, servidas desde el propio proyecto (sirven también sin conexión en la PWA).
const ancizarSans = localFont({
  src: "./fonts/AncizarSans-latin.woff2",
  weight: "400 700",
  variable: "--font-ancizar-sans",
  display: "swap",
});
const ancizarSerif = localFont({
  src: "./fonts/AncizarSerif-latin.woff2",
  weight: "400 700",
  variable: "--font-ancizar-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RxTrack 2026-2s",
  description: "Seguimiento de las 7 asignaturas del semestre — Química Farmacéutica UNAL",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "RxTrack", statusBarStyle: "default" },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#A8009C",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [editable, contributor, session, realLvl, subjects, inboxCount] = await Promise.all([
    canEdit(),
    canContribute(),
    getSession(),
    realLevel(),
    listSubjects(),
    prisma.inboxItem.count({ where: { triagedAt: null } }).catch(() => 0),
  ]);
  const navSubjects = subjects.map((s) => ({ id: s.id, code: s.code, name: s.name }));
  const viewingAs = session.authed && session.viewingAs;
  const realFull = realLvl === "full";
  // Sesión con acceso acotado (JOSE, Karen, Paula), real o vista con "Ver como": barra mínima.
  const scope = session.authed ? session.scope : null;
  // Cuentas invitadas con seguimiento: se anota la visita (no cuenta cuando Cesar las ve con "Ver como").
  const tracked = session.authed && !session.viewingAs ? trackedUsername(session.name) : null;
  if (tracked) await recordSeen(tracked);

  return (
    <html lang="es" className={`${ancizarSans.variable} ${ancizarSerif.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AccessProvider canEdit={editable} canContribute={contributor}>
          <SiteNav
            canEdit={editable}
            subjects={navSubjects}
            inboxCount={inboxCount}
            realFull={realFull}
            viewingAs={viewingAs}
            viewingName={viewingAs && session.authed ? session.name : ""}
            viewProfiles={realFull ? listViewProfiles() : []}
            scope={scope}
            homeView={session.authed && !!session.scope && canViewHome(session.name)}
          />
          <MainFrame sidebar={!scope}>{children}</MainFrame>
          <Toaster />
          <PwaRegister />
        </AccessProvider>
      </body>
    </html>
  );
}
