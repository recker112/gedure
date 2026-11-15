<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Enums\Usuarios\TipoActividad;
use App\Events\Auth\PermissionsUpdated;
use App\Models\User;
use App\Models\Usuarios\Actividad;
use App\Services\Usuarios\UserAccessService;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Event;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as RoleModel;

/**
 * Roles y permisos directos de una persona (docs/fases/fase-1-usuarios.md §4.3,
 * docs/backend/permisos.md): `PUT /usuarios/{id}/roles`,
 * `PUT /usuarios/{id}/permisos` y `POST /usuarios/roles/bloque`.
 *
 * Orden: middleware 403 → 404 → Policy 403 → `rules()` 422 → Service 422 →
 * delegación 403. `lockForUpdate` no bloquea en SQLite: la carrera del último
 * owner se simula con dos llamadas seguidas al Service.
 */
const ACCESO_SIN_PERMISO = ['status' => 403, 'msg' => 'No tienes permiso para realizar esta acción'];
const ACCESO_OWNER_AJENO = ['status' => 403, 'msg' => 'Solo un owner puede gestionar a otro owner'];
const ACCESO_ROL_OWNER = ['status' => 403, 'msg' => 'Solo un owner puede dar o quitar el rol de owner'];
const ACCESO_DELEGACION = ['status' => 403, 'msg' => 'No puedes conceder permisos que no tienes'];
const ACCESO_DE_BAJA = ['status' => 422, 'msg' => 'La cuenta está dada de baja: restáurala antes de editarla'];
const ACCESO_ULTIMO_OWNER = ['status' => 422, 'msg' => 'Debe quedar al menos un owner'];

/** `{status, msg}` de un `HttpResponseException` del Service (o null si no falla). */
function fallaDelServicio(Closure $llamada): ?array
{
    try {
        $llamada();
    } catch (HttpResponseException $e) {
        return $e->getResponse()->getData(true);
    }

    return null;
}

/** Las dos rutas por persona: nombre de ruta, permiso, campo y un cuerpo válido. */
dataset('rutas de acceso', [
    'roles' => ['usuarios.roles.update', Permission::UsuariosRolUpdate, 'roles', ['roles' => ['profesor']]],
    'permisos' => ['usuarios.permisos.update', Permission::UsuariosPermisoUpdate, 'permissions', ['permissions' => ['usuarios.usuario.show']]],
]);

describe('orden de las respuestas', function () {
    test('sin el permiso es 403 aunque la persona no exista', function (string $ruta) {
        // usuarios.usuario.update no basta: roles y permisos tienen su propio permiso
        comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow, Permission::UsuariosUsuarioUpdate))
            ->putJson(route($ruta, 999999), ['roles' => 'x', 'permissions' => 'x'])
            ->assertForbidden()
            ->assertExactJson(ACCESO_SIN_PERMISO);
    })->with('rutas de acceso');

    test('el permiso de roles no abre los permisos y viceversa', function () {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Permission::UsuariosRolUpdate))
            ->putJson(route('usuarios.permisos.update', $user->id), ['permissions' => []])
            ->assertForbidden()->assertExactJson(ACCESO_SIN_PERMISO);
        comoUsuario(usuarioCon(Permission::UsuariosPermisoUpdate))
            ->putJson(route('usuarios.roles.update', $user->id), ['roles' => []])
            ->assertForbidden()->assertExactJson(ACCESO_SIN_PERMISO);
    });

    test('con el permiso, una persona que no existe es 404 aunque el cuerpo no valga', function (string $ruta, Permission $permiso) {
        comoUsuario(usuarioCon($permiso))
            ->putJson(route($ruta, 999999), ['roles' => 'x', 'permissions' => 'x'])
            ->assertNotFound()
            ->assertExactJson(['status' => 404, 'msg' => 'La persona no existe']);
    })->with('rutas de acceso');

    test('la Policy (owner ajeno) va antes de validar el cuerpo', function (string $ruta) {
        comoUsuario(usuarioCon(Role::Admin))
            ->putJson(route($ruta, usuarioCon(Role::Owner)->id), ['roles' => 'x', 'permissions' => 'x'])
            ->assertForbidden()
            ->assertExactJson(ACCESO_OWNER_AJENO);
    })->with('rutas de acceso');

    test('dar el rol owner sin serlo es 403 antes de validar el resto', function () {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['owner', 'no_existe']])
            ->assertForbidden()
            ->assertExactJson(ACCESO_ROL_OWNER);

        expect($user->fresh()->getRoleNames()->all())->toBe([]);
    });

    test('la validación va antes de las reglas del Service (también la propia cuenta)', function (string $ruta, Permission $permiso, string $campo) {
        $admin = usuarioCon(Role::Admin);

        comoUsuario($admin)->putJson(route($ruta, $admin->id), [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([$campo]);
    })->with('rutas de acceso');

    test('las reglas del Service (422) van antes de la delegación (403)', function () {
        // Sin `admin` en sus permisos, pero lo frena antes la baja
        $secretaria = usuarioCon(Permission::UsuariosRolUpdate);
        $baja = User::factory()->deBaja()->create();

        comoUsuario($secretaria)->putJson(route('usuarios.roles.update', $baja->id), ['roles' => ['admin']])
            ->assertUnprocessable()
            ->assertExactJson(ACCESO_DE_BAJA);
    });
});

