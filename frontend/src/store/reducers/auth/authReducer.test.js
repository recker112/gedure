import { afterEach, describe, expect, test } from "vitest";

import reducer, { logoutApp, needs2FA, updateAuth, updateUserData } from "./authReducer";
import { writeStorage } from "../../../components/utils/storage";

const initial = () => reducer(undefined, { type: "@@INIT" });

describe("authReducer", () => {
  afterEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  test("estado inicial sin sesión", () => {
    expect(initial()).toMatchObject({ auth: false, token_can: [], user: {}, permissions: {}, roles: [] });
  });

  test("updateAuth", () => {
    expect(reducer(initial(), updateAuth(true)).auth).toBe(true);
  });

  test("updateUserData guarda solo lo que llega", () => {
    const user = { id: 1, name: "Admin", username: "12345678", email: "admin@lacandelaria.test" };
    let state = reducer(initial(), updateUserData({ user, apiKey: "1|x", token_can: ["2fa_required"], roles: [], permissions: {} }));
    expect(state).toMatchObject({ user, apiKey: "1|x", token_can: ["2fa_required"] });

    // El relogin no trae apiKey: se conserva la que había
    state = reducer(state, updateUserData({ user, token_can: [] }));
    expect(state.apiKey).toBe("1|x");
    expect(state.token_can).toEqual([]);
  });

  test.each([
    ["sin remember", false],
    ["con remember", true],
  ])("logoutApp vacía el estado y el storage (%s)", (_, remember) => {
    writeStorage("auth.apiKey", "2|y", remember);
    let state = reducer(initial(), updateUserData({ apiKey: "2|y", user: { id: 1 }, token_can: ["remember_me"] }));
    state = reducer(reducer(state, updateAuth(true)), logoutApp());

    expect(state).toMatchObject({ auth: false, apiKey: null, user: {}, token_can: [] });
    expect(window.sessionStorage.getItem("gd.auth.apiKey")).toBeNull();
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBeNull();
  });

  test("needs2FA", () => {
    expect(needs2FA(["2fa_required", "remember_me"])).toBe(true);
    expect(needs2FA(["remember_me"])).toBe(false);
    expect(needs2FA(undefined)).toBe(false);
  });
});
