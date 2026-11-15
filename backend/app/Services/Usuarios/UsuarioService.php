<?php

namespace App\Services\Usuarios;

use App\Enums\Usuarios\TipoActividad;
use App\Mail\Usuarios\CorreoCambiadoMail;
use App\Models\User;
use App\Services\Usuarios\Concerns\ReglasDeCuenta;
use App\Support\EmailMask;
use App\Support\GrantGuard;
use App\Support\PermissionEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

/**
 * Alta y edición de datos de una persona (`POST /usuarios`, `PATCH /usuarios/{id}`,
 * docs/fases/fase-1-usuarios.md §4.2). Transacción con la fila releída y
 * bloqueada y 422 de dominio `{status, msg}`; la delegación (`GrantGuard`, 403)
 * va al final, tras las reglas.
 */
class UsuarioService
{
    use ReglasDeCuenta;

    public function __construct(
        private readonly Bitacora $bitacora,
        private readonly ActivacionService $activaciones,
    ) {}

    /**
     * Crea la cuenta **pendiente**: contraseña aleatoria que nadie conoce y
     * `activated_at` null; la persona elige la suya con el enlace de activación.
     * Asigna roles y permisos directos sin eventos de spatie (la cuenta es nueva:
     * no hay sesiones a las que avisar) y escribe `cuenta_creada` con el actor.
     * Con `enviar_activacion`, envía el enlace (cola `high`, tras el commit).
     *
     * 403 si `$actor` no puede conceder los roles o permisos (`GrantGuard`);
     * dar `owner` sin serlo ya lo para `UserPolicy::create` en el FormRequest.
     *
     * @param  array<string, mixed>  $data  Cuerpo validado de `StoreUsuarioRequest`.
     */
    public function crear(array $data, User $actor): User
    {
        $roles = array_values(array_unique($data['roles'] ?? []));
        $permissions = array_values(array_unique($data['permissions'] ?? []));

        return DB::transaction(function () use ($data, $actor, $roles, $permissions) {
            if (! GrantGuard::allows($actor, $roles, $permissions)) {
                $this->fallar(GrantGuard::message(), 403, traducir: false);
            }

            $user = new User([
                'name' => $data['name'],
                'username' => $data['username'],
                'email' => $data['email'],
                'telefono' => $data['telefono'] ?? null,
                'direccion' => $data['direccion'] ?? null,
                'sexo' => $data['sexo'] ?? null,
            ]);
            $user->forceFill(['password' => Str::password(40), 'activated_at' => null])->save();

            PermissionEvents::withoutEvents(function () use ($user, $roles, $permissions) {
                $user->syncRoles($roles);
                $user->syncPermissions($permissions);
            });

            $this->bitacora->registrar($user, TipoActividad::CuentaCreada, $actor);

            if ($data['enviar_activacion']) {
                $this->activaciones->emitir($user, $actor);
            }

            return $user;
        });
    }

    /**
     * Guarda solo los campos recibidos (ya validados). 422 si la cuenta está de
     * baja o si se cambia el propio correo (se cambiará desde `core/account`,
     * con la contraseña). Sin diferencias no escribe nada.
     *
     * - Datos que cambian (salvo el correo): `datos_actualizados` con
     *   `meta.campos`.
     * - Correo: revoca todas sus sesiones (el 2FA y el restablecimiento van al
     *   correo: cambiarlo es tomar la cuenta), `correo_cambiado` con el anterior
     *   enmascarado y el nuevo, `CorreoCambiadoMail` al anterior (cola `emails`)
     *   y, si la cuenta está pendiente, invalida su enlace de activación (el
     *   anterior iba al correo viejo; se reenvía al nuevo desde la ficha).
     *
     * @param  array<string, mixed>  $data  Cuerpo validado de `UpdateUsuarioRequest`.
     */
    public function actualizar(User $user, User $actor, array $data): User
    {
        return DB::transaction(function () use ($user, $actor, $data) {
            $user = $this->bloquear($user->id);
            $this->exigirNoDeBaja($user);

            $anterior = $user->email;
            $user->fill($data);

            $cambios = array_keys($user->getDirty());
            if ($cambios === []) {
                return $user;
            }

            $correoCambiado = in_array('email', $cambios, true);
            if ($correoCambiado && $user->is($actor)) {
                $this->fallar('usuarios.correo_propio');
            }

            $user->save();

            $campos = array_values(array_diff($cambios, ['email']));
            if ($campos !== []) {
                $this->bitacora->registrar($user, TipoActividad::DatosActualizados, $actor, ['campos' => $campos]);
            }

            if ($correoCambiado) {
                $this->correoCambiado($user, $anterior, $actor);
            }

            return $user;
        });
    }

    private function correoCambiado(User $user, string $anterior, User $actor): void
    {
        $tokens = $user->tokens()->delete();

        if (! $user->isActivated()) {
            $this->activaciones->invalidar($user);
        }

        $this->bitacora->registrar($user, TipoActividad::CorreoCambiado, $actor, [
            'anterior' => EmailMask::mask($anterior),
            'nuevo' => $user->email,
            'tokens' => $tokens,
        ]);

        Mail::to($anterior)->queue((new CorreoCambiadoMail(
            name: $user->name,
            nuevo: EmailMask::mask($user->email),
        ))->afterCommit());
    }
}
