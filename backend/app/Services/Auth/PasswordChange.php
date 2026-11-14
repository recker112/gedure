<?php

namespace App\Services\Auth;

use App\Mail\Account\PasswordChangedMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

/**
 * Efectos de un cambio de contraseña por restablecimiento con código
 * (`SecurityCodeController::passwordUpdate`). Pensado para reutilizarse cuando
 * exista el cambio desde la cuenta (`$keepTokenId`: conservar la sesión actual).
 *
 * Se llama dentro de la transacción de la acción: la revocación se deshace con
 * ella y el correo sale tras el commit.
 */
class PasswordChange
{
    /**
     * - Guarda la contraseña nueva y `password_changed_at`.
     * - Revoca sus tokens: todos si se restableció con el código
     *   (`$keepTokenId` null); si no, todos menos ese.
     * - `PasswordChangedMail` a su correo, tras el commit.
     */
    public function changed(User $user, string $password, ?int $keepTokenId = null): void
    {
        $reset = $keepTokenId === null;

        $user->forceFill(['password' => $password, 'password_changed_at' => now()])->save();

        $user->tokens()
            ->when(! $reset, fn ($tokens) => $tokens->whereKeyNot($keepTokenId))
            ->delete();

        Mail::to($user->email)->queue(PasswordChangedMail::for($user, $reset)->afterCommit());
    }
}
