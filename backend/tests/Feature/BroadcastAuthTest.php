<?php

use App\Models\User;
use Illuminate\Broadcasting\BroadcastManager;

/**
 * Autorización de canales (POST /api/broadcasting/auth con Bearer, ver
 * bootstrap/app.php). Va detrás de `auth.full`: solo el token definitivo puede
 * suscribirse, y solo a su propio canal privado `private-App.Models.User.{id}`.
 *
 * phpunit.xml fuerza BROADCAST_CONNECTION=null, y el NullBroadcaster no
 * comprueba nada. Aquí se usa el driver de Reverb con credenciales falsas, que
 * basta para firmar la respuesta sin hablar con ningún servidor.
 */
beforeEach(function () {
    config([
        'broadcasting.default' => 'reverb',
        'broadcasting.connections.reverb.key' => 'test-key',
        'broadcasting.connections.reverb.secret' => 'test-secret',
        'broadcasting.connections.reverb.app_id' => 'test-app',
        'broadcasting.connections.reverb.options.host' => 'localhost',
    ]);

    app(BroadcastManager::class)->forgetDrivers();
    require base_path('routes/channels.php');
});

function autorizarCanal(string $canal)
{
    return test()->postJson('/api/broadcasting/auth', [
        'socket_id' => '1234.5678',
        'channel_name' => $canal,
    ]);
}

test('el token definitivo autoriza su propio canal privado con una firma válida', function () {
    $user = User::factory()->create();

    conToken(tokenDefinitivo($user));

    $canal = "private-App.Models.User.{$user->id}";
    $respuesta = autorizarCanal($canal)->assertOk();

    $firma = hash_hmac('sha256', "1234.5678:{$canal}", 'test-secret');
    expect($respuesta->json('auth'))->toBe("test-key:{$firma}");
});

test('el token definitivo no autoriza el canal de otro usuario', function () {
    $user = User::factory()->create();
    $otro = User::factory()->create();

    conToken(tokenDefinitivo($user));

    autorizarCanal("private-App.Models.User.{$otro->id}")
        ->assertForbidden()
        ->assertExactJson(['status' => 403, 'msg' => 'No tienes permiso para realizar esta acción']);
});

test('el token temporal del 2FA no autoriza canales', function () {
    $user = User::factory()->create();

    conToken(tokenTemporal($user));

    autorizarCanal("private-App.Models.User.{$user->id}")
        ->assertForbidden()
        ->assertExactJson(['status' => 403, 'msg' => 'Completa la verificación en dos pasos para continuar']);
});

test('sin token la autorización responde 401', function () {
    $user = User::factory()->create();

    autorizarCanal("private-App.Models.User.{$user->id}")->assertUnauthorized();
});

test('un token cerrado con logout ya no autoriza el canal', function () {
    $user = User::factory()->create();
    $token = tokenDefinitivo($user);

    conToken($token)->postJson(route('auth.logout'))->assertOk();

    conToken($token);
    autorizarCanal("private-App.Models.User.{$user->id}")->assertUnauthorized();
});
