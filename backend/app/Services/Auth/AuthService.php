<?php

namespace App\Services\Auth;

use App\Enums\Role;
use App\Http\Resources\SessionUserResource;
use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthService
{
    /** Hash de relleno para comparar cuando el usuario no existe (ver checkCredentials). */
    private static ?string $dummyHash = null;

    /**
     * Resuelve el usuario del campo `login` (usuario/cédula o correo).
     *
     * Regla: si el valor (sin espacios alrededor) contiene `@` se busca por
     * `email`; si no, por `username`. Un `username` nunca lleva `@`, así que no
     * hay ambigüedad. No se normaliza más (mayúsculas, guiones de la cédula):
     * el valor debe coincidir con el guardado; la comparación de mayúsculas la
     * decide la intercalación de la columna (MariaDB: sin distinguir).
     */
    public function findByLogin(string $login): ?User
    {
        $login = trim($login);

        if ($login === '') {
            return null;
        }

        $column = str_contains($login, '@') ? 'email' : 'username';

        return User::where($column, $login)->first();
    }

    /**
     * Usuario si `login` y `password` son correctos; null si no.
     *
     * Si el usuario no existe se compara igualmente contra un hash de relleno,
     * para que el tiempo de respuesta no revele qué usuarios o correos existen.
     */
    public function checkCredentials(string $login, string $password): ?User
    {
        $user = $this->findByLogin($login);

        $hash = $user?->password ?? (self::$dummyHash ??= Hash::make(Str::random(32)));
        $valid = Hash::check($password, $hash);

        if ($user === null || ! $valid) {
            return null;
        }

        // Igual que el rehash de Auth::once: si el coste guardado es menor que el
        // configurado, se actualiza ahora que tenemos la contraseña en claro.
        if (Hash::needsRehash($user->password)) {
            $this->rehashPassword($user, $password);
        }

        return $user;
    }

    /**
     * Guarda un hash nuevo de la misma contraseña. Es un re-hash y no un cambio
     * de contraseña: no toca `password_changed_at` ni `updated_at`, ni dispara
     * eventos. `toBase()` evita que Eloquent añada `updated_at` al update y también
     * el cast `hashed`, que re-hashearía un valor ya hasheado o rechazaría el hash
     * si su coste excede el configurado.
     */
    private function rehashPassword(User $user, string $password): void
    {
        $hash = Hash::make($password);

        User::query()->toBase()->where($user->getKeyName(), $user->getKey())->update(['password' => $hash]);

        $user->setRawAttributes(array_merge($user->getAttributes(), ['password' => $hash]), true);
    }

    /**
     * Respuesta común de login, 2FA y relogin.
     *
     * Con el token temporal del 2FA (`2fa_required`) no se exponen permisos ni
     * roles: `permissions` es `{}`, `roles` `[]` e `is_owner` false. Llegan con
     * el token definitivo (2FA y relogin), con la forma de `accessPayload()`.
     */
    public function sendLoginResponse(User $user, ?string $token = null, ?array $abilities = null): JsonResponse
    {
        $pending2FA = in_array('2fa_required', $abilities ?? [], true);

        $response = [
            'status' => 200,
            'msg' => 'Inicio de sesión',
            'user' => SessionUserResource::make($user)->resolve(),
            'token_can' => $abilities ?? [],
            ...($pending2FA ? $this->emptyAccessPayload() : $this->accessPayload($user)),
        ];

        if ($token) {
            $response['apiKey'] = $token;
        }

        return response()->json($response, 200);
    }

    /**
     * Permisos, roles y condición de owner del usuario. Es la forma que reciben
     * el 2FA y el relogin con el token definitivo, y el payload del evento
     * `permissions.updated` (App\Events\Auth\PermissionsUpdated).
     *
     * - `permissions`: permisos efectivos (directos y heredados de los roles)
     *   como `{nombre: true}`, ordenados por nombre. Siempre objeto JSON (`{}`
     *   sin permisos, nunca `[]`). Al owner no se le asignan permisos: los pasa
     *   todos por `Gate::before`, y el frontend lo sabe por `is_owner`.
     * - `roles`: nombres de sus roles reales.
     *
     * @return array{permissions: \stdClass, roles: list<string>, is_owner: bool}
     */
    public function accessPayload(User $user): array
    {
        return [
            'permissions' => (object) $user->getAllPermissions()
                ->pluck('name')
                ->sort()
                ->mapWithKeys(fn (string $name) => [$name => true])
                ->all(),
            'roles' => $user->getRoleNames()->values()->all(),
            'is_owner' => $user->hasRole(Role::Owner),
        ];
    }

    /**
     * Payload de acceso vacío (token temporal del 2FA).
     *
     * @return array{permissions: \stdClass, roles: list<string>, is_owner: bool}
     */
    private function emptyAccessPayload(): array
    {
        return ['permissions' => new \stdClass, 'roles' => [], 'is_owner' => false];
    }

    /**
     * Abilities que se exponen al frontend. Con `$tfa` false se omite
     * `2fa_required` (para emitir el token definitivo a partir del temporal).
     */
    public function getTokenAbilities($token, bool $tfa = true): array
    {
        $abilities = [];

        if ($token->can('2fa_required') && $tfa) {
            $abilities[] = '2fa_required';
        }
        if ($token->can('remember_me')) {
            $abilities[] = 'remember_me';
        }

        return $abilities;
    }

    public function sendEmail2FA(User $user, SecurityCode $securityCode): void
    {
        $code = $securityCode->code;
        // CEIL: "en 15 minutos" y no "en 14" por los milisegundos transcurridos
        $expireAt = $securityCode->expire_at->diffForHumans(['options' => CarbonInterface::CEIL]);

        Mail::to($user->email)->queue(new TfaCodeMail($code, $expireAt));
    }
}
