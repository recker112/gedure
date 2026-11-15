# Fase 1 · Usuarios (documento de diseño)

> **Estado: aprobado (2026-11-15).** Se implementa por PRs según el §8 (método de trabajo en [roadmap.md](../roadmap.md#método-de-trabajo-por-fase)).
>
> Referencia estructural: el módulo de usuarios de BluLabel (`blulablel/backend/app/{Http/Controllers,Services,Policies}/Users*`, `routes/api/users.php`, `frontend/src/core/users/**`, `components/users/**`, `store/services/users/**`). Se copia **el flujo y la estructura**, nunca el aspecto ni el dominio (áreas, invitaciones por correo sin cuenta, portadas, avatares, matriz de acceso, presencia, tours: fuera).

## 1. Objetivo y alcance

Que el colegio pueda dar de alta y administrar a todas las personas con acceso (owner, admin, profesor, representante), registrar a los estudiantes (que **no** inician sesión) y vincularlos con sus representantes, a mano o por importación masiva.

| Dentro de la fase 1 | Fuera (fase en la que llega) |
|---|---|
| Alta de usuarios por administración + **activación por enlace** (la persona elige su contraseña) | Pre-inscripción pública / auto-registro de representantes (fase 8) |
| Listado con filtros y paginación, ficha (`ResponsivePanel`) con borrador y "Guardar / Descartar" | Inscripción en sección, grado, periodo (fase 2) |
| Edición de datos, suspensión/reactivación, baja/restauración, cerrar sesiones | Notas, boletas, deudas del representante (fases 3-5) |
| Roles y permisos directos (editor aditivo), asignación de roles en bloque con fallos parciales, reglas de owner y `GrantGuard` | Avisos en tiempo real en el cliente (Echo) y notificaciones persistentes (fase 7) |
| Estudiantes (registros) y vínculo N:M con representantes (parentesco, principal) | "Mis permisos" y perfil propio en `core/account` (futuro) |
| Módulo propio **`mis-estudiantes`**: vista del representante (solo lectura) | Foto del estudiante, documentos adjuntos (fase 4 o posterior) |
| **Plantilla descargable** (XLSX/CSV) + importación (subir → validar → previsualizar → confirmar) en cola, idempotente por cédula | Curso, sección y n.º de lista (fase 2) |
| Exportación de estudiantes a Excel | |
| Bitácora por usuario | |
| Middleware `account.active` (pregunta abierta 9 del roadmap: se adopta) | |

## 2. Modelo de datos

Convenciones: dominio en español con `#[Table]` explícita; `User` y sus columnas técnicas existentes siguen en inglés ([convenciones.md](../backend/convenciones.md)). Columnas de **estado de cuenta** en inglés, como `deleted_at` de Laravel (`suspended_at`, `activated_at`...); campos de **dominio** en español (`telefono`, `direccion`).

### 2.1 `users` (migración nueva `add_cuenta_fields_to_users_table`)

| Columna | Tipo | Nota |
|---|---|---|
| `username` | (existe) | **Cédula** para profesores y representantes: solo dígitos, con prefijo `E` si es extranjera (`E84123456`). Regla `App\Rules\Cedula` (§9, decisión 1). Admin/owner pueden tener otro usuario. |
| `email` | (existe, obligatorio y único) | Recibe 2FA y activación: **sin correo no hay cuenta** (§9, decisión 2). |
| `telefono` | `string(20)` nullable | Normalizado (`0412-1234567`). Master: `repre_telefono`, `personal_data_admins.telefono` (`bigint`, se perdía el 0 inicial). |
| `direccion` | `string(255)` nullable | Master: `repre_direccion`, `personal_data_admins.direccion`. |
| `sexo` | `char(1)` nullable (enum `Sexo`: `F`/`M`) | Master: `repre_sexo`, `personal_data_admins.sexo` (`Masculino`/`Femenino`). |
| `activated_at` | `timestamp` nullable | `null` = cuenta creada por administración que aún no eligió contraseña (estado *pendiente*). Los usuarios del seeder nacen activados. |
| `last_login_at` | `timestamp` nullable | Lo escribe el canje del 2FA. Se ve en la lista. |
| `suspended_at`, `suspended_reason` (`string(120)`), `suspended_by` (FK `users`, `nullOnDelete`) | nullable | Bloqueo temporal, como BluLabel. |
| `deleted_at` (`SoftDeletes`), `deleted_by` (FK `users`, `nullOnDelete`) | nullable | **Baja**: nunca se borra un usuario. El global scope de SoftDeletes lo saca de Sanctum (401). |

Estado **derivado** (sin columna `estado`, como BluLabel), en `User::estado()`: `baja` (manda) → `suspendido` → `pendiente` (`activated_at` null) → `activo`.

Índices: `suspended_at`, `deleted_at` (filtros); `username` y `email` ya son únicos (las bajas siguen ocupando su cédula y su correo: restaurar no choca).

### 2.2 `activaciones` (modelo `Usuarios\Activacion`)

Enlace de un solo uso para que una cuenta creada por administración elija su contraseña (equivale a la `Invitation` de BluLabel, pero la cuenta **ya existe**, porque hay que poder vincularle estudiantes desde el primer momento).

| Columna | Tipo | Nota |
|---|---|---|
| `id` | PK | |
| `user_id` | FK `users`, `cascadeOnDelete`, **unique** | Una activación vigente por persona; reenviar rota el token. |
| `token_hash` | `char(64)` unique | `sha256` del token (`Str::random(64)`); el claro solo va en el correo. |
| `enviada_por` | FK `users` nullable, `nullOnDelete` | |
| `sent_at`, `expires_at` | `timestamp` | Caduca a los 7 días (configurable). |
| `used_at` | `timestamp` nullable | |
| `timestamps` | | |

`model:prune` borra las usadas o caducadas hace más de 30 días.

### 2.3 `estudiantes` (modelo `Usuarios\Estudiante`)

Campos tomados del Gedure anterior (rama `master`): `users` (estudiante = usuario con `privilegio = 'V-'`), `personal_data_users.estudi_*` y las columnas del Excel de matrícula que leía `app/Imports/StudiendImport.php` (`tests/files_required/data_studiends.xlsx`: `nro, curso, nced, nomalum, apelalum, cedrepre, telerepre, fnac, sexo, parentes, sexrepre, direcc, email`).

| Columna | Tipo | Oblig. | Origen en master |
|---|---|---|---|
| `id` | PK | | |
| `cedula` | `string(15)` **unique** | **sí** | `users.username` / Excel `nced` (obligatoria allí también). Mismo formato que `username` (regla `Cedula`: dígitos, prefijo `E` si es extranjera) con hasta 12 dígitos para admitir la **cédula escolar** en la misma columna, como hacía master. Clave de idempotencia de la importación. |
| `nacionalidad` | `char(1)` (`V`/`E`) | sí (por defecto `V`) | `estudi_nacionalidad` |
| `nombres` | `string(100)` | **sí** | Excel `nomalum` (master los unía en `users.name`) |
| `apellidos` | `string(100)` | **sí** | Excel `apelalum` (opcional en master; aquí obligatorio: se ordena y busca por apellidos) |
| `fecha_nacimiento` | `date` | **sí** | `estudi_nacimiento` / Excel `fnac` (opcional en master) |
| `sexo` | `char(1)` (enum `Sexo`: `F`/`M`) | **sí** | `estudi_sexo` (`Masculino`/`Femenino`) / Excel `sexo` |
| `estado_nacimiento` | `string(30)` nullable | no | `estudi_nacimiento_estado` (solo si `nacionalidad = V`) |
| `lugar_nacimiento` | `string(150)` nullable | no | `estudi_nacimiento_lugar` |
| `lateralidad` | `string(12)` nullable (enum: `derecho`, `zurdo`, `ambidiestro`) | no | `estudi_lateralidad` |
| `direccion` | `string(255)` nullable | no | `estudi_otros_direccion` / Excel `direcc` |
| `sector` | `string(20)` nullable (enum: `barrio`, `caserio`, `urbanizacion`, `zona_residencial`, `otro`) | no | `estudi_ubi` |
| `tipo_vivienda` | `string(20)` nullable (enum con los 10 valores de master: `apto`, `apto_quinta`, `casa`, ...) | no | `estudi_ubi_tipo` |
| `zona` | `string(10)` nullable (`rural`/`urbana`) | no | `estudi_ubi_zona` |
| `condicion_vivienda` | `string(20)` nullable (enum: `al_cuido`, `alquilada`, `propia_pagada`, `propia_pagandose`, `otro`) | no | `estudi_ubi_condiVivienda` |
| `becado`, `alojado` | `boolean` nullable | no | `estudi_otros_beca`, `estudi_otros_alojado` (`Si`/`No`) |
| `estado` | `string(20)` (enum `EstadoEstudiante`: `activo`, `retirado`, `egresado`) | sí | Nuevo (master usaba `deleted_at` y `actived_at` del usuario). Estado **guardado**: lo cambian personas. Índice. |
| `observaciones` | `text` nullable | no | Nuevo (uso interno de administración). |
| `timestamps` | | | |

Los enums de vivienda van en `app/Enums/Usuarios/` con sus etiquetas en `lang/es/usuarios.php`.

Sin `SoftDeletes`: un estudiante **no se borra** si tiene historial (en fase 2+ los FK `restrictOnDelete` de inscripciones/notas lo impedirán); en fase 1 `DELETE` solo sirve para corregir altas erróneas. Lo normal es pasar a `retirado`.

Índices: `cedula` único, `(apellidos, nombres)` para ordenar y buscar, `estado`.

### 2.4 Pivote `estudiante_representante`

| Columna | Tipo | Nota |
|---|---|---|
| `id` | PK | Facilita la bitácora y futuros FK (p. ej. deudas). |
| `estudiante_id` | FK `estudiantes`, `cascadeOnDelete` | |
| `user_id` | FK `users`, `cascadeOnDelete` | Solo usuarios con rol `representante` (regla del Service, 422). Las bajas conservan el vínculo pero pierden el acceso. |
| `parentesco` | `string(20)` (enum `Parentesco`: `madre`, `padre`, `abuelo`, `abuela`, `padrastro`, `madrastra`, `tio`, `tia`, `hermano`, `hermana`, `otro`) | Master: `repre_tipo_familiar` / Excel `parentes` (`Madre, Padre, Abuela(o), Padrastro, Madastra, Tia(o), Otro`), ampliado. |
| `principal` | `boolean` default `false` | **Como mucho uno por estudiante** (Service, con `lockForUpdate` sobre el estudiante). Opcional en fase 1; obligatorio en la fase 5 (responsable de cobros). Equivale al único `repre_*` de master. |
| `timestamps` | | |

Único `(estudiante_id, user_id)`; índice `user_id` (la consulta de "mis estudiantes").

### 2.5 Bitácora: `actividades` (modelo `Usuarios\Actividad`)

Igual que `user_activities` de BluLabel: solo se crea, el título no se guarda (se calcula desde `tipo` + `meta` con `lang/es/actividad.php`).

| Columna | Tipo | Nota |
|---|---|---|
| `id` | PK | |
| `user_id` | FK `users`, `cascadeOnDelete` | Sujeto. |
| `actor_id` | FK `users` nullable, `nullOnDelete` | `null` = el sistema o la propia persona. |
| `tipo` | `string(40)` (enum `Usuarios\TipoActividad`, valores estables) | |
| `meta` | `json` nullable | |
| `created_at` | `timestamp` (sin `updated_at`) | |

Índice `(user_id, created_at, id)` (cursor descendente) y `(user_id, tipo)`.

Tipos de fase 1: `cuenta_creada`, `activacion_enviada`, `cuenta_activada`, `login`, `datos_actualizados` (`meta.campos`), `correo_cambiado`, `contrasena_cambiada`, `rol_cambiado` (`meta {rol, cambio: agregado|quitado}`), `permiso_agregado`, `permiso_quitado`, `suspension`, `reactivacion`, `baja`, `restauracion`, `sesiones_cerradas`, `estudiante_vinculado`, `estudiante_desvinculado` (`meta {estudiante_id, nombre, parentesco}`), `importado` (`meta.importacion_id`).

Se escribe con `Services\Usuarios\Bitacora::registrar($sujeto, TipoActividad, $actor, $meta)` desde los Services (nunca desde eventos de spatie), dentro de su transacción. Los cambios de datos **del estudiante** no tienen bitácora propia en fase 1 (§9, decisión 5).

### 2.6 Importación: `importaciones` e `importacion_filas`

| `importaciones` | Tipo | Nota |
|---|---|---|
| `tipo` | enum `TipoImportacion`: `representantes_estudiantes`, `personal` | |
| `estado` | enum `EstadoImportacion`: `validando`, `validada`, `aplicando`, `completada`, `fallida`, `descartada` | Estado guardado (lo mueven los jobs). |
| `archivo`, `nombre_original` | string | Disco `local` privado, `importaciones/{id}.{ext}`. |
| `user_id` | FK `users`, `nullOnDelete` | Quién la subió. |
| `opciones` | json | `{actualizar_existentes, enviar_activacion}` al confirmar. |
| `resumen` | json | Contadores por resultado (ver §4.6). |
| `error` | text nullable | Fallo del archivo entero (formato, cabeceras). |
| `validada_at`, `aplicada_at`, `timestamps` | | |

| `importacion_filas` | Tipo | Nota |
|---|---|---|
| `importacion_id` | FK `cascadeOnDelete` | |
| `numero` | int | Fila del archivo (para el informe). |
| `datos` | json | Fila normalizada. |
| `estado` | enum: `valida`, `error`, `aplicada`, `fallida`, `omitida` | Índice `(importacion_id, estado)`. |
| `errores` | json nullable | `{campo: [msg]}`, con los mismos textos de `lang/es/validation.php`. |
| `resultado` | json nullable | `{usuario: creado|existente|actualizado, estudiante: ..., vinculo: creado|existente}`. |

`model:prune` borra importaciones (y su archivo) de más de 30 días.

### 2.7 Modelos y relaciones

```php
// App\Models\User (+ SoftDeletes)
estudiantes(): BelongsToMany<Usuarios\Estudiante>   // ->using(Representacion)->withPivot('id','parentesco','principal')->withTimestamps()
actividades(): HasMany<Usuarios\Actividad>
activacion(): HasOne<Usuarios\Activacion>
suspendedBy(), deletedBy(): BelongsTo<User>          // ->withTrashed()
estado(): EstadoCuenta; isSuspended(): bool; isActivated(): bool
scopeConEstado(Builder, string $estado)              // filtros del listado

// App\Models\Usuarios\Estudiante  #[Table('estudiantes')]
representantes(): BelongsToMany<User>                // mismo pivote
representantePrincipal(): ?User                      // derivado del pivote
scopeBuscar(Builder, string $q)                      // nombres, apellidos, cédulas

// App\Models\Usuarios\Representacion  #[Table('estudiante_representante')]  (Pivot)
// App\Models\Usuarios\Activacion      #[Table('activaciones')]
// App\Models\Usuarios\Actividad       #[Table('actividades')]
// App\Models\Usuarios\Importacion     #[Table('importaciones')]  + filas(): HasMany<ImportacionFila>
```

Enums en `app/Enums/Usuarios/`: `EstadoCuenta`, `Sexo`, `Parentesco`, `EstadoEstudiante`, `Lateralidad`, `Sector`, `TipoVivienda`, `Zona`, `CondicionVivienda`, `TipoActividad`, `TipoImportacion`, `EstadoImportacion`, `EstadoFilaImportacion`.

### 2.8 Del Gedure anterior (`master`) al modelo nuevo

No se migran datos (el sistema arranca de cero, [roadmap](../roadmap.md)); solo se toma qué guardaba el colegio.

- **Estudiantes:** en master eran **usuarios** (`users.privilegio = 'V-'`, `username` = cédula, correo propio, inician sesión) con un `personal_data_users` polimórfico. Ahora son **registros** de `estudiantes` sin cuenta; quien entra es el representante.
- **Representante:** en master **no tenía cuenta**: era texto dentro del estudiante (`repre_*`, uno solo) más los bloques `madre_*` y `padre_*` (nombre, nacionalidad, cédula, teléfono, dirección). Ahora cada uno es un `User` con rol `representante` vinculado N:M (`estudiante_representante`, con `parentesco` y `principal`). Madre o padre sin cuenta no se registran en fase 1.
- **Personal:** `privilegio` `A-` (admin) y `P-` (profesor) → roles; `personal_data_admins` aporta `telefono`, `direccion`, `sexo` a `users`.
- **Cuenta:** `actived_at` + `invitations` (clave de 40 caracteres) → `activated_at` + `activaciones` (token con hash, caducidad); `softDeletes` se mantiene como baja.

**Se descarta:**

| Dato de master | Por qué |
|---|---|
| `users.email` y acceso del estudiante | El estudiante no inicia sesión; el correo es del representante (en la importación, la columna `email` del Excel pasa a `representante_correo`). |
| `estudi_estado_civil` | Población escolar; no lo usa ninguna función. |
| `estudi_ubi_condiInfra` (1-5) | Escala sin definición documentada. |
| `estudi_otros_canaima` | Dato de un programa de dotación puntual; se añade si la matrícula lo vuelve a pedir. |
| `repre_estado_civil`, `repre_nacimiento`, `repre_ubi_{estado,municipio,parroquia,via}`, `repre_empleo*` | Ficha socioeconómica que ninguna función usa; la dirección queda como texto. Puede volver con la preinscripción (fase 8). |
| `madre_*` / `padre_*` como texto | Sustituidos por representantes vinculados con `parentesco`. |
| `personal_data_admins.{docente, docente_titulo, docente_ingreso_MPPE, docente_ingreso, nacimiento}` | Datos de personal docente; se retoman con la asignación de profesores (fase 2) si hacen falta. |
| `users.avatar` | Fuera de alcance (foto del estudiante: fase 4 o posterior). |
| `alumnos.{curso_id, n_lista}`, `cursos` | Académico: fase 2. |
| Wallet y deudas por estudiante | Fase 5 (las deudas irán al representante principal). |

## 3. Permisos (catálogo `App\Enums\Permission`)

Módulos `usuarios` y `mis-estudiantes` (el prefijo del permiso es la clave del módulo, la misma que la carpeta de rutas y el módulo del frontend). Los 13 están en el catálogo desde el PR #2.

| Permiso | Para qué | admin | profesor | representante |
|---|---|---|---|---|
| `usuarios.usuario.show` | Listar/ver personas, bitácora, catálogo de roles y permisos | ✔ | | |
| `usuarios.rol.update` | Asignar/quitar roles (también en bloque) | ✔ | | |
| `usuarios.permiso.update` | Permisos directos | ✔ | | |
| `usuarios.usuario.create` | Dar de alta y reenviar la activación | ✔ | | |
| `usuarios.usuario.update` | Editar datos, suspender/reactivar, cerrar todas sus sesiones | ✔ | | |
| `usuarios.usuario.destroy` | Dar de baja y restaurar | ✔ | | |
| `usuarios.usuario.importar` | Plantilla e importación masiva (ambos tipos) | ✔ | | |
| `usuarios.estudiante.show` | Listar/ver todos los estudiantes | ✔ | | |
| `usuarios.estudiante.create` | Alta de estudiantes | ✔ | | |
| `usuarios.estudiante.update` | Editar estudiante y sus vínculos con representantes | ✔ | | |
| `usuarios.estudiante.destroy` | Borrar un alta errónea | ✔ | | |
| `usuarios.estudiante.exportar` | Excel de estudiantes | ✔ | | |
| `mis-estudiantes.estudiante.show` | Módulo "Mis estudiantes" (solo los propios, por pertenencia → 404) | ✔ | | ✔ |

- `owner` no recibe nada (pasa por `Gate::before`). `admin` = `P::cases()` (todo el catálogo, **incluido** `mis-estudiantes.estudiante.show`: sin él `GrantGuard` no le dejaría conceder el rol `representante`), así que `permissions:sync` le añade los nuevos a un `admin` ya existente. Que el admin no vea el menú "Mis estudiantes" lo resuelve la decisión 14 (§9), no el permiso.
- `profesor` sigue vacío en fase 1 (sus permisos llegan en las fases 2-3).
- Una secretaria puede ser una persona sin rol `admin` con, p. ej., `usuarios.usuario.{show,create}`, `usuarios.rol.update` y `usuarios.estudiante.*`: por `GrantGuard` solo podrá dar el rol `representante` (si tiene `mis-estudiantes.estudiante.show`) y nunca `admin`.

## 4. Endpoints

Todos en `routes/api/usuarios/*.api.php` (salvo §4.6, en `routes/api/mis-estudiantes/`), dentro de `auth.full` (+ el nuevo `account.active`), con `->middleware('permission:…')`, `whereNumber('id')` y nombre `<modulo>.<recurso>.<accion>`. Orden de errores: **middleware 403 → 404 → Policy 403 → `rules()` 422 → Service 422 → delegación 403**.

**Sin prefijo de módulo en la URL** (excepción a [api.md](../backend/api.md#rutas)): `/usuarios/usuarios` sería redundante, y [permisos.md](../backend/permisos.md) ya fijó `/roles`, `/permisos` y `/usuarios/{id}/roles`. Los recursos del módulo van en la raíz: `/usuarios`, `/roles`, `/permisos`, `/estudiantes`, `/importaciones`. El módulo `mis-estudiantes` sí sigue la regla: `/mis-estudiantes`.

### 4.1 Piezas del backend

| Pieza | Dónde | Copia de BluLabel |
|---|---|---|
| `UsuarioController` (index, show, store, update, suspender, reactivar, destroy, restaurar, cerrarSesiones, reenviarActivacion) | `Http/Controllers/Usuarios/` | `UserController` |
| `UserAccessController` (roles, permisos, bloque) + `AccessCatalogController` (roles, permisos) | idem | igual |
| `ActividadController`, `EstudianteController`, `RepresentacionController`, `ImportacionController`, `PlantillaImportacionController`, `Auth\ActivacionController` | idem | — |
| `MisEstudiantesController` + `MiEstudianteResource` | `Http/Controllers/MisEstudiantes/`, `Http/Resources/MisEstudiantes/` | — |
| `UsuarioTargetRequest` (404 con `withTrashed` + `UserPolicy::manage`), `EstudianteTargetRequest`, `ImportacionTargetRequest` | `Http/Requests/Usuarios/` | `UserTargetRequest` |
| `UserPolicy` (`manage`: a un owner solo lo gestiona un owner; `changeOwnerRole`) | `Policies/Usuarios/` | igual |
| `UsuarioService` (alta, datos, correo), `EstadoCuentaService` (suspender, reactivar, baja, restaurar), `UserAccessService` (roles, permisos, bloque, `BULK_MAX = 200`), `ActivacionService`, `EstudianteService`, `RepresentacionService`, `ImportacionService`, `Bitacora` | `Services/Usuarios/` | `UserService`, `UserStatusService`, `UserAccessService`, `ActivityLog` |
| `UsuarioResource`, `EstudianteResource`, `RepresentanteResource` (vínculo visto desde el estudiante), `ActividadResource`, `ImportacionResource`, `ImportacionFilaResource` | `Http/Resources/Usuarios/` | `UserResource` |
| `EnsureAccountActive` (alias `account.active`, dentro del grupo `auth.full`) | `Http/Middleware/` | igual |
| Regla `Cedula` | `app/Rules/` | — |

Todos los Services de escritura: `DB::transaction` + fila releída con `lockForUpdate`; 422 de dominio `{status, msg}` con textos de `lang/es/usuarios.php`; reglas que también valen para el owner (uno mismo, baja, último owner) como 422 en el Service.

### 4.2 Personas

| Método y ruta | Permiso | Cuerpo / query | Respuesta | Errores y reglas |
|---|---|---|---|---|
| `GET /usuarios` | `usuario.show` | `q` (nombre, cédula, correo), `rol` (`none` = sin rol), `estado` (`actuales` por defecto = sin bajas; `activos`, `pendientes`, `suspendidos`, `bajas`, `todos`), `orden` (`nombre` por defecto, `-last_login_at`), `page`, `per_page` (25, máx. 100); implementado en el PR #2 (`IndexUsuariosRequest`) | `{status, data: Usuario[], meta}` (`paginate`) | Con eager loading fijo (sin N+1). |
| `GET /usuarios/{id}` | `usuario.show` | — | `{status, data: Usuario}` (también bajas) | 404 |
| `POST /usuarios` | `usuario.create` | `{name, username, email, telefono?, direccion?, sexo?, roles: string[], permissions?: string[], enviar_activacion: bool}` | 201 `{status, msg, data}` | 422 campo (únicos, `Cedula` si tiene rol profesor/representante); 403 `GrantGuard` sobre roles + permisos; 403 si incluye `owner` y quien actúa no es owner. Crea con contraseña aleatoria, `activated_at = null`; bitácora `cuenta_creada`. |
| `PATCH /usuarios/{id}` | `usuario.update` | Solo lo enviado: `name, username, email, telefono, direccion, sexo` | `{status, msg, data}` | 404 → Policy → 422; 422 dominio: baja, el propio correo (se cambiará en `core/account`). Cambiar el correo revoca sus sesiones, avisa al anterior (`emails`) y, si estaba pendiente, invalida su activación. |
| `POST /usuarios/{id}/activacion` | `usuario.create` | — | `{status, msg}` | 422 si ya está activada o de baja. Rota el token; correo en `high`. |
| `POST /usuarios/{id}/suspender` | `usuario.update` | `{motivo?: string(120)}` | `{status, msg, data}` | 422: uno mismo, ya suspendida, baja. Revoca todos sus tokens. |
| `POST /usuarios/{id}/reactivar` | `usuario.update` | — | idem | 422: no suspendida, baja. |
| `DELETE /usuarios/{id}/sesiones` | `usuario.update` | — | `{status, msg}` | **Cerrar todas sus sesiones** (sin listado de dispositivos). 404 → Policy → 422: uno mismo, baja. Revoca todos sus tokens de Sanctum y, cuando existan (fase 7), sus suscripciones push; bitácora `sesiones_cerradas` (`meta.tokens`). |
| `DELETE /usuarios/{id}` | `usuario.destroy` | — | `{status, msg, data}` | **Baja** (SoftDeletes + `deleted_by`), revoca tokens. 422: uno mismo, ya de baja, **último owner** (bloqueando antes las filas de los owners, como BluLabel). |
| `POST /usuarios/{id}/restaurar` | `usuario.destroy` | — | idem | 422 si no está de baja. Limpia también la suspensión. |
| `GET /usuarios/{id}/actividad` | `usuario.show` | `tipo?`, `cursor` | `{status, data: Actividad[], next_cursor}` (`cursorPaginate`, 20 por página, `created_at desc, id desc`; también de bajas). `Actividad`: `{id, tipo, titulo, actor: {id,name}|null, meta, created_at}`; `titulo` se calcula desde `tipo` + `meta` | 404 |
| `GET /usuarios/{id}/estudiantes` | `usuario.show` | — | `{status, data: [{estudiante, parentesco, principal}]}` | 404 |

`Usuario` (Resource): `id, name, username, email, telefono, direccion, sexo, estado, roles: string[], direct_permissions: string[], estudiantes_count, last_login_at, activated_at, created_at, suspended_at, suspended_reason, suspended_by: {id,name}|null, deleted_at, deleted_by: {id,name}|null`.

> `estudiantes_count` **llega en el PR #8** (`withCount('estudiantes')`, cuando exista la tabla de vínculos); el `UsuarioResource` del PR #2 aún no lo incluye.

### 4.3 Roles y permisos (ya diseñado en [permisos.md](../backend/permisos.md#endpoints-de-administración-y-reglas-de-owner-fase-1-aún-no-implementados))

| Método y ruta | Permiso | Cuerpo | Respuesta |
|---|---|---|---|
| `GET /roles` | `usuario.show` | — | `{status, data: [{name, label, description, permissions}]}` |
| `GET /permisos` | `usuario.show` | — | `{status, data: [{modulo, permissions}]}` |
| `PUT /usuarios/{id}/roles` | `rol.update` | `{roles: string[]}` | `{status, msg, data: Usuario}` |
| `PUT /usuarios/{id}/permisos` | `permiso.update` | `{permissions: string[]}` (solo directos) | idem |
| `POST /usuarios/roles/bloque` | `rol.update` | `{user_ids (máx. 200), add?, remove?}` (nunca `owner`; no ambos vacíos; un rol no en los dos) | 200 `{status, msg, data: {updated: Usuario[], failed: [{id, status, msg}]}}` |

Reglas (todas como en BluLabel `UserAccessService`):

- `UserPolicy::manage` (403): un owner solo lo gestiona otro owner. `changeOwnerRole` (403): dar o quitar `owner` solo un owner.
- 422: uno mismo no cambia sus roles ni permisos; cuenta de baja; quitar `owner` al último owner activo (las suspendidas cuentan).
- `GrantGuard::missing($actor, rolesAñadidos, permisosAñadidos)` → 403 "No puedes conceder permisos que no tienes". Quitar no se restringe.
- **Propio de Gedure:** quitar `representante` a quien tiene estudiantes vinculados → 422 ("Desvincula antes sus estudiantes"). Evita estudiantes con un representante sin acceso por accidente.
- **Bloque:** una transacción por persona; la que falla va a `failed` con el `status`/`msg` que habría recibido sola. `msg` resumido ("Asignado a 18; 2 no se pudieron actualizar").
- Solo si hay diferencia: `syncRoles`/`syncPermissions` con `PermissionEvents::withoutEvents`, una entrada de bitácora por rol/permiso y un único `PermissionsUpdated` tras el commit (ya existe en la fase 0).

### 4.4 Activación (pública, `routes/api/auth/activacion.api.php`, fuera de `auth.full`)

| Método y ruta | Middleware | Cuerpo | Respuesta |
|---|---|---|---|
| `GET /auth/activacion/{token}` | `throttle:auth.activacion` (por IP) | — | `{status, data: {name, email (enmascarado)}}`; 404 token desconocido; 410 `{status, msg}` usado, caducado o cuenta de baja/suspendida. |
| `POST /auth/activacion/{token}` | idem | `{password, password_confirmation}` (mismas reglas que el cambio de contraseña) | `{status, msg}`. Guarda la contraseña, `activated_at`, `email_verified_at`, `password_changed_at`, marca `used_at`; bitácora `cuenta_activada`. **No abre sesión**: el frontend lleva a `/auth`. |

`{token}`: `[A-Za-z0-9]{64}`. Con la fila de la activación bloqueada: dos envíos no activan dos veces.

### 4.5 Estudiantes y vínculos

| Método y ruta | Permiso | Cuerpo / query | Respuesta | Errores y reglas |
|---|---|---|---|---|
| `GET /estudiantes` | `estudiante.show` | `q` (nombres, apellidos, cédula), `estado` (por defecto `activo`), `sin_representante=1`, `page`, `per_page` | `{status, data: Estudiante[], meta}` | Cada fila trae `representantes` (nombre, parentesco, principal). |
| `GET /estudiantes/{id}` | `estudiante.show` | — | `{status, data}` | 404 |
| `POST /estudiantes` | `estudiante.create` | campos de §2.3 + `representantes?: [{user_id, parentesco, principal}]` | 201 | 422: cédula repetida, representante sin rol `representante` o de baja, más de un principal. |
| `PATCH /estudiantes/{id}` | `estudiante.update` | campos de §2.3 (solo lo enviado) | `{status, msg, data}` | 422 campo |
| `DELETE /estudiantes/{id}` | `estudiante.destroy` | — | `{status, msg}` | 422 si tiene historial (desde fase 2). |
| `POST /estudiantes/{id}/representantes` | `estudiante.update` | `{user_id, parentesco, principal?}` | `{status, msg, data: Estudiante}` | 404; 422: ya vinculado, no es representante, baja. `principal: true` quita la marca al anterior. Bitácora del representante. |
| `PATCH /estudiantes/{id}/representantes/{userId}` | `estudiante.update` | `{parentesco?, principal?}` | idem | 404 si no hay vínculo. |
| `DELETE /estudiantes/{id}/representantes/{userId}` | `estudiante.update` | — | idem | Si era el principal, queda sin principal (aviso en la UI). |
| `GET /estudiantes/exportar` | `estudiante.exportar` | mismos filtros que el listado | `.xlsx` en streaming (OpenSpout), una fila por estudiante con su representante principal | Síncrono: unos pocos miles de filas. Si pasara de ~10 s, job en `default`. |

### 4.6 Módulo `mis-estudiantes` (representante)

| Método y ruta | Permiso | Respuesta |
|---|---|---|
| `GET /mis-estudiantes` | `mis-estudiantes.estudiante.show` | `{status, data: MiEstudiante[]}` (sin paginar: pocos por familia), consulta acotada `$user->estudiantes()` |
| `GET /mis-estudiantes/{id}` | `mis-estudiantes.estudiante.show` | `{status, data}`; **404** si no es suyo ([api.md](../backend/api.md#significado-de-los-códigos)) |

El menú "Mis estudiantes" se muestra solo si la persona tiene **al menos un estudiante vinculado** además del permiso (decisión 14). El cliente lo sabe por el campo `tiene_estudiantes: boolean` del payload de sesión (`user.tiene_estudiantes`, `exists()` sobre `$user->estudiantes()`), que añade el PR #9 en login, 2FA y relogin ([api.md](../backend/api.md#endpoints-existentes)); un vínculo nuevo se refleja en el siguiente relogin. El endpoint no cambia: el permiso basta para llamarlo y devuelve `[]` si no hay vínculos.

`MiEstudianteResource` reducido (sin `observaciones` internas ni otros representantes salvo nombre y parentesco).

### 4.7 Importación

| Método y ruta | Permiso | Cuerpo | Respuesta |
|---|---|---|---|
| `GET /importaciones/plantilla?tipo=&formato=` | `usuario.importar` | `tipo` (`representantes_estudiantes`, `personal`), `formato` (`xlsx` por defecto, `csv`) | Plantilla (ver abajo); 422 tipo o formato inválido |
| `POST /importaciones` | `usuario.importar` | multipart `{archivo (csv, xlsx; máx. 5 MB, 3000 filas), tipo}` | 202 `{status, msg, data: Importacion}` (`validando`) y job `ValidarImportacion` |
| `GET /importaciones` | `usuario.importar` | `page` | Últimas importaciones (de cualquier persona con el permiso) |
| `GET /importaciones/{id}` | `usuario.importar` | — | `{status, data: Importacion}` con `estado` y `resumen` (el frontend sondea mientras `validando`/`aplicando`) |
| `GET /importaciones/{id}/filas` | `usuario.importar` | `estado?`, `page` | `{status, data: Fila[], meta}` |
| `POST /importaciones/{id}/confirmar` | `usuario.importar` | `{actualizar_existentes: bool (false), enviar_activacion: bool (false)}` | 202, estado `aplicando`, job `AplicarImportacion`; 422 si no está `validada` o no hay filas válidas; 403 `GrantGuard` |
| `DELETE /importaciones/{id}` | `usuario.importar` | — | Descarta (solo `validada` o `fallida`) y borra el archivo |
| `GET /importaciones/{id}/errores` | `usuario.importar` | — | `.csv` con las filas `error`/`fallida`, sus datos y una columna `errores`, listo para corregir y volver a subir |

**Plantilla (decidido).** La institución adapta sus datos a la plantilla, no al revés. `PlantillaImportacion` (en `Services/Usuarios/`) es la **única fuente** de las columnas: de ella salen la plantilla descargable, la validación de cabeceras, las reglas por fila y el CSV de errores. La genera OpenSpout:

- **XLSX:** hoja `Datos` con la fila de cabeceras (las obligatorias marcadas en negrita), una **fila de ejemplo** (la importación descarta una fila idéntica al ejemplo, por si no se borra) y celdas de fecha y cédula con formato texto; hoja `Instrucciones` con la tabla de columnas de abajo (obligatoria, formato, valores admitidos).
- **CSV:** UTF-8 con BOM, separador `;` (el de Excel en español), cabeceras + fila de ejemplo. Al subir se aceptan `;` y `,`.
- **Una fila por vínculo:** un estudiante con dos representantes ocupa dos filas (repite los datos del estudiante; deben coincidir).
- Cabeceras sin distinguir mayúsculas ni tildes; se aceptan como **alias** las del Excel de master (`nced`, `nomalum`, `apelalum`, `fnac`, `sexo`, `cedrepre`, `telerepre`, `sexrepre`, `parentes`, `direcc`, `email`); `nro` y `curso` se ignoran (curso: fase 2). Columnas desconocidas: aviso, no error.

Tipo `representantes_estudiantes`:

| Columna | Oblig. | Reglas | Alias master |
|---|---|---|---|
| `estudiante_cedula` | **sí** | `Cedula` (dígitos, `E` opcional, hasta 12 dígitos: admite cédula escolar); se quitan `V-`, puntos y espacios | `nced` |
| `estudiante_nacionalidad` | no (`V`) | `V` o `E` | |
| `estudiante_nombres` | **sí** | texto, máx. 100 | `nomalum` |
| `estudiante_apellidos` | **sí** | texto, máx. 100 | `apelalum` |
| `estudiante_fecha_nacimiento` | **sí** | `dd/mm/aaaa` o fecha de Excel; no futura | `fnac` |
| `estudiante_sexo` | **sí** | `F`/`M` (acepta `Femenino`/`Masculino`) | `sexo` |
| `estudiante_direccion` | no | texto, máx. 255 | `direcc` |
| `representante_cedula` | **sí** | `Cedula` | `cedrepre` |
| `representante_nombre` | **sí** | texto, máx. 255 | |
| `representante_correo` | **sí** para crear la cuenta | correo; único salvo que sea de la misma cédula. Si falta: decisión 2 de §9 | `email` |
| `representante_telefono` | no | se normaliza a `0412-1234567` | `telerepre` |
| `representante_sexo` | no | `F`/`M` | `sexrepre` |
| `parentesco` | **sí** | valor de `Parentesco` (acepta los de master: `Abuela(o)`, `Tia(o)`...) | `parentes` |
| `principal` | no (`no`) | `si`/`no`; como mucho un `si` por estudiante en el archivo | |

Los datos de vivienda, lateralidad y lugar de nacimiento no están en la plantilla: se completan en la ficha.

Tipo `personal`: `cedula`\*, `nombre`\*, `correo`\*, `telefono`, `sexo`, `rol`\* (`profesor` o `representante`; nunca `owner` ni `admin`), con las mismas reglas.

**Flujo.**

1. **Subir:** se guarda el archivo y se encola `ValidarImportacion` (cola `default`). Lee con OpenSpout en streaming, normaliza (espacios, mayúsculas de cédula, fechas, `si/no`), valida cada fila con las reglas de `PlantillaImportacion` (las mismas que los FormRequest) y contra la BD (¿existe ya la cédula? ¿el correo es de otra persona?) y también **entre filas** (mismo estudiante con datos distintos, dos principales). Guarda cada fila en `importacion_filas` y el `resumen`: `{filas, validas, con_error, usuarios_nuevos, usuarios_existentes, estudiantes_nuevos, estudiantes_existentes, vinculos_nuevos}`. Cabeceras obligatorias que faltan → `fallida` con `error`. Fila sin `representante_correo`: el estudiante es válido y la fila queda `error` ("sin correo") para completar el representante a mano.
2. **Previsualizar:** la UI muestra el resumen y las filas con error. Nada se ha escrito aún.
3. **Confirmar:** `GrantGuard` para los roles que la importación concede (403 antes de encolar). `AplicarImportacion` (cola `default`) aplica las filas válidas en trozos de 100, **una transacción por fila**: busca o crea el representante por `username` = cédula (le añade el rol si no lo tiene), busca o crea el estudiante por `cedula`, crea el vínculo si falta. Existentes: no se pisan sus datos salvo `actualizar_existentes`. Una fila que falla al aplicar queda `fallida` con su motivo y el resto sigue (como el bloque de roles). Bitácora `importado` por usuario creado. Solo si quien confirma marca `enviar_activacion` (desmarcado por defecto), una activación por cuenta nueva en la cola `emails` (no `high`: nadie la espera en pantalla).
4. **Idempotencia:** volver a subir el mismo archivo no duplica nada (todo son "existentes").

Dependencia nueva: **`openspout/openspout`** (CSV y XLSX en streaming, poca memoria; también para la exportación). Preferido a `maatwebsite/excel`/PhpSpreadsheet por peso.

## 5. Frontend

### 5.1 Módulos `modules/usuarios/` y `modules/mis-estudiantes/`

```
modules/usuarios/
├── config.js  routes.js  usuariosApi.js
├── api/queries/     getUsuarios, getUsuario, getRoles, getPermisos, getActividad, getEstudiantesDeUsuario,
│                    getEstudiantes, getEstudiante, getImportaciones, getImportacion, getFilasImportacion, getPlantilla
├── api/mutations/   createUsuario, updateUsuario, setUsuarioRoles, setUsuarioPermisos, bulkUsuarioRoles, suspenderUsuario,
│                    reactivarUsuario, bajaUsuario, restaurarUsuario, cerrarSesiones, reenviarActivacion,
│                    createEstudiante, updateEstudiante, deleteEstudiante, vincularRepresentante, updateVinculo, desvincularRepresentante,
│                    subirImportacion, confirmarImportacion, descartarImportacion
├── personas/        UsuariosPage, list/ (UsuariosTable, UsuarioCard, UsuariosToolbar), panel/ (UsuarioPanel, pestañas, SaveBar),
│                    bulk/ (BulkRolesBar, BulkRolesDialog), NuevoUsuarioPanel, history/
├── permisos/        PermissionEditor, PermissionRow, permissionLabels.js, permissions.js, useAccessCatalog, useGrantLock
├── estudiantes/     EstudiantesPage, EstudiantePanel, EstudianteForm, RepresentantesField, ExportarButton
├── importar/        ImportarPage (historial + subir), ImportacionPage (asistente)
├── userRules.js  rules.js (cédula)  usuariosFilters.js  estadoCuenta.js
└── test/usuariosBackend.js   (serveUsuarios(), fixtures con la forma real)

modules/mis-estudiantes/
├── config.js  routes.js  misEstudiantesApi.js   (getMisEstudiantes, getMiEstudiante)
├── MisEstudiantesPage.jsx  MiEstudiantePage.jsx
└── test/
```

### 5.2 Menú y rutas (`config.js`)

`permission` del módulo `usuarios`: `["usuarios.usuario.show", "usuarios.estudiante.show", "usuarios.usuario.importar"]`. Módulo `mis-estudiantes`: `["mis-estudiantes.estudiante.show"]` (entrada propia en el menú: se muestra si tiene el permiso **y** `user.tiene_estudiantes`, decisión 14; un admin con todo el catálogo no la ve salvo que también sea representante, y un profesor o admin que es representante la ve de forma natural). La ruta sigue protegida solo por permiso.

| Entrada | Ruta | Permiso | Pantalla |
|---|---|---|---|
| Personas (`index`) | `/gedure/usuarios` (`?id=`, `?tab=` de la ficha) | `usuarios.usuario.show` | `UsuariosPage` |
| Estudiantes | `/gedure/usuarios/estudiantes` (`?id=`) | `usuarios.estudiante.show` | `EstudiantesPage` |
| Importar | `/gedure/usuarios/importar`, `importar/:id` | `usuarios.usuario.importar` | `ImportarPage`, `ImportacionPage` |
| Mis estudiantes (módulo `mis-estudiantes`, `index`) | `/gedure/mis-estudiantes`, `/gedure/mis-estudiantes/:id` | `mis-estudiantes.estudiante.show` | `MisEstudiantesPage`, `MiEstudiantePage` |

Activación (pública, sin sesión): `core/activar/ActivarPage` en `/auth/activar/:token` bajo `LoginLayout` con `NoSeeAuth` (es acceso, así que va en `core/`, como `forgot`).

### 5.3 Personas (flujo de BluLabel)

- **Listado:** `PageHeader` con "Nuevo usuario" (`usuario.create`). Búsqueda (con `useDeferredValue` y *debounce* hacia el servidor), filtros rol y estado en `?q=&rol=&estado=` (URL, `replace`). Tabla en escritorio (nombre, cédula, correo, roles "primero +N", estado con chip, último acceso) y tarjetas en móvil. Paginación en servidor (`TablePagination`, 25). Estados: esqueleto, `LoadError` con Reintentar, `EmptyState` (con y sin filtros).
- **Ficha** (`ResponsivePanel`, siempre montado; contenido con `key={user.id}`), pestañas:
  - **Acceso:** roles (selector) + `PermissionEditor` aditivo (por rol bloqueado "Por <rol>", directo, directo redundante, no concedido; agrupado por módulo con nombre e icono del registro; búsqueda y "Solo concedidos"). Owner: aviso de acceso total, sin editor.
  - **Datos:** nombre, cédula/usuario, correo, teléfono, dirección, sexo.
  - **Estudiantes** (solo si tiene el rol `representante`): lista de vinculados con parentesco y principal; "Vincular estudiante" (buscador sobre `GET /estudiantes?q=`) y quitar. Estas acciones se aplican al momento (no van al borrador): son de otro recurso.
  - **Seguridad:** estado de la cuenta (`UserStatusNotice`), reenviar activación (pendiente), suspender (con motivo) / reactivar, botón **"Cerrar todas sus sesiones"** (`usuario.update`; sin listado de dispositivos; oculto para uno mismo y en bajas), dar de baja / restaurar; cada una con `ConfirmDialog`.
  - **Historial:** bitácora por cursor (`infiniteQuery`), filtro por tipo.
  - Acceso + Datos son **un solo formulario** (react-hook-form, `FormProvider`) con **borrador**: `SaveBar` "Guardar / Descartar"; `useSaveUsuario` lanza en paralelo solo los bloques que cambiaron (`PATCH`, `PUT roles`, `PUT permisos`), optimistas y silenciosos, con un único aviso; si uno falla se deshace ese bloque y el 422 va al campo. Cerrar con cambios pide confirmación. Baja = solo lectura.
- **Bloque:** casillas en las filas de la página actual + "seleccionar página"; `BulkRolesBar` → `BulkRolesDialog` (añadir/quitar roles, sin `owner`) → `POST /usuarios/roles/bloque`. Aviso con el `msg` y lista de fallidas con su motivo; se deshace solo lo fallido; las fallidas quedan seleccionadas.
- **Nuevo usuario:** `NuevoUsuarioPanel` (`ResponsivePanel`): datos + roles (+ permisos directos opcionales) + "Enviar enlace de activación ahora" (marcado). Al crear, abre su ficha.
- `userRules.js` (puras, con tests): uno mismo, owner (solo un owner, nunca en bloque), delegación (`useGrantLock`), baja, `BULK_MAX = 200`, no quitar `representante` con estudiantes.

### 5.4 Estudiantes

- **Listado** (tabla/tarjetas, paginado): nombre, cédula, edad, representante principal, estado. Filtros: `q`, estado, "sin representante". Acciones: "Nuevo estudiante", "Exportar a Excel" (descarga con `fetch` + Bearer vía un endpoint de RTK con `responseHandler: blob`).
- **Ficha** (`ResponsivePanel`): pestañas **Datos** (formulario con borrador) y **Representantes** (vincular con buscador de personas con rol `representante`, parentesco, marcar principal, quitar).
- **Datos** agrupados como en master: identificación (cédula, nacionalidad, nombres, apellidos, sexo, fecha, estado y lugar de nacimiento, lateralidad), vivienda (dirección, sector, tipo, zona, condición), otros (becado, alojado, observaciones), estado.
- Reglas del cliente en `rules.js`: formato de cédula, fecha de nacimiento no futura, `estado_nacimiento` solo si nacionalidad `V`.

### 5.5 Módulo `mis-estudiantes`

Visible solo con permiso y al menos un estudiante vinculado (`user.tiene_estudiantes`, decisión 14). Tarjetas con los estudiantes del representante y una ficha de solo lectura con sus datos. En fases siguientes, los módulos `notas`, `documentos` y `finanzas` enlazan desde aquí a sus pantallas (por permiso, sin depender del módulo).

### 5.6 Importar (asistente)

1. **Historial + subir:** lista de importaciones (estado, fecha, quién, resumen) y `FileDropField` (nuevo en `components/form/`, CSV/XLSX, 5 MB) con selector de tipo y botones **"Descargar plantilla (Excel / CSV)"** del tipo elegido, junto a un resumen de las columnas obligatorias.
2. **Validando:** `ImportacionPage` sondea `GET /importaciones/{id}` con `pollingInterval: 2000` mientras `validando`/`aplicando` (no hay notificaciones hasta la fase 7).
3. **Previsualizar:** contadores del `resumen`; tabla de filas con error (n.º de fila, datos, motivos); opciones `actualizar_existentes` y `enviar_activacion`; "Descargar errores", "Descartar", "Confirmar importación (N filas)".
4. **Resultado:** contadores finales, filas `fallida` con motivo y descarga del CSV de errores.

### 5.7 RTK Query

Tags nuevos en `store/services/baseApi.js`: `Usuario`, `Rol`, `Permiso`, `Actividad`, `Estudiante`, `MisEstudiantes`, `Importacion`.

| Hook | Provee / invalida |
|---|---|
| `useGetUsuariosQuery(filtros)` | `Usuario` (ids + `LIST`) |
| `useGetUsuarioQuery(id)` (enlace directo `?id=` que no está en la página) | `Usuario:id` |
| `useGetRolesQuery`, `useGetPermisosQuery` → `useAccessCatalog()` | `Rol`, `Permiso` (índice por módulo en `transformResponse`) |
| `useGetActividadInfiniteQuery(id)` | `Actividad:id` |
| create/update/estado/roles/permisos | invalidan `Usuario:id` + `Usuario:LIST` y `Actividad:id`; optimistas sobre la caché de la página actual con `undo()` |
| `useBulkUsuarioRolesMutation` | optimista por fila; deshace solo `failed`; invalida `Usuario:LIST` |
| `useGetEstudiantesQuery`, `useGetEstudianteQuery`, `useGetEstudiantesDeUsuarioQuery` | `Estudiante` |
| vínculos | invalidan `Estudiante:id`, `Usuario:userId` (contador y pestaña), `Actividad:userId`, `MisEstudiantes` |
| `useGetMisEstudiantesQuery`, `useGetMiEstudianteQuery` | `MisEstudiantes` |
| importación | `Importacion:id`; `confirmarImportacion` al completarse invalida `Usuario:LIST` y `Estudiante:LIST` (desde el `onQueryStarted` del sondeo cuando el estado pasa a `completada`) |

## 6. Notificaciones y correos

Se sigue BluLabel: **la persona elige su contraseña con un enlace**, nunca una contraseña temporal por correo.

| Correo (`app/Mail/Usuarios/`) | Cola | Cuándo |
|---|---|---|
| `ActivacionCuentaMail` (enlace `/auth/activar/{token}`, caduca en 7 días, nombre del colegio y quién la creó) | `high` si la pide alguien en pantalla (alta, reenviar); `emails` desde la importación | Alta con `enviar_activacion`, reenviar, importación con `enviar_activacion` |
| `CorreoCambiadoMail` (al correo anterior) | `emails` | Cambio de correo por administración |
| `PasswordChangedMail` (ya existe) | `emails` | Al activar no se envía (es la primera contraseña) |

- Todos con `Mail::to()->queue()` y `afterCommit()`. Suspender **no** envía correo (§9, decisión 4).
- Login de una cuenta **pendiente**: la contraseña aleatoria nunca se comunica, así que nadie entra; "¿Olvidaste tu contraseña?" sí funciona y además activa la cuenta (si el código llega a su correo, el correo es suyo). Login de una **suspendida**: 403 `{status, msg: "Tu cuenta está suspendida"}` tras validar la contraseña (como BluLabel), nunca 401. Baja: credenciales incorrectas (no existe para Sanctum).
- `PermissionsUpdated` en tiempo real ya sale (fase 0); el cliente lo escuchará cuando haya Echo (fase 7 o antes, pregunta 10 del roadmap). Sin Echo, los permisos nuevos se ven al siguiente relogin.

## 7. Tests

**Backend (Pest)** — `tests/Feature/Usuarios/`, helpers en `tests/Helpers/Usuarios.php` (`estudianteDe($representante)`, `representanteCon(...$estudiantes)`, `archivoImportacion(array $filas, 'xlsx'|'csv')`), factories `Usuarios\EstudianteFactory` y estados de `UserFactory` (`pendiente()`, `suspendido()`, `deBaja()`).

| Archivo | Cubre |
|---|---|
| `UsuariosListadoTest` | filtros, paginación, bajas solo con `estado`, consultas constantes (sin N+1) |
| `UsuariosAltaTest` | 201, únicos, cédula, owner solo por owner, `GrantGuard`, correo de activación en `high` |
| `ActivacionTest` | token válido/desconocido (404)/usado/caducado (410), throttle, login posterior, recuperar contraseña activa |
| `UsuariosEdicionTest` | solo lo enviado, cambio de correo (revoca, avisa, invalida activación), propio correo 422 |
| `EstadoCuentaTest` | suspender/reactivar/baja/restaurar, cerrar todas sus sesiones (revoca todos los tokens, bitácora, 422 uno mismo y baja), uno mismo, último owner, `account.active` 403, login suspendida 403 |
| `RolesYPermisosTest` (ya previsto) | orden de errores, owner, delegación, bloque con fallos parciales, quitar `representante` con estudiantes 422, un solo `PermissionsUpdated` |
| `BitacoraTest` | cada acción escribe su tipo con actor; cursor |
| `EstudiantesTest`, `VinculosTest` | CRUD, cédula única, obligatorios, enums, un principal, solo representantes |
| `MisEstudiantes/MisEstudiantesTest` | solo los propios; ajeno 404; sin permiso 403 |
| `ExportarEstudiantesTest` | cabeceras y filas del xlsx |
| `PlantillaImportacionTest` | xlsx y csv: cabeceras en orden, hoja `Instrucciones`, fila de ejemplo; la plantilla descargada y rellenada se importa sin errores; alias de master |
| `ImportacionTest` | validación por fila y entre filas, cabeceras que faltan, confirmar (jobs con `Queue::fake()` y luego `sync`), idempotencia (subir dos veces), `actualizar_existentes`, fila fallida no detiene el resto, `GrantGuard`, CSV de errores |
| `Unit/Usuarios/CedulaTest`, `TipoActividadTest` | reglas puras y títulos |
| `Datasets/RutasPrivadas.php` (nuevo) | cada ruta nueva: 401 sin token, 403 con el temporal |

**Frontend (Vitest + Testing Library + `mockRoutes`)** — fixtures en `modules/usuarios/test/usuariosBackend.js`.

| Archivo | Cubre |
|---|---|
| `userRules.test.js`, `permissions.test.js`, `rules.test.js`, `usuariosFilters.test.js` | reglas puras |
| `PermissionEditor.test.jsx` | estados, bloqueo por delegación, `readOnly`, owner |
| `UsuariosPage.test.jsx` | listado, filtros en la URL, paginación, ficha por `?id=`, vacío/error |
| `UsuarioPanel.test.jsx` | borrador, guardar solo lo cambiado (cuerpos enviados), 422 al campo, 403 deshace, descartar con confirmación, baja = solo lectura |
| `BulkRolesBar.test.jsx` | fallos parciales: aviso, deshace solo fallidas |
| `NuevoUsuarioPanel.test.jsx`, `Seguridad.test.jsx` | alta, acciones de estado con confirmación |
| `EstudiantesPage.test.jsx`, `EstudiantePanel.test.jsx` | CRUD y vínculos |
| `mis-estudiantes/test/MisEstudiantesPage.test.jsx` | lista y ficha; sin permiso → `/gedure/no-perm` |
| `ImportacionPage.test.jsx` | subir, sondeo (timers falsos), previsualizar, confirmar, resultado |
| `core/activar/ActivarPage.test.jsx` | token válido, 410, contraseña → `/auth` |
| `apps/registry.test.js` | módulos `usuarios` y `mis-estudiantes` registrados y rutas coherentes |

## 8. Plan de PRs (contra `next`)

| # | PR | Contenido |
|---|---|---|
| 0 | `docs: diseño de la fase 1` | Este documento (+ ajustes que pida la revisión). |
| 1 | `feat(usuarios): estado de cuenta y bitácora` | Migración de `users` (§2.1), `SoftDeletes`, `actividades` + `Bitacora` + `TipoActividad`, `account.active`, login de suspendida (403) y `login` en la bitácora, factory states, dataset `RutasPrivadas`. |
| 2 | `feat(usuarios): listado, ficha y catálogo` | `GET /usuarios`, `/usuarios/{id}`, `/roles`, `/permisos`, `/usuarios/{id}/actividad`, `UsuarioResource`, `UserPolicy`, `UsuarioTargetRequest`, los 13 permisos del catálogo (admin = todos). `estudiantes_count` llega en el PR #8. |
| 3 | `feat(usuarios): roles y permisos` | `PUT roles`, `PUT permisos`, `POST roles/bloque` con `GrantGuard` y reglas de owner. |
| 4 | `feat(usuarios): alta, activación y estado` | `POST /usuarios`, `activaciones` + mail + rutas públicas, `PATCH`, suspender/reactivar/baja/restaurar/cerrar todas sus sesiones/reenviar. |
| 5 | `feat(front-usuarios): listado y ficha de lectura` | Módulo registrado, `usuariosApi`, tags, listado paginado con filtros, ficha con Historial y Seguridad de solo lectura. |
| 6 | `feat(front-usuarios): editar acceso y datos` | `PermissionEditor`, borrador + `SaveBar`, `userRules`, `useGrantLock`, bloque. |
| 7 | `feat(front-usuarios): alta, estado y activación` | `NuevoUsuarioPanel`, acciones de Seguridad, `core/activar`. |
| 8 | `feat(usuarios): estudiantes y vínculos` | Tablas §2.3-2.4, endpoints §4.5, exportación (OpenSpout). |
| 9 | `feat(mis-estudiantes): vista del representante` | Endpoints §4.6, `tiene_estudiantes` en el payload de sesión (`AuthService::accessPayload`/`user`), condición del menú (permiso + `tiene_estudiantes`), módulo `modules/mis-estudiantes/` (§5.5). El permiso ya existe desde el PR #2. |
| 10 | `feat(front-usuarios): estudiantes` | Pantallas §5.4, pestaña Estudiantes de la ficha. |
| 11 | `feat(usuarios): plantilla e importación` | `PlantillaImportacion` + `GET /importaciones/plantilla`, tablas §2.6, jobs, endpoints §4.7, prune. |
| 12 | `feat(front-usuarios): asistente de importación` | §5.6, `FileDropField`, descarga de plantilla. |
| 13 | `docs: fase 1 implementada` | Actualizar `backend/permisos.md`, `api.md`, `frontend/permisos.md`, `README.md` (Estado) y el roadmap. |

## 9. Decisiones aprobadas

1. **Formato de la cédula** (en `username` y en `estudiantes.cedula`): solo dígitos para venezolanos (`12345678`, como el seed actual y como master, que la guardaba como número) y prefijo `E` para extranjeros; el login y la importación aceptan `V-12.345.678` y lo normalizan.
2. **Representantes sin correo:** el correo es obligatorio para tener cuenta; en la importación, una fila sin correo crea el estudiante pero la fila queda con error ("sin correo") para completar el representante a mano.
3. **Representante principal:** como mucho uno por estudiante, opcional en fase 1 (aviso "sin principal" en la lista); obligatorio en la fase 5 para generar deudas.
4. **Suspensión:** como BluLabel (bloquea el acceso, revoca sesiones, con motivo, reversible; los vínculos con estudiantes se conservan), **sin** correo de aviso a la persona suspendida.
5. **Activación de cuentas:** enlace de un solo uso por correo (7 días), nunca contraseña temporal; desde la importación solo se envían enlaces si quien confirma marca la casilla. Sin bitácora de cambios del estudiante en fase 1.
6. **Sin auto-registro** de representantes hasta la fase 8 (preselección); las cuentas las crea la administración o la importación.
7. **Listado de personas:** paginado en el servidor (25 por página); la asignación en bloque trabaja sobre la página visible (máx. 200).
8. **Sesiones de otra persona:** en la ficha del usuario, pestaña Seguridad, solo un botón **"Cerrar todas sus sesiones"** (`DELETE /usuarios/{id}/sesiones`, permiso `usuarios.usuario.update`: revoca todos sus tokens y, cuando existan, sus suscripciones push; bitácora `sesiones_cerradas`), sin listado de dispositivos.
9. **Campos del estudiante y del representante:** los del Gedure anterior (§2.3, §2.8).
10. **Importación:** plantilla descargable (XLSX/CSV) a la que la institución adapta sus datos, una fila por vínculo (§4.7).
11. **"Mis estudiantes"** es un módulo propio (`mis-estudiantes`), no parte de `usuarios`.
12. **CI:** los workflows corren solo en PR a `master`; `next` es rama de integración pura (sin PR de CI en esta fase).
13. **Bitácora solo por usuario:** cada entrada pertenece a la persona afectada (con el actor); se consulta en el Historial de su ficha (`GET /usuarios/{id}/actividad`). No hay vista ni endpoint de bitácora general.
14. **Menú "Mis estudiantes":** solo se muestra a quien tiene al menos un estudiante vinculado (además del permiso). Así el admin, que tiene todo el catálogo, no lo ve salvo que también sea representante, y un profesor/admin que es representante lo ve de forma natural.

No quedan preguntas abiertas.
