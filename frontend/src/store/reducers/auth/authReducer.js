import { createSlice } from "@reduxjs/toolkit";
import { readStorage, removeStorage } from "../../../components/utils/storage";

/** Clave (con el prefijo `gd.`) del token de Sanctum en el storage. */
export const API_KEY_STORAGE = "auth.apiKey";

/**
 * Sesión. `auth` pasa a true tras un login o un relogin correctos, aunque el
 * token sea todavía el temporal del 2FA: lo que distingue los dos es
 * `token_can` (`2fa_required` en el temporal; `remember_me` si se pidió
 * mantener la sesión). `permissions` y `roles` llegan del backend y se
 * guardan para el futuro; aún no hay UI que los use.
 */
const initialState = {
  auth: false,
  apiKey: readStorage(API_KEY_STORAGE, null),
  token_can: [],
  user: {},
  permissions: {},
  roles: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.auth = action.payload;
    },
    updateUserData: (state, action) => {
      const { user, permissions, apiKey, roles, token_can } = action.payload;

      if (user) state.user = user;
      if (permissions) state.permissions = permissions;
      if (roles) state.roles = roles;
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
