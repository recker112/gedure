#!/bin/sh
# HEALTHCHECK de la imagen, consciente del rol del contenedor.
# El entrypoint escribe el rol en /tmp/container-role al arrancar.
#   web        -> GET / debe responder 2xx (Caddy + PHP + vista del SPA).
#   websockets -> el puerto 6001 acepta conexiones.
#   worker / schedule / comando puntual -> sano mientras el proceso viva
#     (si muere, el contenedor termina y la política restart lo levanta).
ROLE="$(cat /tmp/container-role 2>/dev/null || echo web)"

case "${ROLE}" in
  web)
    exec wget -q -O /dev/null -T 4 http://127.0.0.1/
    ;;
  websockets)
    exec php -r 'exit(@fsockopen("127.0.0.1", 6001, $e, $s, 3) ? 0 : 1);'
    ;;
  *)
    exit 0
    ;;
esac
