# Frontend de Gedure

SPA de React 19 + Vite 8 (React Compiler vía oxc, MUI 9, React Router 7, Redux Toolkit 2 / RTK Query). Contiene la web pública de La Candelaria y el acceso a Gedure (login, 2FA, recuperar contraseña y el panel privado). La estructura sigue la de BluLabel.

## Desarrollo

```bash
npm ci
npm run dev        # https://localhost:5173 (certificado local de mkcert en ./certs)
```

El backend corre con el stack de Docker de la raíz (`docker compose up -d`): la app queda en `http://localhost` (80) y `https://localhost` (443, CA local de Caddy).

### API y proxy del dev server

La SPA llama siempre a la ruta **relativa** `/api/v1` (`src/store/services/ReduxDefault.js`):

- **Producción**: Laravel sirve la SPA y la API en el mismo origen, así que no hace falta CORS.
- **Desarrollo**: `vite.config.js` define `server.proxy` para que `/api` se reenvíe al backend desde el propio `https://localhost:5173`. Para el navegador es el mismo origen, así que tampoco hace falta CORS ni confiar en la CA de Caddy.

El destino por defecto es `http://localhost:80` (el puerto HTTP del contenedor `app`). Para cambiarlo, define `API_PROXY_TARGET` en `frontend/.env` o en el entorno. No lleva el prefijo `VITE_` porque no llega al cliente:

```bash
API_PROXY_TARGET=http://localhost:8081 npm run dev
```

Si apunta a `https://` con la CA de Caddy, el proxy no verifica el certificado (`secure: false`). El WebSocket de Reverb (`/app`) todavía no se reenvía porque Echo no está montado.

### Probar el login

Con el backend migrado y sembrado (`php artisan migrate --seed` en el contenedor `app`):

- Contraseña `password` para todos. Se entra con el usuario/cédula o con el correo:

  | Usuario | Correo | Rol |
  | --- | --- | --- |
  | `12345678` | `owner@example.com` | owner |
  | `11111111` | `admin@example.com` | admin |
  | `22222222` | `profesor@example.com` | profesor |
  | `33333333` | `representante@example.com` | representante |

- Con `MAIL_MAILER=log`, los códigos del 2FA y de recuperación aparecen en `backend/storage/logs/laravel.log`. Los procesa el `worker`, porque los correos van a la cola.

## Rutas

| Ruta | Pantalla | Guard |
| --- | --- | --- |
| `/`, `/nosotros`, `/noticias`, `/noticias/:slug`, `/contactanos` | Web pública | — |
| `/auth` | Login (`core/login`) | `NoSeeAuth` |
| `/auth/forgot-password` | Recuperar contraseña, en dos pasos (`core/forgot`) | `NoSeeAuth` |
| `/auth/2fa` | Código del 2FA (`core/2fa`) | `AuthProtect` |
| `/auth/logout` | Cierre de sesión (`logoutLoader`) | `AuthProtect` |
| `/gedure` | Panel privado (placeholder, `core/panel`) | `AuthProtect` + `AuthLayout` |
| `/login`, `/entrar` | Redirigen a `/auth` | — |

Ninguna ruta puede empezar por `api`, `up`, `app`, `broadcasting` ni `assets/`: son las exclusiones del catch-all de `backend/routes/web.php`. `src/router/routes.test.jsx` lo comprueba.

## Sesión

- **Flujo.** `POST /auth/login` devuelve un token **temporal** (`token_can: ["2fa_required"]`). `POST /auth/2fa` lo canjea por el definitivo. Las pantallas no navegan: actualizan el slice `auth`, y los guards (`components/routers/Routers.jsx`) redirigen.
- **Dónde se guarda el token.** `auth.apiKey` (con el prefijo `gd.`) va siempre en `sessionStorage`. Con "Mantener sesión iniciada" (`remember_me`) también va en `localStorage` (`components/utils/storage.js`).
- **Recarga de la página.** `router/rootLoader.js` revalida el token guardado con `POST /auth/relogin` antes de renderizar. Con el token temporal, las rutas de sesión van a `/auth/2fa`. Sin conexión lanza `OfflineError` y muestra la pantalla de "Reintentar" sin cerrar la sesión.
- **Errores** (`store/services/ReduxDefault.js` + `components/notify/`, avisos con sonner):
  - 422: cada error va a su campo de react-hook-form.
  - 401: avisa "Tu sesión expiró" y ejecuta `logoutApp`.
  - 429 y el resto: aviso con el `msg` del backend.
- **Cierre de sesión.** `logoutApp` limpia el storage y vacía las cachés de RTK Query (listener en `store.js`).
- **Pendiente: sockets.** Echo/Reverb todavía no se monta. Irá en `components/routers/AuthLayout.jsx`, porque el backend ya autoriza `/api/broadcasting/auth` con el Bearer definitivo.

## Tests

```bash
npm test           # vitest + Testing Library (jsdom)
```

La red se simula con `src/test/mockFetch.js` (`mockRoutes`) y `src/test/authBackend.js` (`serveAuth`, `signIn`, `resetAuth`). La guardia `src/test/fetchGuard.js` hace fallar cualquier test que haga un `fetch` sin simular.

## React Compiler

El React Compiler está activado con la integración nativa en Rust de plugin-react (`react({ compiler: true })` en `vite.config.js`, sobre `oxc-transform-react`), sin Babel. Más información en [la documentación de React](https://react.dev/learn/react-compiler).

## Lint

`npm run lint` ejecuta Oxlint con `.oxlintrc.json`. Además, `vite-plugin-oxlint` lo integra en Vite:

- `npm run dev`: informa al arrancar y en cada HMR, sin bloquear.
- `npm run build`: falla si hay errores de lint (los warnings no).
- `npm test`: no lo ejecuta.

## Build

`npm run build` escribe en `../backend/public` (`assets/`, `favicon.png`, `apple-touch-icon.png`) y mueve el `index.html` a `backend/resources/views/app.blade.php`. Laravel sirve esa vista para cualquier ruta del cliente.
