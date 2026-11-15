# Notificaciones y Web Push

> **Convención de Gedure**, tomada de BluLabel (`oplaics-proyects/blulablel/docs/backend/notificaciones.md` y `tiempo-real.md`). Aún no existe en el código; las notificaciones se implementan en la fase 7 y Web Push en la fase 9 (la última, junto con la PWA) ([roadmap](../roadmap.md)). Las notificaciones son un registro permanente del usuario; el Web Push es un canal más.

## Canales y clase base

- Notificaciones de Laravel con `database` (registro y contador de no leídas), `broadcast` (Reverb, tiempo real) y `WebPushChannel` (aviso del sistema).
- Clase base `App\Notifications\GedureNotification` (en BluLabel, `BluNotification`): `type()` estable en snake_case (un `type` publicado no se cambia), `title`/`body` en texto plano, `data()` variable y `url()` opcional. Va en cola `events`, tras el commit (`ShouldQueueAfterCommit`), y cada canal es su propio job.
- `webPush(): bool` (`true` por defecto) permite excluir tipos que solo valen con la app abierta. `via()` añade `WebPushChannel` solo si hay claves VAPID.
- El payload del push es mínimo: `title`, `body`, `icon`, `badge`, `tag` = `type()` y `data` = `{id, type, url}`, `TTL` 86400. Nunca el `data()` de dominio: se ve en la pantalla bloqueada.

## Web Push

- Paquete `laravel-notification-channels/webpush` (VAPID); modelo propio `PushSubscription` que añade `personal_access_token_id` (FK con `cascadeOnDelete`): al revocar la sesión, la suscripción de ese navegador desaparece sin código extra. `routeNotificationForWebPush()` devuelve solo suscripciones de sesiones activas.
- Tabla `push_subscriptions`. Máximo 10 por usuario (se borran las más antiguas).
- Rutas en el grupo `auth.full`, con `throttle:webpush` (20/min): `POST /api/v1/webpush/subscribe` (`{endpoint, keys: {p256dh, auth}, contentEncoding?}`) y `POST /api/v1/webpush/unsubscribe` (`{endpoint}`). El `endpoint` se valida solo `https` y contra una lista de hosts (FCM, Mozilla, WNS, Apple).
- La clave pública se entrega al frontend en el campo `webpush_server` de la respuesta de login/2FA/relogin (`null` si no hay VAPID).
- Variables de entorno: `VAPID_SUBJECT` (`mailto:` o URL), `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`; se generan una vez con `php artisan webpush:vapid`, se reenvían a `app` y `worker` en el compose y, al cambiarlas, hay que reiniciar el `worker` (las suscripciones con otra clave dejan de valer).
- El catch-all de la SPA debe excluir el service worker, para que un archivo ausente dé 404 y no el HTML.
