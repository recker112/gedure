import { createSlice } from "@reduxjs/toolkit";
import { readStorage, removeStorage } from "../../../components/utils/storage";

/** Clave (con el prefijo `gd.`) del token de Sanctum en el storage. */
export const API_KEY_STORAGE = "auth.apiKey";

/**
 * Sesión. `auth` pasa a true tras un login o un relogin correctos, aunque el
 * token sea todavía el temporal del 2FA: lo que distingue los dos es
 * `token_can` (`2fa_required` en el temporal; `remember_me` si se pidió
 * mantener la sesión).
 *
 * Acceso (login, 2FA y relogin; ver docs/backend/api.md): `permissions` es un
 * mapa `{"modulo.recurso.accion": true}`, `roles` los nombres (solo
 * informativos: no autorizan) e `isOwner` (`is_owner` del backend: el owner
 * pasa toda comprobación y trae `permissions: {}`). Con el token temporal del
 * 2FA llegan vacíos. Se leen con hooks/auth/useCanAccess.js.
 */
const initialState = {
  auth: false,
  apiKey: readStorage(API_KEY_STORAGE, null),
  token_can: [],
  user: {},
  permissions: {},
  roles: [],
  isOwner: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.auth = action.payload;
    },
    updateUserData: (state, action) => {
      const { user, permissions, apiKey, roles, is_owner, token_can } = action.payload;

      if (user) state.user = user;
      if (permissions) state.permissions = permissions;
      if (roles) state.roles = roles;
      if (typeof is_owner === "boolean") state.isOwner = is_owner;
      if (apiKey) state.apiKey = apiKey;
      if (token_can) state.token_can = token_can;
    },
    logoutApp: () => {
      removeStorage(API_KEY_STORAGE);
      // initialState.apiKey se leyó del storage al cargar el módulo: hay que
      // vaciarlo a mano o el token viejo seguiría yendo en las peticiones.
      return { ...initialState, apiKey: null };
    },
  },
});

export const { updateAuth, updateUserData, logoutApp } = authSlice.actions;

/** ¿La sesión es la temporal del 2FA? */
export const needs2FA = (tokenCan) => Array.isArray(tokenCan) && tokenCan.includes("2fa_required");

export default authSlice.reducer;
