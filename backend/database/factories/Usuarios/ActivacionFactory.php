<?php

namespace Database\Factories\Usuarios;

use App\Models\User;
use App\Models\Usuarios\Activacion;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * Activación vigente de una cuenta pendiente. El token en claro no se guarda:
 * para probar el enlace, pásalo con `conToken('...')`.
 *
 * @extends Factory<Activacion>
 */
class ActivacionFactory extends Factory
{
    protected $model = Activacion::class;

    /** @return array<string, mixed> */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->pendiente(),
            'token_hash' => Activacion::hash(Str::random(Activacion::TOKEN_LENGTH)),
            'sent_at' => now(),
            'expires_at' => now()->addDays((int) config('usuarios.activacion.dias')),
        ];
    }

    /** Con este token en claro (64 caracteres alfanuméricos). */
    public function conToken(string $token): static
    {
        return $this->state(fn () => ['token_hash' => Activacion::hash($token)]);
    }

    public function usada(): static
    {
        return $this->state(fn () => ['used_at' => now()]);
    }

    public function caducada(): static
    {
        return $this->state(fn () => ['sent_at' => now()->subDays(8), 'expires_at' => now()->subDay()]);
    }
}
