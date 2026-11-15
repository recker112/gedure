# API: respuestas, códigos y validación

Convenciones HTTP de `/api/v1`. Son las que ya usa el módulo `Auth` (`AuthController`, `SecurityCodeController`, `bootstrap/app.php`) y las mismas de BluLabel, para que el frontend (`handleQueryError`, `notifyHttpStatus`) las trate igual en todos los módulos.

## Forma de la respuesta

Toda respuesta propia lleva `status` (el mismo código HTTP) y `msg` (texto en español, apto para un aviso):

```json
{ "status": 200, "msg": "Sesión cerrada" }
```

Datos adicionales van **al lado**, no anidados en otro sobre:

| Caso | Forma | Ejemplo real |
|---|---|---|
| Acción sin datos | `{status, msg}` | `POST /auth/logout` |
| Acción con datos | `{status, msg, ...campos}` | login: `{status, msg, user, token_can, permissions, roles, apiKey}` |
| Lectura de un recurso | `{status, data}` (Resource) | propuesta para los módulos |
| Listado paginado | `{status, data, next_cursor}` (`cursorPaginate`) o `{status, data, meta}` (`paginate`, si la UI necesita total de páginas) | propuesta |
| Creación | 201 `{status, msg, data}` | propuesta |
| Error de dominio | `{status: 422, msg}` | "El lapso ya está cerrado" |
| Error de dominio ligado a un campo | `{status: 422, msg, errors: {campo: [msg]}}` | 2FA: `errors.otp` |
| Demasiados intentos | 429 `{status, msg}` + `Retry-After` (y `retry_after` en el reenvío del 2FA) | `AppServiceProvider` |

Respuestas que genera el framework y se dejan tal cual:

| Caso | Cuerpo |
|---|---|
| FormRequest inválido | 422 `{message, errors}` |
| Sin token / token caducado | 401 `{message: "Unauthenticated."}` |
| Error interno (`APP_DEBUG=false`) | 500 `{message: "Server Error"}` |

```php
// Controller típico de un módulo (propuesta)
public function store(StoreSeccionRequest $request, SeccionService $service): JsonResponse
{
    $seccion = $service->create($request->validated());

    return response()->json([
        'status' => 201,
        'msg' => __('academico.seccion_creada'),
        'data' => SeccionResource::make($seccion),
    ], 201);
}
```

## Significado de los códigos

| Código | Uso en Gedure |
|---|---|
| 400 | Credenciales incorrectas (login). |
| 401 | **Solo** "no autenticado". El frontend hace logout con cualquier 401: nunca se usa para "sin permiso". |
| 403 | Autenticado sin permiso (middleware `permission:`, Policy, token sin la ability). Siempre `{status, msg}`. |
| 404 | No existe **o** no pertenece a quien pregunta (un representante pidiendo la boleta de un estudiante ajeno recibe 404, no 403). |
| 409 | Conflicto de estado concurrente, si hace falta distinguirlo del 422. |
| 422 | Validación (campo) o regla de dominio (lapso cerrado, nota fuera de rango...). |
| 429 | Rate limiting, con `{status, msg}`. |

Orden de comprobaciones en una ruta sobre un registro: **middleware 403 → 404 → Policy 403 → `rules()` 422 → Service 422** (detalle en [permisos.md](permisos.md)).

## Validación

- Un **FormRequest por acción** en `app/Http/Requests/<Modulo>/` (`StoreXRequest`, `UpdateXRequest`, `XTargetRequest` como base de las acciones sobre `/{id}`).
- Sin `messages()`: los textos salen de `lang/es/validation.php`. **Cada campo nuevo se añade a `attributes`** (`'lapso_id' => 'lapso'`), así el mensaje sale natural ("El campo lapso es obligatorio.").
- `messages()` solo para un mensaje intencionadamente distinto del genérico.
- Reglas reutilizables en `app/Rules/` (p. ej. `Cedula`, `NotaLiteral`, `NotaNumerica`); el frontend replica las mismas reglas en `components/form/rules.js` o en el módulo.
- Reglas que dependen del estado (¿el lapso está abierto para carga?) no van en `rules()`: van en el Service, dentro de la transacción, como 422 de dominio.
- Mensajes de dominio en `lang/es/<modulo>.php`, nunca escritos a mano en el controller.

