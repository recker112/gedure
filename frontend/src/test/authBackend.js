import { act } from "@testing-library/react";

import store from "../store";
import { logoutApp, updateAuth, updateUserData } from "../store/reducers/auth/authReducer";
import { writeStorage } from "../components/utils/storage";
import { resetSitePreference } from "../router/sessionLoaders";
import { mockRoutes } from "./mockFetch";

/** Usuario de prueba (el del DatabaseSeeder del backend). */
export const USER = { id: 1, name: "Administrador", username: "12345678", email: "owner@example.com" };

export const TEMP_KEY = "1|gedure_temporal";
export const FULL_KEY = "2|gedure_definitivo";

/**
 * Payload de sesión del backend (login, 2fa y relogin). Con el token temporal
 * del 2FA el acceso llega vacío (`permissions: {}`, `roles: []`, `is_owner: false`).
 */
export const sessionPayload = ({ token_can = [], apiKey, permissions = {}, roles = [], is_owner = false } = {}) => ({
  status: 200,
  msg: "Inicio de sesión",
  user: USER,
  token_can,
  permissions,
  roles,
  is_owner,
  ...(apiKey ? { apiKey } : {}),
});

/**
 * Backend de auth simulado con respuestas correctas por defecto. `overrides`
 * sustituye rutas (`"POST /auth/2fa": { status: 422, body }`).
 */
export function serveAuth(overrides = {}) {
  return mockRoutes({
    "POST /auth/login": ({ body }) => ({
      body: sessionPayload({ token_can: body?.remember ? ["2fa_required", "remember_me"] : ["2fa_required"], apiKey: TEMP_KEY }),
    }),
    "POST /auth/2fa": { body: sessionPayload({ token_can: [], apiKey: FULL_KEY }) },
    "POST /auth/2fa/resend": { body: { status: 200, msg: "Código de seguridad reenviado" } },
    // El relogin responde según el token: el temporal sigue en el paso del 2FA.
    "POST /auth/relogin": ({ headers }) => ({
      body: sessionPayload({ token_can: headers.get("authorization") === `Bearer ${TEMP_KEY}` ? ["2fa_required"] : [] }),
    }),
    "POST /auth/logout": { body: { status: 200, msg: "Sesión cerrada" } },
    "POST /auth/security/email/send": {
      body: { status: 200, msg: "Si los datos corresponden a una cuenta, recibirás un código de seguridad en su correo" },
    },
    "POST /auth/security/password/update": { body: { status: 200, msg: "Contraseña actualizada correctamente" } },
    ...overrides,
  });
}

/**
 * Sesión ya iniciada en el store (como tras el login o el relogin). Acepta el
 * acceso: `signIn({ permissions: { "usuarios.usuario.show": true } })`,
 * `signIn({ is_owner: true })`.
 */
export function signIn({ apiKey = FULL_KEY, token_can = [], remember = false, permissions = {}, roles = [], is_owner = false } = {}) {
  act(() => {
    writeStorage("auth.apiKey", apiKey, remember);
    store.dispatch(updateUserData({ user: USER, apiKey, token_can, permissions, roles, is_owner }));
    store.dispatch(updateAuth(true));
  });
}

/** Deja el store y el storage sin sesión (para afterEach). */
export function resetAuth() {
  act(() => {
    store.dispatch(logoutApp());
  });
  window.localStorage.clear();
  window.sessionStorage.clear();
  resetSitePreference();
}