describe('validación', function () {
    test('un rol o un permiso desconocidos son 422 por elemento', function () {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['profesor', 'no_existe']])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['roles.1' => 'El valor seleccionado para rol no es válido.']);

        comoUsuario(usuarioCon(Role::Admin))
            ->putJson(route('usuarios.permisos.update', $user->id), ['permissions' => ['usuarios.nada.show']])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['permissions.0' => 'El valor seleccionado para permiso no es válido.']);
    });

    test('la lista es obligatoria, sin repetidos, pero puede ir vacía', function () {
        $user = usuarioCon(Role::Profesor, Permission::UsuariosUsuarioShow);
        $admin = usuarioCon(Role::Admin);

        comoUsuario($admin)->putJson(route('usuarios.roles.update', $user->id), ['roles' => 'profesor'])
            ->assertUnprocessable()->assertJsonValidationErrors(['roles']);
        comoUsuario($admin)->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['profesor', 'profesor']])
            ->assertUnprocessable()->assertJsonValidationErrors(['roles.0']);

        comoUsuario($admin)->putJson(route('usuarios.roles.update', $user->id), ['roles' => []])
            ->assertOk()->assertJsonPath('data.roles', []);
        comoUsuario($admin)->putJson(route('usuarios.permisos.update', $user->id), ['permissions' => []])
            ->assertOk()->assertJsonPath('data.direct_permissions', []);
    });

    test('el tope de cada lista es el tamaño del catálogo en BD', function () {
        $user = User::factory()->create();
        $owner = usuarioCon(Role::Owner);
        $roles = RoleModel::pluck('name')->all();
        $permisos = PermissionModel::pluck('name')->all();

        expect(UserAccessService::maxRoles())->toBe(count($roles))
            ->and(UserAccessService::maxPermissions())->toBe(count(Permission::cases()));

        comoUsuario($owner)->putJson(route('usuarios.roles.update', $user->id), ['roles' => [...$roles, 'x']])
            ->assertUnprocessable()->assertJsonValidationErrors('roles');
        comoUsuario($owner)->putJson(route('usuarios.permisos.update', $user->id), ['permissions' => [...$permisos, 'x']])
            ->assertUnprocessable()->assertJsonValidationErrors('permissions');

        comoUsuario($owner)->putJson(route('usuarios.roles.update', $user->id), ['roles' => $roles])->assertOk();
        comoUsuario($owner)->putJson(route('usuarios.permisos.update', $user->id), ['permissions' => $permisos])->assertOk();
    });
});

