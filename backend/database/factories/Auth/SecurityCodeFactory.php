<?php

namespace Database\Factories\Auth;

use App\Models\Auth\SecurityCode;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SecurityCode>
 */
class SecurityCodeFactory extends Factory
{
    protected $model = SecurityCode::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            // Mismo alfabeto que SecurityCodeService::generateToken (sin I, L, O, 0, 1).
            // Virtual: guarda token_hash y deja el claro en `code` de la instancia creada
            'code' => fake()->unique()->regexify('[A-HJKMNP-Z2-9]{6}'),
            'type' => fake()->randomElement([SecurityCode::TYPE_PASSWORD_RESET, SecurityCode::TYPE_TWO_FACTOR]),
            'attempts' => 0,
            'expire_at' => now()->addMinutes(SecurityCode::TTL_MINUTES),
        ];
    }

    public function twoFactor(): static
    {
        return $this->state(['type' => SecurityCode::TYPE_TWO_FACTOR]);
    }

    public function passwordReset(): static
    {
        return $this->state(['type' => SecurityCode::TYPE_PASSWORD_RESET]);
    }

    public function expired(): static
    {
        return $this->state(['expire_at' => now()->subMinute()]);
    }

    public function used(): static
    {
        return $this->state(['used_at' => now()]);
    }

    public function exhausted(): static
    {
        return $this->state(['attempts' => SecurityCode::MAX_ATTEMPTS]);
    }
}
