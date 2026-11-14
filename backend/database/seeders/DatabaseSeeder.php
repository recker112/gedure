<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

/**
 * Datos de DESARROLLO. Nunca corre solo: `php artisan db:seed` o
 * `migrate:fresh --seed` a mano (en producción, solo con RUN_SEEDERS=true).
 *
 * Usuario de prueba (contraseña `password`):
 *   - usuario/cédula: 12345678
 *   - correo:         admin@lacandelaria.test
 * Con MAIL_MAILER=log el código del 2FA aparece en storage/logs/laravel.log.
 */
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public const TEST_USERNAME = '12345678';

    public const TEST_EMAIL = 'admin@lacandelaria.test';

    public function run(): void
    {
        User::updateOrCreate(
            ['username' => self::TEST_USERNAME],
            [
                'name' => 'Usuario de Prueba',
                'email' => self::TEST_EMAIL,
                'email_verified_at' => now(),
                'password' => 'password',
            ],
        );
    }
}
