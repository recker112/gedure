<?php

use App\Models\User;
use Illuminate\Support\Facades\Mail;

/**
 * Qué puede hacer cada token. El temporal del login (`2fa_required`) solo sirve
 * para el propio flujo del 2FA (2fa, 2fa/resend, relogin y logout); las rutas
 * privadas (`auth.full`) exigen el definitivo, y el definitivo no puede volver a
 * pasar por el 2FA. Las respuestas son 403 y no 401, que el frontend reserva
 * para la sesión expirada.
 */
dataset('rutas del 2FA', [
    'POST /auth/2fa' => ['/api/v1/auth/2fa'],
    'POST /auth/2fa/resend' => ['/api/v1/auth/2fa/resend'],
]);

test('el token temporal recibe 403 en las rutas privadas', function () {
    $user = User::factory()->create();

    rutaPrivadaDePrueba(tokenTemporal($user))
        ->assertForbidden()
        ->assertExactJson([
            'status' => 403,
            'msg' => 'Completa la verificación en dos pasos para continuar',
        ]);
});

test('el token definitivo accede a las rutas privadas', function () {
    rutaPrivadaDePrueba(tokenDefinitivo(User::factory()->create()))->assertOk();
});

test('sin token las rutas privadas responden 401', function () {
    rutaPrivadaDePrueba()->assertUnauthorized()->assertExactJson(['message' => 'Unauthenticated.']);
});

test('un token inventado responde 401', function () {
    rutaPrivadaDePrueba('1|gedure_inventado')->assertUnauthorized();
});

test('el token definitivo recibe 403 en las rutas del 2FA', function (string $uri) {
    Mail::fake();
    $user = User::factory()->create();

    conToken(tokenDefinitivo($user))
        ->postJson($uri, ['otp' => 'ABCDEF'])
        ->assertForbidden()
        ->assertExactJson([
            'status' => 403,
            'msg' => 'Este token no permite realizar esta acción',
        ]);

    expect($user->tokens()->count())->toBe(1)
        ->and($user->securityCodes()->count())->toBe(0);
    Mail::assertNothingOutgoing();
})->with('rutas del 2FA');

test('el token temporal caducado ya no sirve para el 2FA', function () {
    $user = User::factory()->create();
    $temporal = tokenTemporal($user);

    $this->travel(16)->minutes();

    conToken($temporal)->postJson('/api/v1/auth/2fa', ['otp' => 'ABCDEF'])->assertUnauthorized();
});
