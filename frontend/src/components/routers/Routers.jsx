/**
 * React Router
 */
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { needs2FA } from "../../store/reducers/auth/authReducer";
import { useCanAccess } from "../../hooks/auth/useCanAccess";

/**
 * Components
 */
import Fallback from "./Fallback";

/** Destinos de la rama de sesión. */
export const LOGIN_PATH = "/auth";
export const TFA_PATH = "/auth/2fa";
export const LOGOUT_PATH = "/auth/logout";
export const PANEL_PATH = "/gedure";
/** Destino de AuthProtect cuando faltan permisos (core/panel/NoPermPage). */
export const NO_PERM_PATH = "/gedure/no-perm";

/**
 * Los guards son rutas layout: envuelven a sus hijos vía <Outlet />. Son
 * componentes (y no loaders con redirect) a propósito: el login y el 2FA no
 * navegan, solo actualizan Redux, y es el re-render del guard el que dispara
 * la redirección.
 *
 * <Navigate /> renderiza null y, con route.lazy, la location no cambia hasta
 * que baja el chunk de destino: se pinta la pantalla de carga mientras tanto.
 */
function Redirecting({ to, text = "Cargando…" }) {
  return (
    <>
      <Fallback component="div" text={text} loading />
      <Navigate to={to} replace />
    </>
  );
}

/**
 * Pantallas para quien NO tiene sesión (login, recuperar contraseña). Con
 * sesión se manda a /auth/2fa, y desde allí AuthProtect decide: si el 2FA ya
 * está superado, al panel.
 */
export function NoSeeAuth() {
  const auth = useSelector((state) => state.auth.auth);
  const tokenCan = useSelector((state) => state.auth.token_can);

  if (auth) {
    return needs2FA(tokenCan) ? (
      <Redirecting to={TFA_PATH} text="Verificando tu identidad…" />
    ) : (
      <Redirecting to={PANEL_PATH} text="Ya tienes una sesión iniciada, entrando…" />
    );
  }

  return <Outlet />;
}

/**
 * Exige sesión. Con el token temporal (`2fa_required`) solo deja ver
 * /auth/2fa y /auth/logout; con el definitivo, /auth/2fa manda al panel.
 *
 * Permisos (opcionales; si vienen los dos se exigen ambos, ver
 * hooks/auth/useCanAccess.js): `permission` (`string | string[]`, basta uno)
 * y `allPermissions` (`string[]`, todos). Sin cumplirlos redirige a
 * /gedure/no-perm. El owner pasa siempre. Un AuthProtect con permisos debe
 * ser HERMANO de /gedure/no-perm, nunca su ancestro (bucle de redirección):
 * en la práctica solo los pone apps/moduleRoute.js.
 */
export function AuthProtect({ permission, allPermissions }) {
  const auth = useSelector((state) => state.auth.auth);
  const tokenCan = useSelector((state) => state.auth.token_can);
  const can = useCanAccess();
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "");

  if (!auth) {
    return <Redirecting to={LOGIN_PATH} text="Tu sesión no está activa, te llevamos al inicio de sesión…" />;
  }

  if (needs2FA(tokenCan) && path !== TFA_PATH && path !== LOGOUT_PATH) {
    return <Redirecting to={TFA_PATH} text="Verificando tu identidad…" />;
  }

  if (!needs2FA(tokenCan) && path === TFA_PATH) {
    return <Redirecting to={PANEL_PATH} text="Verificación correcta, entrando…" />;
  }

  if (!can({ permission, allPermissions })) {
    return <Redirecting to={NO_PERM_PATH} />;
  }

  return <Outlet />;
}
