# Arquitectura del backend

Laravel 13 (PHP 8.5 en el runtime FrankenPHP), API **sin estado** con tokens Bearer de Sanctum, Reverb para tiempo real y MariaDB. Este documento fija las capas y cómo se reparte un módulo funcional en carpetas. Las respuestas HTTP están en [api.md](api.md); los permisos, en [permisos.md](permisos.md).

> Estructura tomada de BluLabel (`oplaics-proyects/blulablel/docs/backend/arquitectura.md`), adaptada al dominio escolar. Lo marcado como **propuesta** aún no existe en el código.

## Capas: quién hace qué

| Capa | Dónde | Responsabilidad |
|---|---|---|
| Ruta | `routes/api/<modulo>/<recurso>.api.php` | URL, middleware (`auth.full`, `permission:`, `throttle:`), `whereNumber`. Sin lógica. |
| FormRequest | `app/Http/Requests/<Modulo>/` | Validación (422) y, si aplica, `authorize()` sobre el registro (404 → Policy 403). |
| Controller | `app/Http/Controllers/<Modulo>/` | **Orquesta**: recibe el Request validado, llama al Service, devuelve `{status, msg, ...}` o un Resource. |
| Service | `app/Services/<Modulo>/` | Reglas de dominio (422 de dominio), transacciones, `lockForUpdate`, eventos, bitácora. Se inyecta por DI en el método del controller. |
| Resource | `app/Http/Resources/<Modulo>/` | Forma de salida campo a campo (nunca `toArray()` del modelo). |
| Policy | `app/Policies/<Modulo>/` | Permiso sobre **un registro concreto** (p. ej. un profesor solo carga notas de sus secciones). |
| Model | `app/Models/<Modulo>/` | Relaciones, scopes, casts, estado derivado. Sin reglas de negocio de varios pasos. |
| Enum | `app/Enums/<Modulo>/` | Estados y catálogos cerrados (`EstadoLapso`, `TipoEvaluacion`...). |
| Job / Event / Listener / Notification / Mail | `app/{Jobs,Events,Listeners,Notifications,Mail}/<Modulo>/` | Trabajo asíncrono; cola fijada con `#[Queue(...)]` ([colas.md](colas.md)). |
| Support | `app/Support/` | Utilidades puras sin dueño de módulo (cálculo de promedios, formateo de cédula...). |

Regla: **el controller no toca la base de datos más allá de lo trivial** (una consulta de listado con su Resource). En cuanto hay una regla, una transacción o más de un modelo, va al Service.

## Módulos: un nombre, la misma subcarpeta en cada capa

Un módulo funcional (p. ej. `Academico`, `Notas`, `Pagos`) usa **el mismo nombre de subcarpeta** en todas las capas. Así `grep -r Academico` o abrir la subcarpeta en cada capa da el módulo completo.

```
backend/
├── app/
│   ├── Enums/Academico/               # EstadoLapso, NivelEducativo...
│   ├── Http/
│   │   ├── Controllers/Academico/     # PeriodoEscolarController, LapsoController, SeccionController...
│   │   ├── Requests/Academico/        # StoreSeccionRequest, AbrirLapsoRequest, SeccionTargetRequest...
│   │   └── Resources/Academico/       # SeccionResource, LapsoResource...
│   ├── Models/Academico/              # PeriodoEscolar, Lapso, PlanEstudio, Materia, Seccion...
│   ├── Policies/Academico/            # SeccionPolicy...
│   ├── Services/Academico/            # LapsoService (ciclo de vida), TransicionPeriodoService...
│   ├── Events/Academico/  Jobs/Academico/  Notifications/Academico/  Mail/Academico/
├── database/
│   ├── migrations/                    # planas (Laravel no admite subcarpetas sin configurarlo)
│   ├── factories/Academico/           # LapsoFactory...
│   └── seeders/                       # PermissionsSeeder, DatabaseSeeder, DemoSeeder (solo desarrollo)
├── lang/es/academico.php              # mensajes de dominio (`__('academico.lapso_cerrado')`)
├── routes/api/academico/
│   ├── periodos.api.php
│   ├── lapsos.api.php
│   └── secciones.api.php
└── tests/
    ├── Feature/Academico/             # un archivo por recurso o flujo
    ├── Unit/Academico/                # lógica pura (cálculos, enums)
    └── Helpers/Academico.php          # helpers compartidos entre archivos del módulo
```

