<?php

use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Laravel\Sanctum\Http\Middleware\AuthenticateSession;
use Laravel\Sanctum\Sanctum;

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests from the following domains / hosts will receive stateful API
    | authentication cookies. Typically, these should include your local
    | and production domains which access your API via a frontend SPA.
    |
    */

    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
        Sanctum::currentApplicationUrlWithPort(),
        // Sanctum::currentRequestHost(),
    ))),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | This array contains the authentication guards that will be checked when
    | Sanctum is trying to authenticate a request. If none of these guards
    | are able to authenticate the request, Sanctum will use the bearer
    | token that's present on an incoming request for authentication.
    |
    */

    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | This value controls the number of minutes until an issued token will be
    | considered expired. This will override any values set in the token's
    | "expires_at" attribute, but first-party sessions are not affected.
    |
    | Tope absoluto de cualquier token (30 días): Sanctum rechaza los que
    | tengan más de estos minutos desde su `created_at`, aunque se usen a
    | diario. Pasado el tope hay que volver a iniciar sesión.
    |
    */

    'expiration' => (int) env('SANCTUM_EXPIRATION', 60 * 24 * 30), // 30 días en minutos

    /*
    |--------------------------------------------------------------------------
    | Caducidad por inactividad (propio de Gedure, no de Sanctum)
    |--------------------------------------------------------------------------
    |
    | Un token deja de valer si lleva más de estos minutos sin usarse (desde su
    | `last_used_at`, o desde `created_at` si nunca se usó). Cada petición
    | autenticada mueve `last_used_at`, así que la sesión sigue viva mientras
    | se use, hasta el tope de `expiration`.
    |
    | - idle_remember: tokens con "recordar sesión" (ability `remember_me`), 7 días.
    | - idle_session: tokens sin "recordar sesión", 1 día.
    |
    | Se aplica en AppServiceProvider (Sanctum::authenticateAccessTokensUsing).
    | El token temporal del 2FA conserva además su `expires_at` de 15 minutos.
    |
    */

    'idle_remember' => (int) env('SANCTUM_IDLE_REMEMBER', 60 * 24 * 7),

    'idle_session' => (int) env('SANCTUM_IDLE_SESSION', 60 * 24),

    /*
    |--------------------------------------------------------------------------
    | Token Prefix
    |--------------------------------------------------------------------------
    |
    | Sanctum can prefix new tokens in order to take advantage of numerous
    | security scanning initiatives maintained by open source platforms
    | that notify developers if they commit tokens into repositories.
    |
    | See: https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning
    |
    */

    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', 'gedure_'),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | When authenticating your first-party SPA with Sanctum you may need to
    | customize some of the middleware Sanctum uses while processing the
    | request. You may change the middleware listed below as required.
    |
    */

    'middleware' => [
        'authenticate_session' => AuthenticateSession::class,
        'encrypt_cookies' => EncryptCookies::class,
        'validate_csrf_token' => ValidateCsrfToken::class,
    ],

];
