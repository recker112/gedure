import { afterEach, describe, expect, test } from "vitest";

import store from "./store";
import { mockRoutes } from "./test/mockFetch";
import { toggleTheme } from "./store/reducers/user/configReducer";
import { logoutApp, updateAuth, updateUserData } from "./store/reducers/auth/authReducer";
import { baseApi } from "./store/services/baseApi";
import { authApi } from "./store/services/auth/AuthApi";

describe("store", () => {
  afterEach(() => window.localStorage.clear());

  test("monta los slices userConfig, auth y una sola API (baseApi)", () => {
    expect(store.getState()).toHaveProperty("userConfig.theme");
    expect(store.getState()).toHaveProperty("auth.auth", false);
    expect(store.getState()).toHaveProperty("baseApi");
    expect(Object.keys(store.getState()).sort()).toEqual(["auth", "baseApi", "userConfig"]);
  });

  test("authApi es baseApi con los endpoints de auth inyectados", () => {
    expect(authApi.reducerPath).toBe("baseApi");
    expect(authApi.util).toBe(baseApi.util);
    expect(Object.keys(baseApi.endpoints)).toEqual(
      expect.arrayContaining(["login", "tfa", "resendCode2FA", "relogin", "logout", "forgot", "resendCode", "changePassword"]),
    );
  });

  test("toggleTheme cambia el tema del store", () => {
    const before = store.getState().userConfig.theme;
    store.dispatch(toggleTheme());
    expect(store.getState().userConfig.theme).not.toBe(before);
    store.dispatch(toggleTheme());
    expect(store.getState().userConfig.theme).toBe(before);
  });

  test("logoutApp vacía la sesión y la caché de baseApi", () => {
    store.dispatch(updateUserData({ apiKey: "1|x", user: { id: 1 } }));
    store.dispatch(updateAuth(true));
    store.dispatch(logoutApp());

    expect(store.getState().auth).toMatchObject({ auth: false, apiKey: null, user: {} });
    expect(store.getState().baseApi.mutations).toEqual({});
  });

  test("logoutApp descarta lo que la API base tenía en caché", async () => {
    mockRoutes({ "POST /auth/security/email/send": { body: { status: 200, msg: "Enviado" } } });
    await store.dispatch(authApi.endpoints.forgot.initiate({ body: { login: "12345678" } }));
    expect(Object.keys(store.getState().baseApi.mutations)).not.toHaveLength(0);

    store.dispatch(logoutApp());

    expect(store.getState().baseApi.mutations).toEqual({});
  });
});
