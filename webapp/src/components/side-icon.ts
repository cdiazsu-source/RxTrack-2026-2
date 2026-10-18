/** Botón cuadrado con ícono para la fila de acciones del menú lateral (nombre en un tooltip). */
export const SIDE_ICON_BTN =
  "press group relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(min-height:761px)]:h-11 [@media(min-height:761px)]:w-11";

/** Tooltip que aparece arriba del botón al pasar el cursor o enfocarlo con el teclado. */
export const SIDE_ICON_TIP =
  "pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100";