describe('reglas de dominio', function () {
    test('nadie cambia sus propios roles ni permisos (422), tampoco el owner', function (string $ruta, Permission $permiso, string $campo, array $cuerpo) {
        $msg = $campo === 'roles' ? 'No puedes cambiar tus propios roles' : 'No puedes cambiar tus propios permisos';

        foreach ([usuarioCon(Role::Admin), usuarioCon(Role::Owner)] as $actor) {
            comoUsuario($actor)->putJson(route($ruta, $actor->id), $cuerpo)
                ->assertUnprocessable()
                ->assertExactJson(['status' => 422, 'msg' => $msg]);
        }

        expect(Actividad::count())->toBe(0);
    })->with('rutas de acceso');

    test('un owner tampoco se quita a sí mismo el rol owner', function () {
        $owner = usuarioCon(Role::Owner);
        usuarioCon(Role::Owner);

        comoUsuario($owner)->putJson(route('usuarios.roles.update', $owner->id), ['roles' => []])
            ->assertUnprocessable()
            ->assertExactJson(['status' => 422, 'msg' => 'No puedes cambiar tus propios roles']);

        expect($owner->fresh()->hasRole(Role::Owner))->toBeTrue();
    });

    test('una cuenta dada de baja no se edita (422), tampoco el owner', function (string $ruta, Permission $permiso, string $campo, array $cuerpo) {
        $baja = User::factory()->deBaja()->create();

        foreach ([usuarioCon(Role::Admin), usuarioCon(Role::Owner)] as $actor) {
            comoUsuario($actor)->putJson(route($ruta, $baja->id), $cuerpo)
                ->assertUnprocessable()
                ->assertExactJson(ACCESO_DE_BAJA);
        }
    })->with('rutas de acceso');

    test('una cuenta suspendida sí se edita', function (string $ruta, Permission $permiso, string $campo, array $cuerpo) {
        $suspendida = User::factory()->suspendido()->create();

        comoUsuario(usuarioCon(Role::Admin))->putJson(route($ruta, $suspendida->id), $cuerpo)->assertOk();
    })->with('rutas de acceso');

    test('un owner da y quita el rol owner a otra persona', function () {
        $owner = usuarioCon(Role::Owner);
        $user = User::factory()->create();

        comoUsuario($owner)->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['owner']])
            ->assertOk()->assertJsonPath('data.roles', ['owner']);
        comoUsuario($owner)->putJson(route('usuarios.roles.update', $user->id), ['roles' => []])
            ->assertOk()->assertJsonPath('data.roles', []);
    });

    test('quien no es owner no quita el rol owner (403): lo frena antes la Policy de cuenta', function () {
        $owner = usuarioCon(Role::Owner);

        comoUsuario(usuarioCon(Role::Admin))->putJson(route('usuarios.roles.update', $owner->id), ['roles' => []])
            ->assertForbidden()
            ->assertExactJson(ACCESO_OWNER_AJENO);

        expect($owner->fresh()->hasRole(Role::Owner))->toBeTrue();
    });

    test('quien no es owner no da el rol owner aunque tenga todo el catálogo (403)', function () {
        $user = usuarioCon(Role::Profesor);

        comoUsuario(usuarioCon(Role::Admin))->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['profesor', 'owner']])
            ->assertForbidden()
            ->assertExactJson(ACCESO_ROL_OWNER);

        expect($user->fresh()->getRoleNames()->all())->toBe(['profesor'])
            ->and(Actividad::count())->toBe(0);
    });

    test('con dos owners, uno le quita el rol al otro', function () {
        $owner = usuarioCon(Role::Owner);
        $otro = usuarioCon(Role::Owner);

        comoUsuario($owner)->putJson(route('usuarios.roles.update', $otro->id), ['roles' => ['admin']])
            ->assertOk()->assertJsonPath('data.roles', ['admin']);

        expect(User::role(Role::Owner)->pluck('id')->all())->toBe([$owner->id]);
    });

    test('nunca se queda sin owner: dos owners que se quitan el rol a la vez (422 al segundo)', function () {
        $a = usuarioCon(Role::Owner);
        $b = usuarioCon(Role::Owner);
        $servicio = app(UserAccessService::class);

        // Las dos peticiones pasaron la Policy cuando ambos eran owners; la segunda
        // llega al Service después del commit de la primera (en MariaDB, esperando
        // el bloqueo de las filas de los owners)
        $servicio->setRoles($b, $a, []);

        expect(fallaDelServicio(fn () => $servicio->setRoles($a, $b, [])))->toBe(ACCESO_ULTIMO_OWNER)
            ->and($a->fresh()->hasRole(Role::Owner))->toBeTrue()
            ->and(Actividad::where('user_id', $a->id)->count())->toBe(0);
    });

    test('el último owner no pierde el rol: las bajas no cuentan, las suspendidas sí', function () {
        $owner = usuarioCon(Role::Owner);
        User::factory()->deBaja()->create()->assignRole(Role::Owner);
        $servicio = app(UserAccessService::class);

        expect(fallaDelServicio(fn () => $servicio->setRoles($owner, usuarioCon(Role::Admin), ['admin'])))->toBe(ACCESO_ULTIMO_OWNER)
            ->and($owner->fresh()->getRoleNames()->all())->toBe(['owner']);

        User::factory()->suspendido()->create()->assignRole(Role::Owner);

        expect(fallaDelServicio(fn () => $servicio->setRoles($owner, usuarioCon(Role::Admin), ['admin'])))->toBeNull()
            ->and($owner->fresh()->getRoleNames()->all())->toBe(['admin']);
    });

    test('un owner puede dar permisos directos a otro owner', function () {
        $otro = usuarioCon(Role::Owner);

        comoUsuario(usuarioCon(Role::Owner))
            ->putJson(route('usuarios.permisos.update', $otro->id), ['permissions' => ['usuarios.usuario.show']])
            ->assertOk()->assertJsonPath('data.direct_permissions', ['usuarios.usuario.show']);
    });
});

