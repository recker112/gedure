# Permisos y roles

**Convención de Gedure**, tomada del sistema de BluLabel (`blulablel/docs/backend/permisos.md`) y adaptada a un colegio. **Fase 0 (hecha):** paquete, catálogo, roles, `permissions:sync`, `Gate::before`, payload de sesión y evento en tiempo real. **Fase 1** ([roadmap](../roadmap.md)): endpoints de administración y reglas de owner (ver más abajo). La pantalla de administración está en [../frontend/permisos.md](../frontend/permisos.md).

**Aprobado:** owner por `Gate::before` (solo un owner da el rol y siempre queda uno), `admin` como rol editable con todo el catálogo, nombres `modulo.recurso.accion` y administración en `modules/usuarios/`.

## Piezas

| Pieza | Dónde |
|---|---|
| Paquete | `spatie/laravel-permission` (guard `web`, sin equipos, `events_enabled => true`) |
| Catálogo de permisos | `app/Enums/Permission.php` (backed enum, **única fuente**) |
| Roles y sus permisos iniciales | `app/Enums/Role.php` (`permissions()`, `label()`, `description()`) |
| Sincronización con la BD | `app/Console/Commands/SyncPermissions.php` → `php artisan permissions:sync` |
| Seeder | `database/seeders/PermissionsSeeder.php` (solo llama a `permissions:sync`) |
| Superusuario | `Gate::before` en `AppServiceProvider` para el rol `owner` |
| Permiso sobre un registro | `app/Policies/<Modulo>/*Policy.php`, invocada desde un `*TargetRequest` |
| Delegación | `app/Support/GrantGuard.php` (solo se concede lo que uno tiene) |
| Forma `{permissions, roles, is_owner}` | `AuthService::accessPayload()` (login, 2FA, relogin y evento) |
| Aviso en tiempo real | listener `NotifyPermissionsChanged` → evento `PermissionsUpdated` (`.permissions.updated`) |
| 403 | `withExceptions` de `bootstrap/app.php` (ya existe) + render de `Spatie\Permission\Exceptions\UnauthorizedException`; textos en `lang/es/permission.php` |

## Convención de nombres: `modulo.recurso.accion`

- `modulo`: clave del módulo, la misma que su carpeta de rutas y su `key` en el frontend (`usuarios`, `academico`, `notas`, `documentos`, `finanzas`, `pagos`, `comunicacion`, `preseleccion`).
- `recurso`: en **singular**, español sin tildes (`usuario`, `rol`, `seccion`, `lapso`, `nota`, `deuda`, `pago`).
- `accion`: `show` (ver/listar), `create`, `update`, `destroy`, o una acción de dominio en `snake_case` cuando ninguna encaja (`abrir`, `cerrar`, `importar`, `verificar`, `conciliar`).
- A diferencia de BluLabel (varias apps con `<app>.access`), Gedure es **una sola app**: **no hay `<modulo>.access`**. La entrada de menú de un módulo se muestra si la persona tiene el permiso de su pantalla índice.
- Un test unitario (`tests/Unit/CatalogoPermisosTest.php`) comprueba el formato, que los roles solo usen casos del enum y que no haya duplicados.

```php
enum Permission: string
{
    case UsuariosUsuarioShow = 'usuarios.usuario.show';
    case UsuariosUsuarioCreate = 'usuarios.usuario.create';
    case UsuariosUsuarioUpdate = 'usuarios.usuario.update';
    case UsuariosUsuarioDestroy = 'usuarios.usuario.destroy';
    case UsuariosUsuarioImportar = 'usuarios.usuario.importar';
    case UsuariosRolUpdate = 'usuarios.rol.update';
    case UsuariosPermisoUpdate = 'usuarios.permiso.update';
    case AcademicoLapsoAbrir = 'academico.lapso.abrir';
    case AcademicoLapsoCerrar = 'academico.lapso.cerrar';
    case NotasNotaUpdate = 'notas.nota.update';
    // ...
}
```

## Roles (decididos)

| Rol | Clave | Permisos iniciales | Notas |
|---|---|---|---|
| Owner | `owner` | Ninguno: pasa todo por `Gate::before` | Solo otro owner lo da o lo quita; siempre debe quedar uno. |
| Administración | `admin` | Todo el catálogo | Incluye lo que en otros colegios hace coordinación: abrir/cerrar lapsos, bloquear notas, corregir notas cerradas, publicar boletas. Se puede repartir entre varias personas quitando permisos al rol o a la persona. |
| Profesor | `profesor` | `notas.nota.update`, `academico.seccion.show` | Qué secciones puede tocar lo decide una Policy sobre **sus** asignaciones. |
| Representante | `representante` | Ver notas, boletas y deudas; reportar pagos | Solo de **sus** estudiantes: pertenencia (404), no permiso. |

