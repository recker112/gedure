/**
 * Redux
 */
import { useSelector } from "react-redux";

/**
 * Autorización en el cliente (docs/frontend/permisos.md). La misma regla para
 * el guard de rutas (AuthProtect), el menú del panel y lo que cada componente
 * oculta o deshabilita.
 *
 * Solo cuentan los PERMISOS (`modulo.recurso.accion`) y la condición de owner
 * (`auth.isOwner`, que pasa siempre); `auth.roles` es informativo y nunca
 * autoriza. Es comodidad, no seguridad: el backend vuelve a comprobarlo todo.
 */

/** true si tiene `perm`. Con un array basta uno ("any"). El owner siempre pasa. */
export function hasPermission(userPermissions, perm, isOwner = false) {
  if (isOwner) return true;

  const list = Array.isArray(perm) ? perm : [perm];

  return list.some((name) => Boolean(name && userPermissions?.[name]));
}

/** true si tiene TODOS los permisos de `perms`. El owner siempre pasa. */
export function hasAllPermissions(userPermissions, perms, isOwner = false) {
  if (isOwner) return true;

  return perms.every((name) => Boolean(name && userPermissions?.[name]));
}

/**
 * Evalúa una regla `{ permission, allPermissions }` (la forma de los
 * `config.js` de los módulos y de las props de AuthProtect). Cada clave solo
 * se comprueba si viene y, si vienen las dos, se exigen ambas:
 *
 * - `permission`: `string | string[]`; con un array basta uno.
 * - `allPermissions`: `string[]`; hacen falta todos.
 *
 * Sin regla deja pasar (basta la sesión). El owner pasa siempre.
 * `permission: []` no deja pasar a nadie salvo al owner: no declares arrays vacíos.
 */
export function canAccess({ permissions = {}, isOwner = false }, rule = {}) {
  if (isOwner) return true;

  const { permission, allPermissions } = rule ?? {};

  if (permission && !hasPermission(permissions, permission)) return false;
  if (allPermissions && !hasAllPermissions(permissions, allPermissions)) return false;

  return true;
}

/**
 * `(rule) => boolean` con los permisos de la sesión actual:
 *
 * ```js
 * const can = useCanAccess();
 * can({ permission: "notas.nota.update" });
 * can({ allPermissions: ["usuarios.rol.update", "usuarios.permiso.update"] });
 * ```
 */
export function useCanAccess() {
  const permissions = useSelector((state) => state.auth.permissions);
  const isOwner = useSelector((state) => state.auth.isOwner);

  return (rule) => canAccess({ permissions, isOwner }, rule);
}
