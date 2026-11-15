<?php

// Respuestas 403 de autorización (bootstrap/app.php): políticas / Gate denegadas,
// middleware `permission:`/`role:` de spatie, canales de broadcasting denegados,
// tokens sin la ability que pide la ruta y la regla de delegación (GrantGuard).
return [
    'forbidden' => 'No tienes permiso para realizar esta acción',
    'token_ability' => 'Este token no permite realizar esta acción',
    'grant_denied' => 'No puedes conceder permisos que no tienes',
];
