import { revalidatePath } from "next/cache";

/**
 * Todas las páginas son dinámicas y el volumen de datos es diminuto, así que
 * tras cada mutación revalidamos toda la app. Evita una clase entera de bugs de
 * "la UI quedó vieja después de editar".
 */
export function revalidateAll(): void {
  revalidatePath("/", "layout");
}
