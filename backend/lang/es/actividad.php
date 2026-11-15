<?php

// Títulos de la bitácora (App\Enums\Usuarios\TipoActividad::title). Las claves
// son los valores estables de `actividades.tipo`; un tipo con variantes es un
// array por `meta.cambio` con su `default`. Los marcadores salen de `meta`.
return [
    'cuenta_creada' => 'Cuenta creada',
    'activacion_enviada' => 'Enlace de activación enviado',
    'cuenta_activada' => 'Cuenta activada',
    'login' => 'Inició sesión',
    'datos_actualizados' => 'Datos actualizados',
    'correo_cambiado' => 'Correo cambiado',
    'contrasena_cambiada' => 'Contraseña cambiada',
    'rol_cambiado' => [
        'agregado' => 'Rol :rol asignado',
        'quitado' => 'Rol :rol retirado',
        'default' => 'Roles cambiados',
    ],
    'permiso_agregado' => 'Permiso :permiso concedido',
    'permiso_quitado' => 'Permiso :permiso retirado',
    'suspension' => 'Cuenta suspendida',
    'reactivacion' => 'Cuenta reactivada',
    'baja' => 'Cuenta dada de baja',
    'restauracion' => 'Cuenta restaurada',
    'sesiones_cerradas' => 'Sesiones cerradas',
    'estudiante_vinculado' => 'Estudiante :nombre vinculado',
    'estudiante_desvinculado' => 'Estudiante :nombre desvinculado',
    'importado' => 'Importado desde un archivo',
];
