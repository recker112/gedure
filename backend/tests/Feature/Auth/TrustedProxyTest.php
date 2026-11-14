<?php

use App\Mail\Auth\SecurityCodeMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/**
 * IP del cliente detrás de Nginx Proxy Manager → Caddy (`trustProxies` en
 * bootstrap/app.php). Solo se confía en los rangos privados, así que `ip()` es
 * la primera IP pública de X-Forwarded-For empezando por la derecha: la que
 * añade Nginx Proxy Manager y el cliente no puede falsear. De eso depende que el
 * rate limiting por IP sea por cliente.
 *
 * Caddy (FrankenPHP) añade la IP de NPM a X-Forwarded-For y PHP ve como
 * REMOTE_ADDR la de Caddy (localhost, mismo proceso) o la de la red Docker.
 */
const IP_PROXY = '172.18.0.5';

/** Petición que llega desde el proxy (red Docker 172.16.0.0/12) con la cabecera X-Forwarded-For dada. */
function desdeProxy(string $xff)
{
    return test()->withServerVariables(['REMOTE_ADDR' => IP_PROXY])
        ->withHeader('X-Forwarded-For', $xff);
}

test('ip() es la IP que añade el proxy; confiando en cualquier proxy sería la falsificada', function () {
    $server = ['REMOTE_ADDR' => IP_PROXY, 'HTTP_X_FORWARDED_FOR' => '6.6.6.6, 203.0.113.10, 172.20.0.3'];
    $cabeceras = Request::HEADER_X_FORWARDED_FOR;
    $previos = [Request::getTrustedProxies(), Request::getTrustedHeaderSet()];

    try {
        // Lo que haría trustProxies(at: '*')
        Request::setTrustedProxies(['0.0.0.0/0', '::/0'], $cabeceras);
        expect(Request::create('/', 'GET', [], [], [], $server)->ip())->toBe('6.6.6.6');

        // La configuración actual (rangos privados): salta NPM (172.20.0.3)
        Request::setTrustedProxies(['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '127.0.0.0/8', 'fd00::/8', '::1'], $cabeceras);
        expect(Request::create('/', 'GET', [], [], [], $server)->ip())->toBe('203.0.113.10');

        // Sin X-Forwarded-For (petición directa desde la red de Docker): la propia REMOTE_ADDR
        expect(Request::create('/', 'GET', [], [], [], ['REMOTE_ADDR' => IP_PROXY])->ip())->toBe(IP_PROXY);
    } finally {
        Request::setTrustedProxies(...$previos);
    }
});

test('la aplicación resuelve la IP real del cliente a partir de X-Forwarded-For', function (string $xff, string $esperada) {
    // Bajo /api para no caer en la ruta catch-all de la SPA (routes/web.php)
    Route::get('/api/__test/ip', fn (Request $request) => ['ip' => $request->ip()]);

    desdeProxy($xff)->getJson('/api/__test/ip')->assertExactJson(['ip' => $esperada]);
})->with([
    'NPM añade la IP del cliente' => ['203.0.113.10', '203.0.113.10'],
    'cadena NPM → Caddy (ambos privados)' => ['203.0.113.10, 172.20.0.3', '203.0.113.10'],
    'el cliente inventa una IP a la izquierda' => ['6.6.6.6, 203.0.113.10, 172.20.0.3', '203.0.113.10'],
]);

test('dos clientes detrás del mismo proxy tienen contadores separados', function () {
    for ($i = 0; $i < 10; $i++) {
        desdeProxy('203.0.113.10')
            ->postJson(route('auth.login'), ['login' => "a$i", 'password' => 'incorrecta'])
            ->assertStatus(400);
    }

    desdeProxy('203.0.113.10')
        ->postJson(route('auth.login'), ['login' => 'a', 'password' => 'incorrecta'])
        ->assertTooManyRequests();

    desdeProxy('198.51.100.7')
        ->postJson(route('auth.login'), ['login' => 'b', 'password' => 'incorrecta'])
        ->assertStatus(400);
});

test('un X-Forwarded-For falsificado no evade el límite ni bloquea a otro cliente', function () {
    for ($i = 0; $i < 10; $i++) {
        $falsa = $i % 2 ? "1.2.3.$i" : "10.66.0.$i";
        desdeProxy("$falsa, 203.0.113.10")
            ->postJson(route('auth.login'), ['login' => "a$i", 'password' => 'incorrecta'])
            ->assertStatus(400);
    }

    desdeProxy('198.51.100.7, 203.0.113.10')
        ->postJson(route('auth.login'), ['login' => 'a', 'password' => 'incorrecta'])
        ->assertTooManyRequests();

    desdeProxy('198.51.100.7')
        ->postJson(route('auth.login'), ['login' => 'b', 'password' => 'incorrecta'])
        ->assertStatus(400);
});

test('un atacante que agota el envío de códigos no bloquea el restablecimiento de la víctima', function () {
    Mail::fake();
    $victima = User::factory()->create();

    for ($i = 0; $i < 3; $i++) {
        desdeProxy('203.0.113.66')->postJson(route('security.email.send'), ['login' => $victima->username])->assertOk();
    }
    desdeProxy('203.0.113.66')->postJson(route('security.email.send'), ['login' => $victima->username])->assertTooManyRequests();

    $this->travel(26)->seconds();
    desdeProxy('198.51.100.7')->postJson(route('security.email.send'), ['login' => $victima->email])->assertOk();

    Mail::assertQueued(SecurityCodeMail::class, 2);
    $codigo = Mail::queued(SecurityCodeMail::class)->last()->code;

    desdeProxy('198.51.100.7')->postJson(route('security.password.update'), [
        'login' => $victima->email,
        'otp' => $codigo,
        'new_password' => 'newpassword',
        'new_password_confirmation' => 'newpassword',
    ])->assertOk();
});
