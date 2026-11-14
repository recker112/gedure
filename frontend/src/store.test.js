import { afterEach, describe, expect, test } from "vitest";

import store from "./store";
import { toggleTheme } from "./store/reducers/user/configReducer";
import { logoutApp, updateAuth, updateUserData } from "./store/reducers/auth/authReducer";
import { authApi } from "./store/services/auth/AuthApi";

describe("store", () => {
  afterEach(() => window.localStorage.clear());

  test("monta los slices userConfig, auth y authApi", () => {
    expect(store.getState()).toHaveProperty("userConfig.theme");
    expect(store.getState()).toHaveProperty("auth.auth", false);
    expect(store.getState()).toHaveProperty(authApi.reducerPath);
  });

  test("toggleTheme cambia el tema del store", () => {
    const before = store.getState().userConfig.theme;
    store.dispatch(toggleTheme());
    expect(store.getState().userConfig.theme).not.toBe(before);
    store.dispatch(toggleTheme());
    expect(store.getState().userConfig.theme).toBe(before);
  });

  test("logoutApp vacía la sesión y la caché de authApi", () => {
    store.dispatch(updateUserData({ apiKey: "1|x", user: { id: 1 } }));
    store.dispatch(updateAuth(true));
    store.dispatch(logoutApp());

    expect(store.getState().auth).toMatchObject({ auth: false, apiKey: null, user: {} });
    expect(store.getState()[authApi.reducerPath].mutations).toEqual({});
  });
});
