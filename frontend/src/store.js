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
import { baseApi } from "./store/services/baseApi";

/**
 * Al cerrar la sesión (logout, 401, cambio de contraseña...) se descarta TODA
 * la caché de la API base para que el siguiente usuario no vea datos del
 * anterior. Al ser una sola API, incluye los endpoints públicos, que
 * simplemente se vuelven a pedir.
 */
const listener = createListenerMiddleware();
listener.startListening({
  actionCreator: logoutApp,
  effect: (_, { dispatch }) => {
    dispatch(baseApi.util.resetApiState());
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
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listener.middleware)
      .concat(baseApi.middleware),
});

export default store;
