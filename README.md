# <img src='./frontend/src/img/gedure-logo-recto.svg' alt='Gedure Logo' width='300' />
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

El entorno de desarrollo usa el mismo runtime que producción (FrankenPHP + PHP 8.5, MariaDB). Requisitos: Docker con Compose v2 y, para el frontend, Node.js 22 con npm en el host. En Windows, clona el repositorio **dentro de WSL2** (`~/`, no `/mnt/c/` ni `C:\`): el datadir de la base de datos, `vendor/` y `node_modules/` no funcionan bien sobre el sistema de archivos de Windows.

| Servicio | Qué es | URL |
|---|---|---|
| `app` | Laravel 10 (FrankenPHP) | http://localhost y https://localhost |
| `websockets` | laravel-websockets (se accede por `/app` de la app) | sin puerto publicado |
| `schedule` | `schedule:work`; en `APP_ENV=local` lanza también `queue:listen` | - |
| `db` | MariaDB 11.4 (datos en `docker/dbdata`) | sin puerto publicado |
| `adminer` | cliente web de la base de datos (servidor `db`, usuario `root`) | http://localhost:8080 |

### Primer arranque

```bash
cp .env.example .env        # opcional: solo para cambiar puertos/UID/contraseña
docker compose up -d        # construye la imagen; tarda varios minutos la primera vez
```

En el primer arranque el contenedor `app` crea `backend/.env` desde `backend/.env.example`, ejecuta `composer install`, genera `APP_KEY` y las claves de Passport (`passport:keys`). Sigue el progreso con `docker compose logs -f app`. Lo que queda a mano:

```bash
docker compose exec app php artisan migrate
docker compose exec app php artisan passport:client --personal   # sin cliente personal el login falla
docker compose exec app php artisan db:seed                      # opcional: datos de prueba (usa factories)
```

(`RUN_COMMANDS=true` en `.env` ejecuta `migrate` en cada arranque.)

### Frontend (React, fuera de Docker)

El SPA no forma parte del compose: se corre con npm en el host, contra la app de Docker.

```bash
cd frontend
npm ci --legacy-peer-deps                 # solo la primera vez o al cambiar package-lock.json
REACT_APP_BACKEND=localhost npm start     # http://localhost:3000
```

- `--legacy-peer-deps`: conflicto de peer deps preexistente (reactour pide React 16/17; el proyecto usa 18).
- `REACT_APP_BACKEND` es el host del backend: el SPA llama a `http(s)://REACT_APP_BACKEND/api` (`src/index.js`) y conecta los WebSockets a ese host en 80/443 (`src/hooks/useSockets.js`). Por eso `APP_PORT`/`APP_SSL_PORT` deben seguir en 80/443 para usar el frontend; si esos puertos están ocupados, la API sigue accesible en el puerto elegido pero el SPA de `:3000` no la encontrará.
- En Windows (PowerShell) la variable se define con `$env:REACT_APP_BACKEND="localhost"; npm start`.

### Notas

- Los archivos que genera el contenedor en `backend/` pertenecen a tu usuario (`HOST_UID`/`HOST_GID`, por defecto 1000).
- Comandos: `docker compose exec app php artisan ...`, `docker compose exec app composer ...`, `docker compose exec app php artisan test`.
- `docker/dbdata` lo crea MariaDB como root: para borrar la base de datos usa `docker compose down && docker run --rm -v "$PWD/docker:/d" alpine rm -rf /d/dbdata`.
- Si `composer install` se interrumpe, basta con volver a levantar: el arranque se repara solo (comprueba `vendor/autoload.php`).

### HTTPS con la CA de Caddy

`https://localhost` usa un certificado de la CA local de Caddy, guardada en `docker/caddy/caddy/pki/authorities/local/root.crt` (aparece tras el primer arranque). Para que el navegador confíe en ella:

- **Linux:** `sudo cp docker/caddy/caddy/pki/authorities/local/root.crt /usr/local/share/ca-certificates/caddy-gedure.crt && sudo update-ca-certificates`. Chrome/Chromium además: `certutil -d sql:$HOME/.pki/nssdb -A -t "C,," -n caddy-gedure -i docker/caddy/caddy/pki/authorities/local/root.crt`. Firefox usa su propio almacén (importar el certificado en Ajustes).
- **Windows** (el navegador corre en Windows aunque el repo esté en WSL2), PowerShell como administrador: `Import-Certificate -FilePath .\docker\caddy\caddy\pki\authorities\local\root.crt -CertStoreLocation Cert:\LocalMachine\Root`.
- Comprobación sin tocar el sistema: `curl --cacert docker/caddy/caddy/pki/authorities/local/root.crt https://localhost/`.

## Producción

La imagen se construye con `Dockerfile.prod` al subir un tag `vX.Y.Z` (workflow `.github/workflows/built_image.yml`) y se publica en `ghcr.io/recker112/gedure`. Una misma imagen sirve todos los procesos; el rol se elige con el comando: `web` (por defecto), `websockets`, `worker` o `schedule`.

