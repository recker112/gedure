/**
 * PLANTILLA DE MÓDULO — NO REGISTRADA. Ver ./config.js.
 *
 * Pantallas del módulo, cada una con `lazyPage` (su chunk baja al entrar en la
 * ruta, no al importar este archivo). moduleRoute pone el `path` (la clave) y
 * los guards a partir de ./config.js: aquí NO se escriben `permission`,
 * `allPermissions` ni `AuthProtect` a mano.
 *
 * Para activarlo: ./config.js en apps/registry.js y este archivo en
 * apps/routes.js. Si se importa sin registrar la config, moduleRoute lanza.
 */

/**
 * Router
 */
import lazyPage from "../../router/lazyPage";
import moduleRoute from "../../apps/moduleRoute";
import plantilla from "./config";

export default moduleRoute(plantilla.key, [
  { index: true, lazy: lazyPage(() => import("./PlantillaPage")) },
  { path: "elementos", lazy: lazyPage(() => import("./PlantillaPage")) },
  // Las rutas que no salen en el menú (p. ej. un detalle) van igual y quedan
  // bajo el guard del módulo.
  { path: "elementos/:id", lazy: lazyPage(() => import("./PlantillaPage")) },
  // Grupo: hijas ANIDADAS (no `ajustes/avanzado` con el path completo, o su
  // guard no se aplicaría).
  {
    path: "ajustes",
    children: [
      { index: true, lazy: lazyPage(() => import("./PlantillaPage")) },
      { path: "avanzado", lazy: lazyPage(() => import("./PlantillaPage")) },
    ],
  },
]);

/**
 * Opcional: pantallas PÚBLICAS del módulo (sin sesión), que router/routes.jsx
 * monta bajo el layout de la web pública. Las rutas son absolutas desde `/`.
 */
export const publicRoutes = [
  // { path: "plantilla-publica", lazy: lazyPage(() => import("./PlantillaPage")) },
];
