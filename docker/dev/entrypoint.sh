#!/bin/sh
# Entrypoint de DESARROLLO. Mismo contrato de roles que docker/prod/entrypoint.sh
#   web (por defecto) | websockets | schedule | <cualquier comando>
# Corre con el UID del host (compose `user:`), sin root ni su-exec.
set -eu

ROLE="${1:-web}"
cd /var/www

bootstrap() {
  # Todos los guardias preguntan por el ARTEFACTO FINAL, no por el directorio:
  # una instalación interrumpida deja el directorio y no sirve de nada.
  if [ ! -f .env ]; then
    echo "==> Creando backend/.env desde .env.example"
    cp .env.example .env
  fi

  if [ ! -f vendor/autoload.php ]; then
    echo "==> Instalando dependencias de Composer (primer arranque; puede tardar varios minutos)"
    composer install --no-interaction --no-progress

    if [ ! -f vendor/autoload.php ]; then
      echo "ERROR: composer install terminó sin generar vendor/autoload.php." >&2
      echo "       Borra backend/vendor y vuelve a levantar el contenedor." >&2
      exit 1
    fi
  fi

  mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions \
    storage/framework/views storage/logs bootstrap/cache

  if ! grep -q '^APP_KEY=.\+' .env; then
    echo "==> Generando APP_KEY"
    php artisan key:generate --no-interaction
  fi

  if [ ! -f storage/oauth-private.key ] || [ ! -f storage/oauth-public.key ]; then
    echo "==> Generando claves de Passport"
    php artisan passport:keys --no-interaction
  fi

  # public/resources -> storage/app/public (config/filesystems.php).
  if [ ! -e public/resources ] && [ ! -L public/resources ]; then
    php artisan storage:link --no-interaction || true
  fi

  # En producción esta vista es el index.html compilado de React. En dev el SPA
  # lo sirve el dev server de CRA en el host (:3000); aquí solo un marcador para que
  # GET / de Laravel responda 200. Está en .gitignore.
  if [ ! -f resources/views/app.blade.php ]; then
    echo "==> Creando resources/views/app.blade.php de desarrollo"
    cat > resources/views/app.blade.php <<'HTML'
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ config('app.name', 'Laravel') }} (dev)</title>
</head>
<body>
  <p>API de desarrollo. El SPA de React se corre aparte con <code>npm start</code> (http://localhost:3000).</p>
</body>
</html>
HTML
  fi

  # Migraciones explícitas: en dev se lanzan a mano (README). RUN_COMMANDS=true
  # las ejecuta en cada arranque. Los seeders nunca corren solos.
  if [ "${RUN_COMMANDS:-false}" = "true" ]; then
    echo "==> Ejecutando migraciones"
    php artisan migrate --force --no-interaction
  fi
}

case "${ROLE}" in
  web)
    bootstrap
    echo "==> Iniciando FrankenPHP (dev)"
    exec frankenphp run --config /etc/caddy/Caddyfile
    ;;
  websockets)
    echo "==> Iniciando servidor de WebSockets en :6001"
    exec php artisan websockets:serve --host=0.0.0.0 --port=6001
    ;;
  schedule)
    # En APP_ENV=local el Kernel lanza `queue:listen` desde el scheduler:
    # no hace falta un worker aparte.
    echo "==> Iniciando scheduler"
    exec php artisan schedule:work
    ;;
  *)
    exec "$@"
    ;;
esac
