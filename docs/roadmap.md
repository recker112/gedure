# Hoja de ruta de Gedure

Plan acordado para la reescritura. Gedure **arranca de cero el próximo año escolar**: no se migran datos del sistema actual. Se conservan todas las funciones del Gedure anterior (v5.3.0: boletas, notificaciones en tiempo real, gestión de usuarios y permisos, exportación de estudiantes a Excel, noticias públicas y privadas, recuperación de contraseña, verificación de pagos, mensualidades e inscripciones automáticas, transferencia de saldo entre cuentas, tasa del BCV, avisos de errores) y se añaden muchas más.

## Método de trabajo por fase

1. **Documento de diseño corto** (`docs/fases/fase-N-<nombre>.md`; la fase 1 en [fases/fase-1-usuarios.md](fases/fase-1-usuarios.md)): modelo de datos, endpoints y pantallas. **Lo aprueba el usuario** antes de escribir código.
2. **Backend con tests** (Pest), siguiendo [backend/](backend/arquitectura.md).
3. **Frontend** (módulo en `src/modules/<m>/`, con tests), siguiendo [frontend/](frontend/arquitectura.md).
4. **PRs pequeños y revisables** (un recurso o un flujo por PR) contra `next`.

**Transversal:** **no hay stack de pruebas ni staging en vps-candelaria**. Todo se prueba en el stack local (el `docker-compose` de este repositorio). La app se despliega en vps-candelaria **solo cuando esté lista para producción** (imagen de GHCR tras Nginx Proxy Manager, MariaDB propia).

## Roles (decididos)

`owner`, `admin`, `profesor`, `representante`. **No hay rol de coordinación ni de estudiante.** Lo que haría coordinación (abrir/cerrar lapsos, bloquear notas, publicar boletas) lo hacen admin/owner por permisos. Los **estudiantes no inician sesión**: son registros vinculados a uno o más representantes, que ven sus datos. Detalle en [backend/permisos.md](backend/permisos.md).

## Fases

### Fase 0 · Base

- Convenciones (estos documentos) aprobadas.
- Roles y permisos: `spatie/laravel-permission`, `Permission`/`Role` enums, `permissions:sync`, `Gate::before` para owner, `permissions`/`roles`/`is_owner` en la sesión, render 403 de spatie.
- Frontend (hecho): `useCanAccess`, `AuthProtect` con permisos, `/gedure/no-perm`, registro de módulos (`apps/registry.js`, `apps/routes.js`, `moduleRoute`, `modules/_plantilla`) y **una sola API base de RTK Query** (`baseApi`) a la que cada módulo inyecta sus endpoints.
- Carcasa del panel (hecho): `ContainerGedure` con AppBar, Drawer desde el registro de módulos y menú de cuenta; el placeholder se retiró.
- CI de tests en PR (Pest, Vitest, build): hecho (`.github/workflows/check_*.yml`; corren solo en PR a `master`: `next` es rama de integración pura, decidido).

### Fase 1 · Usuarios

- Usuarios con roles `owner`, `admin`, `profesor`, `representante`: alta, edición, suspensión/baja, roles y permisos (pantalla de administración, [frontend/permisos.md](frontend/permisos.md)).
- **Estudiantes como registros** (no usuarios) con sus datos personales y su **asignación a uno o más representantes** (vínculo N:M, parentesco).
- **Importación masiva CSV/Excel** de representantes y estudiantes (con el vínculo), en cola, con informe de filas fallidas e idempotente por cédula.
- Exportación a Excel de estudiantes (función del Gedure anterior).
- Bitácora por usuario.

### Fase 2 · Estructura académica

- **Periodos escolares y lapsos con ciclo de vida administrado** (por admin/owner):
  1. Abrir el periodo escolar.
  2. Activar un lapso (3 por periodo).
  3. Abrir / cerrar la carga de notas del lapso.
  4. Cerrar el lapso (bloquea notas).
  5. **Transición de periodo:** promoción de estudiantes al grado siguiente y registro de **materias pendientes**.
- **Planes de estudio** con **código del ministerio**: primaria + **N menciones dinámicas** (no un número fijo; se crean desde la administración).
- **Catálogo único de materias** y **pensum** por plan y grado.
- **Secciones** por grado y periodo.
- **Asignación profesor–materia–sección.**
- **Inscripción** del estudiante en una sección del periodo.

### Fase 3 · Carga de notas

- El profesor carga **solo la nota final por estudiante y lapso** (no evaluaciones parciales), en las secciones/materias asignadas y mientras la carga esté abierta.
- 3 lapsos; **nota final de la materia = promedio** de los lapsos (regla de redondeo a confirmar en el diseño).
- **Recuperación** y **materias pendientes**.
- **Primaria:** literal **A–E** más una descripción; **nunca números**.
- **Media general y menciones:** escala **1–20**.
- **6.º año de mención:** una única materia, **pasantía profesional**, evaluada con número como cualquier otra.
- **Cierre y bloqueo** por admin/owner (permisos `notas.*`); corregir una nota cerrada es una acción con permiso propio.
- **Registro de cambios** de cada nota (quién, cuándo, valor anterior y nuevo).