describe('delegación (GrantGuard)', function () {
    test('no se concede un rol con permisos que no se tienen (403) y no se escribe nada', function () {
        $secretaria = usuarioCon(Permission::UsuariosRolUpdate);
        $user = User::factory()->create();

        comoUsuario($secretaria)->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['admin']])
            ->assertForbidden()
            ->assertExactJson(ACCESO_DELEGACION);

        expect($user->fresh()->getRoleNames()->all())->toBe([])
            ->and(Actividad::count())->toBe(0);
    });

    test('se concede un rol cuyos permisos se tienen', function () {
        $secretaria = usuarioCon(Permission::UsuariosRolUpdate, Permission::MisEstudiantesEstudianteShow);
        $user = User::factory()->create();

        comoUsuario($secretaria)->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['representante']])
            ->assertOk()->assertJsonPath('data.roles', ['representante']);
    });

    test('quitar no se restringe, y mantener un rol que no podría dar tampoco', function () {
        $secretaria = usuarioCon(Permission::UsuariosRolUpdate, Permission::MisEstudiantesEstudianteShow);
        $user = usuarioCon(Role::Admin, Role::Profesor);

        // Conserva `admin` (no lo concede) y quita `profesor`
        comoUsuario($secretaria)->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['admin', 'representante']])
            ->assertOk()
            ->assertJsonPath('data.roles', fn (array $roles) => collect($roles)->sort()->values()->all() === ['admin', 'representante']);

        comoUsuario($secretaria)->putJson(route('usuarios.roles.update', $user->id), ['roles' => []])
            ->assertOk()->assertJsonPath('data.roles', []);
    });

    test('no se concede un permiso directo que no se tiene (403)', function () {
        $actor = usuarioCon(Permission::UsuariosPermisoUpdate, Permission::UsuariosUsuarioShow);
        $user = usuarioCon(Permission::UsuariosUsuarioDestroy);

        comoUsuario($actor)->putJson(route('usuarios.permisos.update', $user->id), ['permissions' => ['usuarios.usuario.destroy', 'usuarios.usuario.create']])
            ->assertForbidden()
            ->assertExactJson(ACCESO_DELEGACION);

        expect($user->fresh()->getDirectPermissions()->pluck('name')->all())->toBe(['usuarios.usuario.destroy']);

        // Lo que sí tiene se concede, y lo ajeno que ya tenía se puede quitar
        comoUsuario($actor)->putJson(route('usuarios.permisos.update', $user->id), ['permissions' => ['usuarios.usuario.show']])
            ->assertOk()->assertJsonPath('data.direct_permissions', ['usuarios.usuario.show']);
    });
});

