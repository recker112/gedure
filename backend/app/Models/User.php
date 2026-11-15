<?php

namespace App\Models;

use App\Enums\Usuarios\EstadoCuenta;
use App\Enums\Usuarios\Sexo;
use App\Models\Auth\SecurityCode;
use App\Models\Usuarios\Activacion;
use App\Models\Usuarios\Actividad;
use App\Policies\Usuarios\UserPolicy;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

/**
 * Persona con acceso a Gedure. Inicia sesión con `username` (cédula o usuario)
 * o con `email`, en el mismo campo `login` (ver AuthService::findByLogin).
 *
 * `username` nunca debe contener `@`: así el login distingue sin ambigüedad un
 * correo de un usuario.
 *
 * Roles y permisos con spatie/laravel-permission (guard `web`): en código se
 * pregunta con `can()`, nunca con `hasPermissionTo()`, para que el owner pase
 * por `Gate::before`. Ver docs/backend/permisos.md.
 *
 * Autorización sobre una cuenta concreta (a un owner solo lo gestiona otro
 * owner): `App\Policies\Usuarios\UserPolicy`.
 *
 * Estado de la cuenta (docs/fases/fase-1-usuarios.md §2.1), derivado de las
 * fechas en `estado()`: la baja (`SoftDeletes`) manda, luego la suspensión
 * (`suspended_*`) y luego la activación pendiente (`activated_at` null). Las
 * columnas de estado no son asignables en masa: las escriben los Services con
 * `forceFill`. El global scope de SoftDeletes deja a las bajas fuera del login y
 * de Sanctum (401); `withTrashed()` donde deban verse (gestión, bitácora).
 */
#[Fillable(['name', 'username', 'email', 'password', 'telefono', 'direccion', 'sexo'])]
#[Hidden(['password', 'remember_token'])]
#[UsePolicy(UserPolicy::class)]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, Notifiable, SoftDeletes;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password_changed_at' => 'datetime',
            'password' => 'hashed',
            'sexo' => Sexo::class,
            'activated_at' => 'datetime',
            'last_login_at' => 'datetime',
            'suspended_at' => 'datetime',
        ];
    }

    /** Estado derivado: baja → suspendido → pendiente → activo. */
    public function estado(): EstadoCuenta
    {
        return match (true) {
            $this->trashed() => EstadoCuenta::Baja,
            $this->isSuspended() => EstadoCuenta::Suspendido,
            ! $this->isActivated() => EstadoCuenta::Pendiente,
            default => EstadoCuenta::Activo,
        };
    }

    public function isSuspended(): bool
    {
        return $this->suspended_at !== null;
    }

    /** Si ya eligió su contraseña (las cuentas creadas por administración nacen pendientes). */
    public function isActivated(): bool
    {
        return $this->activated_at !== null;
    }

    /** Valores del filtro `estado` del listado (`GET /usuarios`), para `conEstado()`. */
    public const FILTROS_ESTADO = ['actuales', 'activos', 'pendientes', 'suspendidos', 'bajas', 'todos'];

    /**
     * Filtro por estado de la cuenta, con la misma prioridad que `estado()`: una
     * baja solo sale en `bajas` y `todos`, y una suspendida pendiente cuenta como
     * suspendida. `actuales` = todas menos las bajas (lo que hace el global scope
     * de SoftDeletes).
     *
     * @param  Builder<User>  $query
     */
    #[Scope]
    protected function conEstado(Builder $query, string $estado): void
    {
        match ($estado) {
            'actuales' => null,
            'activos' => $query->whereNull('suspended_at')->whereNotNull('activated_at'),
            'pendientes' => $query->whereNull('suspended_at')->whereNull('activated_at'),
            'suspendidos' => $query->whereNotNull('suspended_at'),
            'bajas' => $query->onlyTrashed(),
            'todos' => $query->withTrashed(),
        };
    }

    /**
     * Quien la suspendió (`null` si no está suspendida o esa cuenta ya no existe),
     * también dado de baja.
     *
     * @return BelongsTo<User, $this>
     */
    public function suspendedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'suspended_by')->withTrashed();
    }

    /**
     * Quien la dio de baja, también dado de baja.
     *
     * @return BelongsTo<User, $this>
     */
    public function deletedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'deleted_by')->withTrashed();
    }

    /**
     * Bitácora de la persona (`App\Services\Usuarios\Bitacora`).
     *
     * @return HasMany<Actividad, $this>
     */
    public function actividades(): HasMany
    {
        return $this->hasMany(Actividad::class);
    }

    /**
     * Enlace de activación (uno por persona; reenviar rota su token). Ver
     * `App\Services\Usuarios\ActivacionService`.
     *
     * @return HasOne<Activacion, $this>
     */
    public function activacion(): HasOne
    {
        return $this->hasOne(Activacion::class);
    }

    /**
     * Códigos de seguridad (2FA y restablecimiento de contraseña).
     *
     * @return HasMany<SecurityCode, $this>
     */
    public function securityCodes(): HasMany
    {
        return $this->hasMany(SecurityCode::class);
    }
}
