import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

/**
 * User Slices
 */
import userConfigReducer from "./store/reducers/user/configReducer";

/**
 * Reducers
 */
import authReducer, { logoutApp } from "./store/reducers/auth/authReducer";

/**
 * API
 */
import { authApi } from "./store/services/auth/AuthApi";

/**
 * APIs cuya caché pertenece al usuario con sesión: se vacían al cerrarla
 * (logout, 401, cambio de contraseña...) para que el siguiente usuario no vea
 * datos del anterior. authApi entra porque sus resultados guardan el payload
 * de sesión (usuario, token). Las APIs privadas futuras
 * (store/services/<dominio>/) se añaden aquí.
 */
const sessionScopedApis = [authApi];

const listener = createListenerMiddleware();
listener.startListening({
  actionCreator: logoutApp,
  effect: (_, { dispatch }) => {
    sessionScopedApis.forEach((api) => dispatch(api.util.resetApiState()));
  },
});

const store = configureStore({
  reducer: {
    /**
     * User Slices
     */
    userConfig: userConfigReducer,

    /**
     * Reducers
     */
    auth: authReducer,

    /**
     * Services
     */
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listener.middleware)
      .concat(...sessionScopedApis.map((api) => api.middleware)),
});

export default store;