describe('roles', function () {
    test('reemplaza los roles, responde la persona y escribe un rol_cambiado por rol con el actor', function () {
        $admin = usuarioCon(Role::Admin);
        $user = usuarioCon(Role::Profesor, Role::Representante);

        $respuesta = comoUsuario($admin)->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['representante', 'admin']])
            ->assertOk()
            ->assertJsonPath('status', 200)
            ->assertJsonPath('msg', 'Roles actualizados')
            ->assertJsonPath('data.id', $user->id);

        expect(collect($respuesta->json('data.roles'))->sort()->values()->all())->toBe(['admin', 'representante'])
            ->and(array_keys($respuesta->json('data')))->toBe([
                'id', 'name', 'username', 'email', 'telefono', 'direccion', 'sexo', 'estado', 'roles',
                'direct_permissions', 'last_login_at', 'activated_at', 'created_at', 'suspended_at',
                'suspended_reason', 'suspended_by', 'deleted_at', 'deleted_by',
            ]);

        $eventos = Actividad::where('user_id', $user->id)->orderBy('id')->get();
        expect($eventos->map(fn (Actividad $a) => [$a->tipo, $a->meta, $a->actor_id])->all())->toBe([
            [TipoActividad::RolCambiado, ['rol' => 'admin', 'cambio' => 'agregado'], $admin->id],
            [TipoActividad::RolCambiado, ['rol' => 'profesor', 'cambio' => 'quitado'], $admin->id],
        ]);
    });

    test('sin cambios responde 200 sin bitácora ni aviso', function () {
        $admin = usuarioCon(Role::Admin);
        $user = usuarioCon(Role::Profesor);
        Event::fake([PermissionsUpdated::class]);

        comoUsuario($admin)->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['profesor']])
            ->assertOk()->assertJsonPath('data.roles', ['profesor']);

        expect(Actividad::count())->toBe(0);
        Event::assertNotDispatched(PermissionsUpdated::class);
    });

    test('avisa una sola vez aunque cambien varios roles', function () {
        $admin = usuarioCon(Role::Admin);
        $user = usuarioCon(Role::Profesor);
        Event::fake([PermissionsUpdated::class]);

        comoUsuario($admin)->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['admin', 'representante']])->assertOk();

        Event::assertDispatchedTimes(PermissionsUpdated::class, 1);
        Event::assertDispatched(PermissionsUpdated::class, fn (PermissionsUpdated $e) => $e->user->is($user));
    });

    test('un fallo no avisa ni deja rastro', function () {
        $secretaria = usuarioCon(Permission::UsuariosRolUpdate);
        $user = User::factory()->create();
        Event::fake([PermissionsUpdated::class]);

        comoUsuario($secretaria)->putJson(route('usuarios.roles.update', $user->id), ['roles' => ['admin']])
            ->assertForbidden();

        Event::assertNotDispatched(PermissionsUpdated::class);
    });

    test('el aviso sale tras el commit', function () {
        expect((new PermissionsUpdated(User::factory()->create()))->afterCommit)->toBeTrue();
    });
});

describe('permisos directos', function () {
    test('reemplaza solo los directos y escribe permiso_agregado/permiso_quitado con el actor', function () {
        $admin = usuarioCon(Role::Admin);
        $user = usuarioCon(Role::Representante, Permission::UsuariosUsuarioShow);
        Event::fake([PermissionsUpdated::class]);

        comoUsuario($admin)->putJson(route('usuarios.permisos.update', $user->id), ['permissions' => ['usuarios.estudiante.show']])
            ->assertOk()
            ->assertJsonPath('msg', 'Permisos actualizados')
            ->assertJsonPath('data.direct_permissions', ['usuarios.estudiante.show'])
            ->assertJsonPath('data.roles', ['representante']);

        $eventos = Actividad::where('user_id', $user->id)->orderBy('id')->get();
        expect($eventos->map(fn (Actividad $a) => [$a->tipo, $a->meta, $a->actor_id])->all())->toBe([
            [TipoActividad::PermisoAgregado, ['permiso' => 'usuarios.estudiante.show'], $admin->id],
            [TipoActividad::PermisoQuitado, ['permiso' => 'usuarios.usuario.show'], $admin->id],
        ]);
        Event::assertDispatchedTimes(PermissionsUpdated::class, 1);

        comoUsuario($admin)->getJson(route('usuarios.actividad.index', $user->id))
            ->assertJsonPath('data.0.titulo', 'Permiso usuarios.usuario.show retirado');
    });

    test('sin cambios responde 200 sin bitácora ni aviso', function () {
        $admin = usuarioCon(Role::Admin);
        $user = usuarioCon(Permission::UsuariosUsuarioShow);
        Event::fake([PermissionsUpdated::class]);

        comoUsuario($admin)->putJson(route('usuarios.permisos.update', $user->id), ['permissions' => ['usuarios.usuario.show']])
            ->assertOk();

        expect(Actividad::count())->toBe(0);
        Event::assertNotDispatched(PermissionsUpdated::class);
    });
});

