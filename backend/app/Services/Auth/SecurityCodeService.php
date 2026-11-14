<?php

namespace App\Services\Auth;

use App\Enums\Auth\SecurityCodeResult;
use App\Mail\Auth\SecurityCodeMail;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Support\Facades\Mail;

class SecurityCodeService
{
    /**
     * Código aleatorio de `$length` caracteres. No tiene que ser único en la
     * tabla: verifyCode lo compara con el último código del usuario y tipo.
     */
    public static function generateToken(int $length = 6): string
    {
        $chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // excluye I, L, O, 0, 1
        $max = strlen($chars) - 1;

        $token = '';
        for ($i = 0; $i < $length; $i++) {
            $token .= $chars[random_int(0, $max)];
        }

        return $token;
    }

    /**
     * Genera un código nuevo (con el contador de intentos a cero) y descarta los
     * pendientes del mismo tipo: solo vale el último que se ha enviado, así que
     * pedir otro código es la única forma de recuperar los intentos.
     */
    public function createCode(User $user, string $type, int $length = 6, int $ttlMinutes = SecurityCode::TTL_MINUTES): SecurityCode
    {
        $user->securityCodes()
            ->where('type', $type)
            ->whereNull('used_at')
            ->delete();

        return $user->securityCodes()->create([
            // Solo se guarda su HMAC (token_hash); el claro queda en `code` de esta instancia
            'code' => static::generateToken($length),
            'type' => $type,
            'attempts' => 0,
            'expire_at' => now()->addMinutes($ttlMinutes),
        ]);
    }

    public function sendEmail(User $user, SecurityCode $securityCode): void
    {
        $code = $securityCode->code;
        // CEIL: "en 15 minutos" y no "en 14" por los milisegundos transcurridos
        $expireAt = $securityCode->expire_at->diffForHumans(['options' => CarbonInterface::CEIL]);

        Mail::to($user->email)->queue(new SecurityCodeMail($code, $expireAt));
    }

    /**
     * Comprueba el código contra el vigente del usuario para ese tipo y, si es
     * correcto, lo consume (queda marcado como usado).
     *
     * No se busca por `token_hash`: un valor incorrecto no identificaría qué código
     * penalizar. Se toma el último código pendiente del usuario y se compara su
     * `token_hash` con el HMAC del valor recibido (SecurityCode::hash) con
     * `hash_equals`. Cada fallo suma un intento con un UPDATE atómico; al llegar a
     * SecurityCode::MAX_ATTEMPTS el código deja de aceptarse aunque luego llegue
     * el valor correcto. El consumo también es un UPDATE condicional, así que dos
     * peticiones simultáneas con el código correcto no pueden usarlo las dos.
     */
    public function verifyCode(User $user, string $code, string $type): SecurityCodeResult
    {
        $securityCode = $user->securityCodes()
            ->where('type', $type)
            ->pending()
            ->latest('id')
            ->first();

        if ($securityCode === null) {
            return SecurityCodeResult::Invalid;
        }

        if ($securityCode->isExhausted()) {
            return SecurityCodeResult::Exhausted;
        }

        // Los códigos solo llevan mayúsculas: hash() normaliza, así que se acepta el valor escrito en minúsculas
        if (! hash_equals($securityCode->token_hash, SecurityCode::hash($code))) {
            $securityCode->increment('attempts');

            // Se relee de la BD: con peticiones simultáneas el valor en memoria se queda corto
            $attempts = (int) SecurityCode::query()->whereKey($securityCode->id)->value('attempts');

            return $attempts >= SecurityCode::MAX_ATTEMPTS
                ? SecurityCodeResult::Exhausted
                : SecurityCodeResult::Invalid;
        }

        $consumed = SecurityCode::query()
            ->whereKey($securityCode->id)
            ->whereNull('used_at')
            ->where('attempts', '<', SecurityCode::MAX_ATTEMPTS)
            ->update(['used_at' => now()]);

        // Otra petición lo ha consumido o agotado entre la lectura y el UPDATE
        return $consumed === 1 ? SecurityCodeResult::Valid : SecurityCodeResult::Invalid;
    }
}
