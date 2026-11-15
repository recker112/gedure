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
│   ├── panel/              # carcasa del panel: layout, menú lateral, AppBar, inicio del panel, /no-perm
│   └── account/            # (futuro) cuenta propia: perfil, contraseña, sesiones, "Mis permisos"
├── modules/                # UNA carpeta por funcionalidad (ver modulos.md)
│   ├── registry.js         # configs de todos los módulos (menú)
│   ├── routes.js           # rutas de todos los módulos
│   ├── moduleRoute.js      # moduleRoute(key, hijas): path + AuthProtect desde el config
│   ├── _plantilla/         # plantilla comentada, no registrada
│   ├── usuarios/  academico/  notas/  documentos/  finanzas/  pagos/  comunicacion/  preseleccion/
├── components/             # piezas reutilizables sin dominio: brand, form, menu, notify, routers, ui, utils
├── hooks/                  # por dominio transversal: auth/, theme/, utils/ (genéricos)
├── store/
│   ├── reducers/           # slices globales: auth, user (userConfig)
│   └── services/           # ReduxDefault.js (baseQuery, handleQueryError) y auth/ (AuthApi)
├── test/                   # mockFetch, fetchGuard, renderRoute, authBackend (fixtures)
├── themes/                 # Candelaria.js, index.js (datos puros, los importa vite.config.js)
├── assets/  scss/
```

### Qué es `core/`

Solo: autenticación (login, 2FA, recuperar contraseña, logout), web pública (landing, nosotros, noticias públicas, contacto, 404), la **carcasa** del panel (layout, menú, inicio, sin permiso) y la cuenta propia. Si una pantalla pertenece a un área de negocio (usuarios, notas, pagos...), va en `modules/`, **incluida la administración de usuarios y permisos** (en BluLabel `/users` está en `core/`; en Gedure va en `modules/usuarios/`).

### Dirección de las dependencias

```
modules/<m>  →  components/, hooks/, store/services/ReduxDefault, core/panel (solo exports públicos)
core/        →  components/, hooks/, store/, modules/registry.js y modules/routes.js (nunca un módulo concreto)
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

## Migración pendiente (no se mueve código en la fase 0 de documentación)

| Hoy | Debe quedar | Nota |
|---|---|---|
| `core/panel/PanelPage.jsx` (placeholder con AppBar propio) | `core/panel/PanelLayout.jsx` (ruta layout con AppBar + menú lateral desde `modules/registry.js` + `<main>`) y `core/panel/PanelHome.jsx` | Fase 0: carcasa limpia. |
| `core/logs/` (`LogsPage`, `mockData.js`) | `modules/usuarios/bitacora/` o eliminar | No está en el router e importa `components/ui/panel/*`, que no existe: es código huérfano de un prototipo. |
| `core/news/newsData.js` (datos fijos) | Datos de la API pública de `modules/comunicacion` (fase 7) | La pantalla pública puede quedarse en `core/news`; ver la decisión aprobada en [modulos.md](modulos.md#rutas-públicas-de-un-módulo). |
| `store.js` con `sessionScopedApis = [authApi]` y `authApi` como `createApi` propio | Una `baseApi` (`store/services/baseApi.js`); `authApi` y los módulos usan `injectEndpoints` | Ver [estado-y-api.md](estado-y-api.md). |
| No hay `useCanAccess`, `permission` en `AuthProtect` ni `/no-perm` | Fase 0 | [permisos.md](permisos.md). |
| `AuthLayout` sin Echo | `EchoProvider` cuando haya canales (permisos en caliente, notificaciones) | `vite.config.js` deberá reenviar también `/app` (WebSocket). |
| No existe `modules/` | `modules/registry.js`, `routes.js`, `moduleRoute.js`, `_plantilla/` | Fase 0. |

## Diferencias con BluLabel a tener presentes

- La API va por ruta **relativa** `/api/v1` con `server.proxy` de Vite en desarrollo (BluLabel usa `https://<host>/api/v1` contra Caddy).
- El panel vive en **`/gedure`** porque `/` es la web pública del colegio (BluLabel pone su hub en `/`).
- `build.emptyOutDir` es `false` (el plugin `laravel-output` limpia solo `assets/` e `index.html`); BluLabel vacía `backend/public`.
- Gedure ya usa `@testing-library/user-event`; BluLabel no.
- **Una sola API de RTK Query** (`baseApi` con `injectEndpoints` por módulo, tags compartidos); BluLabel crea un `createApi` por app/módulo y no existe `modules/apis.js`.
