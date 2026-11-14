import { notifyHttpStatus } from "../../../../components/notify/notifyHttpStatus";
import { handleQueryError } from "../../ReduxDefault";

/** Reenvío del código de seguridad (mismo endpoint que `forgot`) desde el paso del código. */
export const resendCode = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/security/email/send",
      method: "POST",
      body,
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
