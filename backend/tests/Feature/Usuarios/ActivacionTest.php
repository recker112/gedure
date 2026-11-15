<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Enums\Usuarios\EstadoCuenta;
use App\Enums\Usuarios\TipoActividad;
use App\Mail\Account\PasswordChangedMail;
use App\Mail\Auth\TfaCodeMail;
use App\Mail\Usuarios\ActivacionCuentaMail;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use App\Models\Usuarios\Activacion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

/**
 * Activación de cuentas (docs/fases/fase-1-usuarios.md §2.2, §4.2 y §4.4): el
 * enlace público (`GET`/`POST /auth/activacion/{token}`), su ciclo de vida
 * (desconocido 404; usado, caducado, cuenta de baja o suspendida 410), el
 * reenvío (`POST /usuarios/{id}/activacion`, rota el token) y "¿Olvidaste tu
 * contraseña?", que también activa una cuenta pendiente (§6).
 */
beforeEach(function () {
    Mail::fake();
});

/** Activación vigente de una cuenta pendiente con un token conocido: [token, activación]. */
function activacionConToken(array $user = [], ?Closure $estado = null): array
{
    $token = Str::random(64);
    $factory = Activacion::factory()->conToken($token)->for(User::factory()->pendiente()->create($user));

    return [$token, ($estado ? $estado($factory) : $factory)->create()];
}

/** Token del enlace del último ActivacionCuentaMail encolado a `$email`. */
function tokenDelCorreoDeActivacion(string $email): string
{
    $mail = Mail::queued(ActivacionCuentaMail::class, fn ($m) => $m->hasTo($email))->last();

    return str($mail->url)->afterLast('/')->value();
}

const ACTIVACION_CLAVE = ['password' => 'nueva-clave-segura', 'password_confirmation' => 'nueva-clave-segura'];

describe('ver el enlace', function () {
    test('devuelve el nombre y el correo enmascarado', function () {
        [$token] = activacionConToken(['name' => 'Ana Pérez', 'email' => 'ana.perez@example.com']);

        $this->getJson(route('auth.activacion.show', $token))
            ->assertOk()
            ->assertExactJson(['status' => 200, 'data' => ['name' => 'Ana Pérez', 'email' => 'a***@example.com']]);
    });

    test('un token desconocido es 404', function () {
        activacionConToken();

        $this->getJson(route('auth.activacion.show', Str::random(64)))
            ->assertNotFound()
            ->assertExactJson(['status' => 404, 'msg' => 'El enlace de activación no es válido']);
    });

    test('un token con otra forma no llega al controlador (404)', function (string $token) {
        $this->getJson('/api/v1/auth/activacion/'.$token)->assertNotFound();
    })->with([
        'corto' => ['abc'],
        'largo' => [str_repeat('a', 65)],
        'símbolos' => [str_repeat('a', 63).'-'],
    ]);

    test('410 si ya no sirve', function (Closure $preparar, string $msg) {
        [$token, $activacion] = activacionConToken();
        $preparar($activacion);

        $this->getJson(route('auth.activacion.show', $token))
            ->assertStatus(410)
            ->assertExactJson(['status' => 410, 'msg' => $msg]);
    })->with([
        'usada' => [fn (Activacion $a) => $a->update(['used_at' => now()]), 'Este enlace ya se usó. Si ya elegiste tu contraseña, inicia sesión'],
        'cuenta ya activada' => [fn (Activacion $a) => $a->user->forceFill(['activated_at' => now()])->save(), 'Este enlace ya se usó. Si ya elegiste tu contraseña, inicia sesión'],
        'caducada' => [fn (Activacion $a) => $a->update(['expires_at' => now()->subSecond()]), 'El enlace de activación caducó. Pide a la administración del colegio que te envíe otro'],
        'cuenta suspendida' => [fn (Activacion $a) => $a->user->forceFill(['suspended_at' => now()])->save(), 'Esta cuenta no se puede activar. Contacta con la administración del colegio'],
        'cuenta de baja' => [fn (Activacion $a) => $a->user->delete(), 'Esta cuenta no se puede activar. Contacta con la administración del colegio'],
    ]);

    test('caduca a los 7 días', function () {
        [$token] = activacionConToken();

        $this->travel(7)->days();
        $this->travel(-1)->minutes();
        $this->getJson(route('auth.activacion.show', $token))->assertOk();

        $this->travel(2)->minutes();
        $this->getJson(route('auth.activacion.show', $token))->assertStatus(410);
    });
});

