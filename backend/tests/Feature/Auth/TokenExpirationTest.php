<?php

use App\Models\Auth\PersonalAccessToken;
use App\Models\User;

/**
 * Caducidad de los tokens de Sanctum (config/sanctum.php y AppServiceProvider),
 * idéntica a blulablel:
 *
 * - Por inactividad (ventana deslizante): el token definitivo deja de valer si
 *   pasa más de `idle_remember` (7 días, con "recordar sesión") o `idle_session`
 *   (1 día, sin él) sin usarse. Sanctum mueve `last_used_at` en CADA petición
 *   autenticada (Laravel\Sanctum\Guard, sin throttling), así que el uso renueva.
 * - Tope absoluto: `expiration` (30 días) desde `created_at`, aunque se use.
 * - El temporal del login (`2fa_required`) caduca por su `expires_at` (15 min).
 */
dataset('sesiones', [
    // [abilities, ventana de inactividad en minutos]
    'con recordar' => [['remember_me'], 60 * 24 * 7],
    'sin recordar' => [[], 60 * 24],
]);

beforeEach(function () {
    $this->freezeSecond();
});

test('la configuración por defecto es 30 días de tope, 7 de inactividad con recordar, 1 sin él y prefijo gedure_', function () {
    expect(config('sanctum.expiration'))->toBe(60 * 24 * 30)
        ->and(config('sanctum.idle_remember'))->toBe(60 * 24 * 7)
        ->and(config('sanctum.idle_session'))->toBe(60 * 24)
        ->and(config('sanctum.token_prefix'))->toBe('gedure_');
});

test('cada petición autenticada actualiza last_used_at', function () {
    $user = User::factory()->create();
    $token = tokenDefinitivo($user);

    $this->travel(3)->hours();
    rutaPrivadaDePrueba($token)->assertOk();

    expect(PersonalAccessToken::findToken($token)->last_used_at->toDateTimeString())->toBe(now()->toDateTimeString());
});

test('un token inactivo más allá de su ventana da 401', function (array $abilities, int $ventana) {
    $user = User::factory()->create();
    $token = tokenDefinitivo($user, $abilities);

    rutaPrivadaDePrueba($token)->assertOk();

    $this->travel($ventana + 1)->minutes();

    rutaPrivadaDePrueba($token)->assertUnauthorized();
    conToken($token)->postJson(route('auth.relogin'))->assertUnauthorized();
})->with('sesiones');

test('justo dentro de la ventana sigue valiendo', function (array $abilities, int $ventana) {
    $user = User::factory()->create();
    $token = tokenDefinitivo($user, $abilities);

    $this->travel($ventana - 1)->minutes();
    rutaPrivadaDePrueba($token)->assertOk();
})->with('sesiones');

test('un token nunca usado cuenta la inactividad desde su creación', function (array $abilities, int $ventana) {
    $user = User::factory()->create();
    $token = tokenDefinitivo($user, $abilities);

    $this->travel($ventana + 1)->minutes();
    rutaPrivadaDePrueba($token)->assertUnauthorized();
})->with('sesiones');

test('el uso continuado dentro de la ventana mantiene la sesión más allá de la ventana', function (array $abilities, int $ventana) {
    $user = User::factory()->create();
    $token = tokenDefinitivo($user, $abilities);

    // Cuatro ventanas completas, entrando justo antes de que se agote cada vez
    for ($i = 0; $i < 4; $i++) {
        $this->travel($ventana - 1)->minutes();
        rutaPrivadaDePrueba($token)->assertOk();
    }

    expect(now()->diffInMinutes(PersonalAccessToken::findToken($token)->created_at, true))->toBeGreaterThan(3 * $ventana);
    conToken($token)->postJson(route('auth.relogin'))->assertOk()->assertJsonPath('user.id', $user->id);
})->with('sesiones');

test('remember vs no remember: tras 2 días sin uso solo sigue la sesión recordada', function () {
    $user = User::factory()->create();
    $sesion = tokenDefinitivo($user);
    $recordada = tokenDefinitivo($user, ['remember_me']);

    $this->travel(2)->days();

    rutaPrivadaDePrueba($sesion)->assertUnauthorized();
    rutaPrivadaDePrueba($recordada)->assertOk();
});

test('una ability `*` no cuenta como recordar sesión', function () {
    $user = User::factory()->create();
    $token = tokenDefinitivo($user, ['*']);

    $this->travel(60 * 24 + 1)->minutes();

    rutaPrivadaDePrueba($token)->assertUnauthorized();
});

test('el tope absoluto de 30 días da 401 aunque el token se use a diario', function () {
    $user = User::factory()->create();
    $token = tokenDefinitivo($user, ['remember_me']);

    for ($dia = 1; $dia < 30; $dia++) {
        $this->travel(1)->days();
        rutaPrivadaDePrueba($token)->assertOk();
    }

    $this->travel(1)->days();
    $this->travel(1)->minutes();

    rutaPrivadaDePrueba($token)->assertUnauthorized();
    conToken($token)->postJson(route('auth.relogin'))->assertUnauthorized();
});

test('el token temporal del 2FA caduca a los 15 minutos', function () {
    $user = User::factory()->create();
    $temporal = tokenTemporal($user, ['remember_me']);

    $this->travel(14)->minutes();
    conToken($temporal)->postJson(route('auth.relogin'))->assertOk();

    $this->travel(2)->minutes();
    conToken($temporal)->postJson(route('auth.relogin'))->assertUnauthorized();
    conToken($temporal)->postJson(route('auth.2fa'), ['otp' => 'ABCDEF'])->assertUnauthorized();
});
