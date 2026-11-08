#!/bin/sh
# HEALTHCHECK de la imagen, consciente del rol del contenedor.
# El entrypoint escribe el rol en /tmp/container-role al arrancar.
#   web    -> GET /up (health route de Laravel) debe responder 2xx.
#   reverb -> el puerto 8080 acepta conexiones.
#   worker / schedule / comando puntual -> sano mientras el proceso viva
#     (si muere, el contenedor termina y la política restart lo levanta).
ROLE="$(cat /tmp/container-role 2>/dev/null || echo web)"

case "${ROLE}" in
  web)
    exec wget -q -O /dev/null -T 4 http://127.0.0.1/up
    ;;
  reverb)
    exec php -r 'exit(@fsockopen("127.0.0.1", 8080, $e, $s, 3) ? 0 : 1);'
    ;;
  *)
    exit 0
    ;;
esac
