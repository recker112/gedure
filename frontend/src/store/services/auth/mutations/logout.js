import { logoutApp } from "../../../reducers/auth/authReducer";
import { notifyHttpStatus } from "../../../../components/notify/notifyHttpStatus";
import { handleQueryError } from "../../ReduxDefault";

/** `POST /auth/logout`: borra el token con el que se llama (temporal o definitivo). */
export const logout = (builder) =>
  builder.mutation({
    query: () => ({
      url: "/auth/logout",
      method: "POST",
    }),
    onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;
        const { status, msg } = res.data;

        notifyHttpStatus({ status, text: msg, variant: "info" }, dispatch);
      } catch (err) {
        // Un 401 aquí solo dice que la sesión ya había caducado: es el
        // resultado que se buscaba, así que no se avisa de "Tu sesión expiró".
        if (err?.error?.status !== 401) handleQueryError(err, dispatch);
      } finally {
        // La sesión local se cierra siempre, aunque la petición falle.
        dispatch(logoutApp());
      }
    },
  });
