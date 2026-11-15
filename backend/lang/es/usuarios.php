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
