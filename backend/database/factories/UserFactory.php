<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            // Cédula venezolana de ejemplo (sin `@`, como exige el login)
            'username' => (string) fake()->unique()->numberBetween(1_000_000, 39_999_999),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'activated_at' => now(),
        ];
    }

    /**
     * Cuenta creada por administración que aún no eligió su contraseña.
     */
    public function pendiente(): static
    {
        return $this->state(fn (array $attributes) => [
            'activated_at' => null,
        ]);
    }

    /**
     * Cuenta suspendida, opcionalmente por `$por` y con motivo.
     */
    public function suspendido(?User $por = null, ?string $motivo = null): static
    {
        return $this->state(fn (array $attributes) => [
            'suspended_at' => now(),
            'suspended_reason' => $motivo,
            'suspended_by' => $por?->getKey(),
        ]);
    }

    /**
     * Cuenta dada de baja (SoftDeletes), opcionalmente por `$por`.
     */
    public function deBaja(?User $por = null): static
    {
        return $this->state(fn (array $attributes) => [
            'deleted_at' => now(),
            'deleted_by' => $por?->getKey(),
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
