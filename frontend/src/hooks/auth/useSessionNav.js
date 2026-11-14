/**
 * Redux
 */
import { useSelector } from "react-redux";
import { needs2FA } from "../../store/reducers/auth/authReducer";

/**
 * Iniciales para el avatar: primera letra de las dos primeras palabras.
 * Sin nombre devuelve "" (el avatar muestra un icono genérico).
 */
export function initialsOf(name) {
  return (name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Estado de sesión para la web pública (barra, menú móvil, CTA), sin esperar
 * a la red: parte del store.
 *
 * - `guest`: sin `apiKey` -> "Iniciar sesión" (/auth).
 * - `verifying`: token temporal (2FA a medias, ya confirmado por el relogin)
 *   -> "Continuar verificación" (/auth/2fa).
 * - `member`: `apiKey` guardada (aún sin confirmar o confirmada) -> "Ir a
 *   Gedure" (/gedure), con el nombre en cuanto llega el relogin. Si el token
 *   estaba caducado, el relogin silencioso limpia la sesión y vuelve a `guest`.
 */
export function useSessionNav() {
  const apiKey = useSelector((state) => state.auth.apiKey);
  const auth = useSelector((state) => state.auth.auth);
  const temporary = useSelector((state) => needs2FA(state.auth.token_can));
  const name = useSelector((state) => state.auth.user?.name ?? "");

  if (!apiKey && !auth) return { status: "guest", to: "/auth", name: "", initials: "" };
  if (auth && temporary) return { status: "verifying", to: "/auth/2fa", name, initials: initialsOf(name) };
  return { status: "member", to: "/gedure", name, initials: initialsOf(name) };
}

/** Texto del botón de la barra/menú según el estado. */
export const sessionLabel = (status) =>
  status === "member" ? "Ir a Gedure" : status === "verifying" ? "Continuar verificación" : "Iniciar sesión";
