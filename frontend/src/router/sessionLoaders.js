import { redirect } from "react-router-dom";

import store from "../store";
import { authApi } from "../store/services/auth/AuthApi";
import { needs2FA } from "../store/reducers/auth/authReducer";
import { OfflineError, isConnectionError } from "../components/utils/networkError";

export const LOGIN_PATH = "/auth";
export const TFA_PATH = "/auth/2fa";
export const PANEL_PATH = "/gedure";
export const HOME_PATH = "/";
/** Query de «Ver sitio web»: entra a la portada sin que rebote al panel. */
export const SITE_PARAM = "sitio";

/**
 * Preferencia «estoy explorando la web pública» (Inicio/logo no rebotan al
 * panel). Solo la activa «Ver sitio web» (`/?sitio=1`) o un fallo transitorio
 * del relogin tras la redirección de `/`. Vive en memoria A PROPÓSITO: una
 * recarga (o una pestaña nueva) la pierde y `/` vuelve a redirigir; en
 * sessionStorage quedaba pegada y anulaba la redirección en cada recarga.
 * Se borra al volver a entrar al panel.
 */
let browsingSite = false;
/** Solo para tests: simula una recarga (el módulo se reinicia). */
export const resetSitePreference = () => {
  browsingSite = false;
};

const pathOf = (request) => new URL(request.url).pathname.replace(/\/+$/, "") || "/";

/**
 * Marca de origen «llegué al panel por la redirección de /». Vive en memoria
 * (no en la URL): homeLoader la pone justo antes del redirect y el protectLoader
 * de /gedure la consume en esa misma navegación (siempre se consume, así que
 * no sobrevive a la siguiente).
 */
let enteredFromHome = false;
const takeHomeEntry = () => {
  const value = enteredFromHome;
  enteredFromHome = false;
  return value;
};

/** En `/` con sesión guardada y sin pedir la web pública, se va al panel. */
const homeGoesToPanel = (request) =>
  Boolean(store.getState().auth.apiKey) &&
  !new URL(request.url).searchParams.has(SITE_PARAM) &&
  !browsingSite;

/** Relogin en curso, compartido: loaders que corren a la vez no duplican la petición. */
let inflight = null;

/**
 * Deja el estado de auth al día con el backend, una sola vez por sesión:
 *
 * - Sin `apiKey` o con `auth` ya en true (login/relogin hecho en esta carga):
 *   no llama a nada.
 * - Con `apiKey` y sin `auth`: un relogin. Si ya hay uno en vuelo se reutiliza
 *   su promesa (React Router corre en paralelo el loader de la web pública y
 *   el del guard al navegar / -> /gedure). Un 401 limpia la sesión (el endpoint).
 * - Sin conexión (ver `isConnectionError`): lanza OfflineError; la sesión no se
 *   cierra y, al no cachearse nada, el siguiente intento vuelve a probar.
 *
 * `silent` (web pública): un 401 limpia la sesión sin el toast "Tu sesión
 * expiró" y cualquier otro error se ignora. Si otro loader reutiliza esta
 * promesa, hereda ese silencio.
 */
export function ensureSession({ silent = false } = {}) {
  const { apiKey, auth } = store.getState().auth;
  if (!apiKey || auth) return Promise.resolve();
  if (inflight) return inflight;

  const relogin = store.dispatch(authApi.endpoints.relogin.initiate({ silent }));
  inflight = relogin
    .unwrap()
    .then(
      () => undefined,
      (error) => {
        if (isConnectionError(error)) throw new OfflineError(error);
        // Otros errores: el endpoint ya los trató (y limpió la sesión en 401).
      },
    )
    .finally(() => {
      inflight = null;
      relogin.reset?.();
    });
  return inflight;
}

/**
 * Loader de la web pública: no bloquea la primera pintura. Si hay `apiKey`
 * lanza el relogin en segundo plano (la barra ya muestra la sesión con el
 * estado del store y completa el nombre cuando llega).
 */
export function publicLoader({ request }) {
  const path = pathOf(request);
  // `/` con sesión redirige al panel (homeLoader): no se lanza un relogin que
  // el guard de /gedure ya hace (y con su propia política de errores).
  if (path === HOME_PATH && homeGoesToPanel(request)) return null;
  if (store.getState().auth.apiKey) ensureSession({ silent: true }).catch(() => {});
  return null;
}

/**
 * Portada (ruta índice). Con `apiKey` guardada redirige al panel ANTES de
 * pintar, de forma optimista: no espera al relogin (lo valida protectLoader).
 * La decisión es solo de este loader (publicLoader no la toca), así que no
 * depende de en qué orden corran los loaders padre e hijo.
 *
 * `/?sitio=1` («Ver sitio web» del panel): activa la preferencia y limpia la
 * URL. Mientras dure, Inicio/logo no rebotan; se borra al volver al panel.
 */
export function homeLoader({ request }) {
  if (new URL(request.url).searchParams.has(SITE_PARAM)) {
    browsingSite = true;
    return redirect(HOME_PATH);
  }
  if (!homeGoesToPanel(request)) return null;
  enteredFromHome = true;
  return redirect(PANEL_PATH);
}

/**
 * /auth y /auth/forgot-password (solo sin sesión). Con sesión redirige ANTES
 * de pintar: token temporal -> 2FA; completa -> panel.
 */
export async function guestLoader() {
  await ensureSession();
  const { auth, token_can } = store.getState().auth;
  if (!auth) return null;
  return redirect(needs2FA(token_can) ? TFA_PATH : PANEL_PATH);
}

/**
 * Rutas con sesión (/gedure, /auth/2fa). Sin sesión -> /auth; token temporal
 * -> solo /auth/2fa; token completo en /auth/2fa -> panel.
 *
 * Si se llegó al panel por la redirección de `/`, el relogin es silencioso y
 * un 401 devuelve a la portada (sesión ya limpia) sin aviso ni pasar por /auth.
 */
export async function protectLoader({ request }) {
  const path = pathOf(request);
  const fromHome = takeHomeEntry() && path === PANEL_PATH;

  await ensureSession({ silent: fromHome });
  const { auth, token_can, apiKey } = store.getState().auth;
  if (!auth) {
    if (!fromHome) return redirect(LOGIN_PATH);
    // Un error que no cerró la sesión (no 401): la portada no debe rebotar otra vez.
    if (apiKey) browsingSite = true;
    return redirect(HOME_PATH);
  }

  const temporary = needs2FA(token_can);
  if (temporary && path !== TFA_PATH) return redirect(TFA_PATH);
  if (!temporary && path === TFA_PATH) return redirect(PANEL_PATH);
  if (path === PANEL_PATH) browsingSite = false;
  return null;
}
