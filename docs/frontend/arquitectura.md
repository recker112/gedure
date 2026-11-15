# Arquitectura del frontend

SPA en JavaScript (sin TypeScript): React 19 + React Compiler (oxc), Vite 8, MUI 9, Redux Toolkit 2 / RTK Query, React Router 7 (data router), react-hook-form, sonner. Lint con oxlint (no ESLint). Tests con Vitest + Testing Library + user-event. Estructura tomada de BluLabel, con una regla propia: **`core/` solo para lo esencial, todo lo demás en `modules/`**.

Documentos hermanos: [modulos.md](modulos.md), [rutas.md](rutas.md), [estado-y-api.md](estado-y-api.md), [permisos.md](permisos.md), [ui.md](ui.md), [tests.md](tests.md).

## Estructura de `src/` (objetivo)

```
frontend/src/
├── main.jsx, App.jsx, Router.jsx, store.js, setupTests.js, school.js
├── router/                 # routes.jsx (árbol), sessionLoaders.js, logoutLoader.js, lazyPage.js
├── core/                   # SOLO lo esencial (ver abajo)
│   ├── login/ 2fa/ forgot/ logout/        # acceso
│   ├── home/ about/ news/ contact/ notfound/   # web pública
│   ├── panel/              # carcasa del panel: layout, drawer, AppBar, cuenta, inicio, /no-perm, 404
│   └── account/            # (futuro) cuenta propia: perfil, contraseña, sesiones, "Mis permisos"
├── apps/                   # infraestructura de módulos (ver modulos.md)
│   ├── registry.js         # configs de todos los módulos (menú)
│   ├── routes.js           # rutas de todos los módulos
│   ├── moduleRoute.js      # moduleRoute(key, hijas): path + AuthProtect desde el config
│   ├── moduleUrl.js        # moduleUrl(key, entrada, padres), moduleKeyOf(pathname)
│   └── *.test.js           # registry, moduleRoute, moduleUrl, plantilla
├── modules/                # SOLO módulos, una carpeta por funcionalidad (ver modulos.md)
│   ├── _plantilla/         # plantilla comentada, no registrada
│   ├── usuarios/  academico/  notas/  documentos/  finanzas/  pagos/  comunicacion/  preseleccion/
├── components/             # piezas reutilizables sin dominio: brand, form, menu, notify, routers, ui, utils
├── hooks/                  # por dominio transversal: auth/, theme/, utils/ (genéricos)
├── store/
│   ├── reducers/           # slices globales: auth, user (userConfig)
│   └── services/           # baseApi.js, ReduxDefault.js (baseQuery, handleQueryError) y auth/ (AuthApi)
├── test/                   # mockFetch, fetchGuard, renderRoute, authBackend (fixtures)
├── themes/                 # Candelaria.js, index.js (datos puros, los importa vite.config.js)
├── assets/  scss/
```

### Qué es `core/`

Solo: autenticación (login, 2FA, recuperar contraseña, logout), web pública (landing, nosotros, noticias públicas, contacto, 404), la **carcasa** del panel (layout, menú, inicio, sin permiso, 404) y, en el futuro, la cuenta propia. Si una pantalla pertenece a un área de negocio (usuarios, notas, pagos...), va en `modules/`, **incluida la administración de usuarios y permisos** (en BluLabel `/users` está en `core/`; en Gedure va en `modules/usuarios/`).

### Dirección de las dependencias

```
modules/<m>  →  components/, hooks/, store/services/ReduxDefault, core/panel (solo exports públicos)
core/        →  components/, hooks/, store/, apps/registry.js y apps/routes.js (nunca un módulo concreto)
modules/<a>  ✗→ modules/<b>   (salvo su API pública: modules/<b>/api/*, para invalidar o leer un catálogo)
```

Lo que dos módulos necesitan sube a `components/` o `hooks/`.

## Arranque

`main.jsx` → `App.jsx` (`AppProviders`: `Provider` de Redux → tema → `Toaster`) → `Router.jsx` (`createBrowserRouter(routes)`). Cualquier proveedor que use el tema va dentro del `Provider`.

## Convenciones (iguales a BluLabel)

- **React Compiler activo:** no añadas `useMemo`/`useCallback`/`memo` por rendimiento; solo por identidad semántica (dependencia de un efecto, tema de MUI). Excepción: `memo` en filas de listas largas, con comentario y test. Nada de `setState` síncrono en efectos (`react/set-state-in-effect` es error).
- **`.jsx` solo con JSX**; slices, servicios, hooks sin JSX y utilidades en `.js`. Imports sin extensión (salvo la cadena `themes/*.js`, que importa `vite.config.js`).
- **Imports agrupados** con comentarios de sección (`/** MUI */`, `/** Components */`, `/** Redux */`).
- **Sin barriles** (`index.js`), salvo `components/form/inputs`.
- **Subcarpetas por tema** solo con más de ~8 archivos no-test y 2+ temas de 3+ archivos; los tests junto a su archivo.
- **Storage** solo vía `components/utils/storage.js` (prefijo `gd.`); nunca `localStorage` directo.
- **Toasts** solo vía `components/notify/notify.jsx` (nadie más importa `sonner`, salvo el `Toaster` de `App.jsx`).
- **Autorización solo por permisos** (`useCanAccess`), nunca por roles ([permisos.md](permisos.md)).

## Migración (fase 0)

| Elemento | Estado | Nota |
|---|---|---|
| `core/panel` (placeholder) → `ContainerGedure`, `PanelHome`, `PanelDrawer`, `PanelAppBar`, `AccountMenu`, `NoPermPage`, `PanelNotFoundPage` | Hecho | Carcasa limpia. |
| `baseApi` única; `authApi` con `injectEndpoints`; sin `sessionScopedApis` | Hecho | [estado-y-api.md](estado-y-api.md). |
| `useCanAccess`, `permission`/`allPermissions` en `AuthProtect`, `/gedure/no-perm` | Hecho | [permisos.md](permisos.md). |
| `apps/` (`registry.js`, `routes.js`, `moduleRoute.js`, `moduleUrl.js`) y `modules/_plantilla/` | Hecho | [modulos.md](modulos.md). |
| `core/news/newsData.js` (datos fijos) | Pendiente (fase 7) | Pasará a la API pública de `modules/comunicacion`; ver [modulos.md](modulos.md#rutas-públicas-de-un-módulo). |
| `AuthLayout` sin Echo | Pendiente | `EchoProvider` cuando haya canales (permisos en caliente, notificaciones); `vite.config.js` deberá reenviar también `/app` (WebSocket). |
| `core/account` (perfil, contraseña, sesiones, "Mis permisos") | Pendiente (futuro) | La ruta `cuenta` está reservada. |

## Diferencias con BluLabel a tener presentes

- La API va por ruta **relativa** `/api/v1` con `server.proxy` de Vite en desarrollo (BluLabel usa `https://<host>/api/v1` contra Caddy).
- El panel vive en **`/gedure`** porque `/` es la web pública del colegio (BluLabel pone su hub en `/`).
- `build.emptyOutDir` es `false` (el plugin `laravel-output` limpia solo `assets/` e `index.html`); BluLabel vacía `backend/public`.
- Gedure ya usa `@testing-library/user-event`; BluLabel no.
- La infraestructura está en `src/apps/` como en BluLabel, pero conserva los nombres Gedure: `moduleRoute`/`moduleUrl` en lugar de `appRoute`/`appUrl`.
- **Una sola API de RTK Query** (`baseApi` con `injectEndpoints` por módulo, tags compartidos); BluLabel crea un `createApi` por app/módulo y no existe `modules/apis.js`.
