<?php

use App\Http\Controllers\Auth\AuthController;
use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\PersonalAccessToken;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Testing\TestResponse;

/**
 * Login con doble factor: credenciales (`login` = usuario/cédula o correo) →
 * token temporal (`2fa_required`, 15 min) → código por correo → token
 * definitivo. Además, relogin y logout.
 */
const RESPUESTA_LOGIN = ['status', 'msg', 'apiKey', 'token_can', 'user', 'permissions', 'roles', 'is_owner'];

const CREDENCIALES_INCORRECTAS = ['status' => 400, 'msg' => 'Usuario o contraseña incorrectos'];

/** `user` solo lleva id, name, username y email. */
function afirmaUsuarioMinimo(TestResponse $response, User $user): void
{
    expect($response->json('user'))->toBe([
        'id' => $user->id, 'name' => $user->name, 'username' => $user->username, 'email' => $user->email,
    ]);
    // Sin roles ni permisos (o con el token temporal): objeto y array vacíos.
    // El payload con roles lo prueba Feature/Permisos/PayloadSesionTest.
    expect($response->getContent())->toContain('"permissions":{}')->toContain('"roles":[]')->toContain('"is_owner":false');
}

beforeEach(function () {
    Mail::fake();
});

describe('login', function () {
    test('con usuario o correo emite un token temporal de 15 minutos y envía el código', function (Closure $login) {
        $this->freezeSecond();
        $user = User::factory()->create(['username' => 'V-12345678']);

        $response = $this->postJson(route('auth.login'), [
            'login' => $login($user),
            'password' => 'password',
        ])
            ->assertOk()
            ->assertJsonStructure(RESPUESTA_LOGIN)
            ->assertJsonPath('msg', 'Inicio de sesión')
            ->assertJsonPath('token_can', ['2fa_required']);

        afirmaUsuarioMinimo($response, $user);
        expect($response->json('apiKey'))->toMatch('/^\d+\|gedure_/');

        $token = PersonalAccessToken::findToken($response->json('apiKey'));
        expect($token->tokenable->is($user))->toBeTrue()
            ->and($token->abilities)->toBe(['2fa_required'])
            ->and($token->expires_at->toDateTimeString())->toBe(now()->addMinutes(15)->toDateTimeString());

        $codigo = SecurityCode::where('user_id', $user->id)->sole();
        expect($codigo->type)->toBe('two_factor_auth')->and($codigo->attempts)->toBe(0);

        Mail::assertQueued(TfaCodeMail::class, 1);
        Mail::assertQueued(TfaCodeMail::class, fn (TfaCodeMail $mail) => $mail->hasTo($user->email)
            && $codigo->token_hash === SecurityCode::hash($mail->code)
            && $mail->expireAt === 'en 15 minutos');
    })->with([
        'usuario/cédula' => [fn (User $u) => $u->username],
        'correo' => [fn (User $u) => $u->email],
        'con espacios alrededor' => [fn (User $u) => "  {$u->username}  "],
    ]);

    test('añade remember_me al token temporal si se pide recordar la sesión', function () {
        $user = User::factory()->create();

        $this->postJson(route('auth.login'), ['login' => $user->email, 'password' => 'password', 'remember' => true])
            ->assertOk()
            ->assertJsonPath('token_can', ['2fa_required', 'remember_me']);
    });

    test('responde igual a contraseña incorrecta y a usuario o correo inexistente, sin token ni código', function (Closure $datos) {
        $user = User::factory()->create(['username' => '20111222']);

        $this->postJson(route('auth.login'), $datos($user))
            ->assertStatus(400)
            ->assertExactJson(CREDENCIALES_INCORRECTAS);

        expect(PersonalAccessToken::count())->toBe(0)
            ->and(SecurityCode::count())->toBe(0);
        Mail::assertNothingOutgoing();
    })->with([
        'contraseña incorrecta (usuario)' => [fn (User $u) => ['login' => $u->username, 'password' => 'incorrecta']],
        'contraseña incorrecta (correo)' => [fn (User $u) => ['login' => $u->email, 'password' => 'incorrecta']],
        'usuario inexistente' => [fn (User $u) => ['login' => '99999999', 'password' => 'password']],
        'correo inexistente' => [fn (User $u) => ['login' => 'nadie@example.com', 'password' => 'password']],
        // Con @ se busca solo por correo: el usuario no sirve como correo ni al revés
        'usuario escrito como correo' => [fn (User $u) => ['login' => $u->username.'@example.com', 'password' => 'password']],
    ]);

    test('valida los campos del login', function (array $datos, string $campo) {
        $this->postJson(route('auth.login'), $datos)
            ->assertUnprocessable()
            ->assertJsonValidationErrors([$campo]);

        Mail::assertNothingOutgoing();
    })->with([
        'sin login' => [['password' => 'password'], 'login'],
        'sin contraseña' => [['login' => 'alguien'], 'password'],
        'remember no booleano' => [['login' => 'alguien', 'password' => 'password', 'remember' => 'quizá'], 'remember'],
    ]);

    test('los errores de validación salen en español con el formato de Laravel', function () {
        $this->postJson(route('auth.login'), [])
            ->assertUnprocessable()
            ->assertExactJson([
                'message' => 'El campo usuario, cédula o correo es obligatorio. (y 1 error más)',
                'errors' => [
                    'login' => ['El campo usuario, cédula o correo es obligatorio.'],
                    'password' => ['El campo contraseña es obligatorio.'],
                ],
            ]);
    });
});

