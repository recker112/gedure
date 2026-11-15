<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\User;
use App\Support\PermissionEvents;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

/**
 * Datos de DESARROLLO. Nunca corre solo: `php artisan db:seed` o
 * `migrate:fresh --seed` a mano (en producción, solo con RUN_SEEDERS=true).
 *
 * Primero el catálogo de permisos y roles (PermissionsSeeder) y después un
 * usuario por rol, todos con contraseña `password`:
 *   - 12345678  owner@example.com          owner
 *   - 11111111  admin@example.com          admin
 *   - 22222222  profesor@example.com       profesor
 *   - 33333333  representante@example.com  representante
 * Con MAIL_MAILER=log el código del 2FA aparece en storage/logs/laravel.log.
 */
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /** @var array<int, array{username: string, email: string, name: string, role: Role}> */
    public const USERS = [
        ['username' => '12345678', 'email' => 'owner@example.com', 'name' => 'Owner de Prueba', 'role' => Role::Owner],
        ['username' => '11111111', 'email' => 'admin@example.com', 'name' => 'Admin de Prueba', 'role' => Role::Admin],
        ['username' => '22222222', 'email' => 'profesor@example.com', 'name' => 'Profesor de Prueba', 'role' => Role::Profesor],
        ['username' => '33333333', 'email' => 'representante@example.com', 'name' => 'Representante de Prueba', 'role' => Role::Representante],
    ];

    public function run(): void
    {
        $this->call(PermissionsSeeder::class);

        foreach (self::USERS as $data) {
            $user = User::updateOrCreate(
                ['username' => $data['username']],
                [
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'email_verified_at' => now(),
                    'password' => 'password',
                ],
            );

            // Nacen activados (no pasan por el enlace de activación); un nuevo
            // seed no cambia la fecha de activación de una cuenta que ya existía
            if ($user->activated_at === null) {
                $user->forceFill(['activated_at' => now()])->save();
            }

            // Sin eventos de spatie: un seeder no avisa en tiempo real a nadie
            PermissionEvents::withoutEvents(fn () => $user->syncRoles($data['role']));
        }
    }
}
