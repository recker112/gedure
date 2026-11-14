<?php

use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Testing\TestResponse;

/**
 * Limitadores de las rutas de autenticación (AppServiceProvider). Cuentan solo
 * por IP: cada petición cambia de usuario o de token y aun así comparte cupo.
 * El comportamiento detrás del proxy (X-Forwarded-For) está en TrustedProxyTest.
 *
 * Cada caso es [cupo por minuto, cupo por hora, status esperado mientras no se
 * corta, petición]. El reenvío del 2FA usa un usuario nuevo en cada petición
 * para no chocar con la espera por cuenta (25 s).
 */
function limitadores(): array
{
    return [
        'login' => [10, null, 400, fn (User $user): TestResponse => test()->postJson(route('auth.login'), [
            'login' => Str::random(8),
            'password' => 'incorrecta',
        ])],
        '2fa' => [10, null, 422, fn (User $user): TestResponse => conToken(tokenTemporal($user))
            ->postJson(route('auth.2fa'), ['otp' => 'ZZZZZZ'])],
        '2fa/resend' => [3, 20, 200, fn (User $user): TestResponse => conToken(tokenTemporal(User::factory()->create()))
            ->postJson(route('auth.2fa.resend'))],
        'security/email/send' => [3, 20, 200, fn (User $user): TestResponse => test()
            ->postJson(route('security.email.send'), ['login' => $user->email])],
        'security/password/update' => [10, 40, 422, fn (User $user): TestResponse => test()
            ->postJson(route('security.password.update'), [
                'login' => $user->email,
                'otp' => 'ZZZZZZ',
                'new_password' => 'newpassword',
                'new_password_confirmation' => 'newpassword',
            ])],
    ];
}

dataset('limitadores', limitadores());

dataset('limitadores por hora', array_filter(limitadores(), fn (array $caso) => $caso[1] !== null));

beforeEach(function () {
    Mail::fake();
});

function assertDemasiadosIntentos(TestResponse $response): void
{
    $response->assertTooManyRequests()
        ->assertHeader('Retry-After')
        ->assertExactJson([
            'status' => 429,
            'msg' => 'Demasiados intentos. Espera un momento e inténtalo de nuevo',
        ]);
}

test('corta al superar el cupo por minuto de la IP, sin afectar a otras IP', function (int $porMinuto, ?int $porHora, int $status, Closure $peticion) {
    $user = User::factory()->create();

    for ($i = 0; $i < $porMinuto; $i++) {
        $peticion($user)->assertStatus($status);
    }

    assertDemasiadosIntentos($peticion($user));

    // Otro cliente conserva su cupo
    $this->withServerVariables(['REMOTE_ADDR' => '203.0.113.7']);
    $peticion($user)->assertStatus($status);
})->with('limitadores');

test('el cupo por minuto se recupera al pasar el minuto', function (int $porMinuto, ?int $porHora, int $status, Closure $peticion) {
    $user = User::factory()->create();

    for ($i = 0; $i < $porMinuto; $i++) {
        $peticion($user)->assertStatus($status);
    }
    assertDemasiadosIntentos($peticion($user));

    $this->travel(61)->seconds();

    $peticion($user)->assertStatus($status);
})->with('limitadores');

test('las rutas que mandan correos o aceptan códigos tienen además un cupo por hora', function (int $porMinuto, ?int $porHora, int $status, Closure $peticion) {
    $user = User::factory()->create();

    $hechas = 0;
    while ($hechas < $porHora) {
        for ($i = 0; $i < $porMinuto && $hechas < $porHora; $i++, $hechas++) {
            $peticion($user)->assertStatus($status);
        }
        $this->travel(61)->seconds();
    }

    assertDemasiadosIntentos($peticion($user));

    $this->travel(1)->hours();
    $peticion($user)->assertStatus($status);
})->with('limitadores por hora');
