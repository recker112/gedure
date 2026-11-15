/**
 * Rutas de los módulos HABILITADOS (cada `modules/<m>/routes.js`, importado
 * entero: su `default` es la ruta del panel y su `publicRoutes` opcional las
 * pantallas públicas). Un módulo con `disabled: true` no va aquí.
 *
 * Importar este archivo no descarga pantallas: cada una va en un `lazy`.
 */
// import * as academico from "../modules/academico/routes";

const enabled = [
  // academico,
];

/**
 * Junta las rutas de una lista de `routes.js` importados como namespace. Se
 * exporta para probarlo con fixtures.
 */
export function collectRoutes(list) {
  return {
    moduleRoutes: list.map((mod) => mod.default),
    publicModuleRoutes: list.flatMap((mod) => mod.publicRoutes ?? []),
  };
}

const collected = collectRoutes(enabled);

/**
 * Rutas del panel, que router/routes.jsx esparce UNA vez como hijas del
 * layout del panel (hermanas de /gedure/no-perm). routes.jsx no se toca al
 * añadir módulos.
 */
export const moduleRoutes = collected.moduleRoutes;

/** Pantallas públicas de los módulos (bajo PublicLayout, sin sesión). */
export const publicModuleRoutes = collected.publicModuleRoutes;
