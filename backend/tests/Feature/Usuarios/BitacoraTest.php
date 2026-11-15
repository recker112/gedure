<?php

use App\Enums\Usuarios\TipoActividad;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use App\Models\Usuarios\Actividad;
use App\Services\Usuarios\Bitacora;
use Illuminate\Support\Facades\Mail;

/**
 * Bitácora de cada persona (`actividades`, docs/fases/fase-1-usuarios.md §2.5).
 * En este PR solo se escribe `login`, al canjear el 2FA.
 */
beforeEach(function () {
    Mail::fake();
});

describe('login', function () {
    test('el canje del 2FA escribe un evento propio y actualiza last_login_at', function () {
        $this->freezeSecond();
        $user = User::factory()->create();
        $codigo = SecurityCode::factory()->for($user)->twoFactor()->create();

        conToken(tokenTemporal($user))->postJson(route('auth.2fa'), ['otp' => $codigo->code])->assertOk();

        $evento = Actividad::where('user_id', $user->id)->sole();
        expect($evento->tipo)->toBe(TipoActividad::Login)
            ->and($evento->actor_id)->toBeNull()
            ->and($evento->meta)->toBeNull()
            ->and($evento->created_at->toDateTimeString())->toBe(now()->toDateTimeString())
            ->and($evento->titulo())->toBe('Inició sesión')
            ->and($user->fresh()->last_login_at->toDateTimeString())->toBe(now()->toDateTimeString());
    });

    test('la contraseña sola (token temporal) no escribe nada', function () {
        $user = User::factory()->create();

        $this->postJson(route('auth.login'), ['login' => $user->email, 'password' => 'password'])->assertOk();

        expect(Actividad::count())->toBe(0)
            ->and($user->fresh()->last_login_at)->toBeNull();
    });

    test('un código incorrecto no escribe nada', function () {
        $user = User::factory()->create();
        SecurityCode::factory()->for($user)->twoFactor()->create();

        conToken(tokenTemporal($user))->postJson(route('auth.2fa'), ['otp' => 'XXXXXX'])->assertStatus(422);

        expect(Actividad::count())->toBe(0)
            ->and($user->fresh()->last_login_at)->toBeNull();
    });
});

describe('Bitacora::registrar', function () {
    test('guarda sujeto, actor, tipo y meta (sin escapar los acentos)', function () {
        $admin = User::factory()->create();
        $user = User::factory()->create();

        $evento = app(Bitacora::class)->registrar($user, TipoActividad::RolCambiado, $admin, ['rol' => 'representante', 'cambio' => 'agregado']);

        expect($evento->fresh())
            ->user_id->toBe($user->id)
            ->actor_id->toBe($admin->id)
            ->tipo->toBe(TipoActividad::RolCambiado)
            ->meta->toBe(['rol' => 'representante', 'cambio' => 'agregado'])
            ->and($evento->titulo())->toBe('Rol Representante asignado')
            ->and($user->actividades()->count())->toBe(1);

        app(Bitacora::class)->registrar($user, TipoActividad::EstudianteVinculado, $admin, ['nombre' => 'José Núñez']);
        expect(Actividad::query()->toBase()->latest('id')->value('meta'))->toContain('José Núñez');
    });

    test('sin meta guarda null', function () {
        $user = User::factory()->create();

        expect(app(Bitacora::class)->registrar($user, TipoActividad::Suspension)->fresh()->meta)->toBeNull();
    });

    test('sujeto y actor se ven aunque estén de baja', function () {
        $admin = User::factory()->create();
        $user = User::factory()->create();
        $evento = app(Bitacora::class)->registrar($user, TipoActividad::Baja, $admin);

        $user->delete();
        $admin->delete();

        $evento = $evento->fresh();
        expect($evento->user->id)->toBe($user->id)
            ->and($evento->actor->id)->toBe($admin->id);
    });

    test('el borrado físico del actor deja el evento sin actor', function () {
        $admin = User::factory()->create();
        $user = User::factory()->create();
        $evento = app(Bitacora::class)->registrar($user, TipoActividad::Suspension, $admin);

        $admin->forceDelete();

        expect($evento->fresh()->actor_id)->toBeNull();
    });
});