## Rutas

- Un archivo por recurso en `routes/api/<modulo>/<recurso>.api.php` (convención que ya usa `routes/api/auth/`).
- `routes/api.php` es el índice: las privadas se incluyen **dentro** de `Route::middleware('auth.full')`. `auth:sanctum` a secas solo en el flujo de login (aceptaría el token temporal del 2FA).
- Nombres de ruta `<modulo>.<recurso>.<accion>` (`academico.secciones.store`); los tests usan `route(...)`.
- Parámetros numéricos con `whereNumber('id')`; rutas estáticas (`/lapsos/actual`) antes que `/{id}`.
- URLs en español, plural y kebab-case: `/academico/periodos`, `/academico/planes-estudio`, `/notas/cargas`.

```php
// routes/api.php
Route::middleware('auth.full')->group(function () {
    Route::prefix('academico')->group(function () {
        require __DIR__.'/api/academico/periodos.api.php';
        require __DIR__.'/api/academico/lapsos.api.php';
    });
});

// routes/api/academico/lapsos.api.php
Route::post('/lapsos/{id}/cerrar', [LapsoController::class, 'cerrar'])
    ->whereNumber('id')
    ->middleware('permission:'.Permission::AcademicoLapsoCerrar->value)
    ->name('academico.lapsos.cerrar');
```

### Cómo añadir una ruta

1. Archivo en `routes/api/<modulo>/` e `include` en `routes/api.php` dentro de `auth.full` (si es privada).
2. FormRequest + `attributes` en `lang/es/validation.php`.
3. Permiso en `App\Enums\Permission` y `->middleware('permission:...')` ([permisos.md](permisos.md)).
4. Si es pública, envía correos o acepta códigos: limitador por IP en `AppServiceProvider` y `throttle:<nombre>`.
5. Respuesta `{status, msg}` (+ `data`).
6. Tests: caso feliz, 401/403, 404, 422 y la regla de dominio; añádela al dataset de rutas privadas (propuesta: `tests/Datasets/RutasPrivadas.php`, como BluLabel) ([tests.md](tests.md)).
7. `docker compose exec app php artisan route:list --path=api`.

## Endpoints existentes

| Método y ruta | Middleware | Qué hace |
|---|---|---|
| `POST /auth/login` | `throttle:auth.login` | Credenciales (`login` = usuario/cédula o correo) → token temporal `2fa_required` (15 min) y código por correo. |
| `POST /auth/2fa` | `auth:sanctum`, `abilities:2fa_required`, throttle | Canjea el temporal por el definitivo. |
| `POST /auth/2fa/resend` | idem | Reenvía el código (25 s entre códigos). |
| `POST /auth/relogin` | `auth:sanctum` | Payload de sesión (también con el temporal). |
| `POST /auth/logout` | `auth:sanctum` | Borra el token actual. |
| `POST /auth/security/email/send` | throttle por IP | Código de restablecimiento (respuesta idéntica exista o no la cuenta). |
| `POST /auth/security/password/update` | throttle por IP | Cambia la contraseña con el código. |

Payload de sesión: `{status, msg, user: {id, name, username, email}, token_can, permissions: {"modulo.recurso.accion": true}, roles: ["admin"], is_owner: false, apiKey?}`. `permissions` es siempre un objeto (directos y por rol; el owner trae `{}` porque pasa por `Gate::before`, así que el cliente usa `is_owner`). Con el token temporal del 2FA el acceso va vacío: `permissions: {}`, `roles: []`, `is_owner: false`. Ver [permisos.md](permisos.md).

## Idioma

`APP_LOCALE=es` por defecto. `msg`, comentarios, correos y nombres de tests en español. Identificadores de código: ver [convenciones.md](convenciones.md).
