<?php

namespace App\Enums\Usuarios;

use App\Enums\Role;

/**
 * Tipos de evento de la bitácora de una persona (`actividades.tipo`).
 *
 * Valores ESTABLES (los guarda la base y los lee el frontend): no se renombran.
 * El título no se guarda: lo calcula `title()` desde `lang/es/actividad.php`.
 * Se escriben con `App\Services\Usuarios\Bitacora`, nunca desde eventos de spatie.
 *
 * `meta` por tipo (docs/fases/fase-1-usuarios.md §2.5):
 * - `datos_actualizados`: `{campos: string[]}`.
 * - `rol_cambiado`: `{rol, cambio: agregado|quitado}`.
 * - `permiso_agregado` / `permiso_quitado`: `{permiso}`.
 * - `suspension`: `{motivo?}`.
 * - `sesiones_cerradas`: `{tokens}`.
 * - `estudiante_vinculado` / `estudiante_desvinculado`: `{estudiante_id, nombre, parentesco}`.
 * - `importado`: `{importacion_id}`.
 *
 * Hoy solo se escribe `login` (canje del 2FA, `AuthController`); el resto llega
 * con los Services de usuarios de la fase 1.
 */
enum TipoActividad: string
{
    case CuentaCreada = 'cuenta_creada';
    case ActivacionEnviada = 'activacion_enviada';
    case CuentaActivada = 'cuenta_activada';
    case Login = 'login';
    case DatosActualizados = 'datos_actualizados';
    case CorreoCambiado = 'correo_cambiado';
    case ContrasenaCambiada = 'contrasena_cambiada';
    case RolCambiado = 'rol_cambiado';
    case PermisoAgregado = 'permiso_agregado';
    case PermisoQuitado = 'permiso_quitado';
    case Suspension = 'suspension';
    case Reactivacion = 'reactivacion';
    case Baja = 'baja';
    case Restauracion = 'restauracion';
    case SesionesCerradas = 'sesiones_cerradas';
    case EstudianteVinculado = 'estudiante_vinculado';
    case EstudianteDesvinculado = 'estudiante_desvinculado';
    case Importado = 'importado';

    /**
     * Título del evento en español.
     *
     * Un tipo con variantes (`rol_cambiado`) la lee de `meta.cambio`; los
     * marcadores `:x` se rellenan con los valores escalares de `meta` (el rol,
     * con su nombre legible). Sin traducción, el propio valor del tipo.
     *
     * @param  array<string, mixed>  $meta
     */
    public function title(array $meta = []): string
    {
        $key = 'actividad.'.$this->value;

        if (is_array(trans($key))) {
            $variante = isset($meta['cambio']) && is_string($meta['cambio']) ? $meta['cambio'] : 'default';
            $key = trans()->has("{$key}.{$variante}") ? "{$key}.{$variante}" : "{$key}.default";
        }

        if ($this === self::RolCambiado && isset($meta['rol']) && is_string($meta['rol'])) {
            $meta['rol'] = Role::tryFrom($meta['rol'])?->label() ?? $meta['rol'];
        }

        if (! trans()->has($key) || ! is_string(trans($key))) {
            return $this->value;
        }

        return __($key, array_filter($meta, 'is_scalar'));
    }
}