**No hay rol de coordinación ni de estudiante.** Los estudiantes **no son usuarios**: son registros (`Usuarios\Estudiante`, sin contraseña ni token) vinculados a uno o más representantes, que ven sus datos. Una persona puede tener varios roles (p. ej. profesor y representante).

## `permissions:sync`

Lleva el catálogo a la BD; lo ejecutan `PermissionsSeeder` (y por tanto los tests) y el entrypoint de producción en cada arranque con `RUN_COMMANDS=true`. Idempotente, en una transacción:

1. **Permisos:** crea los que faltan y **borra los huérfanos** con sus asignaciones (renombrar = borrar + crear).
2. **Roles:** si no existe, se crea con sus permisos iniciales. Si existe, **no se tocan sus permisos** (los edita la administración), salvo los permisos que este mismo sync acaba de crear y figuran en su definición. `owner` siempre sin permisos.
3. `forgetCachedPermissions()` y un `PermissionsUpdated` por usuario afectado (con los eventos de spatie desactivados durante el sync).

**Nunca** se asignan permisos a mano en un seeder ni en una migración.

## Dónde va cada comprobación

| Pregunta | Dónde | Respuesta |
|---|---|---|
| ¿Puede hacer X? | `->middleware('permission:'.Permission::X->value)` en la ruta | 403 |
| ¿Puede sobre ESTE registro? (profesor y su sección) | Policy, llamada desde `XTargetRequest::authorize()` tras cargar el modelo | 403 con `Response::deny(msg)` |
| ¿Es válido según el dominio? (lapso cerrado) | FormRequest o Service | 422 |
| ¿Es suyo? (representante y su estudiante) | Consulta acotada (`$user->estudiantes()->whereKey($id)`) | 404 |

Orden resultante: **middleware 403 → 404 → Policy 403 → `rules()` 422 → Service 422 → delegación 403**.

- En código usa `can()`, nunca `hasPermissionTo()` (no pasa por `Gate::before`). `hasRole()` sí vale para preguntar qué **es** un registro (`$target->hasRole(Role::Owner)`).
- Un permiso sobre campos concretos de la petición va en `FormRequest::authorize()` con `can()` y `Response::deny(...)`.
- Reglas que también deben aplicarse al owner (uno mismo, último owner, cuenta dada de baja) son 422 en el Service: el owner nunca llega a la Policy.

## Delegación: solo se concede lo que uno tiene

`GrantGuard::missing($actor, $roles, $permissions)` junta los permisos **actuales en BD** de cada rol que se añade y los directos que se añaden, y descarta los que pasan `$actor->can(...)`. Si falta algo: 403 `{status, msg: "No puedes conceder permisos que no tienes"}` antes de escribir. Quitar no se restringe. Es la regla única de: asignar roles, asignar permisos directos, asignación en bloque y (si llega) invitaciones. Así alguien con solo `usuarios.rol.update` (p. ej. una secretaria que asigna el rol `representante`) no puede hacerse ni hacer a nadie `admin`.

## Lo que existe en la fase 0

