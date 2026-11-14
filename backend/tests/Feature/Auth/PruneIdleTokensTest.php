<?php

use App\Models\Auth\PersonalAccessToken;
use App\Models\User;
use Illuminate\Console\Scheduling\Schedule;

/**
 * Purga programada (`auth:prune-idle-tokens`, routes/console.php): borra los
 * tokens inactivos, los que superan el tope absoluto y los temporales caducados.
 */
beforeEach(function () {
    $this->freezeSecond();
});

test('borra solo los tokens inactivos más allá de su ventana', function () {
    $user = User::factory()->create();
    $sesion = tokenDefinitivo($user);
    $recordar = tokenDefinitivo($user, ['remember_me']);

    $this->travel(2)->days();
    $reciente = tokenDefinitivo($user);

    $this->artisan('auth:prune-idle-tokens')
        ->expectsOutput('Tokens caducados o inactivos borrados: 1')
        ->assertSuccessful();

    expect(PersonalAccessToken::findToken($sesion))->toBeNull()
        ->and(PersonalAccessToken::findToken($recordar))->not->toBeNull()
        ->and(PersonalAccessToken::findToken($reciente))->not->toBeNull();
});

test('borra el token temporal del 2FA caducado', function () {
    $user = User::factory()->create();
    $temporal = tokenTemporal($user);
    $definitivo = tokenDefinitivo($user);

    $this->travel(1)->hours();
    $this->artisan('auth:prune-idle-tokens')->assertSuccessful();

    expect(PersonalAccessToken::findToken($temporal))->toBeNull()
        ->and(PersonalAccessToken::findToken($definitivo))->not->toBeNull();
});

test('borra los que superan el tope absoluto aunque se usen', function () {
    $user = User::factory()->create();
    $viejo = tokenDefinitivo($user, ['remember_me']);

    foreach (range(1, 6) as $_) {
        $this->travel(5)->days();
        PersonalAccessToken::findToken($viejo)->forceFill(['last_used_at' => now()])->save();
    }
    $nuevo = tokenDefinitivo($user);

    $this->artisan('auth:prune-idle-tokens')->assertSuccessful();

    expect(PersonalAccessToken::findToken($viejo))->toBeNull()
        ->and(PersonalAccessToken::findToken($nuevo))->not->toBeNull();
});

test('no borra nada si todos siguen activos', function () {
    $user = User::factory()->create();
    tokenDefinitivo($user);
    tokenDefinitivo($user, ['remember_me']);

    $this->travel(2)->hours();
    $this->artisan('auth:prune-idle-tokens')->assertSuccessful();

    expect(PersonalAccessToken::count())->toBe(2);
});

test('la purga de tokens y de códigos está programada a diario', function () {
    $eventos = collect(app(Schedule::class)->events())
        ->mapWithKeys(fn ($e) => [$e->command => $e->expression]);

    expect($eventos->filter(fn ($expr, $cmd) => str_contains($cmd, 'auth:prune-idle-tokens'))->values()->all())->toBe(['0 0 * * *'])
        ->and($eventos->filter(fn ($expr, $cmd) => str_contains($cmd, 'model:prune'))->values()->all())->toBe(['0 0 * * *']);
});
