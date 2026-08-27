import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { PROJECT_STATUS_LABEL } from "@/lib/utils";

export type ProjectCardView = {
  id: string;
  title: string;
  category: string | null;
  status: "POR_INICIAR" | "EN_CURSO" | "COMPLETADO";
  isManual: boolean;
  done: number;
  total: number;
};

const STATUS_VARIANT: Record<ProjectCardView["status"], "outline" | "warning" | "success"> = {
  POR_INICIAR: "outline",
  EN_CURSO: "warning",
  COMPLETADO: "success",
};

export function ProjectCard({ project, subjectSlug }: { project: ProjectCardView; subjectSlug: string }) {
  return (
    <Link href={`/${subjectSlug}/proyectos/${project.id}`} className="block">
      <Card className="h-full p-4 transition-shadow hover:shadow-card-hover">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {project.category && <Badge variant="outline">{project.category}</Badge>}
          <Badge variant={STATUS_VARIANT[project.status]}>{PROJECT_STATUS_LABEL[project.status]}</Badge>
          {project.isManual && <Badge variant="secondary">Propio</Badge>}
        </div>
        <h3 className="text-sm font-semibold leading-snug">{project.title}</h3>
        <div className="mt-3">
          <ProgressBar
            value={project.total ? (project.done / project.total) * 100 : 0}
            label={project.total ? `${project.done}/${project.total}` : "sin subtareas"}
            inline
          />
        </div>
      </Card>
    </Link>
  );
}
