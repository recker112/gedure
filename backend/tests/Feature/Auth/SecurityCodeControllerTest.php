<?php

use App\Http\Controllers\Auth\SecurityCodeController;
use App\Mail\Account\PasswordChangedMail;
use App\Mail\Auth\SecurityCodeMail;
use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\PersonalAccessToken;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

/**
 * Olvidé mi contraseña: código por correo (rutas públicas, `login` = usuario/
 * cédula o correo). Los intentos fallidos están en SecurityCodeAttemptsTest.
 */
beforeEach(function () {
    Mail::fake();
});

const RESPUESTA_ENVIO_CODIGO = ['status' => 200, 'msg' => SecurityCodeController::SEND_MESSAGE];

/** Datos válidos para security/password/update, salvo lo que se sobrescriba. */
function datosCambioContrasena(User $user, string $otp, array $extra = []): array
{
    return [
        'login' => $user->username,
        'otp' => $otp,
        'new_password' => 'newpassword',
        'new_password_confirmation' => 'newpassword',
        ...$extra,
    ];
}

describe('envío del código (security/email/send)', function () {
    test('crea un código de restablecimiento y lo envía al correo de la cuenta', function (Closure $login) {
        $this->freezeSecond();
        $user = User::factory()->create();

        $this->postJson(route('security.email.send'), ['login' => $login($user)])
            ->assertOk()
            ->assertExactJson(RESPUESTA_ENVIO_CODIGO);

        $codigo = SecurityCode::where('user_id', $user->id)->sole();
        expect($codigo->type)->toBe('password_reset')
            ->and($codigo->code)->toBeNull()
            ->and($codigo->attempts)->toBe(0)
            ->and($codigo->expire_at->toDateTimeString())->toBe(now()->addMinutes(15)->toDateTimeString());

        Mail::assertQueued(SecurityCodeMail::class, 1);
        Mail::assertQueued(SecurityCodeMail::class, fn (SecurityCodeMail $mail) => $mail->hasTo($user->email)
            && preg_match('/^[A-HJKMNP-Z2-9]{6}$/', $mail->code) === 1
            && $codigo->token_hash === SecurityCode::hash($mail->code));
    })->with([
        'usuario/cédula' => [fn (User $u) => $u->username],
        'correo' => [fn (User $u) => $u->email],
    ]);

    test('responde lo mismo a una cuenta inexistente, sin crear ni enviar nada', function (string $login) {
        User::factory()->create();

        $this->postJson(route('security.email.send'), ['login' => $login])
            ->assertOk()
            ->assertExactJson(RESPUESTA_ENVIO_CODIGO);

        expect(SecurityCode::count())->toBe(0);
        Mail::assertNothingOutgoing();
    })->with(['nadie@example.com', '99999999']);

    test('no toca los códigos del doble factor', function () {
        $user = User::factory()->create();
        $dobleFactor = SecurityCode::factory()->for($user)->twoFactor()->create();

        $this->postJson(route('security.email.send'), ['login' => $user->email])->assertOk();

        $this->assertModelExists($dobleFactor);
        expect($user->securityCodes()->count())->toBe(2);
    });

    test('valida el campo login', function () {
        $this->postJson(route('security.email.send'), [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['login']);

        Mail::assertNothingOutgoing();
    });
});

describe('espera por cuenta entre códigos (security/email/send)', function () {
    test('la espera es de 25 s', function () {
        expect(SecurityCodeController::RESET_COOLDOWN_SECONDS)->toBe(25);
    });

    test('dentro de la espera responde igual sin crear código ni enviar correo; pasada, sí', function () {
        $user = User::factory()->create();

        $this->postJson(route('security.email.send'), ['login' => $user->email])->assertOk()->assertExactJson(RESPUESTA_ENVIO_CODIGO);
        $primero = SecurityCode::where('user_id', $user->id)->sole();

        $this->travel(24)->seconds();
        // También por el otro identificador: la espera es de la cuenta
        $this->postJson(route('security.email.send'), ['login' => $user->username])->assertOk()->assertExactJson(RESPUESTA_ENVIO_CODIGO);

        expect(SecurityCode::where('user_id', $user->id)->sole()->is($primero))->toBeTrue();
        Mail::assertQueued(SecurityCodeMail::class, 1);

        $this->travel(2)->seconds();
        $this->postJson(route('security.email.send'), ['login' => $user->email])->assertOk();

        $this->assertModelMissing($primero);
        Mail::assertQueued(SecurityCodeMail::class, 2);
    });

    test('es de cada cuenta: otra persona recibe su código al momento', function () {
        [$una, $otra] = User::factory()->count(2)->create();

        $this->postJson(route('security.email.send'), ['login' => $una->email])->assertOk();
        $this->postJson(route('security.email.send'), ['login' => $otra->email])->assertOk();

        Mail::assertQueued(SecurityCodeMail::class, 2);
    });
});

describe('cambio de contraseña (security/password/update)', function () {
    test('cambia la contraseña, consume el código, revoca todas las sesiones y encola el aviso', function (Closure $login) {
        $this->freezeSecond();
        $codigo = SecurityCode::factory()->passwordReset()->create();
        $user = $codigo->user;
        $definitivo = tokenDefinitivo($user, ['remember_me']);
        $otro = tokenDefinitivo($user);
        tokenTemporal($user);

        $this->postJson(route('security.password.update'), datosCambioContrasena($user, $codigo->code, ['login' => $login($user)]))
            ->assertOk()
            ->assertExactJson(['status' => 200, 'msg' => 'Contraseña actualizada correctamente']);

        expect(Hash::check('newpassword', $user->fresh()->password))->toBeTrue()
            ->and($user->fresh()->password_changed_at->toDateTimeString())->toBe(now()->toDateTimeString())
            ->and($codigo->fresh()->used_at)->not->toBeNull()
            ->and($user->tokens()->count())->toBe(0)
            ->and(PersonalAccessToken::findToken($otro))->toBeNull();

        // El token viejo ya no sirve
        conToken($definitivo)->postJson(route('auth.relogin'))->assertUnauthorized();

        Mail::assertQueued(PasswordChangedMail::class, 1);
        Mail::assertQueued(PasswordChangedMail::class, fn (PasswordChangedMail $mail) => $mail->hasTo($user->email)
            && $mail->reset === true
            && $mail->name === $user->name);

        // El código no se puede reutilizar
        $this->postJson(route('security.password.update'), datosCambioContrasena($user, $codigo->code, [
            'new_password' => 'otrapassword',
            'new_password_confirmation' => 'otrapassword',
        ]))->assertUnprocessable();
        expect(Hash::check('newpassword', $user->fresh()->password))->toBeTrue();

        // Y se entra con la contraseña nueva
        $this->postJson(route('auth.login'), ['login' => $user->username, 'password' => 'newpassword'])->assertOk();
    })->with([
        'usuario/cédula' => [fn (User $u) => $u->username],
        'correo' => [fn (User $u) => $u->email],
    ]);

    test('rechaza un código no válido sin cambiar la contraseña ni revocar tokens ni avisar', function (Closure $otp) {
        $user = User::factory()->create();
        $token = tokenDefinitivo($user);

        $this->postJson(route('security.password.update'), datosCambioContrasena($user, $otp($user, 'password_reset')))
            ->assertUnprocessable()
            ->assertExactJson([
                'status' => 422,
                'msg' => 'Código de seguridad inválido o expirado',
                'errors' => ['otp' => ['Código de seguridad inválido o expirado']],
            ]);

        expect(Hash::check('password', $user->fresh()->password))->toBeTrue()
            ->and(PersonalAccessToken::findToken($token))->not->toBeNull();
        Mail::assertNotQueued(PasswordChangedMail::class);
    })->with('códigos no válidos');

    test('una cuenta inexistente recibe la misma respuesta que un código inválido', function () {
        $codigo = SecurityCode::factory()->passwordReset()->create();

        $this->postJson(route('security.password.update'), datosCambioContrasena($codigo->user, $codigo->code, ['login' => 'nadie@example.com']))
            ->assertUnprocessable()
            ->assertExactJson([
                'status' => 422,
                'msg' => 'Código de seguridad inválido o expirado',
                'errors' => ['otp' => ['Código de seguridad inválido o expirado']],
            ]);

        expect($codigo->fresh())->attempts->toBe(0)->used_at->toBeNull();
    });

    test('valida los datos antes de mirar el código', function (array $extra, string $campo) {
        $codigo = SecurityCode::factory()->passwordReset()->create();

        $this->postJson(route('security.password.update'), datosCambioContrasena($codigo->user, $codigo->code, $extra))
            ->assertUnprocessable()
            ->assertJsonValidationErrors([$campo]);

        expect($codigo->fresh())->attempts->toBe(0)->used_at->toBeNull();
    })->with([
        'sin login' => [['login' => ''], 'login'],
        'otp corto' => [['otp' => 'ABC'], 'otp'],
        'sin contraseña' => [['new_password' => '', 'new_password_confirmation' => ''], 'new_password'],
        'contraseña de 7 caracteres' => [['new_password' => '1234567', 'new_password_confirmation' => '1234567'], 'new_password'],
        'confirmación distinta' => [['new_password_confirmation' => 'otracosa'], 'new_password'],
    ]);
});

describe('correos', function () {
    test('PasswordChangedMail no lleva enlaces y muestra la hora de Venezuela', function () {
        $user = User::factory()->make(['name' => 'Ana', 'password_changed_at' => Carbon::parse('2026-11-05 10:30:00', 'UTC')]);
        $mail = PasswordChangedMail::for($user, true);

        expect($mail->changedAt)->toBe('5 de noviembre de 2026 a las 06:30 (hora de Venezuela)');

        $html = $mail->render();
        expect($html)->toContain('Hola, Ana')
            ->toContain('Se cerraron todas tus sesiones abiertas')
            ->toContain('U.E.P. La Candelaria')
            ->toContain('#1B4F9C')
            ->not->toContain('<a ');

        $plano = view('mail.account.password-changed-text', ['name' => 'Ana', 'changedAt' => 'x', 'reset' => true])->render();
        expect($plano)->not->toContain('http');

        $mail->assertHasSubject('La contraseña de tu cuenta ha cambiado');
    });

    test('los correos de código muestran el código y su caducidad', function (string $clase, string $asunto) {
        $mail = new $clase('ABC234', 'en 15 minutos');

        expect($mail->render())->toContain('ABC234')->toContain('en 15 minutos')->toContain('U.E.P. La Candelaria');
        $mail->assertHasSubject($asunto);
    })->with([
        '2FA' => [TfaCodeMail::class, 'Código de verificación'],
        'restablecimiento' => [SecurityCodeMail::class, 'Código de seguridad'],
    ]);
});
