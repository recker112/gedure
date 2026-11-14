import { beforeEach, describe, expect, test, vi } from "vitest";

const { dispatch, getState, initiate } = vi.hoisted(() => ({
  dispatch: vi.fn(),
  getState: vi.fn(),
  initiate: vi.fn(),
}));

vi.mock("../store", () => ({ default: { dispatch, getState } }));
vi.mock("../store/services/auth/AuthApi", () => ({
  authApi: { endpoints: { logout: { initiate } } },
}));

import logoutLoader from "./logoutLoader";

describe("logoutLoader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dispatch.mockReturnValue({ unwrap: () => Promise.resolve(), reset: vi.fn() });
  });

  test("sin apiKey no hay nada que cerrar", async () => {
    getState.mockReturnValue({ auth: { apiKey: null } });
    await logoutLoader();
    expect(dispatch).not.toHaveBeenCalled();
  });

  test("con apiKey llama a logout y no lanza aunque falle", async () => {
    getState.mockReturnValue({ auth: { apiKey: "1|x" } });
    dispatch.mockReturnValue({ unwrap: () => Promise.reject({ status: 500 }), reset: vi.fn() });
    await expect(logoutLoader()).resolves.toBeNull();
    expect(initiate).toHaveBeenCalledOnce();
  });
});
