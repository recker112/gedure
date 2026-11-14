/**
 * React
 */
import { useState } from "react";

/**
 * Components
 */
import { MockRoleContext } from "./MockRoleContext";
import { DEFAULT_ROLE, ROLE_STORAGE_KEY, isRole } from "./roles";
import { readSession, writeSession } from "../../components/utils/storage";

/**
 * MAQUETA. Vista de rol (Admin / Profesor / Representante) en estado local,
 * recordada solo en la pestaña (sessionStorage). Cuando haya permisos reales
 * este provider desaparece y el menú se filtra con los del usuario.
 */
export default function MockRoleProvider({ children }) {
  const [role, setRoleState] = useState(() => {
    const stored = readSession(ROLE_STORAGE_KEY, DEFAULT_ROLE);
    return isRole(stored) ? stored : DEFAULT_ROLE;
  });

  const setRole = (next) => {
    if (!isRole(next)) return;
    writeSession(ROLE_STORAGE_KEY, next);
    setRoleState(next);
  };

  return <MockRoleContext value={{ role, setRole }}>{children}</MockRoleContext>;
}
