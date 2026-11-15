<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Enums\Usuarios\Sexo;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * Listado y ficha de personas (`GET /usuarios`, `GET /usuarios/{id}`,
 * docs/fases/fase-1-usuarios.md §4.2): permiso, filtros, orden, paginación en el
 * servidor, forma del recurso `Usuario` y consultas constantes.
 */

/** Persona con permiso de lectura, que también sale en el listado. */
function lector(): User
{
    return usuarioCon(Permission::UsuariosUsuarioShow);
}

/** Ids de la página devuelta, en su orden. */
function idsListados($respuesta): array
{
    return array_column($respuesta->json('data'), 'id');
}

describe('permiso', function () {
    test('sin usuarios.usuario.show responden 403, aunque la persona no exista', function (string $ruta) {
        comoUsuario(usuarioCon(Permission::UsuariosRolUpdate))
            ->getJson($ruta)
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'No tienes permiso para realizar esta acción']);
    })->with([
        'listado' => '/api/v1/usuarios',
        'ficha' => '/api/v1/usuarios/999',
    ]);

    test('el rol admin y el owner pueden listar', function (Role $rol) {
        comoUsuario(usuarioCon($rol))->getJson(route('usuarios.usuarios.index'))->assertOk();
    })->with([Role::Admin, Role::Owner]);

    test('representante y profesor no pueden listar', function (Role $rol) {
        comoUsuario(usuarioCon($rol))->getJson(route('usuarios.usuarios.index'))->assertForbidden();
    })->with([Role::Representante, Role::Profesor]);
});

