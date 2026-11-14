<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

/**
 * Re-hash al iniciar sesión: si el coste del hash guardado es menor que el
 * configurado, el login correcto lo actualiza sin tocar la contraseña ni los
 * timestamps.
 */

/** Usuario con hash de coste 4 (el de testing). */
function usuarioCosteBajo(array $attributes = []): User
{
    return User::factory()->create([
        'username' => 'V-12345678',
        'password' => Hash::make('password', ['rounds' => 4]),
        ...$attributes,
    ]);
}

/** Sube el coste configurado y descarta la instancia resuelta del hasher. */
function subirCosteConfigurado(int $rounds): void
{
    config(['hashing.bcrypt.rounds' => $rounds]);
    app()->forgetInstance('hash');
    Hash::clearResolvedInstance('hash');
}

test('un hash con coste inferior al configurado se actualiza al iniciar sesión', function () {
    $fechaCambio = now()->subMonth()->startOfSecond();
    $user = usuarioCosteBajo(['password_changed_at' => $fechaCambio]);
    $hashAntes = $user->password;
    $updatedAntes = $user->fresh()->updated_at;

    subirCosteConfigurado(5);
    $this->travel(1)->hours();

    $this->postJson(route('auth.login'), ['login' => 'V-12345678', 'password' => 'password'])
        ->assertOk();

    $user->refresh();

    expect($user->password)->not->toBe($hashAntes)
        ->and(password_get_info($user->password)['options']['cost'])->toBe(5)
        ->and(Hash::check('password', $user->password))->toBeTrue()
        ->and(Hash::needsRehash($user->password))->toBeFalse()
        ->and($user->password_changed_at->toDateTimeString())->toBe($fechaCambio->toDateTimeString())
        ->and($user->updated_at->toDateTimeString())->toBe($updatedAntes->toDateTimeString());
});

test('con contraseña incorrecta no se modifica el hash', function () {
    $user = usuarioCosteBajo();
    $hashAntes = $user->password;

    subirCosteConfigurado(5);

    $this->postJson(route('auth.login'), ['login' => 'V-12345678', 'password' => 'incorrecta'])
        ->assertStatus(400);

    expect($user->fresh()->password)->toBe($hashAntes);
});

test('un hash ya al día no se reescribe', function () {
    $user = usuarioCosteBajo();
    $hashAntes = $user->password;

    $this->postJson(route('auth.login'), ['login' => 'V-12345678', 'password' => 'password'])
        ->assertOk();

    expect($user->fresh()->password)->toBe($hashAntes);
});