describe('activar', function () {
    test('guarda la contraseña, activa la cuenta y marca el enlace como usado', function () {
        $this->freezeSecond();
        [$token, $activacion] = activacionConToken();
        $user = $activacion->user;

        $this->postJson(route('auth.activacion.store', $token), ACTIVACION_CLAVE)
            ->assertOk()
            ->assertExactJson(['status' => 200, 'msg' => 'Cuenta activada. Ya puedes iniciar sesión']);

        $user->refresh();
        expect($user->estado())->toBe(EstadoCuenta::Activo)
            ->and($user->activated_at->toDateTimeString())->toBe(now()->toDateTimeString())
            ->and($user->email_verified_at)->not->toBeNull()
            ->and($user->password_changed_at)->not->toBeNull()
            ->and(Hash::check('nueva-clave-segura', $user->password))->toBeTrue()
            ->and($activacion->fresh()->used_at)->not->toBeNull()
            // No abre sesión
            ->and($user->tokens()->count())->toBe(0);

        $evento = $user->actividades()->sole();
        expect($evento->tipo)->toBe(TipoActividad::CuentaActivada)
            ->and($evento->actor_id)->toBeNull();

        // Es la primera contraseña: sin aviso de cambio
        Mail::assertNotQueued(PasswordChangedMail::class);
    });

    test('después puede iniciar sesión con su contraseña', function () {
        [$token, $activacion] = activacionConToken();

        $this->postJson(route('auth.activacion.store', $token), ACTIVACION_CLAVE)->assertOk();

        $this->postJson(route('auth.login'), ['login' => $activacion->user->username, 'password' => 'nueva-clave-segura'])->assertOk();
        Mail::assertQueued(TfaCodeMail::class, 1);
    });

    test('el enlace solo sirve una vez', function () {
        [$token] = activacionConToken();

        $this->postJson(route('auth.activacion.store', $token), ACTIVACION_CLAVE)->assertOk();
        $this->postJson(route('auth.activacion.store', $token), ACTIVACION_CLAVE)->assertStatus(410);
        $this->getJson(route('auth.activacion.show', $token))->assertStatus(410);
    });

    test('mismas reglas que el cambio de contraseña', function (array $cuerpo) {
        [$token, $activacion] = activacionConToken();

        $this->postJson(route('auth.activacion.store', $token), $cuerpo)
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['password']);

        expect($activacion->user->fresh()->isActivated())->toBeFalse()
            ->and($activacion->fresh()->used_at)->toBeNull();
    })->with([
        'vacía' => [[]],
        'corta' => [['password' => 'corta', 'password_confirmation' => 'corta']],
        'sin confirmar' => [['password' => 'nueva-clave-segura']],
        'confirmación distinta' => [['password' => 'nueva-clave-segura', 'password_confirmation' => 'otra-clave-segura']],
    ]);

    test('con un enlace que ya no sirve es 410 antes de validar el cuerpo', function () {
        [$token] = activacionConToken(estado: fn ($f) => $f->caducada());

        $this->postJson(route('auth.activacion.store', $token), [])->assertStatus(410);
    });

    test('con un token desconocido es 404 antes de validar el cuerpo', function () {
        $this->postJson(route('auth.activacion.store', Str::random(64)), [])->assertNotFound();
    });

    test('una cuenta suspendida no se activa', function () {
        [$token, $activacion] = activacionConToken(estado: fn ($f) => $f->for(User::factory()->pendiente()->suspendido()->create()));

        $this->postJson(route('auth.activacion.store', $token), ACTIVACION_CLAVE)->assertStatus(410);

        expect($activacion->user->fresh()->isActivated())->toBeFalse();
    });

    test('las rutas públicas están limitadas por IP', function () {
        foreach (range(1, 10) as $i) {
            $this->getJson(route('auth.activacion.show', Str::random(64)))->assertNotFound();
        }

        $this->getJson(route('auth.activacion.show', Str::random(64)))
            ->assertStatus(429)
            ->assertJsonPath('status', 429);
        $this->postJson(route('auth.activacion.store', Str::random(64)), ACTIVACION_CLAVE)->assertStatus(429);
    });

    test('las rutas públicas no están detrás de auth.full', function () {
        foreach (['auth.activacion.show', 'auth.activacion.store'] as $nombre) {
            expect(app('router')->getRoutes()->getByName($nombre)->gatherMiddleware())
                ->not->toContain('auth.full')
                ->toContain('throttle:auth.activacion');
        }
    });
});

