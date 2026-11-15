<?php

namespace App\Enums;

/**
 * Catálogo único de permisos (spatie/laravel-permission, guard `web`).
 *
 * Convención `modulo.recurso.accion`: módulo como su carpeta de rutas
 * (`usuarios`, `academico`, `notas`...), recurso en singular y en español sin
 * tildes, y acción `show` (ver/listar), `create`, `update`, `destroy` o un verbo
 * de dominio en `snake_case` (`abrir`, `cerrar`, `importar`). Gedure es una sola
 * app: no hay `<modulo>.access`.
 *
 * Cada módulo añade aquí sus permisos al implementarse. `php artisan
 * permissions:sync` lleva este catálogo a la base de datos y borra los permisos
 * que ya no estén aquí. Ver docs/backend/permisos.md.
 */
enum Permission: string
{
    // ── Usuarios ─────────────────────────────────────────────────────────
    case UsuariosUsuarioShow = 'usuarios.usuario.show'; // ver usuarios y el catálogo de roles y permisos
    case UsuariosRolUpdate = 'usuarios.rol.update'; // asignar y quitar roles (también en bloque)
    case UsuariosPermisoUpdate = 'usuarios.permiso.update'; // asignar y quitar permisos directos
    case UsuariosUsuarioCreate = 'usuarios.usuario.create'; // dar de alta y reenviar la activación
    case UsuariosUsuarioUpdate = 'usuarios.usuario.update'; // editar datos, suspender/reactivar, cerrar sus sesiones
    case UsuariosUsuarioDestroy = 'usuarios.usuario.destroy'; // dar de baja y restaurar
    case UsuariosUsuarioImportar = 'usuarios.usuario.importar'; // plantilla e importación masiva
    case UsuariosEstudianteShow = 'usuarios.estudiante.show'; // listar y ver todos los estudiantes
    case UsuariosEstudianteCreate = 'usuarios.estudiante.create'; // alta de estudiantes
    case UsuariosEstudianteUpdate = 'usuarios.estudiante.update'; // editar estudiante y sus vínculos con representantes
    case UsuariosEstudianteDestroy = 'usuarios.estudiante.destroy'; // borrar un alta errónea
    case UsuariosEstudianteExportar = 'usuarios.estudiante.exportar'; // Excel de estudiantes

    // ── Mis estudiantes (representante) ──────────────────────────────────
    case MisEstudiantesEstudianteShow = 'mis-estudiantes.estudiante.show'; // solo los propios (pertenencia → 404)

    /**
     * Nombres de todos los permisos del catálogo, en su orden.
     *
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /** Módulo al que pertenece (primer segmento del nombre). */
    public function modulo(): string
    {
        return strtok($this->value, '.');
    }
}
