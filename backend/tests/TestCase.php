<?php

namespace Tests;

use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /**
     * Cada test de Feature parte del catálogo de permisos y roles aplicado
     * (`permissions:sync`), sin usuarios: los crea cada test (`usuarioCon()`).
     *
     * @var bool
     */
    protected $seed = true;

    /**
     * @var class-string
     */
    protected $seeder = PermissionsSeeder::class;
}
