import { writeStorage } from "../../../../components/utils/storage";
import { API_KEY_STORAGE, updateAuth, updateUserData } from "../../../reducers/auth/authReducer";
import { handleQueryError } from "../../ReduxDefault";

/**
 * `POST /auth/login` `{ login, password, remember }`. Devuelve el token
 * TEMPORAL del 2FA (`token_can` con `2fa_required`); el guard lleva a
 * /auth/2fa. Con `remember` el token se guarda también en localStorage.
 */
export const login = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/login",
      method: "POST",
      body,
    }),
    onQueryStarted: async ({ body, setError }, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;
        const { user, permissions, apiKey, roles, is_owner, token_can } = res.data;

        writeStorage(API_KEY_STORAGE, apiKey, Boolean(body?.remember));

        dispatch(updateUserData({ user, permissions, apiKey, roles, is_owner, token_can }));
        dispatch(updateAuth(true));
      } catch (err) {
        handleQueryError(err, dispatch, setError);
      }
    },
  });