Hoy solo existe el módulo `Auth` y sigue este patrón: `Http/Controllers/Auth`, `Http/Requests/Auth`, `Services/Auth`, `Models/Auth`, `Enums/Auth`, `Mail/Auth`, `routes/api/auth/{auth,security_code}.api.php`, `tests/Feature/Auth`.

### Módulos previstos (propuesta)

| Módulo (namespace) | Carpeta de rutas | Fase | Contenido |
|---|---|---|---|
| `Auth` | `auth/` | hecho | Login, 2FA, sesión, códigos de seguridad. |
| `Usuarios` | `usuarios/` | 1 | Usuarios (owner, admin, profesor, representante), roles y permisos, estudiantes (registros, no usuarios) y su vínculo con representantes, importación masiva, bitácora. |
| `Academico` | `academico/` | 2 | Periodos escolares, lapsos, planes de estudio, materias, pensum, secciones, asignaciones, inscripción. |
| `Notas` | `notas/` | 3 | Carga de notas, recuperación, materias pendientes, cierre y registro de cambios. |
| `Documentos` | `documentos/` | 4 | Boletas PDF, resumen final y notas certificadas (plantillas Word). |
| `Finanzas` | `finanzas/` | 5 | Deudas, lotes de deuda, monederos, tasa BCV. |
| `Pagos` | `pagos/` | 6 | Reporte de pagos, estados de cuenta, conciliación. |
| `Comunicacion` | `comunicacion/` | 7 | Comunicados, noticias, notificaciones, soporte. |
| `Preseleccion` | `preseleccion/` | 8 | Pre-inscripción de nuevos ingresos. |

Lo transversal (usuario, roles, notificaciones base) no se duplica: `App\Models\User` se queda en la raíz de `Models/` (lo usa Sanctum y todos los módulos).

### Dependencias entre módulos

- Un módulo puede **leer** modelos de otro (p. ej. `Notas` usa `Academico\Seccion`), pero **las escrituras de otro módulo pasan por su Service** (p. ej. cerrar un lapso es `Academico\LapsoService`, aunque lo pida la pantalla de notas).
- Las reacciones entre módulos van por eventos (`Academico\LapsoCerrado` → listener en `Documentos` que prepara boletas), no llamando a mano a todos los interesados.

## `bootstrap/app.php` (lo que ya hay)

- `withRouting`: `routes/api.php` (prefijo `api` y, dentro, `Route::prefix('v1')`), `routes/web.php` (catch-all de la SPA), `routes/console.php` (scheduler), `health: '/up'`.
- `withBroadcasting`: `POST /api/broadcasting/auth` con `auth.full`; canales en `routes/channels.php`.
- `trustProxies` solo con rangos privados (Nginx Proxy Manager → Caddy). **Nunca `'*'`**: anularía el rate limiting por IP.
- Un solo `$middleware->alias([...])` (cada llamada reemplaza la anterior): `abilities`, `ability`, `tfa.completed`. Los de spatie (`permission`, `role`, `role_or_permission`) ya están en esa misma llamada (`bootstrap/app.php`).
- Grupo `auth.full` = `auth:sanctum` + `tfa.completed`. Es el middleware de **toda** ruta privada.
- `redirectGuestsTo`: `null` en `api/*` (401 JSON aunque no llegue `Accept`).
- Excepciones: JSON en `api/*`; `AccessDeniedHttpException` → 403 `{status, msg}` (nunca 401).

Pendiente respecto a BluLabel (decidir en fase 0/1): middleware `account.active` (cuentas suspendidas), `touch.last_seen`, cabecera `X-App-Version`.

## Modelos

- Atributos de Laravel 13: `#[Fillable]`, `#[Hidden]`, `#[Table]`, `#[UsePolicy]`, `#[Scope]`; `casts()` como método.
- Con nombres en español el plural automático falla (`Seccion` → `seccions`): **declara siempre la tabla** con `#[Table('secciones')]`.
- Estado **derivado** cuando se pueda (como `Announcement::status()` en BluLabel); estado **guardado** solo si tiene ciclo de vida administrado por personas (p. ej. `Lapso.estado`, que se abre y cierra a mano, ver [roadmap](../roadmap.md)).
- Nada de `$guarded = []`.

## Servicios en ejecución

Misma imagen con cuatro roles (`docker/prod/entrypoint.sh`): `app` (FrankenPHP + Caddy), `worker` (`queue:work --queue=high,events,default,emails`), `reverb` y `schedule` (`schedule:work`). No hay PHP en el host: `docker compose exec app php artisan ...`.
