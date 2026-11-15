<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\SecurityCode;
use Illuminate\Support\Facades\Mail;

/**
 * `permissions`, `roles` e `is_owner` en la respuesta de sesión
 * (AuthService::accessPayload): login, 2FA y relogin. Con el token temporal del
 * 2FA siempre vacíos; con el definitivo, los permisos efectivos (directos y por
 * rol) como `{nombre: true}`.
 */
beforeEach(function () {
    Mail::fake();
});

test('el login (token temporal) no expone roles ni permisos aunque los tenga', function () {
    $owner = usuarioCon(Role::Owner, Role::Admin);

    $response = $this->postJson(route('auth.login'), ['login' => $owner->username, 'password' => 'password'])
        ->assertOk()
        ->assertJsonPath('roles', [])
        ->assertJsonPath('is_owner', false);

    expect($response->getContent())->toContain('"permissions":{}');
});

test('el relogin con el token temporal tampoco los expone', function () {
    $admin = usuarioCon(Role::Admin);

    $response = conToken(tokenTemporal($admin))->postJson(route('auth.relogin'))
        ->assertOk()
        ->assertJsonPath('roles', [])
        ->assertJsonPath('is_owner', false);

    expect($response->getContent())->toContain('"permissions":{}');
});

test('el 2FA devuelve los permisos efectivos, los roles e is_owner', function () {
    $admin = usuarioCon(Role::Admin);
    $codigo = SecurityCode::factory()->for($admin)->twoFactor()->create();

    $response = conToken(tokenTemporal($admin))
        ->postJson(route('auth.2fa'), ['otp' => $codigo->code])
        ->assertOk()
        ->assertJsonPath('roles', [Role::Admin->value])
        ->assertJsonPath('is_owner', false);

    $esperado = collect(Permission::values())->sort()->mapWithKeys(fn ($p) => [$p => true])->all();
    expect($response->json('permissions'))->toBe($esperado);
});

test('el relogin con el token definitivo junta permisos directos y por rol, ordenados', function () {
    $user = usuarioCon(Role::Profesor, Role::Representante, Permission::UsuariosUsuarioShow);
    $user->givePermissionTo(Permission::UsuariosRolUpdate);

    $response = comoUsuario($user)->postJson(route('auth.relogin'))
        ->assertOk()
        ->assertJsonPath('is_owner', false);

    expect($response->json('roles'))->toEqualCanonicalizing([Role::Profesor->value, Role::Representante->value])
        ->and(array_keys($response->json('permissions')))->toBe([
            Permission::UsuariosRolUpdate->value,
            Permission::UsuariosUsuarioShow->value,
        ]);
});

test('el owner recibe is_owner, solo sus roles reales y ningún permiso asignado', function () {
    $response = comoUsuario(usuarioCon(Role::Owner))->postJson(route('auth.relogin'))
        ->assertOk()
        ->assertJsonPath('roles', [Role::Owner->value])
        ->assertJsonPath('is_owner', true);

    expect($response->getContent())->toContain('"permissions":{}');
});

test('sin roles ni permisos, permissions es un objeto vacío y no un array', function () {
    $response = comoUsuario(usuarioCon())->postJson(route('auth.relogin'))
        ->assertOk()
        ->assertJsonPath('roles', [])
        ->assertJsonPath('is_owner', false);

    expect($response->getContent())->toContain('"permissions":{}');
});

test('flujo completo: login vacío → 2FA con permisos', function () {
    $owner = usuarioCon(Role::Owner);

    $temporal = $this->postJson(route('auth.login'), ['login' => $owner->email, 'password' => 'password'])
        ->assertJsonPath('is_owner', false)
        ->json('apiKey');

    conToken($temporal)
        ->postJson(route('auth.2fa'), ['otp' => Mail::queued(TfaCodeMail::class)->sole()->code])
        ->assertOk()
        ->assertJsonPath('roles', [Role::Owner->value])
        ->assertJsonPath('is_owner', true);
});
