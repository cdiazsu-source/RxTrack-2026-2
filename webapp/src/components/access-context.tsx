"use client";

import { createContext, useContext } from "react";

/** true = perfil "full" (edita todo). false = perfil "read" (solo lectura). */
const CanEditContext = createContext(false);

export function AccessProvider({ canEdit, children }: { canEdit: boolean; children: React.ReactNode }) {
  return <CanEditContext.Provider value={canEdit}>{children}</CanEditContext.Provider>;
}

export function useCanEdit() {
  return useContext(CanEditContext);
}