describe('reenvío del código (2fa/resend)', function () {
    test('pasada la espera envía un código nuevo y descarta el anterior', function () {
        $user = User::factory()->create();
        $anterior = SecurityCode::factory()->for($user)->twoFactor()->create(['attempts' => 3]);

        conToken(tokenTemporal($user))
            ->postJson(route('auth.2fa.resend'))
            ->assertOk()
            ->assertExactJson(['status' => 200, 'msg' => 'Código de seguridad reenviado']);

        $this->assertModelMissing($anterior);
        $nuevo = SecurityCode::where('user_id', $user->id)->sole();
        expect($nuevo->type)->toBe('two_factor_auth')->and($nuevo->attempts)->toBe(0);

        Mail::assertQueued(TfaCodeMail::class, fn (TfaCodeMail $mail) => $mail->hasTo($user->email) && $nuevo->token_hash === SecurityCode::hash($mail->code));
    });

    test('la espera es de 25 s, cuenta desde el login y responde 429 con retry_after', function () {
        $this->freezeSecond();
        expect(AuthController::RESEND_COOLDOWN_SECONDS)->toBe(25);
        $user = User::factory()->create();

        $temporal = $this->postJson(route('auth.login'), ['login' => $user->username, 'password' => 'password'])
            ->assertOk()->json('apiKey');
        $primero = SecurityCode::where('user_id', $user->id)->sole();

        $this->travel(10)->seconds();
        conToken($temporal)->postJson(route('auth.2fa.resend'))
            ->assertStatus(429)
            ->assertHeader('Retry-After', '15')
            ->assertExactJson([
                'status' => 429,
                'msg' => 'Espera unos segundos antes de pedir otro código',
                'retry_after' => 15,
            ]);

        // No se creó ni envió nada
        expect(SecurityCode::where('user_id', $user->id)->sole()->is($primero))->toBeTrue();
        Mail::assertQueued(TfaCodeMail::class, 1);

        $this->travel(16)->seconds();
        conToken($temporal)->postJson(route('auth.2fa.resend'))->assertOk();
        Mail::assertQueued(TfaCodeMail::class, 2);

        // Y vuelve a empezar la espera
        conToken($temporal)->postJson(route('auth.2fa.resend'))->assertStatus(429);
    });
});

describe('verificación del doble factor (2fa)', function () {
    test('canjea el token temporal por el definitivo y consume el código', function (bool $recordar) {
        $user = User::factory()->create();
        $codigo = SecurityCode::factory()->for($user)->twoFactor()->create();
        $temporal = tokenTemporal($user, $recordar ? ['remember_me'] : []);
        $abilities = $recordar ? ['remember_me'] : [];

        $response = conToken($temporal)
            ->postJson(route('auth.2fa'), ['otp' => $codigo->code])
            ->assertOk()
            ->assertJsonStructure(RESPUESTA_LOGIN)
            ->assertJsonPath('token_can', $abilities);

        afirmaUsuarioMinimo($response, $user);

        $definitivo = PersonalAccessToken::findToken($response->json('apiKey'));
        expect($definitivo->abilities)->toBe($abilities)
            ->and($definitivo->expires_at)->toBeNull()
            ->and(PersonalAccessToken::findToken($temporal))->toBeNull()
            ->and($codigo->fresh()->used_at)->not->toBeNull()
            ->and($user->tokens()->count())->toBe(1);
    })->with([
        'sin recordar' => [false],
        'con recordar' => [true],
    ]);

    test('rechaza un código no válido y conserva el token temporal', function (Closure $otp) {
        $user = User::factory()->create();
        $temporal = tokenTemporal($user);

        conToken($temporal)
            ->postJson(route('auth.2fa'), ['otp' => $otp($user, 'two_factor_auth')])
            ->assertStatus(422)
            ->assertExactJson([
                'status' => 422,
                'msg' => 'Código de autenticación inválido o expirado',
                'errors' => ['otp' => ['Código de autenticación inválido o expirado']],
            ]);

        expect($user->tokens()->count())->toBe(1)
            ->and(PersonalAccessToken::findToken($temporal))->not->toBeNull();
    })->with('códigos no válidos');

    test('un código caducado por tiempo deja de valer', function () {
        $user = User::factory()->create();
        $codigo = SecurityCode::factory()->for($user)->twoFactor()->create();

        $this->travel(SecurityCode::TTL_MINUTES)->minutes();
        $this->travel(1)->seconds();

        // El temporal se crea ahora (el del login también habría caducado)
        conToken(tokenTemporal($user))->postJson(route('auth.2fa'), ['otp' => $codigo->code])
            ->assertStatus(422)
            ->assertJsonPath('msg', 'Código de autenticación inválido o expirado');
    });

    test('exige un otp de 6 caracteres', function (?string $otp) {
        $user = User::factory()->create();

        conToken(tokenTemporal($user))
            ->postJson(route('auth.2fa'), ['otp' => $otp])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['otp']);
    })->with([
        'vacío' => [null],
        'corto' => ['ABC'],
        'largo' => ['ABCDEFG'],
    ]);

    test('si el temporal se revocó entre tanto (restablecimiento) no emite el definitivo', function () {
        $user = User::factory()->create();
        $codigo = SecurityCode::factory()->for($user)->twoFactor()->create();
        $temporal = tokenTemporal($user);

        // Se autentica con el token y, antes de la transacción, otro proceso lo borra
        PersonalAccessToken::retrieved(function (PersonalAccessToken $t) {
            static $borrado = false;
            if (! $borrado) {
                $borrado = true;
                PersonalAccessToken::query()->whereKey($t->getKey())->delete();
            }
        });

        conToken($temporal)->postJson(route('auth.2fa'), ['otp' => $codigo->code])
            ->assertUnauthorized();

        expect($user->tokens()->count())->toBe(0);
    });
});