### Fase 4 · Boletas y documentos oficiales

- **Boleta PDF** con diseño libre (propio de Gedure), por estudiante y por sección (en cola); el representante la ve y descarga desde su panel.
- **Resumen final** y **notas certificadas** rellenando las **plantillas Word del ministerio** (p. ej. `PhpWord` `TemplateProcessor`), con conversión a PDF si hace falta.
- Publicación de boletas controlada por admin/owner.

### Fase 5 · Finanzas

- **Deudas** por representante/estudiante (mensualidades, inscripción, otros conceptos).
- **Lotes de deuda** (generación masiva de mensualidades, como hacía el Gedure anterior de forma automática).
- **Monederos** (saldo a favor) y transferencia de saldo entre cuentas.
- Tasa del BCV (sincronización programada) y moneda de cada monto.

### Fase 6 · Pagos

- El **representante reporta** el pago (referencia, banco, monto, fecha, comprobante).
- El admin **carga el estado de cuenta bancario** y los pagos coincidentes **se verifican solos** (conciliación); los que no coinciden quedan para revisión manual.
- El pago verificado abona deudas o el monedero.

### Fase 7 · Comunicación

- **Comunicados** con audiencia por plan / grado / sección (y por rol).
- **Noticias** públicas (web del colegio, hoy con datos fijos en `core/news`) y privadas.
- **Notificaciones en tiempo real** con Reverb + Echo (y persistentes en BD). El **Web Push** y la PWA van juntos en la fase 9. Convención en [backend/notificaciones.md](backend/notificaciones.md) y [frontend/notificaciones.md](frontend/notificaciones.md).
- **Ayuda / soporte** (avisos de errores de la versión anterior).

### Fase 8 · Preselección

- **Pre-inscripción de nuevos ingresos** (formulario público, revisión y aceptación que crea el estudiante y su representante).
- Depende de las fases 1 y 2. **Puede adelantarse** según el calendario escolar (si el periodo de preinscripción llega antes que las fases 3-7).

### Fase 9 · Web Push y PWA (la última)

- Se hace **al final**, cuando todo lo demás funciona. Web Push necesita el service worker, así que **push y PWA se entregan juntos**.
- **Web Push** (aviso del sistema aunque no haya pestaña abierta): VAPID, suscripciones y `WebPushChannel` sobre las notificaciones de la fase 7.
- **PWA instalable:** manifest, iconos, service worker base y aviso de instalación.
- Convención en [backend/notificaciones.md](backend/notificaciones.md) y [frontend/notificaciones.md](frontend/notificaciones.md).

## Decisiones aprobadas

- **Owner por `Gate::before`:** pasa todo; solo otro owner da o quita el rol y siempre queda al menos uno.
- **`admin` es un rol editable** con todo el catálogo de permisos. Roles finales: `owner`, `admin`, `profesor`, `representante`.
- **Permisos** con nombre `modulo.recurso.accion`.
- **Dominio en español:** clases con tabla explícita, `PeriodoEscolar` y `Grado`, URLs en español.
- **Administración de usuarios y permisos** en `modules/usuarios/`.
- **Rutas públicas:** un módulo puede exportar `publicRoutes`.
- **Una sola API base de RTK Query** (`baseApi`) con `injectEndpoints` por módulo ([frontend/estado-y-api.md](frontend/estado-y-api.md)).
- **PWA y Web Push al final** (fase 9).

## Preguntas abiertas

1. **Conciliación (fase 6):** ¿qué banco(s) y qué formato de estado de cuenta (CSV, Excel, TXT, PDF)? ¿Qué campos permiten emparejar (referencia completa o últimos dígitos, monto, fecha)? El Gedure anterior solo verificaba Banco Bicentenario.
2. **Plantillas del ministerio (fase 4):** ¿cuáles hacen falta exactamente (resumen final, notas certificadas, otras) y en qué versión? Se necesitan los `.docx` originales.
3. Redondeo de la nota final (¿promedio con decimales, redondeo a entero, ≥ 0,5 sube?) y nota mínima aprobatoria (¿10?).
4. Recuperación: ¿cuántas oportunidades, cómo se registra y si sustituye la nota final o un lapso?
5. Literal de primaria: ¿la nota final del año es otro literal, y cómo se calcula (o la decide el docente)?
6. Moneda de las deudas (USD referencial + Bs. a tasa BCV del día del pago?) y política de mora.
7. ¿Un estudiante puede tener varios representantes con acceso igual, o uno "principal" para cobros?
8. Datos mínimos del estudiante y del representante para la importación masiva (columnas del CSV/Excel).
9. ¿Hace falta suspender/dar de baja cuentas (middleware `account.active` de BluLabel) y ver/cerrar sesiones de otros?
10. Adelantar Echo/Reverb en el frontend (permisos en caliente desde la fase 0) o esperar a la fase 7.
