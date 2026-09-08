"use client";

import { createContext, useContext } from "react";

/**
 * - `canEdit`: perfil "full" (Cesar). Edita todo.
 * - `canContribute`: cualquier sesión válida (incluye "read" / Diana). Solo abre
 *   las áreas colaborativas: enlaces de Drive, checklists, sesiones/transcripciones.
 */
type Access = { canEdit: boolean; canContribute: boolean };

const AccessCtx = createContext<Access>({ canEdit: false, canContribute: false });

export function AccessProvider({
  canEdit,
  canContribute,
  children,
}: Access & { children: React.ReactNode }) {
  return <AccessCtx.Provider value={{ canEdit, canContribute }}>{children}</AccessCtx.Provider>;
}

export function useCanEdit() {
  return useContext(AccessCtx).canEdit;
}

export function useCanContribute() {
  return useContext(AccessCtx).canContribute;
}
