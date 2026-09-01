import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import { SiteNav } from "@/components/site-nav";
import { PwaRegister } from "@/components/pwa-register";
import { Toaster } from "@/components/ui/toast";
import { AccessProvider } from "@/components/access-context";
import { canEdit } from "@/lib/session";
import { listSubjects } from "@/lib/subjects";
import { prisma } from "@/lib/prisma";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "RxTrack 2026-2s",
  description: "Seguimiento de las 7 asignaturas del semestre — Química Farmacéutica UNAL",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "RxTrack", statusBarStyle: "default" },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#4A7729",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [editable, subjects, inboxCount] = await Promise.all([
    canEdit(),
    listSubjects(),
    prisma.inboxItem.count({ where: { triagedAt: null } }).catch(() => 0),
  ]);
  const navSubjects = subjects.map((s) => ({ id: s.id, code: s.code, name: s.name }));

  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AccessProvider canEdit={editable}>
          <SiteNav canEdit={editable} subjects={navSubjects} inboxCount={inboxCount} />
          <main className="page-enter mx-auto max-w-6xl px-5 py-8">{children}</main>
          <Toaster />
          <PwaRegister />
        </AccessProvider>
      </body>
    </html>
  );
}
