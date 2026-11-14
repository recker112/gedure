<?php

use App\Mail\Auth\TfaCodeMail;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Mail;

test('el seeder crea el usuario de prueba documentado y es idempotente', function () {
    Mail::fake();

    $this->seed(DatabaseSeeder::class);
    $this->seed(DatabaseSeeder::class);

    $user = User::sole();
    expect($user->username)->toBe('12345678')
        ->and($user->email)->toBe('admin@lacandelaria.test');

    foreach (['12345678', 'admin@lacandelaria.test'] as $login) {
        $this->postJson(route('auth.login'), ['login' => $login, 'password' => 'password'])->assertOk();
    }
    Mail::assertQueued(TfaCodeMail::class, 2);
});
