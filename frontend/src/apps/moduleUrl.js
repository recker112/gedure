/**
 * Derivación única de las URL de los módulos (nunca se escriben `to` a mano).
 *
 * - Un módulo vive en `/gedure/<key>`.
 * - Una entrada de su `menu`: `/gedure/<key>` (la `index`) o
 *   `/gedure/<key>/<path>`. Dentro de un grupo (`children`) cuelga del `path`
 *   de sus grupos antecesores: `/gedure/<key>/<grupo>[/<path>]`.
 *
 * Funciones puras (no importan el registro): las usan el menú del panel, las
 * pantallas y los tests sin ciclos.
 */
export const MODULES_BASE = "/gedure";

/**
 * URL de un módulo (`moduleUrl("academico")`) o de una entrada de su menú
 * (`moduleUrl("academico", { path: "secciones" })`). `parents` son los grupos
 * antecesores de la entrada, del más externo al más interno.
 */
export function moduleUrl(key, entry, parents = []) {
  const segments = [key, ...parents.map((parent) => parent.path)];
  if (entry && !entry.index && entry.path) segments.push(entry.path);

  return `${MODULES_BASE}/${segments.join("/")}`;
}

/** Clave del módulo de una URL del panel (`/gedure/academico/x` → `"academico"`), o null. */
export function moduleKeyOf(pathname) {
  const match = new RegExp(`^${MODULES_BASE}/([^/]+)`).exec(pathname ?? "");
  return match ? match[1] : null;
}