describe('roles en bloque', function () {
    test('sin usuarios.rol.update es 403 antes de validar', function () {
        comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow, Permission::UsuariosUsuarioUpdate, Permission::UsuariosPermisoUpdate))
            ->postJson(route('usuarios.roles.bloque'), [])
            ->assertForbidden()
            ->assertExactJson(ACCESO_SIN_PERMISO);
    });

    test('valida el cuerpo entero (422)', function (array $cuerpo, array $errores) {
        comoUsuario(usuarioCon(Role::Admin))->postJson(route('usuarios.roles.bloque'), $cuerpo)
            ->assertUnprocessable()
            ->assertJsonValidationErrors($errores);
    })->with([
        'sin personas' => [['user_ids' => [], 'add' => ['admin']], ['user_ids']],
        'ids no enteros' => [['user_ids' => ['a'], 'add' => ['admin']], ['user_ids.0']],
        'sin roles' => [['user_ids' => [1]], ['roles' => 'Elige al menos un rol que añadir o quitar.']],
        'listas vacías' => [['user_ids' => [1], 'add' => [], 'remove' => []], ['roles']],
        'rol desconocido' => [['user_ids' => [1], 'add' => ['no_existe']], ['add.0']],
        'owner al añadir' => [['user_ids' => [1], 'add' => ['owner']], ['add.0' => 'El rol owner no se asigna en bloque.']],
        'owner al quitar' => [['user_ids' => [1], 'remove' => ['owner']], ['remove.0' => 'El rol owner no se quita en bloque.']],
        'en los dos' => [['user_ids' => [1], 'add' => ['admin'], 'remove' => ['admin']], ['remove.0' => 'El rol admin no puede estar en añadir y en quitar.']],
    ]);

    test('ni siquiera un owner da o quita owner en bloque', function () {
        comoUsuario(usuarioCon(Role::Owner))
            ->postJson(route('usuarios.roles.bloque'), ['user_ids' => [User::factory()->create()->id], 'add' => ['owner']])
            ->assertUnprocessable()->assertJsonValidationErrors(['add.0']);
    });

    test('añade a todas, cuenta como actualizadas las que ya lo tenían y solo registra y avisa los cambios', function () {
        $admin = usuarioCon(Role::Admin);
        $a = User::factory()->create();
        $b = usuarioCon(Role::Profesor);
        Event::fake([PermissionsUpdated::class]);

        comoUsuario($admin)->postJson(route('usuarios.roles.bloque'), ['user_ids' => [$a->id, $b->id, $a->id], 'add' => ['profesor']])
            ->assertOk()
            ->assertJsonPath('status', 200)
            ->assertJsonPath('msg', 'Rol asignado a 2 personas')
            ->assertJsonPath('data.updated.*.id', [$a->id, $b->id])
            ->assertJsonPath('data.updated.0.roles', ['profesor'])
            ->assertJsonPath('data.failed', []);

        expect(Actividad::where('user_id', $a->id)->sole()->meta)->toBe(['rol' => 'profesor', 'cambio' => 'agregado'])
            ->and(Actividad::where('user_id', $b->id)->count())->toBe(0);
        Event::assertDispatchedTimes(PermissionsUpdated::class, 1);
        Event::assertDispatched(PermissionsUpdated::class, fn (PermissionsUpdated $e) => $e->user->is($a));
    });

    test('añade y quita a la vez', function () {
        $user = usuarioCon(Role::Profesor);

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.roles.bloque'), ['user_ids' => [$user->id], 'add' => ['representante'], 'remove' => ['profesor']])
            ->assertOk()
            ->assertJsonPath('msg', 'Roles actualizados a 1 persona')
            ->assertJsonPath('data.updated.0.roles', ['representante']);

        expect(Actividad::where('user_id', $user->id)->count())->toBe(2);
    });

    test('las personas que no pasan van a failed con su status y el resto se guarda', function () {
        $admin = usuarioCon(Role::Admin);
        $ok = usuarioCon(Role::Profesor);
        $baja = User::factory()->deBaja()->create()->assignRole(Role::Profesor);
        $owner = usuarioCon(Role::Owner, Role::Profesor);
        Event::fake([PermissionsUpdated::class]);

        comoUsuario($admin)->postJson(route('usuarios.roles.bloque'), [
            'user_ids' => [$ok->id, 999999, $baja->id, $owner->id, $admin->id],
            'remove' => ['profesor'],
        ])
            ->assertOk()
            ->assertJsonPath('msg', 'Quitado a 1; 4 no se pudieron actualizar')
            ->assertJsonPath('data.updated.*.id', [$ok->id])
            ->assertJsonPath('data.failed', [
                ['id' => 999999, 'status' => 404, 'msg' => 'La persona no existe'],
                ['id' => $baja->id, 'status' => 422, 'msg' => ACCESO_DE_BAJA['msg']],
                ['id' => $owner->id, 'status' => 403, 'msg' => ACCESO_OWNER_AJENO['msg']],
                ['id' => $admin->id, 'status' => 422, 'msg' => 'No puedes cambiar tus propios roles'],
            ]);

        expect($ok->fresh()->getRoleNames()->all())->toBe([])
            ->and(User::withTrashed()->find($baja->id)->getRoleNames()->all())->toBe(['profesor'])
            ->and($owner->fresh()->getRoleNames()->sort()->values()->all())->toBe(['owner', 'profesor'])
            ->and(Actividad::pluck('user_id')->all())->toBe([$ok->id]);
        Event::assertDispatchedTimes(PermissionsUpdated::class, 1);
    });

    test('la delegación se comprueba por persona: falla quien no tenía el rol', function () {
        $secretaria = usuarioCon(Permission::UsuariosRolUpdate);
        $yaEra = usuarioCon(Role::Admin);
        $nueva = User::factory()->create();

        comoUsuario($secretaria)->postJson(route('usuarios.roles.bloque'), ['user_ids' => [$yaEra->id, $nueva->id], 'add' => ['admin']])
            ->assertOk()
            ->assertJsonPath('msg', 'Asignado a 1; 1 no se pudo actualizar')
            ->assertJsonPath('data.updated.*.id', [$yaEra->id])
            ->assertJsonPath('data.failed', [['id' => $nueva->id, 'status' => 403, 'msg' => ACCESO_DELEGACION['msg']]]);

        expect($nueva->fresh()->getRoleNames()->all())->toBe([]);
    });

    test('mensajes cuando fallan todas', function () {
        $baja = User::factory()->deBaja()->create();

        comoUsuario(usuarioCon(Role::Admin))->postJson(route('usuarios.roles.bloque'), ['user_ids' => [$baja->id], 'add' => ['profesor']])
            ->assertOk()->assertJsonPath('msg', 'No se pudo actualizar a la persona seleccionada');
        comoUsuario(usuarioCon(Role::Admin))->postJson(route('usuarios.roles.bloque'), ['user_ids' => [$baja->id, 999999], 'add' => ['profesor']])
            ->assertOk()->assertJsonPath('msg', 'No se pudo actualizar a ninguna de las 2 personas');
    });

    test('un owner sí cambia en bloque los roles (no owner) de otro owner', function () {
        $otro = usuarioCon(Role::Owner);

        comoUsuario(usuarioCon(Role::Owner))->postJson(route('usuarios.roles.bloque'), ['user_ids' => [$otro->id], 'add' => ['admin']])
            ->assertOk()
            ->assertJsonPath('msg', 'Rol asignado a 1 persona')
            ->assertJsonPath('data.updated.0.roles', fn (array $roles) => collect($roles)->sort()->values()->all() === ['admin', 'owner']);
    });

    test(UserAccessService::BULK_MAX.' personas se procesan y una más es 422', function () {
        $max = UserAccessService::BULK_MAX;

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.roles.bloque'), ['user_ids' => range(900001, 900000 + $max + 1), 'add' => ['profesor']])
            ->assertUnprocessable()
            ->assertJsonPath('errors.user_ids.0', "El campo personas no debe tener más de {$max} elementos.");

        // ids inexistentes: pasan la validación y el Service los devuelve en `failed`
        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.roles.bloque'), ['user_ids' => range(900001, 900000 + $max), 'add' => ['profesor']])
            ->assertOk()
            ->assertJsonCount($max, 'data.failed');
    });
});
