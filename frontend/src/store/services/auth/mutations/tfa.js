import { writeStorage } from "../../../../components/utils/storage";
import { API_KEY_STORAGE, updateUserData } from "../../../reducers/auth/authReducer";
import { handleQueryError } from "../../ReduxDefault";

/**
 * `POST /auth/2fa` `{ otp }` con el token temporal. Devuelve el token
 * DEFINITIVO (el temporal se borra en el servidor). Si se pidió mantener la
 * sesión, el backend lo indica con `remember_me` en `token_can`.
 */
export const tfa = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/2fa",
      method: "POST",
      body,
    }),
    onQueryStarted: async ({ setError }, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;
        const { user, permissions, apiKey, roles, is_owner, token_can } = res.data;

        const remember = token_can?.includes("remember_me") ?? false;
        writeStorage(API_KEY_STORAGE, apiKey, remember);

        dispatch(updateUserData({ user, permissions, apiKey, roles, is_owner, token_can }));
      } catch (err) {
        handleQueryError(err, dispatch, setError);
      }
    },
  });
