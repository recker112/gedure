# Gedure
Gedure es una App web de gestión educativa enfocado en los grados de primaria y bachillerato, utilizando un diseño moderno y simple para la comodidad de los usuarios.

## Funcionalidades de la versión 5.3.0
- Modo oscuro
- Página principal del instituto.
- Gestión y visualización de boletas.
- Alertas de errores en el sistema.
- Notificaciones en tiempo real.
- Creación, edición y borrado de administradores, estudiantes.
- Descarga de excel con todos los estudiantes activos.
- Permisos para los usuarios.
- Noticias públicas y privadas.
- Recuperación de contraseña (solo si el correo se encuentra registrado).
- Sistema de verificación de pagos (solo banco bicentenario).
- Mensualidades e inscripciones generadas automáticamente.
- Transferencia de saldo entre cuentas del sistema.
- Sincronización con el dolar del Banco Central de Venezuela.

## Desarrollo local (Docker)

El backend es **Laravel 13** (esqueleto base) con **Sanctum** (API por tokens, `routes/api.php`) y **Reverb** (WebSockets, protocolo Pusher). El entorno de desarrollo usa el mismo runtime que producción (FrankenPHP + PHP 8.5, MariaDB). Requisitos: Docker con Compose v2 y, para el frontend, Node.js 22 con npm en el host. En Windows, clona el repositorio **dentro de WSL2** (`~/`, no `/mnt/c/` ni `C:\`): el datadir de la base de datos, `vendor/` y `node_modules/` no funcionan bien sobre el sistema de archivos de Windows.

| Servicio | Qué es | URL |
|---|---|---|
| `app` | Laravel 13 (FrankenPHP); healthcheck en `/up` | http://localhost y https://localhost |
| `reverb` | Laravel Reverb en :8080 (el navegador entra por `/app` de la app) | sin puerto publicado |
| `worker` | `queue:listen` (cola `default`, conexión `database`) | - |
| `schedule` | `schedule:work` | - |
| `db` | MariaDB 11.4 (datos en `docker/dbdata`) | sin puerto publicado |
| `adminer` | cliente web de la base de datos (servidor `db`, usuario `root`) | http://localhost:8080 |

### Primer arranque

```bash
cp .env.example .env        # opcional: solo para cambiar puertos/UID/contraseña
docker compose up -d        # construye la imagen; tarda varios minutos la primera vez
```

En el primer arranque el contenedor `app` crea `backend/.env` desde `backend/.env.example`, ejecuta `composer install` y genera `APP_KEY`. Sigue el progreso con `docker compose logs -f app`. Lo que queda a mano:

```bash
docker compose exec app php artisan migrate      # incluye personal_access_tokens (Sanctum) y jobs (colas)
docker compose exec app php artisan db:seed      # opcional: datos de prueba
```

(`RUN_COMMANDS=true` en `.env` ejecuta `migrate` en cada arranque.)

### Frontend (Vite + React, fuera de Docker)

El SPA (`frontend/`: Vite 8, React 19 y React Compiler, JavaScript, linter Oxlint) no forma parte del compose: se corre con npm en el host (Node.js 22), contra la app de Docker.

```bash
cd frontend
cp .env.example .env     # solo la primera vez
npm ci                   # solo la primera vez o al cambiar package-lock.json
npm run dev              # https://localhost:5173 (HTTPS con mkcert; --host: accesible desde la red local)
npm run lint
npm test                 # vitest (una pasada) + Testing Library; `npm run test:watch` para modo watch
npm run build            # compila a backend/public y backend/resources/views/app.blade.php
```

- **HTTPS en dev (mkcert):** `npm run dev` usa `vite-plugin-mkcert`. La primera vez descarga el binario de mkcert, crea una CA local e intenta instalarla en el almacén de confianza del sistema (y de los navegadores), por lo que puede pedir tu contraseña (`sudo`) o una confirmación; después el navegador acepta `https://localhost:5173` sin avisos (reinicia el navegador si no lo reconoce). Todo se guarda en `frontend/certs/` (ignorado por git y Docker; contiene la clave de la CA, no la compartas). Solo afecta a `npm run dev`: `npm run build` y `npm test` no generan certificados. Es una CA distinta de la de Caddy de `https://localhost` (ver más abajo).
- Variables `VITE_*` (`frontend/.env.example`): son públicas, Vite las incrusta en el JS al compilar. `VITE_REVERB_APP_KEY` debe coincidir con `REVERB_APP_KEY` del backend (`LAC4ANDE47` por defecto); `VITE_REVERB_HOST`/`PORT`/`SCHEME` apuntan a Caddy (`/app` en `localhost:80`). Para el build de producción la key se pasa como `--build-arg VITE_REVERB_APP_KEY=...`.
- El cliente de WebSockets y el consumo de la API aún no están implementados (plantilla limpia de Vite).
- `npm run build` escribe los assets en `backend/public/assets` y mueve `index.html` a `backend/resources/views/app.blade.php` (ambos ignorados por git). No vacía `backend/public`: `index.php`, `.htaccess`, `robots.txt` y `favicon.ico` son del esqueleto de Laravel y siguen versionados ahí. En dev no hace falta compilar: el contenedor crea una vista `app` de marcador.
- `routes/web.php` tiene un catch-all hacia la vista `app` (excluye `api`, `up`, `app`, `broadcasting` y `assets/`), así que cualquier ruta del SPA responde 200 en el backend una vez compilado.

### Notas

- Los archivos que genera el contenedor en `backend/` pertenecen a tu usuario (`HOST_UID`/`HOST_GID`, por defecto 1000).
- Comandos: `docker compose exec app php artisan ...`, `docker compose exec app composer ...`, `docker compose exec app php artisan test`.
- `backend/package.json` es el de Laravel (Vite + Echo para `resources/js`); el frontend real es `frontend/`. No hace falta `npm install` en `backend/` salvo que uses vistas con `@vite`.
- `docker/dbdata` lo crea MariaDB como root: para borrar la base de datos usa `docker compose down && docker run --rm -v "$PWD/docker:/d" alpine rm -rf /d/dbdata`.
- Si `composer install` se interrumpe, basta con volver a levantar: el arranque se repara solo (comprueba `vendor/autoload.php`).

### HTTPS con la CA de Caddy

`https://localhost` usa un certificado de la CA local de Caddy, guardada en `docker/caddy/caddy/pki/authorities/local/root.crt` (aparece tras el primer arranque). Para que el navegador confíe en ella:

- **Linux:** `sudo cp docker/caddy/caddy/pki/authorities/local/root.crt /usr/local/share/ca-certificates/caddy-gedure.crt && sudo update-ca-certificates`. Chrome/Chromium además: `certutil -d sql:$HOME/.pki/nssdb -A -t "C,," -n caddy-gedure -i docker/caddy/caddy/pki/authorities/local/root.crt`. Firefox usa su propio almacén (importar el certificado en Ajustes).
- **Windows** (el navegador corre en Windows aunque el repo esté en WSL2), PowerShell como administrador: `Import-Certificate -FilePath .\docker\caddy\caddy\pki\authorities\local\root.crt -CertStoreLocation Cert:\LocalMachine\Root`.
- Comprobación sin tocar el sistema: `curl --cacert docker/caddy/caddy/pki/authorities/local/root.crt https://localhost/up`.

## Producción

La imagen se construye con `Dockerfile.prod` al subir un tag `vX.Y.Z` (workflow `.github/workflows/built_image.yml`) y se publica en `ghcr.io/recker112/gedure`. Una misma imagen sirve todos los procesos; el rol se elige con el comando:

| Rol | Proceso | Healthcheck |
|---|---|---|
| `web` (por defecto) | FrankenPHP en :80: Laravel + build de React; proxy de `/app` y `/app/*` a Reverb (`REVERB_UPSTREAM`, por defecto `reverb:8080`) | `GET /up` |
| `reverb` | `php artisan reverb:start --host=0.0.0.0 --port=8080` | puerto 8080 |
| `worker` | `php artisan queue:work --tries=3 --max-time=3600` | proceso vivo |
| `schedule` | `php artisan schedule:work` | proceso vivo |

Variables mínimas: `APP_KEY` (obligatoria, el contenedor no arranca sin ella), `APP_URL`, `DB_*` (`DB_CONNECTION=mariadb`), `BROADCAST_CONNECTION=reverb`, `REVERB_APP_ID`/`REVERB_APP_KEY`/`REVERB_APP_SECRET` (las mismas en web, reverb y worker), `REVERB_HOST=<servicio reverb>`, `REVERB_PORT=8080`, `REVERB_SCHEME=http` (Laravel publica por la red interna). `RUN_COMMANDS=true` en el rol `web` ejecuta migraciones y cachés al arrancar; `RUN_SEEDERS=true` además los seeders. La API REST de Reverb (`/apps/*`) no se expone por Caddy.