describe('reenviar', function () {
    test('rota el token: el enlace anterior deja de valer', function () {
        $admin = usuarioCon(Role::Admin);
        [$viejo, $activacion] = activacionConToken();
        $user = $activacion->user;
        $this->travel(1)->days();

        comoUsuario($admin)
            ->postJson(route('usuarios.activacion.store', $user->id))
            ->assertOk()
            ->assertExactJson(['status' => 200, 'msg' => 'Enlace de activación enviado']);

        $nuevo = tokenDelCorreoDeActivacion($user->email);
        expect($nuevo)->not->toBe($viejo)
            ->and(Activacion::where('user_id', $user->id)->count())->toBe(1)
            ->and($activacion->fresh()->enviada_por)->toBe($admin->id)
            ->and($activacion->fresh()->expires_at->isAfter(now()->addDays(6)))->toBeTrue();

        $this->getJson(route('auth.activacion.show', $viejo))->assertNotFound();
        $this->getJson(route('auth.activacion.show', $nuevo))->assertOk();

        $evento = $user->actividades()->sole();
        expect($evento->tipo)->toBe(TipoActividad::ActivacionEnviada)
            ->and($evento->actor_id)->toBe($admin->id);
    });

    test('renueva un enlace caducado', function () {
        [$viejo, $activacion] = activacionConToken(estado: fn ($f) => $f->caducada());

        comoUsuario(usuarioCon(Role::Admin))->postJson(route('usuarios.activacion.store', $activacion->user_id))->assertOk();

        $this->getJson(route('auth.activacion.show', tokenDelCorreoDeActivacion($activacion->user->email)))->assertOk();
    });

    test('crea el enlace si la cuenta nunca recibió uno', function () {
        $user = User::factory()->pendiente()->create();

        comoUsuario(usuarioCon(Role::Admin))->postJson(route('usuarios.activacion.store', $user->id))->assertOk();

        expect($user->activacion)->not->toBeNull();
        Mail::assertQueued(ActivacionCuentaMail::class, fn ($m) => $m->hasTo($user->email));
    });

    test('422 si la cuenta ya está activada, de baja o suspendida', function (Closure $crear, string $msg) {
        $user = $crear();

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.activacion.store', $user->id))
            ->assertUnprocessable()
            ->assertExactJson(['status' => 422, 'msg' => $msg]);

        Mail::assertNothingQueued();
        expect(Activacion::count())->toBe(0);
    })->with([
        'activada' => [fn () => User::factory()->create(), 'La cuenta ya está activada'],
        'de baja' => [fn () => User::factory()->pendiente()->deBaja()->create(), 'La cuenta está dada de baja: restáurala antes de editarla'],
        'suspendida' => [fn () => User::factory()->pendiente()->suspendido()->create(), 'La cuenta está suspendida: reactívala antes de enviar el enlace'],
    ]);

    test('permiso, 404 y owner ajeno', function () {
        $pendiente = User::factory()->pendiente()->create();
        $owner = User::factory()->pendiente()->create()->assignRole(Role::Owner);

        comoUsuario(usuarioCon(Permission::UsuariosUsuarioUpdate))
            ->postJson(route('usuarios.activacion.store', $pendiente->id))
            ->assertForbidden();

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.activacion.store', 999999))
            ->assertNotFound()
            ->assertExactJson(['status' => 404, 'msg' => 'La persona no existe']);

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.activacion.store', $owner->id))
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'Solo un owner puede gestionar a otro owner']);

        Mail::assertNothingQueued();
    });
});

