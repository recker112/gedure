# Documentación de Gedure

Convenciones técnicas y plan de la reescritura. Puesta en marcha (Docker, frontend, HTTPS) en el [README raíz](../README.md) y en [frontend/README.md](../frontend/README.md).

La estructura sigue la de BluLabel (`oplaics-proyects/blulablel/docs/`) como **referencia estructural**: capas, Redux/RTK Query, router con loaders, colas, tests, autenticación y sistema de permisos. El diseño visual y el dominio son propios de Gedure.

## Por dónde empezar

1. [Hoja de ruta](roadmap.md): fases, roles, reglas del dominio escolar, método de trabajo y preguntas abiertas.
2. [Arquitectura del backend](backend/arquitectura.md) y [del frontend](frontend/arquitectura.md).
3. Antes de añadir un endpoint: [API](backend/api.md) y [permisos](backend/permisos.md).
4. Antes de añadir una pantalla: [módulos](frontend/modulos.md) y [estado y API](frontend/estado-y-api.md).
5. Antes de abrir un PR: [tests del backend](backend/tests.md) y [del frontend](frontend/tests.md).

## Backend

| Documento | Contenido |
|---|---|
| [backend/arquitectura.md](backend/arquitectura.md) | Capas (ruta, FormRequest, Controller, Service, Resource, Policy, Model), cómo se reparte un módulo en carpetas, módulos previstos, `bootstrap/app.php`, servicios. |
| [backend/api.md](backend/api.md) | Forma `{status, msg}`, códigos HTTP, validación, rutas (`routes/api/<modulo>/*.api.php`), cómo añadir una ruta, endpoints de auth. |
| [backend/permisos.md](backend/permisos.md) | spatie, catálogo `modulo.recurso.accion`, roles (owner, admin, profesor, representante), `permissions:sync`, Policies, delegación, endpoints de administración. |
| [backend/colas.md](backend/colas.md) | `QueueName`, prioridad, `#[Queue]`, trabajos pesados previstos, scheduler. |
| [backend/tests.md](backend/tests.md) | Pest con `test()`, trampa de `phpunit.xml`, helpers, qué probar por endpoint. |
| [backend/notificaciones.md](backend/notificaciones.md) | Propuesta (fases 7 y 9): canales de notificación, Web Push, VAPID, suscripciones. |
| [backend/convenciones.md](backend/convenciones.md) | Idioma de los identificadores, glosario del dominio, nombres de clases y tablas. |

## Frontend

| Documento | Contenido |
|---|---|
| [frontend/arquitectura.md](frontend/arquitectura.md) | Estructura de `src/`, regla `core/` (solo lo esencial) frente a `modules/`, convenciones, migración pendiente. |
| [frontend/modulos.md](frontend/modulos.md) | Anatomía de un módulo, `config.js` (menú y permisos), `routes.js`, registro, cómo añadir uno. |
| [frontend/rutas.md](frontend/rutas.md) | Árbol de rutas, loaders de sesión frente a guards, árbol objetivo del panel. |
| [frontend/estado-y-api.md](frontend/estado-y-api.md) | Store, `baseQuery`, `handleQueryError`, patrón de la API de un módulo, invalidación. |
| [frontend/permisos.md](frontend/permisos.md) | `useCanAccess`, guards, y el flujo de la pantalla de administración de roles y permisos. |
| [frontend/ui.md](frontend/ui.md) | Tema MUI de La Candelaria, carcasa del panel, estados de pantalla, formularios. |
| [frontend/notificaciones.md](frontend/notificaciones.md) | Propuesta (fases 7 y 9): panel, service worker, suscripción Web Push, PWA. |
| [frontend/tests.md](frontend/tests.md) | Build, oxlint, Vitest + Testing Library, `mockRoutes` y guardia de red. |

## Estado

Implementado: autenticación completa (login con usuario/cédula o correo, 2FA por correo, recordar sesión, recuperar contraseña, logout), web pública y un panel provisional. Todo lo marcado como "propuesta" o "fase N" en estos documentos aún no existe.
