<?php

namespace App\Http\Controllers\Auth;

use App\Enums\Auth\SecurityCodeResult;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Login2FARequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Auth\PersonalAccessToken;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use App\Services\Auth\AuthService;
use App\Services\Auth\SecurityCodeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Espera mínima entre dos códigos del 2FA de la misma cuenta (el del login
     * cuenta). El cliente debe esperar algo más (30 s) antes de ofrecer el reenvío.
     */
    public const RESEND_COOLDOWN_SECONDS = 25;

    /** Minutos de validez del token temporal del 2FA. */
    public const TEMPORARY_TOKEN_MINUTES = 15;

    public function login(LoginRequest $request, AuthService $authService, SecurityCodeService $securityCodeService): JsonResponse
    {
        // API sin estado: se validan las credenciales sin abrir sesión. Usuario
        // inexistente y contraseña incorrecta dan la misma respuesta (y tardan
        // lo mismo): no se revela si el usuario o el correo existen.
        $user = $authService->checkCredentials((string) $request->input('login'), (string) $request->input('password'));

        if ($user === null) {
            return response()->json([
                'status' => 400,
                'msg' => 'Usuario o contraseña incorrectos',
            ], 400);
        }

        $securityCode = $securityCodeService->createCode($user, SecurityCode::TYPE_TWO_FACTOR);
        $authService->sendEmail2FA($user, $securityCode);
        $this->startResendCooldown($user);

        $abilities = ['2fa_required'];
        if ($request->boolean('remember')) {
            $abilities[] = 'remember_me';
        }

        $token = $user->createToken('login', $abilities, now()->addMinutes(self::TEMPORARY_TOKEN_MINUTES));

        return $authService->sendLoginResponse($user, $token->plainTextToken, $token->accessToken->abilities);
    }

    public function resendEmail(Request $request, SecurityCodeService $securityCodeService, AuthService $authService): JsonResponse
    {
        // El usuario sale del token temporal del login
        $user = $request->user();

        // Un código por cuenta cada RESEND_COOLDOWN_SECONDS (atómico con Cache::add)
        if (! $this->startResendCooldown($user, onlyIfFree: true)) {
            $retryAfter = max(1, (int) Cache::get($this->resendCooldownKey($user)) - now()->getTimestamp());

            return response()->json([
                'status' => 429,
                'msg' => 'Espera unos segundos antes de pedir otro código',
                'retry_after' => $retryAfter,
            ], 429, ['Retry-After' => $retryAfter]);
        }

        $securityCode = $securityCodeService->createCode($user, SecurityCode::TYPE_TWO_FACTOR);
        $authService->sendEmail2FA($user, $securityCode);

        return response()->json([
            'status' => 200,
            'msg' => 'Código de seguridad reenviado',
        ]);
    }

    public function loginWith2FA(Login2FARequest $request, AuthService $authService, SecurityCodeService $securityCodeService): JsonResponse
    {
        $user = $request->user();
        $apiKey = $user->currentAccessToken();

        // Si es correcto, verifyCode lo consume; cada fallo cuenta como intento
        $result = $securityCodeService->verifyCode($user, $request->otp, SecurityCode::TYPE_TWO_FACTOR);

        if ($result !== SecurityCodeResult::Valid) {
            $msg = $result === SecurityCodeResult::Exhausted
                ? 'Has superado el número de intentos. Solicita un código nuevo'
                : 'Código de autenticación inválido o expirado';

            return response()->json([
                'status' => 422,
                'msg' => $msg,
                'errors' => ['otp' => [$msg]],
            ], 422);
        }

        $abilities = $authService->getTokenAbilities($apiKey, tfa: false);

        // Token definitivo y baja del temporal van juntos. Se bloquea la fila del
        // usuario (lo mismo hace el restablecimiento de contraseña): si un
        // restablecimiento revocó los tokens entre la autenticación y este punto,
        // el temporal ya no existe y no se emite el definitivo.
        $token = DB::transaction(function () use ($user, $apiKey, $abilities) {
            User::query()->whereKey($user->getKey())->lockForUpdate()->first();

            if (! PersonalAccessToken::query()->whereKey($apiKey->getKey())->exists()) {
                return null;
            }

            // Sin expires_at: lo limitan el tope absoluto (sanctum.expiration) y la
            // caducidad por inactividad (sanctum.idle_*, ver AppServiceProvider)
            $token = $user->createToken('2fa', $abilities);

            // El token temporal del login (2fa_required) deja de servir
            $apiKey->delete();

            return $token;
        });

        if ($token === null) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        return $authService->sendLoginResponse($user, $token->plainTextToken, $token->accessToken->abilities);
    }

    public function relogin(Request $request, AuthService $authService): JsonResponse
    {
        $user = $request->user();

        return $authService->sendLoginResponse($user, null, $authService->getTokenAbilities($user->currentAccessToken()));
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 200,
            'msg' => 'Sesión cerrada',
        ], 200);
    }

    private function resendCooldownKey(User $user): string
    {
        return "tfa-resend-cooldown:{$user->getKey()}";
    }

    /**
     * Inicia la espera de reenvío. Con `onlyIfFree` solo si no hay una en curso
     * (devuelve false si la había). Guarda el instante en que termina.
     */
    private function startResendCooldown(User $user, bool $onlyIfFree = false): bool
    {
        $key = $this->resendCooldownKey($user);
        $until = now()->addSeconds(self::RESEND_COOLDOWN_SECONDS)->getTimestamp();

        if ($onlyIfFree) {
            return Cache::add($key, $until, self::RESEND_COOLDOWN_SECONDS);
        }

        Cache::put($key, $until, self::RESEND_COOLDOWN_SECONDS);

        return true;
    }
}
