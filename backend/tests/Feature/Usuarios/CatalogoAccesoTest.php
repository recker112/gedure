<?php

use App\Enums\Permission;
use App\Enums\Role;
use Spatie\Permission\Models\Role as RoleModel;

/**
 * Catálogo de roles y permisos (`GET /roles`, `GET /permisos`,
 * docs/backend/permisos.md y docs/fases/fase-1-usuarios.md §4.3).
 */
describe('permiso', function () {
    test('sin usuarios.usuario.show responden 403', function (string $ruta) {
        comoUsuario(usuarioCon(Role::Representante))
            ->getJson(route($ruta))
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'No tienes permiso para realizar esta acción']);
    })->with(['usuarios.roles.index', 'usuarios.permisos.index']);
});

describe('GET /roles', function () {
    test('lista los roles del catálogo, en su orden, con nombre, descripción y permisos', function () {
        $respuesta = comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow))
            ->getJson(route('usuarios.roles.index'))
            ->assertOk()
            ->assertJsonPath('status', 200);

        expect(array_column($respuesta->json('data'), 'name'))->toBe(Role::values());

        foreach (Role::cases() as $i => $rol) {
            expect($respuesta->json("data.{$i}"))->toBe([
                'name' => $rol->value,
                'label' => $rol->label(),
                'description' => $rol->description(),
                'permissions' => $rol->permissionNames(),
            ]);
        }
    });

    test('admin trae todo el catálogo, representante mis-estudiantes y profesor nada', function () {
        $data = collect(comoUsuario(usuarioCon(Role::Admin))->getJson(route('usuarios.roles.index'))->json('data'))->keyBy('name');

        expect($data['owner']['permissions'])->toBe([])
            ->and($data['admin']['permissions'])->toBe(Permission::values())
            ->and($data['profesor']['permissions'])->toBe([])
            ->and($data['representante']['permissions'])->toBe(['mis-estudiantes.estudiante.show']);
    });

    test('muestra los permisos actuales en BD (no los iniciales), en el orden del enum', function () {
        RoleModel::findByName(Role::Admin->value, 'web')->revokePermissionTo(Permission::UsuariosUsuarioDestroy);
        RoleModel::findByName(Role::Profesor->value, 'web')->givePermissionTo([Permission::UsuariosEstudianteShow, Permission::UsuariosUsuarioShow]);

        $data = collect(comoUsuario(usuarioCon(Role::Owner))->getJson(route('usuarios.roles.index'))->json('data'))->keyBy('name');

        expect($data['admin']['permissions'])->not->toContain('usuarios.usuario.destroy')
            ->and($data['profesor']['permissions'])->toBe(['usuarios.usuario.show', 'usuarios.estudiante.show']);
    });

    test('los roles ajenos al catálogo van al final, con su nombre como label', function () {
        RoleModel::create(['name' => 'coordinacion', 'guard_name' => 'web'])->givePermissionTo(Permission::UsuariosUsuarioShow);

        $data = comoUsuario(usuarioCon(Role::Admin))->getJson(route('usuarios.roles.index'))->json('data');

        expect(end($data))->toBe([
            'name' => 'coordinacion',
            'label' => 'coordinacion',
            'description' => '',
            'permissions' => ['usuarios.usuario.show'],
        ]);
    });
});

describe('GET /permisos', function () {
    test('agrupa el catálogo por módulo, en el orden del enum', function () {
        comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow))
            ->getJson(route('usuarios.permisos.index'))
            ->assertOk()
            ->assertExactJson([
                'status' => 200,
                'data' => [
                    [
                        'modulo' => 'usuarios',
                        'permissions' => [
                            'usuarios.usuario.show',
                            'usuarios.rol.update',
                            'usuarios.permiso.update',
                            'usuarios.usuario.create',
                            'usuarios.usuario.update',
                            'usuarios.usuario.destroy',
                            'usuarios.usuario.importar',
                            'usuarios.estudiante.show',
                            'usuarios.estudiante.create',
                            'usuarios.estudiante.update',
                            'usuarios.estudiante.destroy',
                            'usuarios.estudiante.exportar',
                        ],
                    ],
                    [
                        'modulo' => 'mis-estudiantes',
                        'permissions' => ['mis-estudiantes.estudiante.show'],
                    ],
                ],
            ]);
    });
});
