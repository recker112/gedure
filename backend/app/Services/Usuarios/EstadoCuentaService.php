<?php

namespace App\Services\Usuarios;

use App\Enums\Role;
use App\Enums\Usuarios\TipoActividad;
use App\Models\User;
use App\Services\Usuarios\Concerns\ReglasDeCuenta;
use Illuminate\Support\Facades\DB;

/**
 * Estado de una cuenta (docs/fases/fase-1-usuarios.md §4.2 y decisiones 4 y 8):
 * suspender, reactivar, dar de baja (SoftDeletes), restaurar y cerrar todas sus
 * sesiones. Cada acción va en una transacción que relee la fila con
 * `lockForUpdate` (dos administradores a la vez no suspenden dos veces), aplica
 * las reglas de dominio (422, también para el owner) y escribe su evento en la
 * bitácora con el actor. La jerarquía del owner (un no-owner no actúa sobre un
 * owner, 403) la pone `UserPolicy::manage` en el FormRequest.
 *
 * Suspender no envía correo a la persona (decisión 4) y conserva sus vínculos
 * con estudiantes. Revocar = borrar todos sus tokens de Sanctum (también el
 * temporal del 2FA); las suscripciones push se borrarán con ellos (fase 7).
 */
class EstadoCuentaService
{
    use ReglasDeCuenta;

    public function __construct(private readonly Bitacora $bitacora) {}

    /** Suspende con motivo opcional y revoca todos sus tokens. */
    public function suspender(User $user, User $actor, ?string $motivo = null): User
    {
        return DB::transaction(function () use ($user, $actor, $motivo) {
            $user = $this->bloquear($user->id);
            $this->exigirNoPropia($user, $actor, 'usuarios.suspender_propia');
            $this->exigirNoDeBaja($user);
            if ($user->isSuspended()) {
                $this->fallar('usuarios.ya_suspendida');
            }

            $user->forceFill([
                'suspended_at' => now(),
                'suspended_reason' => $motivo,
                'suspended_by' => $actor->id,
            ])->save();
            $user->tokens()->delete();

            $this->bitacora->registrar($user, TipoActividad::Suspension, $actor, array_filter(['motivo' => $motivo]));

            return $user;
        });
    }

    public function reactivar(User $user, User $actor): User
    {
        return DB::transaction(function () use ($user, $actor) {
            $user = $this->bloquear($user->id);
            $this->exigirNoDeBaja($user);
            if (! $user->isSuspended()) {
                $this->fallar('usuarios.no_suspendida');
            }

            $user->forceFill(['suspended_at' => null, 'suspended_reason' => null, 'suspended_by' => null])->save();

            $this->bitacora->registrar($user, TipoActividad::Reactivacion, $actor);

            return $user;
        });
    }

    /**
     * Da de baja (nunca borra) y revoca todos sus tokens. 422 si es uno mismo,
     * si ya está de baja o si es el último owner: se bloquean antes las filas de
     * los owners (en orden de id, como `UserAccessService::setRoles`) y deben
     * quedar otros; las bajas no cuentan, las suspendidas sí.
     */
    public function baja(User $user, User $actor): User
    {
        return DB::transaction(function () use ($user, $actor) {
            $owners = User::role(Role::Owner)->orderBy('id')->lockForUpdate()->pluck('id');

            $user = $this->bloquear($user->id);
            $this->exigirNoPropia($user, $actor, 'usuarios.baja_propia');
            if ($user->trashed()) {
                $this->fallar('usuarios.ya_de_baja');
            }
            if ($user->hasRole(Role::Owner) && $owners->reject(fn ($id) => (int) $id === $user->id)->isEmpty()) {
                $this->fallar('usuarios.ultimo_owner');
            }

            // Un solo UPDATE con `deleted_by`: `delete()` solo escribiría `deleted_at`
            $user->forceFill(['deleted_at' => now(), 'deleted_by' => $actor->id])->save();
            $user->tokens()->delete();

            $this->bitacora->registrar($user, TipoActividad::Baja, $actor);

            return $user;
        });
    }

    /** Restaura una baja; limpia también la suspensión. */
    public function restaurar(User $user, User $actor): User
    {
        return DB::transaction(function () use ($user, $actor) {
            $user = $this->bloquear($user->id);
            if (! $user->trashed()) {
                $this->fallar('usuarios.no_de_baja');
            }

            $user->forceFill([
                'deleted_at' => null,
                'deleted_by' => null,
                'suspended_at' => null,
                'suspended_reason' => null,
                'suspended_by' => null,
            ])->save();

            $this->bitacora->registrar($user, TipoActividad::Restauracion, $actor);

            return $user;
        });
    }

    /**
     * "Cerrar todas sus sesiones" (decisión 8): revoca todos sus tokens y
     * escribe `sesiones_cerradas` con `meta.tokens` (cuántos). 422 si es uno
     * mismo o si está de baja. Devuelve cuántos tokens se revocaron.
     */
    public function cerrarSesiones(User $user, User $actor): int
    {
        return DB::transaction(function () use ($user, $actor) {
            $user = $this->bloquear($user->id);
            $this->exigirNoPropia($user, $actor, 'usuarios.sesiones_propias');
            $this->exigirNoDeBaja($user);

            $tokens = $user->tokens()->delete();

            $this->bitacora->registrar($user, TipoActividad::SesionesCerradas, $actor, ['tokens' => $tokens]);

            return $tokens;
        });
    }
}
