# Permisos en el frontend y administración de roles

**Convención de Gedure**, tomada del flujo de BluLabel (`/users`, `PermissionEditor`, `useCanAccess`, `usePermissionsSocket`). Aquí se describen **el comportamiento y la estructura**; el aspecto visual es propio de Gedure (tema La Candelaria, ver [ui.md](ui.md)) y no se copia de BluLabel. Contrato del backend en [../backend/permisos.md](../backend/permisos.md). La autorización en el cliente **ya existe** (fase 0); la pantalla de administración es de la fase 1.

## Autorización en el cliente

- **Solo por permisos** (`modulo.recurso.accion`), nunca por roles: `auth.roles` es informativo (etiquetas).
- El owner (`auth.isOwner`) pasa siempre.
- `hooks/auth/useCanAccess.js`:

  ```js
  const can = useCanAccess();
  can({ permission: "notas.nota.update" });                 // string o array: basta uno
  can({ allPermissions: ["usuarios.rol.update", "usuarios.permiso.update"] });
  ```

- `hasPermission`, `hasAllPermissions` y `canAccess` son funciones puras exportadas por el mismo archivo; `auth` (Redux) guarda `permissions`, `roles` e `isOwner`.
- `AuthProtect permission=… allPermissions=…` en rutas (vía `moduleRoute`, [modulos.md](modulos.md)); sin permiso → `/gedure/no-perm`.
- El menú filtra cada entrada con la misma regla (`config.js` del módulo).
- **Cada componente pregunta sus propios permisos** (`useCanAccess` o un hook del módulo, p. ej. `useUserPermissions(user)`); la página no pasa `perms` por props. Lo que no se puede hacer se oculta o se deshabilita con una explicación ("No tienes permiso para cerrar el lapso").
- Esto es comodidad, no seguridad: el backend vuelve a comprobarlo todo.
- **En caliente:** `usePermissionsSocket` (en `AuthLayout`, cuando exista Echo) escucha `.permissions.updated` en el canal personal y reemplaza `permissions`/`roles`/`isOwner` en el slice; guards y menú se recalculan solos.

## Pantalla de administración de usuarios (`modules/usuarios/`)

Ruta `/gedure/usuarios`, protegida con `usuarios.usuario.show`. Datos de `usuariosApi`.

### Flujo

1. **Listado de personas** con búsqueda (nombre, cédula, correo) y filtros por rol y estado; tabla en escritorio, tarjetas en móvil. Cada fila muestra sus roles (el primero y "+N").
2. **Ficha** al elegir una persona: panel lateral en escritorio, pantalla completa en móvil (la URL lleva el id para poder enlazarla). Pestañas:
   - **Datos**: los de la persona (edición con `usuarios.usuario.update`).
   - **Roles y permisos**: selección de roles y editor de permisos directos (abajo).
   - **Estudiantes** (solo si tiene el rol `representante`): sus estudiantes vinculados, añadir o quitar vínculos (fase 1). Los estudiantes no son usuarios: tienen su propia pantalla en `/gedure/usuarios/estudiantes`.
   - **Seguridad**: sesiones activas y cerrarlas (fase 1, si se adopta).
   - **Historial**: bitácora de la persona (fase 1).
   Los cambios se acumulan en un **borrador** y se guardan con una barra "Guardar / Descartar"; al salir con cambios sin guardar se pide confirmación.
3. **Asignación en bloque**: casillas en el listado + barra de acciones "Asignar rol / Quitar rol" → diálogo → `POST /usuarios/roles/bloque`. El resultado parcial se respeta: se avisa "Asignado a 18; 2 no se pudieron actualizar" y solo se deshacen las fallidas (cada una con su motivo).
4. **Mis permisos** en la cuenta propia (`core/account`): solo lectura de los permisos de la sesión, agrupados por módulo y recurso, sin pedir el catálogo (que es solo para administradores).

### Editor de permisos: modelo aditivo

Refleja el modelo de spatie (efectivos = permisos de los roles ∪ directos):

| Estado de un permiso | Cómo se comporta |
|---|---|
| Lo da un rol | Marcado y **bloqueado** con "Por <rol>": se quita quitando el rol. |
| Directo | Conmutable. |
| Directo y además por rol | "Directo (redundante)", se puede limpiar. |
| No concedido | Conmutable (si la delegación lo permite). |

- Agrupado por **módulo** (nombre e icono del `config.js` del módulo; `apps/registry.js` es la única fuente) y por **recurso**, con búsqueda y filtro "Solo concedidos". Textos de recurso y acción en `modules/usuarios/permissionLabels.js`; un permiso sin traducción muestra su nombre técnico.
- Owner: sin editor, aviso de acceso total.
- Componente **puro** respecto a las mutations: recibe `readOnly`, `grantLock`, `onToggleDirect`; lee el catálogo con `useAccessCatalog()`.

### Reglas que la UI bloquea antes (las mismas que el backend)

En `modules/usuarios/userRules.js` (funciones puras, con tests):

- **Uno mismo**: no cambia sus roles ni permisos (controles deshabilitados con motivo).
- **Owner**: solo otro owner lo gestiona; el rol `owner` solo lo da o quita un owner; nunca en bloque.
- **Delegación** (`useGrantLock`): solo se concede lo que uno tiene (roles cuyos permisos actuales tiene, permisos directos que tiene). Quitar no se restringe.
- **Dada de baja**: ficha de solo lectura.
- Tope del bloque (`BULK_MAX` = 200, igual que el backend).

Si aun así llega un 403 o 422 de dominio: aviso con el `msg` y se deshace el cambio optimista. Los 422 de campo van al campo con `setError`.

### Endpoints y hooks (`usuariosApi`)

| Método y ruta | Hook | Notas |
|---|---|---|
| `GET /roles` | `useAccessCatalog()` / `useRolesCatalog()` | Solo administradores; solo se pide en `/gedure/usuarios`. |
| `GET /permisos` | `useAccessCatalog()` / `useCatalogIndex()` | Índice por módulo calculado en `transformResponse`, no en render. |
| `GET /usuarios?q=&rol=&estado=` | `useGetUsuariosQuery` | Lista; con pocos cientos se pide entera y se filtra en el cliente; si crece, filtros en servidor + `infiniteQuery`. |
| `PUT /usuarios/{id}/roles` | `useSetUsuarioRolesMutation` | Optimista sobre la fila; invalida la lista. |
| `PUT /usuarios/{id}/permisos` | `useSetUsuarioPermisosMutation` | Solo directos. |
| `POST /usuarios/roles/bloque` | `useBulkUsuarioRolesMutation` | Deshace solo `failed`. |

Lógica pura compartida en `modules/usuarios/permissions.js`: `effectivePermissions`, `inheritedPermissions`, `permissionStates`, `groupByModule`.

### Tests

- `userRules.test.js` y `permissions.test.js`: reglas puras.
- `PermissionEditor.test.jsx`: estados (por rol, directo, redundante), bloqueo por delegación, `readOnly`.
- `UsuariosPage.test.jsx`: listado, ficha, guardar roles (cuerpo enviado con `mockRoutes`), bloque con fallos parciales, 403 deshace el optimista.
- `useCanAccess.test.jsx` (funciones puras `hasPermission`/`hasAllPermissions`/`canAccess` y el hook) y `components/routers/Routers.test.jsx` (`AuthProtect` con permisos: owner pasa, sin permiso → `/gedure/no-perm`). Ya existen.