describe('GET /usuarios', function () {
    test('devuelve {status, data, meta} con 25 por página por defecto', function () {
        $yo = lector();
        User::factory()->count(30)->create();

        $respuesta = comoUsuario($yo)->getJson(route('usuarios.usuarios.index'))
            ->assertOk()
            ->assertJsonStructure(['status', 'data', 'meta' => ['current_page', 'last_page', 'per_page', 'total', 'from', 'to']])
            ->assertJsonPath('status', 200)
            ->assertJsonPath('meta.current_page', 1)
            ->assertJsonPath('meta.last_page', 2)
            ->assertJsonPath('meta.per_page', 25)
            ->assertJsonPath('meta.total', 31)
            ->assertJsonPath('meta.from', 1)
            ->assertJsonPath('meta.to', 25);

        expect($respuesta->json('data'))->toHaveCount(25);

        comoUsuario($yo)->getJson(route('usuarios.usuarios.index', ['page' => 2]))
            ->assertOk()
            ->assertJsonCount(6, 'data')
            ->assertJsonPath('meta.from', 26)
            ->assertJsonPath('meta.to', 31);
    });

    test('per_page cambia el tamaño de página hasta 100', function () {
        $yo = lector();
        User::factory()->count(4)->create();

        comoUsuario($yo)->getJson(route('usuarios.usuarios.index', ['per_page' => 2]))
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('meta.per_page', 2)
            ->assertJsonPath('meta.last_page', 3);
    });

    test('las páginas no repiten ni pierden a nadie', function () {
        $yo = lector();
        User::factory()->count(6)->create(['name' => 'Mismo Nombre']);

        $vistos = [];
        foreach ([1, 2, 3, 4] as $pagina) {
            $vistos = [...$vistos, ...idsListados(comoUsuario($yo)->getJson(route('usuarios.usuarios.index', ['per_page' => 2, 'page' => $pagina])))];
        }

        expect($vistos)->toHaveCount(7)->and(array_unique($vistos))->toHaveCount(7);
    });

    test('valida los filtros', function (array $query, string $campo) {
        comoUsuario(lector())
            ->getJson(route('usuarios.usuarios.index', $query))
            ->assertUnprocessable()
            ->assertJsonValidationErrors($campo);
    })->with([
        'estado desconocido' => [['estado' => 'baja'], 'estado'],
        'orden desconocido' => [['orden' => 'email'], 'orden'],
        'per_page mayor de 100' => [['per_page' => 101], 'per_page'],
        'per_page cero' => [['per_page' => 0], 'per_page'],
        'page no numérica' => [['page' => 'x'], 'page'],
        'q demasiado larga' => [['q' => str_repeat('a', 101)], 'q'],
    ]);

    test('q busca en nombre, cédula y correo', function (string $q) {
        $yo = lector();
        $buscada = User::factory()->create(['name' => 'María Pérez', 'username' => '24680135', 'email' => 'maria.perez@colegio.test']);
        User::factory()->count(3)->create();

        expect(idsListados(comoUsuario($yo)->getJson(route('usuarios.usuarios.index', ['q' => $q]))))->toBe([$buscada->id]);
    })->with([
        'nombre' => 'maría pér',
        'cédula' => '2468013',
        'correo' => 'perez@colegio',
    ]);

    test('rol filtra por nombre del rol y none por quienes no tienen roles', function () {
        $yo = lector(); // sin roles, solo un permiso directo
        $admin = usuarioCon(Role::Admin);
        $representante = usuarioCon(Role::Representante);
        $ambos = usuarioCon(Role::Profesor, Role::Representante);

        $ids = fn (string $rol) => idsListados(comoUsuario($yo)->getJson(route('usuarios.usuarios.index', ['rol' => $rol])));

        expect($ids('representante'))->toEqualCanonicalizing([$representante->id, $ambos->id])
            ->and($ids('admin'))->toBe([$admin->id])
            ->and($ids('none'))->toBe([$yo->id])
            ->and($ids('coordinacion'))->toBe([]);
    });

    test('estado filtra por el estado derivado; por defecto, sin bajas', function (string $estado, array $esperados) {
        $yo = lector();
        $cuentas = [
            'activo' => User::factory()->create(),
            'pendiente' => User::factory()->pendiente()->create(),
            'suspendido' => User::factory()->suspendido()->create(),
            'suspendido_pendiente' => User::factory()->pendiente()->suspendido()->create(),
            'baja' => User::factory()->deBaja()->create(),
            'baja_suspendido' => User::factory()->suspendido()->deBaja()->create(),
        ];
        $esperados = array_map(fn (string $clave) => $clave === 'yo' ? $yo->id : $cuentas[$clave]->id, $esperados);

        $query = $estado === '' ? [] : ['estado' => $estado];

        expect(idsListados(comoUsuario($yo)->getJson(route('usuarios.usuarios.index', $query))))->toEqualCanonicalizing($esperados);
    })->with([
        'sin filtro (actuales)' => ['', ['yo', 'activo', 'pendiente', 'suspendido', 'suspendido_pendiente']],
        'actuales' => ['actuales', ['yo', 'activo', 'pendiente', 'suspendido', 'suspendido_pendiente']],
        'activos' => ['activos', ['yo', 'activo']],
        'pendientes' => ['pendientes', ['pendiente']],
        'suspendidos' => ['suspendidos', ['suspendido', 'suspendido_pendiente']],
        'bajas' => ['bajas', ['baja', 'baja_suspendido']],
        'todos' => ['todos', ['yo', 'activo', 'pendiente', 'suspendido', 'suspendido_pendiente', 'baja', 'baja_suspendido']],
    ]);

    test('los filtros se combinan', function () {
        $yo = lector();
        $buscado = usuarioCon(Role::Representante);
        $buscado->forceFill(['name' => 'Luis Gómez', 'suspended_at' => now()])->save();
        usuarioCon(Role::Representante)->forceFill(['name' => 'Luis Rojas'])->save();
        User::factory()->suspendido()->create(['name' => 'Luis Díaz']);

        $ids = idsListados(comoUsuario($yo)->getJson(route('usuarios.usuarios.index', ['q' => 'luis', 'rol' => 'representante', 'estado' => 'suspendidos'])));

        expect($ids)->toBe([$buscado->id]);
    });

    test('ordena por nombre por defecto y por último acceso con -last_login_at', function () {
        $yo = lector();
        $yo->forceFill(['name' => 'Zoe', 'last_login_at' => null])->save();
        $carla = User::factory()->create(['name' => 'Carla']);
        $beto = User::factory()->create(['name' => 'Beto']);
        $ana = User::factory()->create(['name' => 'Ana']);
        $carla->forceFill(['last_login_at' => now()->subDay()])->save();
        $beto->forceFill(['last_login_at' => now()])->save();

        expect(idsListados(comoUsuario($yo)->getJson(route('usuarios.usuarios.index'))))
            ->toBe([$ana->id, $beto->id, $carla->id, $yo->id])
            ->and(idsListados(comoUsuario($yo)->getJson(route('usuarios.usuarios.index', ['orden' => 'nombre']))))
            ->toBe([$ana->id, $beto->id, $carla->id, $yo->id]);

        // Sin último acceso, al final (en el orden de alta)
        expect(idsListados(comoUsuario($yo)->getJson(route('usuarios.usuarios.index', ['orden' => '-last_login_at']))))
            ->toBe([$beto->id, $carla->id, $yo->id, $ana->id]);
    });

    test('lanza el mismo número de consultas con 2 que con 20 personas', function () {
        $yo = lector();
        $admin = User::factory()->create();

        $crear = function (int $n) use ($admin) {
            foreach (range(1, $n) as $i) {
                $user = usuarioCon(Role::Representante, Permission::UsuariosEstudianteShow);
                $user->forceFill(['suspended_at' => now(), 'suspended_by' => $admin->id])->save();
            }
            User::factory()->deBaja($admin)->create();
        };

        $contar = function () use ($yo) {
            $token = tokenDefinitivo($yo);
            DB::flushQueryLog();
            DB::enableQueryLog();
            conToken($token)->getJson(route('usuarios.usuarios.index', ['estado' => 'todos', 'per_page' => 100]))->assertOk();
            DB::disableQueryLog();

            return count(DB::getQueryLog());
        };

        $crear(2);
        $pocas = $contar();
        $crear(18);

        expect($contar())->toBe($pocas);
    });
});