describe('¿Olvidaste tu contraseña? en una cuenta pendiente', function () {
    test('activa la cuenta con la contraseña nueva y anula el enlace', function () {
        [$token, $activacion] = activacionConToken();
        $user = $activacion->user;
        $codigo = SecurityCode::factory()->for($user)->passwordReset()->create();

        $this->postJson(route('security.password.update'), [
            'login' => $user->username,
            'otp' => $codigo->code,
            'new_password' => 'nueva-clave-segura',
            'new_password_confirmation' => 'nueva-clave-segura',
        ])->assertOk();

        $user->refresh();
        expect($user->estado())->toBe(EstadoCuenta::Activo)
            ->and($user->email_verified_at)->not->toBeNull()
            ->and(Hash::check('nueva-clave-segura', $user->password))->toBeTrue()
            ->and($activacion->fresh()->used_at)->not->toBeNull()
            ->and($user->actividades()->sole()->tipo)->toBe(TipoActividad::CuentaActivada);

        Mail::assertNotQueued(PasswordChangedMail::class);
        $this->getJson(route('auth.activacion.show', $token))->assertStatus(410);
    });

    test('en una cuenta activa sigue siendo un cambio de contraseña normal', function () {
        $user = User::factory()->create();
        $codigo = SecurityCode::factory()->for($user)->passwordReset()->create();

        $this->postJson(route('security.password.update'), [
            'login' => $user->email,
            'otp' => $codigo->code,
            'new_password' => 'nueva-clave-segura',
            'new_password_confirmation' => 'nueva-clave-segura',
        ])->assertOk();

        Mail::assertQueued(PasswordChangedMail::class);
        expect($user->actividades()->count())->toBe(0);
    });
});

describe('limpieza', function () {
    test('model:prune borra las usadas o caducadas hace más de 30 días', function () {
        $vigente = Activacion::factory()->create();
        $usadaReciente = Activacion::factory()->create(['used_at' => now()->subDays(29)]);
        Activacion::factory()->create(['used_at' => now()->subDays(31)]);
        Activacion::factory()->create(['sent_at' => now()->subDays(40), 'expires_at' => now()->subDays(31)]);

        $this->artisan('model:prune', ['--model' => [Activacion::class]])->assertSuccessful();

        // Quedan la vigente y la usada hace menos de 30 días; se van la usada y la caducada hace más de 30
        expect(Activacion::orderBy('id')->pluck('id')->all())->toBe([$vigente->id, $usadaReciente->id]);
    });

    test('el token en claro no se guarda', function () {
        $user = User::factory()->pendiente()->create();
        comoUsuario(usuarioCon(Role::Admin))->postJson(route('usuarios.activacion.store', $user->id))->assertOk();

        $token = tokenDelCorreoDeActivacion($user->email);
        $fila = (array) DB::table('activaciones')->where('user_id', $user->id)->first();

        expect(json_encode($fila))->not->toContain($token)
            ->and($fila['token_hash'])->toBe(hash('sha256', $token))
            ->and($user->activacion->toArray())->not->toHaveKey('token_hash');
    });
});
