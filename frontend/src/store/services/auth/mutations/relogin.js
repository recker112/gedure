import { logoutApp, updateAuth, updateUserData } from "../../../reducers/auth/authReducer";
import { handleScreenQueryError } from "../../ReduxDefault";

/**
 * `POST /auth/relogin`: revalida el token guardado (temporal o definitivo) al
 * cargar la app (ver router/sessionLoaders.js). Argumento `{ silent }`: web pública, sin toasts. No devuelve `apiKey`. Un 401
 * cierra la sesión local (notifyHttpStatus).
 */
export const relogin = (builder) =>
  builder.mutation({
    query: () => ({
      url: "/auth/relogin",
      method: "POST",
    }),
    onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
      try {
        const res = await queryFulfilled;
        // Un logout ocurrido mientras viajaba la petición no se deshace.
        if (!getState().auth.apiKey) return;
        const { user, permissions, roles, is_owner, token_can } = res.data;

        dispatch(updateUserData({ user, permissions, roles, is_owner, token_can }));
        dispatch(updateAuth(true));
      } catch (err) {
        // Web pública (`silent`): un 401 limpia la sesión sin toast; el resto se ignora.
        if (arg?.silent) {
          if (err?.error?.status === 401) dispatch(logoutApp());
          return;
        }
        // Sin conexión no hay toast: ensureSession lanza OfflineError.
        handleScreenQueryError(err, dispatch);
      }
    },
  });
