<?php

use App\Enums\Usuarios\TipoActividad;
use Tests\TestCase;

/**
 * Tipos de la bitácora y sus títulos (`lang/es/actividad.php`). Necesita el
 * traductor, así que arranca la aplicación (sin base de datos).
 */
uses(TestCase::class);

test('los valores son estables', function () {
    expect(array_column(TipoActividad::cases(), 'value'))->toBe([
        'cuenta_creada', 'activacion_enviada', 'cuenta_activada', 'login', 'datos_actualizados',
        'correo_cambiado', 'contrasena_cambiada', 'rol_cambiado', 'permiso_agregado', 'permiso_quitado',
        'suspension', 'reactivacion', 'baja', 'restauracion', 'sesiones_cerradas',
        'estudiante_vinculado', 'estudiante_desvinculado', 'importado',
    ]);
});

test('todo tipo tiene título y cabe en la columna', function (TipoActividad $tipo) {
    expect(strlen($tipo->value))->toBeLessThanOrEqual(40)
        ->and($tipo->title())->toBeString()->not->toBe($tipo->value);
})->with(TipoActividad::cases());

test('los títulos usan meta', function (TipoActividad $tipo, array $meta, string $titulo) {
    expect($tipo->title($meta))->toBe($titulo);
})->with([
    'rol agregado' => [TipoActividad::RolCambiado, ['rol' => 'admin', 'cambio' => 'agregado'], 'Rol Administración asignado'],
    'rol quitado' => [TipoActividad::RolCambiado, ['rol' => 'profesor', 'cambio' => 'quitado'], 'Rol Profesor retirado'],
    'rol desconocido' => [TipoActividad::RolCambiado, ['rol' => 'otro', 'cambio' => 'agregado'], 'Rol otro asignado'],
    'rol sin cambio' => [TipoActividad::RolCambiado, [], 'Roles cambiados'],
    'permiso' => [TipoActividad::PermisoAgregado, ['permiso' => 'usuarios.usuario.show'], 'Permiso usuarios.usuario.show concedido'],
    'estudiante' => [TipoActividad::EstudianteVinculado, ['estudiante_id' => 3, 'nombre' => 'Ana Pérez', 'parentesco' => 'madre'], 'Estudiante Ana Pérez vinculado'],
    'meta no escalar ignorada' => [TipoActividad::DatosActualizados, ['campos' => ['telefono']], 'Datos actualizados'],
]);
