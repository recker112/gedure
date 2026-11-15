<?php

namespace App\Services\Usuarios;

use App\Enums\Usuarios\TipoActividad;
use App\Mail\Usuarios\ActivacionCuentaMail;
use App\Models\User;
use App\Models\Usuarios\Activacion;
use App\Services\Usuarios\Concerns\ReglasDeCuenta;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

/**
 * Activación de cuentas creadas por administración (docs/fases/fase-1-usuarios.md
 * §2.2, §4.2, §4.4 y §6): la persona elige su contraseña con un enlace de un
 * solo uso que caduca a los `usuarios.activacion.dias` días. Nunca se envía una
 * contraseña.
 *
 * - El token en claro (`Str::random(64)`) solo existe aquí y en el correo; en BD
 *   va su `sha256`. Una fila por persona: reenviar rota el token (el enlace
 *   anterior deja de valer) y renueva la caducidad.
 * - Bloqueos en el mismo orden en todas las operaciones: primero la fila del
 *   usuario y luego la de su activación.
 * - Las páginas públicas responden 404 si el token no existe (no revela si
 *   existió) y 410 `{status, msg}` si ya no sirve.
 */
class ActivacionService
{
    use ReglasDeCuenta;

    public function __construct(private readonly Bitacora $bitacora) {}

    /**
     * `POST /usuarios/{id}/activacion`: (re)envía el enlace. 422 si la cuenta ya
     * está activada, dada de baja o suspendida.
     */
    public function reenviar(User $user, User $actor): User
    {
        return DB::transaction(function () use ($user, $actor) {
            $user = $this->bloquear($user->id);

            $this->exigirNoDeBaja($user);
            if ($user->isActivated()) {
                $this->fallar('usuarios.ya_activada');
            }
            if ($user->isSuspended()) {
                $this->fallar('usuarios.activacion_suspendida');
            }

            $this->emitir($user, $actor);

            return $user;
        });
    }

    /**
     * Crea o rota la activación de `$user` (ya bloqueada por quien llama, dentro
     * de su transacción), escribe `activacion_enviada` con el actor y encola
     * `ActivacionCuentaMail` tras el commit.
     */
    public function emitir(User $user, ?User $actor): void
    {
        $token = Str::random(Activacion::TOKEN_LENGTH);
        $dias = (int) config('usuarios.activacion.dias');

        // La fila del usuario ya está bloqueada: nadie más toca su activación
        Activacion::updateOrCreate(['user_id' => $user->id], [
            'token_hash' => Activacion::hash($token),
            'enviada_por' => $actor?->id,
            'sent_at' => now(),
            'expires_at' => now()->addDays($dias),
            'used_at' => null,
        ]);

        $this->bitacora->registrar($user, TipoActividad::ActivacionEnviada, $actor);

        Mail::to($user->email)->queue((new ActivacionCuentaMail(
            url: self::url($token),
            name: $user->name,
            username: $user->username,
            enviadaPor: $actor?->name,
            caduca: trans_choice('usuarios.activacion.caduca', $dias),
        ))->afterCommit());
    }

    /** Enlace de la SPA (`core/activar`, `/auth/activar/:token`). */
    public static function url(string $token): string
    {
        return rtrim((string) config('app.frontend_url'), '/').'/auth/activar/'.$token;
    }

    /**
     * Activación del token del enlace, si aún sirve. 404 si no existe; 410 si
     * ya se usó (o la cuenta ya se activó por otra vía), si la cuenta está de
     * baja o suspendida, o si caducó.
     */
    public function abrir(string $token): Activacion
    {
        $activacion = Activacion::with('user')->where('token_hash', Activacion::hash($token))->first()
            ?? $this->fallar('usuarios.activacion.no_encontrada', 404);

        $this->exigirUtilizable($activacion, $activacion->user);

        return $activacion;
    }

    /**
     * `POST /auth/activacion/{token}`: guarda la contraseña y activa la cuenta
     * (`activated_at`, `email_verified_at`: el enlace llegó a su correo, y
     * `password_changed_at`), marca la activación como usada y escribe
     * `cuenta_activada` (actor null: la propia persona). Vuelve a comprobar el
     * 410 con las filas bloqueadas: dos envíos a la vez no activan dos veces.
     * No abre sesión ni envía `PasswordChangedMail` (es su primera contraseña).
     */
    public function activar(Activacion $activacion, string $password): User
    {
        return DB::transaction(function () use ($activacion, $password) {
            $user = $this->bloquear($activacion->user_id);
            $activacion = Activacion::whereKey($activacion->id)->lockForUpdate()->firstOrFail();

            $this->exigirUtilizable($activacion, $user);

            $user->forceFill([
                'password' => $password,
                'password_changed_at' => now(),
                'activated_at' => now(),
                'email_verified_at' => $user->email_verified_at ?? now(),
            ])->save();
            $activacion->update(['used_at' => now()]);

            $this->bitacora->registrar($user, TipoActividad::CuentaActivada);

            return $user;
        });
    }

    /**
     * "¿Olvidaste tu contraseña?" de una cuenta **pendiente** (§6): el código
     * llegó a su correo, así que el correo es suyo y la cuenta queda activada
     * con la contraseña nueva. Se llama dentro de la transacción del
     * restablecimiento, con `$user` ya bloqueado. Revoca sus tokens (como un
     * restablecimiento), da por usada su activación y escribe
     * `cuenta_activada`. Sin `PasswordChangedMail`: es su primera contraseña.
     */
    public function activarConRestablecimiento(User $user, string $password): void
    {
        $user->forceFill([
            'password' => $password,
            'password_changed_at' => now(),
            'activated_at' => now(),
            'email_verified_at' => $user->email_verified_at ?? now(),
        ])->save();

        $user->tokens()->delete();

        Activacion::query()->where('user_id', $user->id)->whereNull('used_at')->update(['used_at' => now()]);

        $this->bitacora->registrar($user, TipoActividad::CuentaActivada);
    }

    /** Invalida el enlace vigente (cambio de correo de una cuenta pendiente). */
    public function invalidar(User $user): void
    {
        Activacion::query()->where('user_id', $user->id)->delete();
    }

    /**
     * 410 si la activación ya no sirve: usada (o la cuenta ya activada por el
     * restablecimiento), cuenta de baja o suspendida, o caducada; en ese orden.
     */
    private function exigirUtilizable(Activacion $activacion, ?User $user): void
    {
        if ($activacion->isUsed() || $user?->isActivated()) {
            $this->fallar('usuarios.activacion.usada', 410);
        }
        if ($user === null || $user->trashed() || $user->isSuspended()) {
            $this->fallar('usuarios.activacion.no_disponible', 410);
        }
        if ($activacion->isExpired()) {
            $this->fallar('usuarios.activacion.caducada', 410);
        }
    }
}
