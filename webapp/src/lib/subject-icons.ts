import {
  BookOpen,
  BriefcaseMedical,
  ChartSpline,
  FlaskConical,
  HeartPulse,
  Pill,
  Syringe,
  type LucideIcon,
} from "lucide-react";

/**
 * Ícono alusivo de cada asignatura (por su `id`/slug), solo para el menú lateral.
 * Todos son de Lucide, el mismo set y trazo del resto de la app. Una asignatura nueva
 * sin entrada aquí usa el libro abierto.
 */
const SUBJECT_ICONS: Record<string, LucideIcon> = {
  aif: FlaskConical, // Análisis instrumental farmacéutico: química analítica
  ft2: Pill, // Farmacotecnia 2: formas farmacéuticas
  fg: Syringe, // Farmacología general: acción y administración de fármacos
  af: BriefcaseMedical, // Administración farmacéutica: gestión del servicio
  spf: HeartPulse, // Salud pública y farmacia: salud de la población
  bfc: ChartSpline, // Biofarmacia y farmacocinética: curva concentración-tiempo
};

export function subjectIcon(subjectId: string): LucideIcon {
  return SUBJECT_ICONS[subjectId] ?? BookOpen;
}
