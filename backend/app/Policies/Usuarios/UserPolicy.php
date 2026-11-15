<?php

namespace App\Policies\Usuarios;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;

/**
 * Autorización sobre una cuenta concreta de la administración (`/usuarios`). El
 * permiso por acción (`usuarios.*`) ya lo exige el middleware de la ruta; aquí
 * solo va la jerarquía. Un owner no llega nunca: `Gate::before` le deja pasar.
 *
 * La lectura (listado, ficha, bitácora) no pasa por aquí: quien tiene
 * `usuarios.usuario.show` ve también a los owners. `manage` protege las acciones
 * sobre `/usuarios/{id}` (vía `UsuarioTargetRequest`).
 *
 * Las reglas que valen también para el owner (uno mismo, cuenta dada de baja,
 * último owner) no van aquí sino en el Service, como 422.
 */
class UserPolicy
{
    /**
     * A un owner solo lo gestiona otro owner. `hasRole()` sobre el destino es
     * correcto: pregunta qué ES la cuenta, no qué puede hacer (para eso, `can()`).
     */
    public function manage(User $actor, User $target): Response
    {
        return $target->hasRole(Role::Owner) && ! $actor->hasRole(Role::Owner)
            ? Response::deny(__('usuarios.owner_solo_owner'))
            : Response::allow();
    }
}
