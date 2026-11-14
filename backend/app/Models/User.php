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

/**
 * Persona con acceso a Gedure. Inicia sesión con `username` (cédula o usuario)
 * o con `email`, en el mismo campo `login` (ver AuthService::findByLogin).
 *
 * `username` nunca debe contener `@`: así el login distingue sin ambigüedad un
 * correo de un usuario.
 */
#[Fillable(['name', 'username', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

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
