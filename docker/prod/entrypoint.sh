#!/bin/sh
# Entrypoint único de la imagen de producción de Gedure (Dockerfile.prod).
#
# La misma imagen sirve todos los procesos; el ROL llega como primer
# argumento (el `command:` de cada servicio en el compose del VPS):
#   web       FrankenPHP/Caddy en :80 (Laravel + build de React + proxy de /app)
#   reverb    Laravel Reverb (reverb:start) en :8080
#   worker    queue:work (cola por defecto)
#   schedule  schedule:work
# Cualquier otro argumento se ejecuta tal cual como el usuario de la app, p. ej.
#   docker run --rm <imagen> php artisan tinker
set -eu

ROLE="${1:-web}"

# www-data en Alpine.
APP_UID="${APP_UID:-82}"
APP_GID="${APP_GID:-82}"

as_app() {
  su-exec "${APP_UID}:${APP_GID}" "$@"
}

cd /var/www

case "${ROLE}" in
  web|reverb|worker|schedule) IS_ROLE=true ;;
  *) IS_ROLE=false ;;
esac

# El healthcheck lee el rol de aquí (ver docker/prod/healthcheck.sh).
if [ "${IS_ROLE}" = "true" ]; then
  echo "${ROLE}" > /tmp/container-role
else
  echo "command" > /tmp/container-role
fi

# ── APP_KEY ───────────────────────────────────────────────────────────────
# Nunca se genera aquí: debe ser estable entre despliegues (si cambia se
# invalidan sesiones y todo lo cifrado). Si falta, fallar rápido.
if [ "${IS_ROLE}" = "true" ] && [ -z "${APP_KEY:-}" ]; then
  echo "ERROR: la variable de entorno APP_KEY no está definida." >&2
  echo "       Genérala una vez con: docker run --rm <imagen> php artisan key:generate --show" >&2
  echo "       y defínela en el entorno del stack antes de desplegar." >&2
  exit 1
fi

# ── storage/ ──────────────────────────────────────────────────────────────
# El volumen persistente llega vacío en el primer despliegue y tapa la
# estructura que trae la imagen.
if [ ! -d /var/www/storage/app ] && [ -d /var/www/storage_defaults ]; then
  echo "==> storage/ vacío: restaurando estructura desde la imagen"
  cp -a /var/www/storage_defaults/. /var/www/storage/
fi

mkdir -p \
  /var/www/storage/app/public \
  /var/www/storage/framework/cache/data \
  /var/www/storage/framework/sessions \
  /var/www/storage/framework/views \
  /var/www/storage/logs \
  /var/www/bootstrap/cache

chown -R "${APP_UID}:${APP_GID}" /var/www/storage /var/www/bootstrap/cache
chmod -R ug+rwX /var/www/storage /var/www/bootstrap/cache

# ── Espera a la base de datos ────────────────────────────────────────────
wait_for_db() {
  attempt=0
  max_attempts="${DB_WAIT_ATTEMPTS:-30}"
  until php /usr/local/bin/wait-for-db.php >/dev/null 2>&1; do
    attempt=$((attempt + 1))
    if [ "${attempt}" -ge "${max_attempts}" ]; then
      echo "==> ERROR: no se pudo conectar a la base de datos ${DB_HOST:-127.0.0.1}:${DB_PORT:-3306} tras ${max_attempts} intentos." >&2
      echo "==> Causa:" >&2
      # Sin silenciar: host, credenciales o base inexistente.
      php /usr/local/bin/wait-for-db.php >&2 || true
      return 1
    fi
    echo "==> Esperando a la base de datos (${attempt}/${max_attempts})..."
    sleep 2
  done
  echo "==> Base de datos disponible"
}

if [ "${IS_ROLE}" = "true" ]; then
  wait_for_db
fi

# ── Tareas de arranque del rol web ───────────────────────────────────────
if [ "${ROLE}" = "web" ]; then
  # public/storage -> storage/app/public (config/filesystems.php).
  # public/ vive en la imagen, así que el enlace se recrea en cada arranque.
  rm -rf /var/www/public/storage
  as_app php artisan storage:link

  if [ "${RUN_COMMANDS:-false}" = "true" ]; then
    echo "==> Ejecutando migraciones"
    as_app php artisan migrate --force --no-interaction

    # Los seeders crean datos/usuarios iniciales: nunca por defecto.
    if [ "${RUN_SEEDERS:-false}" = "true" ]; then
      echo "==> Ejecutando seeders"
      as_app php artisan db:seed --force --no-interaction
    fi

    # Aquí y no en el build: en build las variables del entorno no existen y
    # quedarían cacheadas vacías.
    echo "==> Cacheando configuración, rutas, vistas y eventos"
    as_app php artisan config:cache
    as_app php artisan route:cache
    as_app php artisan view:cache
    as_app php artisan event:cache
  fi
fi

case "${ROLE}" in
  web)
    echo "==> Iniciando FrankenPHP (versión ${APP_VERSION:-dev})"
    exec su-exec "${APP_UID}:${APP_GID}" frankenphp run --config /etc/frankenphp/Caddyfile
    ;;
  reverb)
    echo "==> Iniciando Laravel Reverb en :8080"
    exec su-exec "${APP_UID}:${APP_GID}" php artisan reverb:start --host=0.0.0.0 --port=8080
    ;;
  worker)
    echo "==> Iniciando worker de colas"
    # --max-time: el worker sale limpio cada hora (libera memoria y recoge
    # código nuevo) y la política restart del compose lo vuelve a levantar.
    exec su-exec "${APP_UID}:${APP_GID}" php artisan queue:work \
      --tries=3 --max-time=3600
    ;;
  schedule)
    echo "==> Iniciando scheduler"
    exec su-exec "${APP_UID}:${APP_GID}" php artisan schedule:work
    ;;
  *)
    exec su-exec "${APP_UID}:${APP_GID}" "$@"
    ;;
esac
