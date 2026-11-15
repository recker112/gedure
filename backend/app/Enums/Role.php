<?php

namespace App\Enums;

use App\Enums\Permission as P;

/**
 * Roles del catálogo con sus permisos INICIALES.
 *
 * `permissions:sync` crea con estos permisos los roles que no existen. Un rol
 * que ya existe no se toca (sus permisos se editan desde la administración):
 * solo recibe los permisos que el propio sync acaba de crear y figuran aquí.
 * Ver docs/backend/permisos.md.
 *
 * `Owner` no tiene permisos: pasa cualquier comprobación por `Gate::before`
 * (AppServiceProvider). Solo otro owner lo da o lo quita y siempre debe quedar
 * uno. Los estudiantes no son usuarios: no hay rol de estudiante.
 */
enum Role: string
{
    case Owner = 'owner';
    case Admin = 'admin';
    case Profesor = 'profesor';
    case Representante = 'representante';

    /** Nombre legible del rol (`GET /roles`). */
    public function label(): string
    {
        return match ($this) {
            self::Owner => 'Owner',
            self::Admin => 'Administración',
            self::Profesor => 'Profesor',
            self::Representante => 'Representante',
        };
    }

    /** Descripción breve del rol (`GET /roles`). */
    public function description(): string
    {
        return match ($this) {
            self::Owner => 'Acceso total a Gedure, sin permisos asignados.',
            self::Admin => 'Administra el colegio: usuarios, estructura académica, notas, documentos y finanzas.',
            self::Profesor => 'Carga las notas de las secciones y materias que tiene asignadas.',
            self::Representante => 'Consulta las notas, boletas y deudas de sus estudiantes y reporta pagos.',
        };
    }

    /**
     * Permisos iniciales del rol.
     *
     * Profesor aún no tiene ninguno: sus permisos (`notas.nota.update`,
     * `academico.seccion.show`) llegan con sus módulos. Representante ve sus
     * estudiantes (`mis-estudiantes`); ver notas, boletas y deudas y reportar
     * pagos llegan con sus módulos. Admin recibe todo el catálogo, también
     * `mis-estudiantes.estudiante.show`: sin él no podría conceder el rol
     * representante (GrantGuard).
     *
     * @return list<P>
     */
    public function permissions(): array
    {
        return match ($this) {
            self::Owner => [],
            self::Admin => P::cases(),
            self::Profesor => [],
            self::Representante => [P::MisEstudiantesEstudianteShow],
        };
    }

    /**
     * Nombres de los permisos iniciales del rol.
     *
     * @return list<string>
     */
    public function permissionNames(): array
    {
        return array_column($this->permissions(), 'value');
    }

    /**
     * Claves de todos los roles del catálogo.
     *
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
