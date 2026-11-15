<?php

namespace App\Models;

use App\Models\Auth\SecurityCode;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
 */
#[Fillable(['name', 'username', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

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
        ];
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
