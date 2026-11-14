/**
 * Redux
 */
import { useSelector } from "react-redux";

/**
 * Datos del usuario con sesión (`auth.user` tal cual llega del backend).
 * Selectores de primitivos: el objeto lo memoiza el React Compiler.
 */
export function useSessionUser() {
  const id = useSelector((state) => state.auth.user?.id ?? null);
  const name = useSelector((state) => state.auth.user?.name ?? "");
  const username = useSelector((state) => state.auth.user?.username ?? "");
  const email = useSelector((state) => state.auth.user?.email ?? "");
  return { id, name, username, email };
}