describe('relogin', function () {
    test('con el token definitivo devuelve el usuario y sus abilities, sin token nuevo', function (array $abilities) {
        $user = User::factory()->create();

        $response = conToken(tokenDefinitivo($user, $abilities))
            ->postJson(route('auth.relogin'))
            ->assertOk()
            ->assertJsonMissingPath('apiKey')
            ->assertJsonPath('status', 200)
            ->assertJsonPath('token_can', $abilities);

        afirmaUsuarioMinimo($response, $user);
        expect($user->tokens()->count())->toBe(1);
    })->with([
        'sin abilities' => [[]],
        'remember_me' => [['remember_me']],
    ]);

    test('con el token temporal indica que falta el 2FA', function () {
        $user = User::factory()->create();

        $response = conToken(tokenTemporal($user, ['remember_me']))
            ->postJson(route('auth.relogin'))
            ->assertOk()
            ->assertJsonMissingPath('apiKey')
            ->assertJsonPath('token_can', ['2fa_required', 'remember_me']);

        afirmaUsuarioMinimo($response, $user);
    });

    test('sin token responde 401', function () {
        $this->postJson(route('auth.relogin'))
            ->assertUnauthorized()
            ->assertExactJson(['message' => 'Unauthenticated.']);
    });
});

test('recorre el flujo completo: login → 2FA con el código del correo → relogin → logout', function () {
    $user = User::factory()->create();

    $temporal = $this->postJson(route('auth.login'), [
        'login' => $user->username,
        'password' => 'password',
        'remember' => true,
    ])->assertOk()->json('apiKey');

    // El token temporal todavía no abre las rutas privadas
    rutaPrivadaDePrueba($temporal)->assertForbidden();

    $codigo = Mail::queued(TfaCodeMail::class)->sole()->code;

    $definitivo = conToken($temporal)
        ->postJson(route('auth.2fa'), ['otp' => $codigo])
        ->assertOk()
        ->assertJsonPath('token_can', ['remember_me'])
        ->json('apiKey');

    rutaPrivadaDePrueba($definitivo)->assertOk();
    conToken($definitivo)->postJson(route('auth.relogin'))->assertOk()->assertJsonPath('user.id', $user->id);

    // El token temporal se borró al emitir el definitivo
    conToken($temporal)->postJson(route('auth.relogin'))->assertUnauthorized();

    conToken($definitivo)->postJson(route('auth.logout'))->assertOk();
    conToken($definitivo)->postJson(route('auth.relogin'))->assertUnauthorized();
});

describe('logout', function () {
    test('borra solo el token con el que se llama', function (Closure $crearToken) {
        $user = User::factory()->create();
        $token = $crearToken($user);
        $otro = tokenDefinitivo($user);

        conToken($token)
            ->postJson(route('auth.logout'))
            ->assertOk()
            ->assertExactJson(['status' => 200, 'msg' => 'Sesión cerrada']);

        expect(PersonalAccessToken::findToken($token))->toBeNull()
            ->and(PersonalAccessToken::findToken($otro))->not->toBeNull();
    })->with([
        // Con el temporal sirve para cancelar un login a medias
        'token temporal' => [fn (User $user) => tokenTemporal($user)],
        'token definitivo' => [fn (User $user) => tokenDefinitivo($user)],
    ]);

    test('solo acepta POST', function () {
        $token = tokenDefinitivo(User::factory()->create());

        conToken($token)->getJson(route('auth.logout'))->assertMethodNotAllowed();

        expect(PersonalAccessToken::findToken($token))->not->toBeNull();
    });
});
