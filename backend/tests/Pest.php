<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| Los tests de Feature se enlazan a Tests\TestCase para tener la aplicación
| de Laravel arrancada (HTTP, base de datos, facades). Los de Unit corren
| sobre el TestCase de PHPUnit, sin el framework.
|
*/

pest()->extend(TestCase::class)
    ->use(RefreshDatabase::class)
    ->in('Feature');

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
|
| Tokens reales (Bearer) en lugar de Sanctum::actingAs, para recorrer el mismo
| camino que el frontend: middleware `abilities`, `auth.full` y caducidad.
|
*/

/** Token temporal que emite el login, pendiente del 2FA. */
function tokenTemporal(User $user, array $extra = []): string
{
    return $user->createToken('login', ['2fa_required', ...$extra], now()->addMinutes(15))->plainTextToken;
}

/** Token definitivo, el que se obtiene tras superar el 2FA. */
function tokenDefinitivo(User $user, array $abilities = []): string
{
    return $user->createToken('2fa', $abilities)->plainTextToken;
}

/**
 * Prepara la siguiente petición con el token dado. El guard de Sanctum guarda el
 * usuario resuelto durante todo el test, así que hay que olvidarlo para que cada
 * petición vuelva a autenticar su token.
 */
function conToken(string $token)
{
    app('auth')->forgetGuards();

    return test()->withToken($token);
}

/**
 * Petición a una ruta privada (`auth.full`) de prueba, sin efectos secundarios:
 * POST /api/v1/__test/privada responde 200 `{status, msg}` si el token abre las
 * rutas privadas. Aún no hay rutas privadas reales en la API.
 */
function rutaPrivadaDePrueba(?string $token = null)
{
    Route::middleware(['api', 'auth.full'])
        ->post('/api/v1/__test/privada', fn () => response()->json(['status' => 200, 'msg' => 'ok']));

    $peticion = $token === null ? test() : conToken($token);

    return $peticion->postJson('/api/v1/__test/privada');
}

/** Un código de 6 caracteres distinto del dado. */
function otroCodigo(string $codigo): string
{
    return $codigo === 'ZZZZZZ' ? 'YYYYYY' : 'ZZZZZZ';
}
