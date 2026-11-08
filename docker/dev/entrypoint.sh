#!/bin/sh
# Entrypoint de DESARROLLO. Mismo contrato de roles que docker/prod/entrypoint.sh
#   web (por defecto) | reverb | worker | schedule | <cualquier comando>
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

  # public/storage -> storage/app/public (config/filesystems.php).
  if [ ! -e public/storage ] && [ ! -L public/storage ]; then
    php artisan storage:link --no-interaction || true
  fi

  # En producción esta vista es el index.html compilado de React. En dev el SPA
  # lo sirve el dev server de Vite en el host (:5173); aquí solo un marcador por
  # si routes/web.php apunta a view('app') (catch-all del SPA). Está en
  # .gitignore.
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
  <p>API de desarrollo. El SPA de React se corre aparte con <code>npm run dev</code> (http://localhost:5173).</p>
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
  reverb)
    echo "==> Iniciando Laravel Reverb en :8080"
    exec php artisan reverb:start --host=0.0.0.0 --port=8080
    ;;
  worker)
    # queue:listen y no queue:work: recarga el código en cada job, así los
    # cambios en backend/ se ven sin reiniciar el contenedor.
    echo "==> Iniciando worker de colas (queue:listen)"
    exec php artisan queue:listen --tries=3
    ;;
  schedule)
    echo "==> Iniciando scheduler"
    exec php artisan schedule:work
    ;;
  *)
    exec "$@"
    ;;
esac