describe('recurso Usuario', function () {
    test('tiene la forma del contrato', function () {
        $this->freezeSecond();
        $yo = lector();
        $admin = User::factory()->create(['name' => 'Admin Que Suspende']);
        $user = usuarioCon(Role::Representante, Permission::UsuariosEstudianteShow);
        $user->forceFill([
            'name' => 'Rosa Medina',
            'username' => '13579246',
            'email' => 'rosa@colegio.test',
            'telefono' => '0412-1234567',
            'direccion' => 'Calle 1, Casa 2',
            'sexo' => Sexo::Femenino,
            'last_login_at' => now()->subHour(),
            'suspended_at' => now(),
            'suspended_reason' => 'Deuda pendiente',
            'suspended_by' => $admin->id,
        ])->save();

        comoUsuario($yo)->getJson(route('usuarios.usuarios.show', $user->id))
            ->assertOk()
            ->assertExactJson([
                'status' => 200,
                'data' => [
                    'id' => $user->id,
                    'name' => 'Rosa Medina',
                    'username' => '13579246',
                    'email' => 'rosa@colegio.test',
                    'telefono' => '0412-1234567',
                    'direccion' => 'Calle 1, Casa 2',
                    'sexo' => 'F',
                    'estado' => 'suspendido',
                    'roles' => ['representante'],
                    'direct_permissions' => ['usuarios.estudiante.show'],
                    'last_login_at' => now()->subHour()->toJSON(),
                    'activated_at' => $user->activated_at->toJSON(),
                    'created_at' => $user->created_at->toJSON(),
                    'suspended_at' => now()->toJSON(),
                    'suspended_reason' => 'Deuda pendiente',
                    'suspended_by' => ['id' => $admin->id, 'name' => 'Admin Que Suspende'],
                    'deleted_at' => null,
                    'deleted_by' => null,
                ],
            ]);
    });

    test('direct_permissions no incluye los que llegan por un rol', function () {
        $user = usuarioCon(Role::Admin);

        comoUsuario(lector())->getJson(route('usuarios.usuarios.show', $user->id))
            ->assertOk()
            ->assertJsonPath('data.roles', ['admin'])
            ->assertJsonPath('data.direct_permissions', []);
    });

    test('una cuenta pendiente lleva activated_at null y estado pendiente', function () {
        $user = User::factory()->pendiente()->create();

        comoUsuario(lector())->getJson(route('usuarios.usuarios.show', $user->id))
            ->assertOk()
            ->assertJsonPath('data.estado', 'pendiente')
            ->assertJsonPath('data.activated_at', null)
            ->assertJsonPath('data.sexo', null)
            ->assertJsonPath('data.last_login_at', null);
    });
});

describe('GET /usuarios/{id}', function () {
    test('también muestra a las bajas, con su autoría aunque quien actuó esté de baja', function () {
        $this->freezeSecond();
        $quien = User::factory()->deBaja()->create(['name' => 'Ex Admin']);
        $baja = User::factory()->deBaja($quien)->create();

        comoUsuario(lector())->getJson(route('usuarios.usuarios.show', $baja->id))
            ->assertOk()
            ->assertJsonPath('data.estado', 'baja')
            ->assertJsonPath('data.deleted_at', now()->toJSON())
            ->assertJsonPath('data.deleted_by', ['id' => $quien->id, 'name' => 'Ex Admin']);
    });

    test('quien tiene el permiso también ve a un owner (la lectura no pasa por la Policy)', function () {
        $owner = usuarioCon(Role::Owner);

        comoUsuario(lector())->getJson(route('usuarios.usuarios.show', $owner->id))
            ->assertOk()
            ->assertJsonPath('data.roles', ['owner']);
    });

    test('responde 404 si no existe', function () {
        comoUsuario(lector())->getJson(route('usuarios.usuarios.show', 999))
            ->assertNotFound()
            ->assertExactJson(['status' => 404, 'msg' => 'La persona no existe']);
    });

    test('un id no numérico no es la ruta', function () {
        comoUsuario(lector())->getJson('/api/v1/usuarios/abc')->assertNotFound();
    });
});
