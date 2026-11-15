# Módulos (`src/modules/<modulo>/`)

Cada funcionalidad vive entera en su módulo: pantallas, componentes, API de RTK Query, rutas, entradas de menú y tests. Adapta el sistema de "apps" de BluLabel (`apps/registry.js` + `modules/<app>/{config,routes}.js` + `appRoute`) a un único panel con módulos. **Nada de esto existe todavía**; se crea en la fase 0.

## Anatomía

```
src/modules/academico/
├── config.js               # metadatos: key, title, icon, permission?, menu (sin importar pantallas)
├── routes.js               # moduleRoute(config.key, [...hijas lazy])
├── academicoApi.js         # baseApi.injectEndpoints({ endpoints }) (los tagTypes viven en store/services/baseApi.js)
├── api/
│   ├── queries/            # un archivo por endpoint: getSecciones.js, getLapsos.js...
│   └── mutations/          # cerrarLapso.js, createSeccion.js...
├── periodos/               # una carpeta por pantalla o tema (si hay más de ~8 archivos)
│   ├── PeriodosPage.jsx
│   ├── PeriodosPage.test.jsx
│   └── ...
├── secciones/
├── hooks/                  # hooks del módulo (useLapsoActual...)
├── rules.js                # reglas puras del módulo (mismas que el backend)
└── test/academicoBackend.js  # fixtures y serveAcademico() para mockRoutes
```

Un módulo pequeño puede tener sus pantallas en la raíz; las subcarpetas siguen la regla de [arquitectura.md](arquitectura.md#convenciones-iguales-a-blulabel).

## `config.js`: menú y protección

```js
/** MUI */
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";

const academico = {
  key: "academico",                 // segmento de URL: /gedure/academico
  title: "Académico",
  icon: SchoolIcon,
  // Opcional: protege TODO el módulo. String o array (basta uno); allPermissions = todos.
  permission: ["academico.periodo.show", "academico.seccion.show"],
  menu: [
    { title: "Años escolares", icon: EventIcon, index: true, permission: "academico.periodo.show" },
    { title: "Secciones", icon: GroupsIcon, path: "secciones", permission: "academico.seccion.show" },
    // Grupo desplegable: path común + children (nunca index en el grupo)
    // { title: "Planes", icon: ..., path: "planes", children: [{ index: true, ... }, { path: "materias", ... }] },
  ],
};
export default academico;
```

- **Nunca importa pantallas**: el menú del panel importa el registro y no debe arrastrar los chunks.
- `key` en minúsculas, única (el registro lanza un error si se repite).
- Sin `permission` = basta sesión completa. **Nunca arrays vacíos** (no dejan pasar a nadie).
- Las URLs se derivan (`/gedure/<key>/<path>`) con `moduleUrl()`; no se escriben `to` a mano.
- `disabled: true` muestra el módulo en el menú como "Próximamente" y sin rutas (útil para anunciar fases).

## `routes.js`

```js
import moduleRoute from "../moduleRoute";
import lazyPage from "../../router/lazyPage";
import academico from "./config";

export default moduleRoute(academico.key, [
  { index: true, lazy: lazyPage(() => import("./periodos/PeriodosPage")) },
  { path: "secciones", lazy: lazyPage(() => import("./secciones/SeccionesPage")) },
  { path: "secciones/:id", lazy: lazyPage(() => import("./secciones/SeccionPage")) },
]);
```

`moduleRoute` (sin JSX, `createElement`) devuelve `{ path: key, element: <AuthProtect permission=… />, children }` y envuelve cada hija cuyo `index`/`path` coincide con una entrada de `menu` que declare `permission` en su propio `AuthProtect` (nivel a nivel en los grupos). Las hijas no ponen guards a mano. En desarrollo avisa si una entrada de menú con permiso no se empareja con ninguna ruta.

## Registro

1. `modules/registry.js`: importa cada `config.js` en el **orden del menú**.
2. `modules/routes.js`: importa cada `routes.js` habilitado y exporta `moduleRoutes`, que `router/routes.jsx` esparce **una sola vez** como hijas del layout del panel (hermanas de `/gedure/no-perm`). `routes.jsx` no se toca al añadir módulos.
3. `modules/registry.test.js`: cada módulo habilitado tiene ruta y cada ruta tiene módulo, claves únicas, la plantilla no está registrada.

`registry.js` **no importa rutas** (`moduleRoute` importa el registro: sería un ciclo).

## Añadir un módulo

1. Copia `modules/_plantilla/` a `modules/<key>/`.
2. Rellena `config.js` (permisos del catálogo del backend, [../backend/permisos.md](../backend/permisos.md)).
3. Crea las pantallas y su `routes.js` (hijas con el mismo `path` que su entrada de menú).
4. Crea `<key>Api.js` con `baseApi.injectEndpoints(...)` y añade sus `tagTypes` a `store/services/baseApi.js`. No hay que registrar nada en `store.js`.
5. Registra config y rutas (`registry.js`, `routes.js`).
6. `npm test` (falla el test del registro si falta algo).

## Rutas públicas de un módulo

**Aprobado.** Noticias públicas (`/noticias`) y la preselección (formulario de pre-inscripción sin cuenta) son pantallas públicas que pertenecen a un módulo. `routes.js` puede exportar además `publicRoutes`, que `router/routes.jsx` esparce bajo el `PublicLayout`; así la pantalla vive en su módulo y `core/` no depende de él. Hasta la fase 7, `core/news` sigue con datos fijos.

## Tests del módulo

Junto a cada archivo (`*.test.jsx`), con `mockRoutes` y los fixtures del módulo (`modules/<key>/test/<key>Backend.js`). Ver [tests.md](tests.md).
