<?php

// Mensajes de dominio del módulo de usuarios (docs/fases/fase-1-usuarios.md).
return [
    'no_encontrado' => 'La persona no existe',
    'owner_solo_owner' => 'Solo un owner puede gestionar a otro owner',
    'owner_rol_solo_owner' => 'Solo un owner puede dar o quitar el rol de owner',
    'de_baja' => 'La cuenta está dada de baja: restáurala antes de editarla',

    // Roles y permisos (UserAccessService)
    'roles_propios' => 'No puedes cambiar tus propios roles',
    'permisos_propios' => 'No puedes cambiar tus propios permisos',
    'ultimo_owner' => 'Debe quedar al menos un owner',
    'roles_actualizados' => 'Roles actualizados',
    'permisos_actualizados' => 'Permisos actualizados',

    // Alta y edición (UsuarioService)
    'creado' => 'Usuario creado',
    'creado_con_activacion' => 'Usuario creado. Le enviamos el enlace de activación a su correo',
    'actualizado' => 'Datos actualizados',
    'correo_propio' => 'Tu propio correo se cambia desde tu cuenta',

    // Activación (ActivacionService)
    'activacion_enviada' => 'Enlace de activación enviado',
    'ya_activada' => 'La cuenta ya está activada',
    'activacion_suspendida' => 'La cuenta está suspendida: reactívala antes de enviar el enlace',
    'activacion' => [
        'no_encontrada' => 'El enlace de activación no es válido',
        'usada' => 'Este enlace ya se usó. Si ya elegiste tu contraseña, inicia sesión',
        'caducada' => 'El enlace de activación caducó. Pide a la administración del colegio que te envíe otro',
        'no_disponible' => 'Esta cuenta no se puede activar. Contacta con la administración del colegio',
        'activada' => 'Cuenta activada. Ya puedes iniciar sesión',
        'caduca' => '{1} dentro de 1 día|[2,*] dentro de :count días',
    ],

    // Estado de la cuenta (EstadoCuentaService)
    'suspendida' => 'Cuenta suspendida',
    'reactivada' => 'Cuenta reactivada',
    'dada_de_baja' => 'Cuenta dada de baja',
    'restaurada' => 'Cuenta restaurada',
    'sesiones_cerradas' => '{0} No tenía sesiones abiertas|{1} Se cerró 1 sesión|[2,*] Se cerraron :count sesiones',
    'suspender_propia' => 'No puedes suspender tu propia cuenta',
    'baja_propia' => 'No puedes dar de baja tu propia cuenta',
    'sesiones_propias' => 'Tus propias sesiones se cierran desde tu cuenta',
    'ya_suspendida' => 'La cuenta ya está suspendida',
    'no_suspendida' => 'La cuenta no está suspendida',
    'ya_de_baja' => 'La cuenta ya está dada de baja',
    'no_de_baja' => 'La cuenta no está dada de baja',

    // Roles en bloque (UserAccessService::bulkRoles): `msg` ya redactado para el aviso
    'bloque' => [
        'personas' => '{1} 1 persona|[2,*] :count personas',
        'asignado' => 'Rol asignado a :personas',
        'quitado' => 'Rol quitado a :personas',
        'actualizado' => 'Roles actualizados a :personas',
        'parcial' => ':verbo a :actualizadas; :fallidas no se pudo actualizar|:verbo a :actualizadas; :fallidas no se pudieron actualizar',
        'verbo' => ['asignado' => 'Asignado', 'quitado' => 'Quitado', 'actualizado' => 'Actualizado'],
        'ninguna_una' => 'No se pudo actualizar a la persona seleccionada',
        'ninguna' => 'No se pudo actualizar a ninguna de las :fallidas personas',
        'owner_agregar' => 'El rol owner no se asigna en bloque.',
        'owner_quitar' => 'El rol owner no se quita en bloque.',
        'ambos' => 'El rol :rol no puede estar en añadir y en quitar.',
        'vacio' => 'Elige al menos un rol que añadir o quitar.',
    ],
];
