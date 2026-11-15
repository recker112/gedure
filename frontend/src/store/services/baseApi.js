import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./ReduxDefault";

/**
 * La ÚNICA API de RTK Query de Gedure (un reducer y un middleware en
 * store.js). Cada dominio le añade sus endpoints con `baseApi.injectEndpoints`
 * (`store/services/auth/AuthApi.js`, `modules/<m>/<m>Api.js`), así los tags
 * son comunes y un módulo puede invalidar lo que provee otro sin despachar
 * nada a mano.
 *
 * `tagTypes`: TODOS los tipos de caché de la app viven aquí (un módulo nuevo
 * añade los suyos al crear su API). En la fase 0 solo existe auth, que no
 * cachea queries, así que la lista está vacía.
 *
 * Al cerrar sesión (`logoutApp`) store.js descarta toda su caché con
 * `baseApi.util.resetApiState()`.
 */
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
