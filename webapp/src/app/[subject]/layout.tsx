import { notFound } from "next/navigation";

import { getSubjectBySlug } from "@/lib/subjects";
import { SubjectSubnav } from "@/components/subject-subnav";

export const dynamic = "force-dynamic";

export default async function SubjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { subject: string };
}) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{subject.code}</p>
        <h1 className="text-2xl font-bold leading-tight">{subject.name}</h1>
      </div>
      <SubjectSubnav slug={subject.id} />
      {children}
    </div>
  );
}
