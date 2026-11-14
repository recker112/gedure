import { handleQueryError } from "../../ReduxDefault";

/**
 * `POST /auth/security/email/send` `{ login }`. Responde SIEMPRE 200 con un
 * mensaje neutro (no revela si la cuenta existe); `callback(msg)` pasa al
 * paso del código.
 */
export const forgot = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/security/email/send",
      method: "POST",
      body,
    }),
    onQueryStarted: async ({ setError, callback }, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;

        callback?.(res.data?.msg);
      } catch (err) {
        handleQueryError(err, dispatch, setError);
      }
    },
  });
