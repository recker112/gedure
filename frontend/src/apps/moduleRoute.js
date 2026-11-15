/**
 * React
 */
import { createElement } from "react";

/**
 * Components
 */
import { AuthProtect } from "../components/routers/Routers";
import { modules } from "./registry";

/** true si la regla declara `permission` o `allPermissions`. */
function hasRule({ permission, allPermissions }) {
  return Boolean(permission || allPermissions);
}

/** Guard de una regla, o null si no declara ninguna (solo con las claves declaradas). */
function guardFor({ permission, allPermissions }) {
  if (!hasRule({ permission, allPermissions })) return null;

  const props = {};
  if (permission) props.permission = permission;
  if (allPermissions) props.allPermissions = allPermissions;

  return createElement(AuthProtect, props);
}

/** Una entrada del menú corresponde a una ruta hija por `index` o por `path`. */
function matches(entry, child) {
  return child.index ? Boolean(entry.index) : !entry.index && entry.path === child.path;
}

/**
 * En desarrollo, avisa de las entradas del menú con permiso que no se
 * emparejan con ninguna hija de su nivel (path mal escrito, o la hija de un
 * grupo declarada con el path completo): su guard no se aplicaría.
 */
function warnUnmatched(key, entries = [], children = [], trail = []) {
  for (const entry of entries) {
    const child = children.find((candidate) => matches(entry, candidate));
    const names = [...trail, entry.title];

    if (hasRule(entry) && !child) {
      console.warn(
        `[moduleRoute] La entrada "${names.join(" › ")}" de "${key}" declara permission/allPermissions pero no hay ninguna ruta hija con ${entry.index ? "index: true" : `path: "${entry.path}"`}: su guard no se aplica.`,
      );
    }

    if (entry.children) warnUnmatched(key, entry.children, child?.children, names);
  }
}

/**
 * Envuelve cada hija cuya entrada del menú declara permisos en una ruta
 * layout sin path con su AuthProtect; en los grupos repite lo mismo un nivel
 * más abajo (cada nivel queda bajo el guard de sus antecesores).
 */
function guardChildren(entries = [], children = []) {
  return children.map((child) => {
    const entry = entries.find((candidate) => matches(candidate, child));
    if (!entry) return child;

    const route =
      entry.children && child.children ? { ...child, children: guardChildren(entry.children, child.children) } : child;
    const guard = guardFor(entry);

    return guard ? { element: guard, children: [route] } : route;
  });
}

/**
 * Ruta de un módulo a partir de su config del registro: `path` = la clave
 * (`/gedure/<key>`), guard = su `permission`/`allPermissions` (el owner pasa
 * siempre) y, dentro, el guard propio de cada hija emparejada con una entrada
 * del `menu` que declare permisos. Las hijas no ponen guards a mano.
 *
 * Va como hija del layout del panel, HERMANA de /gedure/no-perm (nunca su
 * ancestro, o el guard se redirigiría a sí mismo en bucle).
 *
 * Sin JSX (`createElement`) para que los `routes.js` sigan siendo `.js`.
 */
export default function moduleRoute(key, children) {
  const config = modules[key];
  if (!config) throw new Error(`El módulo "${key}" no está registrado en apps/registry.js.`);
  if (config.disabled) throw new Error(`El módulo "${key}" está deshabilitado (disabled: true) y no tiene rutas.`);

  if (import.meta.env.DEV) warnUnmatched(key, config.menu, children);

  const guard = guardFor(config);

  return {
    path: key,
    ...(guard && { element: guard }),
    children: guardChildren(config.menu, children),
  };
}
