import { notFound } from "next/navigation";

import { getSubjectBySlug } from "@/lib/subjects";
import { getSession } from "@/lib/session";
import { SubjectSubnav } from "@/components/subject-subnav";
import { SubjectFolderButton } from "@/components/subject-folder-button";

export const dynamic = "force-dynamic";

export default async function SubjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { subject: string };
}) {
  const [subject, session] = await Promise.all([getSubjectBySlug(params.subject), getSession()]);
  if (!subject) notFound();

  // Sesión con acceso acotado (JOSE): solo su asignatura, y solo su pestaña.
  const scope = session.authed ? session.scope : null;
  if (scope && scope.subject !== params.subject) notFound();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{subject.code}</p>
          <h1 className="text-2xl font-bold leading-tight">{subject.name}</h1>
        </div>
        {!scope && <SubjectFolderButton subjectId={subject.id} url={subject.driveUrl} />}
      </div>
      <SubjectSubnav
        slug={subject.id}
        sections={subject.sections}
        lockedSection={scope?.section ?? null}
      />
      {children}
    </div>
  );
}
