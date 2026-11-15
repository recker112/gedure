# Notificaciones, Web Push y PWA

> **Convención de Gedure**, tomada de BluLabel (`oplaics-proyects/blulablel/docs/frontend/notificaciones.md`, `frontend/public/bl-sw.js`, `src/sw/pushClient.js`, `src/hooks/push/`). Aún no existe en el código; se implementa en la fase 9, la última: push y PWA juntos ([roadmap](../roadmap.md)). Contrato del servidor en [../backend/notificaciones.md](../backend/notificaciones.md).

## Notificaciones en la app

- Panel (campana) con lista por cursor (`infiniteQuery` de RTK Query), contador de no leídas en Redux y tiempo real con Echo (`channel.notification`).
- Registro de tipos `notifications/registry.jsx` por `type`: icono, color de la paleta (nunca un hex), `getText` y `getLink`. Un `type` desconocido se pinta con `title` y `body` del backend.

## Service worker

- Archivo `public/gedure-sw.js` (BluLabel: `bl-sw.js`): script clásico, sin compilar, que Vite copia tal cual a la raíz. Sin listener de `fetch` (no cachea ni intercepta).
- `push`: muestra el aviso con el payload del backend, agrupa por `tag` y no lo muestra si hay una ventana visible (ya sale el toast del socket), salvo en Safari/WebKit, que revoca la suscripción si un push no muestra nada.
- `notificationclick`: enfoca una ventana y le manda `postMessage` con la `url`; si no hay ventana, abre la URL.

## Suscripción

- `src/sw/pushClient.js`: funciones puras (registrar el SW, `urlBase64ToUint8Array`, `pushSupport()`: `supported`, `ios-install` o `unsupported`). Hooks en `src/hooks/push/`: `usePushSubscription` (interruptor en la cuenta; el permiso solo se pide por un gesto del usuario), `usePushSync` (sincroniza al iniciar sesión) y `usePushClickBridge` (clic con la app abierta). Mutations `subscribePush` y `unsubscribePush`; al cerrar sesión se da de baja la suscripción.
- La clave VAPID pública sale de `webpush_server` en la sesión.
- En iOS/iPadOS el push solo funciona con la app instalada en la pantalla de inicio.

## PWA instalable

- BluLabel solo trae `site.webmanifest` enlazado desde `index.html`, iconos (`icon-192/512`, `icon-maskable-*`, `apple-touch-icon`, `badge-96` monocromo) y el SW; **no** usa `vite-plugin-pwa` ni workbox.
- **Propuesta** para Gedure: mismo enfoque (manifest + SW a mano, iconos propios del colegio) más un aviso de instalación (`beforeinstallprompt`) en el panel. La PWA va **al final** (fase 9), junto con Web Push, cuando todo lo demás funciona.
