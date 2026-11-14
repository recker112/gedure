import store from "../store";
import { authApi } from "../store/services/auth/AuthApi";

/**
 * Cierra la sesión al navegar a /auth/logout. Es un loader y no un efecto de
 * PaperLogout porque React Router lo ejecuta una vez por navegación, mientras
 * que un efecto corre dos veces en desarrollo bajo StrictMode (dos POST, el
 * segundo ya sin token: 401).
 *
 * Sin `apiKey` no hay nada que cerrar. El endpoint limpia la sesión local en
 * su `finally` aunque la petición falle; el guard AuthProtect lleva al login.
 */
export default async function logoutLoader() {
  if (!store.getState().auth.apiKey) return null;

  const req = store.dispatch(authApi.endpoints.logout.initiate());

  try {
    await req.unwrap();
  } catch {
    // El endpoint ya trata el error y limpia la sesión.
  } finally {
    req.reset?.();
  }

  return null;
}
