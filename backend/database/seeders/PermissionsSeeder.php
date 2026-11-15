<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

/**
 * Permisos y roles: el catálogo vive en App\Enums\Permission y App\Enums\Role
 * y lo aplica `php artisan permissions:sync` (lo mismo que se ejecuta en cada
 * arranque con RUN_COMMANDS=true). Nunca se asignan permisos a mano aquí.
 * Es el seeder de los tests (`Tests\TestCase::$seeder`).
 */
class PermissionsSeeder extends Seeder
{
    public function run(): void
    {
        Artisan::call('permissions:sync', ['--force' => true], $this->command?->getOutput());
    }
}
