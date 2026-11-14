<?php

namespace App\Http\Controllers\Auth;

use App\Enums\Auth\SecurityCodeResult;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SendCodeRequest;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use App\Services\Auth\AuthService;
use App\Services\Auth\PasswordChange;
use App\Services\Auth\SecurityCodeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SecurityCodeController extends Controller
{
    /**
     * Espera mínima entre dos códigos de restablecimiento de la misma cuenta.
     * El cliente debe esperar algo más (30 s) antes de ofrecer el reenvío.
     */
    public const RESET_COOLDOWN_SECONDS = 25;

    public const SEND_MESSAGE = 'Si los datos corresponden a una cuenta, recibirás un código de seguridad en su correo';

    /**
     * Envía un código para restablecer la contraseña. Responde lo mismo exista
     * o no la cuenta y se envíe o no el código, para no permitir averiguar qué
     * usuarios o correos están registrados.
     *
     * Por cuenta solo sale un código cada `RESET_COOLDOWN_SECONDS`: dentro de la
     * espera no se crea ni se envía nada (así un tercero no invalida en bucle el
     * código que la persona está escribiendo ni le llena el buzón). `Cache::add`
     * es atómico. No hay tope diario por cuenta: dejaría a un atacante bloquear
     * el restablecimiento de la víctima.
     */
    public function emailSend(SendCodeRequest $request, AuthService $authService, SecurityCodeService $securityCodeService): JsonResponse
    {
        $user = $authService->findByLogin((string) $request->input('login'));

        if ($user && Cache::add("reset-cooldown:{$user->id}", 1, self::RESET_COOLDOWN_SECONDS)) {
            $securityCode = $securityCodeService->createCode($user, SecurityCode::TYPE_PASSWORD_RESET);

            $securityCodeService->sendEmail($user, $securityCode);
        }

        return response()->json([
            'status' => 200,
            'msg' => self::SEND_MESSAGE,
        ]);
    }

    /**
     * Cambia la contraseña con el código. Una cuenta inexistente recibe la
     * misma respuesta que un código inválido.
     */
    public function passwordUpdate(UpdatePasswordRequest $request, AuthService $authService, SecurityCodeService $securityCodeService, PasswordChange $passwordChange): JsonResponse
    {
        $user = $authService->findByLogin((string) $request->input('login'));

        // Si es correcto, verifyCode lo consume; cada fallo cuenta como intento
        $result = $user
            ? $securityCodeService->verifyCode($user, $request->otp, SecurityCode::TYPE_PASSWORD_RESET)
            : SecurityCodeResult::Invalid;

        if ($result !== SecurityCodeResult::Valid) {
            $msg = $result === SecurityCodeResult::Exhausted
                ? 'Has superado el número de intentos. Solicita un código nuevo'
                : 'Código de seguridad inválido o expirado';

            return response()->json([
                'status' => 422,
                'msg' => $msg,
                'errors' => ['otp' => [$msg]],
            ], 422);
        }

        // Contraseña, cierre de todas las sesiones y aviso juntos. El bloqueo del
        // usuario lo comparte con el 2FA (AuthController::loginWith2FA).
        DB::transaction(function () use ($user, $request, $passwordChange) {
            $locked = User::query()->whereKey($user->getKey())->lockForUpdate()->firstOrFail();

            $passwordChange->changed($locked, $request->new_password);
        });

        return response()->json([
            'status' => 200,
            'msg' => 'Contraseña actualizada correctamente',
        ]);
    }
}
