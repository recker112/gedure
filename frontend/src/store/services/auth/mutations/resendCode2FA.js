import { notifyHttpStatus } from "../../../../components/notify/notifyHttpStatus";
import { handleQueryError } from "../../ReduxDefault";

/**
 * `POST /auth/2fa/resend` con el token temporal. Un 429 trae `retry_after`
 * (segundos): `ResendCode` lo lee del resultado de la mutación.
 */
export const resendCode2FA = (builder) =>
  builder.mutation({
    query: () => ({
      url: "/auth/2fa/resend",
      method: "POST",
    }),
    onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;
        const { status, msg } = res.data;

        notifyHttpStatus({ status, text: msg }, dispatch);
      } catch (err) {
        handleQueryError(err, dispatch);
      }
    },
  });
