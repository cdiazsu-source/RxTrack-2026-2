import { developerModeOn } from "@/lib/session";
import { DevPromptPanel } from "@/components/dev-prompt-panel";

/** «Cursos» no cuelga de una asignatura: aquí se aloja el panel del modo desarrollador (solo Cesar). */
export default async function CursosLayout({ children }: { children: React.ReactNode }) {
  const devOn = await developerModeOn();
  return (
    <div className="flex flex-col gap-5">
      {devOn && <DevPromptPanel slug={null} />}
      {children}
    </div>
  );
}