- **Catálogo (desde el PR #2 de la fase 1):** 13 permisos en dos módulos. `usuarios` (12): `usuario.{show,create,update,destroy,importar}`, `rol.update`, `permiso.update`, `estudiante.{show,create,update,destroy,exportar}`. `mis-estudiantes` (1): `estudiante.show` (solo los propios, por pertenencia → 404). Los demás del ejemplo de arriba llegan con sus módulos.
- **Roles:** `owner` ninguno (pasa todo por `Gate::before`); `admin` **todo el catálogo** (`P::cases()`, incluido `mis-estudiantes.estudiante.show`, necesario para que `GrantGuard` le deje conceder el rol representante); `representante` solo `mis-estudiantes.estudiante.show`; `profesor` ninguno hasta que existan sus módulos. Que el menú "Mis estudiantes" aparezca solo con estudiantes vinculados se decide en el cliente, no con permisos ([fase 1](../fases/fase-1-usuarios.md#9-decisiones-aprobadas), decisión 14).
- **Implementados en el PR #2:** `GET /roles` y `GET /permisos` (`usuarios.usuario.show`).
- **`permissions:sync`** lo ejecutan los entrypoints (`docker/dev` y `docker/prod`) tras `migrate`.
- **Aviso en tiempo real:** `PermissionsUpdated` por el canal **privado** `App.Models.User.{id}` (no presence como BluLabel).
- **`GrantGuard`** existe y está probado, pero no lo usa ningún endpoint hasta la fase 1.
- Middleware `permission`, `role` y `role_or_permission` registrados; el 403 sale en español.
- Seed de desarrollo: un usuario por rol ([tests.md](tests.md)).

## Endpoints de administración y reglas de owner (fase 1)

`GET /roles` y `GET /permisos` ya existen (PR #2); el resto es diseño aprobado, **aún no** código: los endpoints, el solo-owner-da-owner, el mínimo de un owner y que nadie edite sus propios roles se implementan en la fase 1.

En `routes/api/usuarios/`, todos con `auth.full` y su `permission:`; controller `Usuarios\UserAccessController` + `Services\Usuarios\UserAccessService` (transacción + `lockForUpdate`).

| Método y ruta | Permiso | Cuerpo | Respuesta | Errores |
|---|---|---|---|---|
| `GET /roles` | `usuarios.usuario.show` | — | `{status, data: [{name, label, description, permissions}]}` (permisos **actuales** en BD, orden del enum) | 403 |
| `GET /permisos` | `usuarios.usuario.show` | — | `{status, data: [{modulo, permissions: string[]}]}` (orden del enum) | 403 |
| `PUT /usuarios/{id}/roles` | `usuarios.rol.update` | `{roles: string[]}` (`syncRoles`; `[]` los quita) | `{status, msg, data: Usuario}` | 403 (owner ajeno, dar/quitar `owner` sin serlo, delegación), 404, 422 campo (`roles.N`), 422 dominio (uno mismo, dada de baja, último owner) |
| `PUT /usuarios/{id}/permisos` | `usuarios.permiso.update` | `{permissions: string[]}` (solo **directos**, `syncPermissions`) | `{status, msg, data: Usuario}` | igual |
| `POST /usuarios/roles/bloque` | `usuarios.rol.update` | `{user_ids, add?, remove?}` (nunca `owner`, tope 200) | 200 `{status, msg, data: {updated, failed: [{id, status, msg}]}}` | 403, 422; por persona en `failed` |

Reglas:

- **Uno mismo** no cambia sus roles ni sus permisos (422).
- **En bloque no es todo o nada:** una transacción por persona; las que fallan van a `failed` con el `status` y `msg` que habrían recibido solas.
- **Solo si hay diferencia:** sync con `PermissionEvents::withoutEvents`, una entrada de bitácora por rol/permiso añadido o quitado (con actor) y un único `PermissionEvents::notifyUsers([$id], notify: true)`.
- El recurso `Usuario` incluye `roles` (nombres) y `direct_permissions` (solo directos); el cliente calcula los efectivos con el catálogo de `/roles`.

## Payload de sesión y tiempo real

Login, 2FA y relogin añaden: `permissions` (mapa `{"modulo.recurso.accion": true}`, directos y por rol; siempre objeto, `{}` con el token temporal), `roles` (nombres) e `is_owner`. Cuando cambian los permisos efectivos de alguien, `PermissionsUpdated` sale por el canal personal (`App.Models.User.{id}`, ya definido en `routes/channels.php`) con el mismo payload, en la cola `events` y tras el commit; las ediciones hechas por personas dejan además una notificación persistente. Requiere Echo en el frontend (fase 7, o antes si se adelanta).

## Tests

- `tests/Unit/CatalogoPermisosTest.php`: formato y coherencia del catálogo.
- `tests/Feature/Permisos/SyncPermissionsTest.php`: idempotencia, huérfanos, no pisa roles editados, permisos nuevos llegan a roles existentes.
- `tests/Feature/Permisos/AutorizacionTest.php`: owner por `Gate::before`, 403 de `permission:` y de Policy.
- `tests/Feature/Usuarios/RolesYPermisosTest.php`: endpoints de arriba, orden de errores, delegación y bloque.
- Helper `usuarioCon(Role|Permission ...)` en `tests/Pest.php` y `TestCase::$seed = true` para tener el catálogo sembrado ([tests.md](tests.md)).
