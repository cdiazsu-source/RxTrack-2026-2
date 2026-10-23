"use client";

import { addCourseLink, deleteCourseLink, updateCourseLink } from "@/lib/actions/courses";
import { NamedLinks, type SessionLinkView } from "@/components/session-links";

/** Enlaces del curso (plataforma, carpeta de Drive, OneNote, repositorio de archivos…). */
export function CourseLinks({ courseId, links }: { courseId: string; links: SessionLinkView[] }) {
  return (
    <div className="flex flex-col gap-2">
      {links.length === 0 && (
        <p className="text-sm text-muted-foreground">Anexa la plataforma del curso, tu OneNote, la carpeta de archivos, los videos o lo que necesites tener a un clic.</p>
      )}
      <NamedLinks
        links={links}
        canEdit
        onAdd={addCourseLink.bind(null, courseId, null)}
        onUpdate={updateCourseLink}
        onDelete={deleteCourseLink}
        addLabel="Agregar enlace al curso"
      />
    </div>
  );
}
