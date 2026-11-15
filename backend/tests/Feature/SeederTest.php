<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Mail\Auth\TfaCodeMail;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Permission as PermissionModel;

test('el seeder crea un usuario por rol, documentado, y es idempotente', function () {
    Mail::fake();

    $this->seed(DatabaseSeeder::class);
    $this->seed(DatabaseSeeder::class);

    expect(User::count())->toBe(4)
        ->and(PermissionModel::count())->toBe(count(Permission::cases()));

    $esperados = [
        ['12345678', 'owner@example.com', Role::Owner],
        ['11111111', 'admin@example.com', Role::Admin],
        ['22222222', 'profesor@example.com', Role::Profesor],
        ['33333333', 'representante@example.com', Role::Representante],
    ];

    foreach ($esperados as [$username, $email, $rol]) {
        $user = User::where('username', $username)->sole();
        expect($user->email)->toBe($email)
            ->and($user->getRoleNames()->all())->toBe([$rol->value]);

        foreach ([$username, $email] as $login) {
            $this->postJson(route('auth.login'), ['login' => $login, 'password' => 'password'])->assertOk();
        }
    }

    expect(User::where('username', '12345678')->sole()->getAllPermissions())->toBeEmpty();
    Mail::assertQueued(TfaCodeMail::class, 8);
});
