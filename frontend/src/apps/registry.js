/**
 * Módulos (configs; en el ORDEN DEL MENÚ). Un módulo nuevo importa aquí su
 * `config.js` y su `routes.js` en ./routes.js (docs/frontend/modulos.md).
 * modules/_plantilla NO se registra.
 */
// import academico from "../modules/academico/config";

/**
 * Registro de módulos: fuente única del menú del panel, de la URL
 * (`/gedure/<key>`) y de la protección (moduleRoute) de cada módulo.
 *
 * Forma de un `config.js` (ver modules/_plantilla/config.js):
 *
 * - `key`: segmento de URL, minúsculas, única.
 * - `title`, `icon` (componente de @mui/icons-material).
 * - `permission` (`string | string[]`, basta uno) y/o `allPermissions`
 *   (`string[]`, todos): opcionales, protegen TODO el módulo. Sin ellos basta
 *   la sesión completa. Nunca arrays vacíos.
 * - `menu`: entradas `{ title, icon, index: true }` o `{ title, icon, path }`,
 *   cada una con su `permission`/`allPermissions` opcional; un grupo es una
 *   entrada con `path` y `children` (nunca `index`).
 * - `disabled: true`: sale en el menú como "Próximamente" y no tiene rutas.
 *
 * Solo importa configs (metadatos e iconos), nunca rutas ni pantallas: el
 * layout del panel importa este archivo y no debe arrastrar chunks, y
 * moduleRoute lo importa a su vez (si importara rutas habría un ciclo).
 */
const registro = [
  // academico,
];

/** Segmentos de /gedure que ya usa el panel: ningún módulo puede llamarse así. */
export const RESERVED_KEYS = ["no-perm", "cuenta"];

const KEY_FORMAT = /^[a-z][a-z0-9-]*$/;

const isEmptyArray = (value) => Array.isArray(value) && value.length === 0;

/** Lanza si una regla o una entrada del menú está mal declarada. */
function checkRule(where, rule) {
  if (isEmptyArray(rule.permission) || isEmptyArray(rule.allPermissions)) {
    throw new Error(`${where}: no declares permission/allPermissions vacíos (no dejarían pasar a nadie).`);
  }
}

function checkMenu(key, entries = [], trail = []) {
  for (const entry of entries) {
    const where = `Módulo "${key}", entrada "${[...trail, entry.title].join(" › ")}"`;
    checkRule(where, entry);
    if ("to" in entry) throw new Error(`${where}: usa index/path, la URL la deriva moduleUrl().`);
    if (entry.children) {
      if (entry.index || !entry.path) throw new Error(`${where}: un grupo lleva path y nunca index.`);
      if (entry.children.length === 0) throw new Error(`${where}: un grupo necesita al menos una hija.`);
      checkMenu(key, entry.children, [...trail, entry.title]);
    } else if (!entry.index && !entry.path) {
      throw new Error(`${where}: necesita index: true o path.`);
    }
    if (entry.path && entry.path.startsWith("/")) throw new Error(`${where}: el path es relativo (sin "/" inicial).`);
  }
}

/**
 * Mapa `key → config` en el orden de la lista, validando cada config. Se
 * exporta para probarlo con fixtures.
 */
export function createRegistry(list) {
  const map = {};
  for (const config of list) {
    const { key } = config;
    if (!KEY_FORMAT.test(key ?? "")) throw new Error(`Clave de módulo no válida: "${key}" (minúsculas, sin barras).`);
    if (RESERVED_KEYS.includes(key)) throw new Error(`La clave "${key}" está reservada por el panel.`);
    if (map[key]) throw new Error(`La clave de módulo "${key}" está registrada dos veces.`);
    checkRule(`Módulo "${key}"`, config);
    checkMenu(key, config.menu);
    map[key] = config;
  }
  return map;
}

/** Módulos registrados: `key → config`, en el orden del menú. */
export const modules = createRegistry(registro);
