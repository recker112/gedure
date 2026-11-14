import { notifyHttpStatus } from "../../../../components/notify/notifyHttpStatus";
import { logoutApp } from "../../../reducers/auth/authReducer";
import { handleQueryError } from "../../ReduxDefault";

/**
 * `POST /auth/security/password/update` `{ login, otp, new_password,
 * new_password_confirmation }`. El backend revoca TODAS las sesiones de la
 * cuenta: si este navegador guardaba una, se limpia también.
 */
export const changePassword = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/security/password/update",
      method: "POST",
      body,
    }),
    onQueryStarted: async ({ setError, callback }, { queryFulfilled, dispatch, getState }) => {
      try {
        const res = await queryFulfilled;
        const { status, msg } = res.data;

        if (getState().auth.apiKey) dispatch(logoutApp());

        notifyHttpStatus({ status, text: msg }, dispatch);
        callback?.();
      } catch (err) {
        handleQueryError(err, dispatch, setError);
      }
    },
  });
