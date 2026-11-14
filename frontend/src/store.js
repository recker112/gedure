import { configureStore } from "@reduxjs/toolkit";

/**
 * User Slices
 */
import userConfigReducer from "./store/reducers/user/configReducer";

/**
 * Store global. Por ahora solo guarda las preferencias del visitante (tema);
 * aquí se colgarán los reducers de sesión y las APIs de RTK Query
 * (store/services/<dominio>/) cuando llegue el login con Sanctum.
 */
const store = configureStore({
  reducer: {
    /**
     * User Slices
     */
    userConfig: userConfigReducer,
  },
});

export default store;
