import { afterEach, describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../../store";
import { logoutApp, updateUserData } from "../../store/reducers/auth/authReducer";
import { canAccess, hasAllPermissions, hasPermission, useCanAccess } from "./useCanAccess";

const persona = {
  permissions: { "usuarios.usuario.show": true, "usuarios.rol.update": true },
  isOwner: false,
};
const owner = { permissions: {}, isOwner: true };

describe("reglas de acceso", () => {
  test("hasPermission: string, o array donde basta uno", () => {
    expect(hasPermission(persona.permissions, "usuarios.usuario.show")).toBe(true);
    expect(hasPermission(persona.permissions, "notas.nota.update")).toBe(false);
    expect(hasPermission(persona.permissions, null)).toBe(false);
    expect(hasPermission(persona.permissions, ["notas.nota.update", "usuarios.rol.update"])).toBe(true);
    expect(hasPermission(persona.permissions, ["a.b.c", "d.e.f"])).toBe(false);
    expect(hasPermission(persona.permissions, [])).toBe(false);
  });

  test("hasPermission y hasAllPermissions: el owner siempre pasa", () => {
    expect(hasPermission({}, "lo.que.sea", true)).toBe(true);
    expect(hasAllPermissions({}, ["a.b.c", "d.e.f"], true)).toBe(true);
  });

  test("hasAllPermissions: hacen falta todos", () => {
    expect(hasAllPermissions(persona.permissions, ["usuarios.usuario.show", "usuarios.rol.update"])).toBe(true);
    expect(hasAllPermissions(persona.permissions, ["usuarios.usuario.show", "usuarios.permiso.update"])).toBe(false);
  });

  test("canAccess: sin regla basta la sesión", () => {
    expect(canAccess(persona)).toBe(true);
    expect(canAccess(persona, {})).toBe(true);
    expect(canAccess({}, undefined)).toBe(true);
  });

  test("canAccess: permission (basta uno) y allPermissions (todos); si vienen las dos, ambas", () => {
    expect(canAccess(persona, { permission: "usuarios.usuario.show" })).toBe(true);
    expect(canAccess(persona, { permission: "notas.nota.update" })).toBe(false);
    expect(canAccess(persona, { allPermissions: ["usuarios.usuario.show", "usuarios.rol.update"] })).toBe(true);
    expect(canAccess(persona, { allPermissions: ["usuarios.usuario.show", "notas.nota.update"] })).toBe(false);
    expect(canAccess(persona, { permission: "usuarios.usuario.show", allPermissions: ["notas.nota.update"] })).toBe(false);
  });

  test("canAccess: un array vacío en permission no deja pasar a nadie salvo al owner", () => {
    expect(canAccess(persona, { permission: [] })).toBe(false);
    expect(canAccess(owner, { permission: [] })).toBe(true);
  });

  test("canAccess: el owner pasa siempre aunque no traiga permisos", () => {
    expect(canAccess(owner, { permission: "notas.nota.update" })).toBe(true);
    expect(canAccess(owner, { allPermissions: ["a.b.c"] })).toBe(true);
  });

  test("canAccess: los roles no autorizan", () => {
    expect(canAccess({ ...persona, roles: ["admin"] }, { permission: "notas.nota.update" })).toBe(false);
    expect(canAccess(persona, { roles: ["admin"] })).toBe(true);
  });
});

describe("useCanAccess", () => {
  afterEach(() => act(() => { store.dispatch(logoutApp()); }));

  const can = () =>
    renderHook(() => useCanAccess(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    }).result.current;

  test("evalúa reglas con los permisos de la sesión", () => {
    act(() => { store.dispatch(updateUserData({ permissions: { "usuarios.usuario.show": true }, is_owner: false })); });
    expect(can()({ permission: "usuarios.usuario.show" })).toBe(true);
    expect(can()({ permission: "usuarios.rol.update" })).toBe(false);
    expect(can()({ allPermissions: ["usuarios.usuario.show", "usuarios.rol.update"] })).toBe(false);
  });

  test("el owner (is_owner del backend) pasa siempre", () => {
    act(() => { store.dispatch(updateUserData({ permissions: {}, is_owner: true })); });
    expect(can()({ permission: "lo.que.sea" })).toBe(true);
  });

  test("sin sesión (o con el token temporal del 2FA) no hay permisos", () => {
    expect(can()({ permission: "usuarios.usuario.show" })).toBe(false);
    expect(can()({})).toBe(true);
  });
});
