<?php

namespace App\Services\Usuarios\Concerns;

use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * Piezas comunes de los Services que escriben sobre una cuenta: releer la fila
 * bloqueada y las reglas de dominio que valen también para el owner (422
 * `{status, msg}`, nunca 403: el owner se salta las Policies).
 */
trait ReglasDeCuenta
{
    /** La fila de `$id`, también si está dada de baja, bloqueada hasta el commit. */
    private function bloquear(int $id): User
    {
        return User::withTrashed()->whereKey($id)->lockForUpdate()->firstOrFail();
    }

    private function exigirNoPropia(User $user, User $actor, string $msg): void
    {
        if ($user->is($actor)) {
            $this->fallar($msg);
        }
    }

    private function exigirNoDeBaja(User $user): void
    {
        if ($user->trashed()) {
            $this->fallar('usuarios.de_baja');
        }
    }

    /** `{status, msg}` sin `errors`: no es un error de campo. Deshace la transacción. */
    private function fallar(string $msg, int $status = 422, bool $traducir = true): never
    {
        throw new HttpResponseException(response()->json([
            'status' => $status,
            'msg' => $traducir ? __($msg) : $msg,
        ], $status));
    }
}
