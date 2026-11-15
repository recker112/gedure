# Rutas y loaders

`router/routes.jsx` con `createBrowserRouter` (`Router.jsx`). Todas las pantallas se cargan con `lazy: lazyPage(() => import(...))` (relanza un fallo de chunk como `ChunkLoadError`). El catch-all de Laravel (`routes/web.php`) no sirve la SPA para `api`, `up`, `app`, `broadcasting` ni `assets/`: ninguna ruta puede empezar por esos segmentos.

## Árbol actual

| URL | Guard / loader | Layout | Pantalla |
|---|---|---|---|
| `/`, `/nosotros`, `/noticias`, `/noticias/:slug`, `/contactanos`, `*` | `publicLoader` (relogin silencioso en segundo plano); `/` además `homeLoader` | `PublicLayout` | `core/home`, `about`, `news`, `contact`, `notfound` |
| `/auth`, `/auth/forgot-password` | `NoSeeAuth` + `guestLoader` | `LoginLayout` | `core/login`, `core/forgot` |
| `/auth/2fa` | `AuthProtect` + `protectLoader` | `LoginLayout` | `core/2fa` |
| `/auth/logout` | `AuthProtect` + `logoutLoader` | `LoginLayout` | `core/logout` |
| `/gedure` | `AuthProtect` + `protectLoader` | `AuthLayout` > `ContainerGedure` | `core/panel/PanelHome` |
| `/gedure/no-perm` | (hereda el `AuthProtect` de `/gedure`, sin permisos) | `ContainerGedure` | `core/panel/NoPermPage` |
| `/gedure/<key>/...` | `AuthProtect` con permisos (`moduleRoute`) | `ContainerGedure` | pantallas de cada módulo (hoy ninguno) |
| `/gedure/*` | — | `ContainerGedure` | `core/panel/PanelNotFoundPage` (404 con AppBar y menú) |
| `/login`, `/entrar` | — | — | `Navigate` a `/auth` |

## Loaders y guards (dos capas, a propósito)

- **Loaders** (`router/sessionLoaders.js`) redirigen **antes de pintar** (sin parpadeo): `ensureSession()` hace un único relogin compartido entre loaders paralelos; `guestLoader` saca de `/auth` a quien ya tiene sesión; `protectLoader` exige sesión y gestiona el token temporal del 2FA; `homeLoader` manda `/` al panel si hay sesión guardada (salvo `?sitio=1`).
- **Guards** (`components/routers/Routers.jsx`: `NoSeeAuth`, `AuthProtect`) son rutas layout que reaccionan a **cambios de Redux sin navegación** (login, 2FA, logout no llaman a `navigate`: el endpoint actualiza `auth` y el guard redirige con `replace`).
- Sin conexión (`FETCH_ERROR`, 502-504): el loader lanza `OfflineError` y `ErrorFallback` muestra "sin conexión" con Reintentar; la sesión **no** se cierra.

## Rama privada (implementada en la fase 0)

```
/gedure                       AuthProtect + protectLoader
└── AuthLayout                (aquí se abrirá Echo)
    └── ContainerGedure (lazy)    AppBar + Drawer (desde apps/registry.js) + <main>
        ├── index             core/panel/PanelHome
        ├── no-perm           core/panel/NoPermPage   (AuthProtect SIN permisos)
        ├── ...moduleRoutes   cada módulo: AuthProtect permission=… (HERMANOS de no-perm)
        └── *                 core/panel/PanelNotFoundPage (404 del panel)
```

- `cuenta` (`core/account`) está **reservada** (`RESERVED_KEYS`) para la cuenta propia futura; aún no hay ruta.
- **Guard fuera, layout dentro:** `AuthLayout` abrirá el socket y el backend rechaza el token temporal en `/api/broadcasting/auth`.
- Los `AuthProtect` con `permission` deben ser **hermanos** de `/gedure/no-perm`, nunca ancestros (bucle de redirección).
- `AuthProtect` acepta las props `permission` (string o array, basta uno) y `allPermissions`; sin cumplirlos redirige a `NO_PERM_PATH` (`/gedure/no-perm`, en `Routers.jsx`) con `replace`. El owner pasa siempre.
- El menú y la ruta usan **la misma** definición (`config.js` del módulo), así nunca se ve un enlace que lleva a `/no-perm`.

## Loaders de datos en módulos

Por defecto **no**: las pantallas piden sus datos con hooks de RTK Query (con esqueleto y error propios). Un loader de módulo solo se justifica para redirigir antes de pintar (p. ej. `/gedure/notas` → la carga del lapso activo). Si lo hay, despacha contra el `store` importado (`store.dispatch(api.endpoints.x.initiate())`), espera con `unwrap()` y llama a `reset()` / `unsubscribe()` al terminar, como `ensureSession`.

## Parámetros de URL

Estado navegable en la URL (`?tab=`, `?lapso=`, filtros) con `useSearchParams` y `replace`; un valor desconocido o sin permiso cae al valor por defecto.
