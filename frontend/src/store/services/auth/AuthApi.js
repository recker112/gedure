import { baseApi } from "../baseApi";
import { login } from "./mutations/login";
import { tfa } from "./mutations/tfa";
import { resendCode2FA } from "./mutations/resendCode2FA";
import { relogin } from "./mutations/relogin";
import { logout } from "./mutations/logout";
import { forgot } from "./mutations/forgot";
import { resendCode } from "./mutations/resendCode";
import { changePassword } from "./mutations/changePassword";

/**
 * Auth API (`/api/v1/auth/*`), inyectada en la API base (store/services/baseApi.js).
 * Las mutaciones actualizan el slice `auth` en su `onQueryStarted`; las
 * pantallas no navegan tras el login o el 2FA: son los guards
 * (components/routers/Routers.jsx) los que redirigen al cambiar el estado.
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: login(builder),
    tfa: tfa(builder),
    resendCode2FA: resendCode2FA(builder),
    relogin: relogin(builder),
    logout: logout(builder),
    forgot: forgot(builder),
    resendCode: resendCode(builder),
    changePassword: changePassword(builder),
  }),
});

export const {
  useLoginMutation,
  useTfaMutation,
  useResendCode2FAMutation,
  useReloginMutation,
  useLogoutMutation,
  useForgotMutation,
  useResendCodeMutation,
  useChangePasswordMutation,
} = authApi;
