<?php

use App\Enums\Permission;
use App\Models\User;

/**
 * Todas las rutas privadas (`auth.full`): método, URI y closure que prepara los
 * datos para `$user` y devuelve el cuerpo de la petición. Lo recorren
 * TwoFactorAccessTest (401 sin token, 403 con el temporal) y EstadoCuentaTest
 * (403 de una suspendida, 401 de una baja). CoberturaRutasPrivadasTest exige que
 * no falte ni sobre ninguna: una ruta privada nueva sin entrada aquí falla.
 *
 * El closure recibe al usuario que hace la petición: le da el permiso de la ruta
 * y crea los registros que la URI necesita (ids fijos), para que el único motivo
 * de un 401/403 sea el token o el estado de la cuenta.
 *
 * @return array<string, array{0: string, 1: string, 2: Closure(User): array<string, mixed>}>
 */
function rutasPrivadas(): array
{
    $canalPropio = fn (User $user) => [
        'channel_name' => 'private-App.Models.User.'.$user->id,
        'socket_id' => '1234.5678',
    ];

    // Sin datos de petición: solo da el permiso de la ruta (`{id}` = 1, la propia persona)
    $con = fn (Permission $permiso) => function (User $user) use ($permiso) {
        $user->givePermissionTo($permiso);

        return [];
    };

    return [
        // Usuarios (routes/api/usuarios/)
        'GET /usuarios' => ['GET', '/api/v1/usuarios', $con(Permission::UsuariosUsuarioShow)],
        'GET /usuarios/{id}' => ['GET', '/api/v1/usuarios/1', $con(Permission::UsuariosUsuarioShow)],
        'GET /usuarios/{id}/actividad' => ['GET', '/api/v1/usuarios/1/actividad', $con(Permission::UsuariosUsuarioShow)],
        'GET /roles' => ['GET', '/api/v1/roles', $con(Permission::UsuariosUsuarioShow)],
        'GET /permisos' => ['GET', '/api/v1/permisos', $con(Permission::UsuariosUsuarioShow)],
        'PUT /usuarios/{id}/roles' => ['PUT', '/api/v1/usuarios/1/roles', $con(Permission::UsuariosRolUpdate)],
        'PUT /usuarios/{id}/permisos' => ['PUT', '/api/v1/usuarios/1/permisos', $con(Permission::UsuariosPermisoUpdate)],
        'POST /usuarios/roles/bloque' => ['POST', '/api/v1/usuarios/roles/bloque', $con(Permission::UsuariosRolUpdate)],

        // `Broadcast::routes()` registra la autorización de canales con GET y POST
        'GET /broadcasting/auth' => ['GET', '/api/broadcasting/auth', $canalPropio],
        'POST /broadcasting/auth' => ['POST', '/api/broadcasting/auth', $canalPropio],
    ];
}

dataset('rutas privadas', rutasPrivadas());
