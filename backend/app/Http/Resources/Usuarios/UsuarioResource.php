<?php

namespace App\Http\Resources\Usuarios;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Persona en la administración (`/usuarios`, docs/fases/fase-1-usuarios.md §4.2).
 *
 * Espera cargadas `roles`, `permissions`, `suspendedBy` y `deletedBy`
 * (`UsuarioResource::RELACIONES`), para no lanzar consultas por persona.
 * `roles` son los nombres de sus roles y `direct_permissions` solo los permisos
 * asignados directamente (los efectivos los calcula el cliente con `GET /roles`).
 * `estado` es el derivado (`User::estado()`). La autoría (`suspended_by`,
 * `deleted_by`) es `{id, name}` o `null`, también si quien actuó está de baja.
 *
 * @mixin User
 */
class UsuarioResource extends JsonResource
{
    /** Relaciones que lee el recurso: cárgalas con `with()` en toda consulta que lo use. */
    public const RELACIONES = ['roles', 'permissions', 'suspendedBy:id,name', 'deletedBy:id,name'];

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'telefono' => $this->telefono,
            'direccion' => $this->direccion,
            'sexo' => $this->sexo?->value,
            'estado' => $this->estado()->value,
            'roles' => $this->roles->pluck('name')->values(),
            'direct_permissions' => $this->permissions->pluck('name')->values(),
            'last_login_at' => $this->last_login_at?->toJSON(),
            'activated_at' => $this->activated_at?->toJSON(),
            'created_at' => $this->created_at?->toJSON(),
            'suspended_at' => $this->suspended_at?->toJSON(),
            'suspended_reason' => $this->suspended_reason,
            'suspended_by' => $this->autor($this->suspendedBy),
            'deleted_at' => $this->deleted_at?->toJSON(),
            'deleted_by' => $this->autor($this->deletedBy),
        ];
    }

    /** @return array{id: int, name: string}|null */
    private function autor(?User $user): ?array
    {
        return $user ? ['id' => $user->id, 'name' => $user->name] : null;
    }
}
