<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Http\Requests\Usuarios\UsuarioTargetRequest;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/**
 * `UsuarioTargetRequest` + `UserPolicy::manage` (docs/fases/fase-1-usuarios.md
 * §4.1): 404 (también las bajas se encuentran) y después la Policy, que solo
 * deja a un owner gestionar a otro owner. Las acciones reales que la usan llegan
 * en los PR de roles y de alta/estado; aquí se prueba con una ruta de prueba
 * detrás del mismo middleware.
 */
function rutaSobreUsuario(User $actor, int $id)
{
    Route::middleware(['api', 'auth.full', 'permission:'.Permission::UsuariosUsuarioUpdate->value])
        ->post('/api/v1/__test/usuarios/{id}', fn (UsuarioTargetRequest $request) => response()->json([
            'status' => 200,
            'id' => $request->target()->id,
        ]))
        ->whereNumber('id');

    return comoUsuario($actor)->postJson("/api/v1/__test/usuarios/{$id}");
}

test('sin el permiso de la ruta responde 403 antes del 404', function () {
    rutaSobreUsuario(usuarioCon(Permission::UsuariosUsuarioShow), 999)
        ->assertForbidden()
        ->assertExactJson(['status' => 403, 'msg' => 'No tienes permiso para realizar esta acción']);
});

test('responde 404 si la persona no existe', function () {
    rutaSobreUsuario(usuarioCon(Permission::UsuariosUsuarioUpdate), 999)
        ->assertNotFound()
        ->assertExactJson(['status' => 404, 'msg' => 'La persona no existe']);
});

test('encuentra a las bajas', function () {
    $baja = User::factory()->deBaja()->create();

    rutaSobreUsuario(usuarioCon(Permission::UsuariosUsuarioUpdate), $baja->id)
        ->assertOk()
        ->assertJsonPath('id', $baja->id);
});

test('quien no es owner no gestiona a un owner (403 de la Policy)', function () {
    $owner = usuarioCon(Role::Owner);

    rutaSobreUsuario(usuarioCon(Role::Admin), $owner->id)
        ->assertForbidden()
        ->assertExactJson(['status' => 403, 'msg' => 'Solo un owner puede gestionar a otro owner']);
});

test('un owner gestiona a otro owner', function () {
    $owner = usuarioCon(Role::Owner);

    rutaSobreUsuario(usuarioCon(Role::Owner), $owner->id)->assertOk();
});

test('quien tiene el permiso gestiona a quien no es owner', function (Role $rol) {
    $target = usuarioCon($rol);

    rutaSobreUsuario(usuarioCon(Role::Admin), $target->id)->assertOk()->assertJsonPath('id', $target->id);
})->with([Role::Admin, Role::Profesor, Role::Representante]);
