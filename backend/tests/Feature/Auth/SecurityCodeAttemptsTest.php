<?php

use App\Mail\Auth\SecurityCodeMail;
use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Testing\TestResponse;

/**
 * Cada código admite SecurityCode::MAX_ATTEMPTS (5) intentos fallidos. Al
 * quinto deja de aceptarse, aunque luego llegue el valor correcto, y hay que
 * pedir uno nuevo, que empieza con el contador a cero. Aplica a los dos usos del
 * código: el 2FA del login y el cambio de contraseña (ambos 422).
 */
const MSG_AGOTADO = 'Has superado el número de intentos. Solicita un código nuevo';

dataset('flujos con código', [
    'doble factor' => ['two_factor_auth', 'Código de autenticación inválido o expirado'],
    'contraseña' => ['password_reset', 'Código de seguridad inválido o expirado'],
]);

beforeEach(function () {
    Mail::fake();
});

function intentarCodigo(User $user, string $tipo, string $otp): TestResponse
{
    if ($tipo === 'two_factor_auth') {
        return conToken(tokenTemporal($user))->postJson(route('auth.2fa'), ['otp' => $otp]);
    }

    return test()->postJson(route('security.password.update'), [
        'login' => $user->email,
        'otp' => $otp,
        'new_password' => 'newpassword',
        'new_password_confirmation' => 'newpassword',
    ]);
}

/** Pide un código por la ruta del tipo y devuelve el que llega por correo. */
function pedirCodigo(User $user, string $tipo): string
{
    if ($tipo === 'two_factor_auth') {
        conToken(tokenTemporal($user))->postJson(route('auth.2fa.resend'))->assertOk();

        return Mail::queued(TfaCodeMail::class)->last()->code;
    }

    test()->postJson(route('security.email.send'), ['login' => $user->email])->assertOk();

    return Mail::queued(SecurityCodeMail::class)->last()->code;
}

function fallarCodigo(User $user, string $tipo, string $codigo, int $veces, string $msg): void
{
    for ($i = 0; $i < $veces; $i++) {
        intentarCodigo($user, $tipo, otroCodigo($codigo))
            ->assertStatus(422)
            ->assertExactJson(['status' => 422, 'msg' => $msg, 'errors' => ['otp' => [$msg]]]);
    }
}

test('el máximo de intentos es 5 y el código dura 15 minutos', function () {
    expect(SecurityCode::MAX_ATTEMPTS)->toBe(5)->and(SecurityCode::TTL_MINUTES)->toBe(15);
});

test('acepta el código correcto tras 4 intentos fallidos', function (string $tipo, string $msg) {
    $user = User::factory()->create();
    $codigo = pedirCodigo($user, $tipo);

    fallarCodigo($user, $tipo, $codigo, 4, $msg);
    expect(SecurityCode::where('token_hash', SecurityCode::hash($codigo))->value('attempts'))->toBe(4);

    intentarCodigo($user, $tipo, $codigo)->assertOk();
})->with('flujos con código');

test('al 5º fallo invalida el código y ya no acepta el correcto', function (string $tipo, string $msg) {
    $user = User::factory()->create();
    $codigo = pedirCodigo($user, $tipo);

    fallarCodigo($user, $tipo, $codigo, 4, $msg);
    fallarCodigo($user, $tipo, $codigo, 1, MSG_AGOTADO);

    intentarCodigo($user, $tipo, $codigo)
        ->assertStatus(422)
        ->assertExactJson(['status' => 422, 'msg' => MSG_AGOTADO, 'errors' => ['otp' => [MSG_AGOTADO]]]);

    $registro = SecurityCode::where('token_hash', SecurityCode::hash($codigo))->sole();
    expect($registro->attempts)->toBe(SecurityCode::MAX_ATTEMPTS)
        ->and($registro->used_at)->toBeNull()
        ->and(Hash::check('password', $user->fresh()->password))->toBeTrue()
        ->and($user->tokens()->get()->every(fn ($token) => $token->can('2fa_required')))->toBeTrue();
})->with('flujos con código');

test('tras agotarlo, un código nuevo empieza con el contador a cero', function (string $tipo, string $msg) {
    $user = User::factory()->create();
    $agotado = pedirCodigo($user, $tipo);
    fallarCodigo($user, $tipo, $agotado, 4, $msg);
    fallarCodigo($user, $tipo, $agotado, 1, MSG_AGOTADO);

    $this->travel(26)->seconds();
    $nuevo = pedirCodigo($user, $tipo);

    $this->assertDatabaseMissing('security_codes', ['token_hash' => SecurityCode::hash($agotado)]);
    expect(SecurityCode::where('token_hash', SecurityCode::hash($nuevo))->value('attempts'))->toBe(0);

    // Nuevo minuto para no rozar el rate limiting de la ruta (10/min)
    $this->travel(61)->seconds();

    fallarCodigo($user, $tipo, $nuevo, 4, $msg);
    intentarCodigo($user, $tipo, $nuevo)->assertOk();
})->with('flujos con código');

test('un código ya agotado se rechaza aunque sea el correcto', function (string $tipo) {
    $user = User::factory()->create();
    $codigo = SecurityCode::factory()->for($user)->exhausted()->create(['type' => $tipo]);

    intentarCodigo($user, $tipo, $codigo->code)->assertStatus(422)->assertJsonPath('msg', MSG_AGOTADO);
})->with('flujos con código');

test('acepta el código escrito en minúsculas', function (string $tipo) {
    $user = User::factory()->create();
    $codigo = pedirCodigo($user, $tipo);

    intentarCodigo($user, $tipo, strtolower($codigo))->assertOk();
})->with('flujos con código');

test('en la BD solo queda el HMAC del código, nunca el claro', function (string $tipo) {
    $user = User::factory()->create();
    $codigo = pedirCodigo($user, $tipo);

    $fila = (array) DB::table('security_codes')->where('user_id', $user->id)->sole();

    expect($fila['token_hash'])->toBe(SecurityCode::hash($codigo))
        ->and(collect($fila)->contains(fn ($v) => is_string($v) && str_contains(strtoupper($v), $codigo)))->toBeFalse();
})->with('flujos con código');

test('model:prune borra los códigos usados o caducados hace más de un día', function () {
    $vigente = SecurityCode::factory()->create();
    $usado = SecurityCode::factory()->used()->create();
    $caducado = SecurityCode::factory()->expired()->create();

    $this->travel(2)->days();
    $reciente = SecurityCode::factory()->used()->create();

    $this->artisan('model:prune', ['--model' => [SecurityCode::class]])->assertSuccessful();

    $this->assertModelMissing($usado);
    $this->assertModelMissing($caducado);
    $this->assertModelMissing($vigente); // caducó a los 15 min
    $this->assertModelExists($reciente);
});
