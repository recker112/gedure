<?php

// Respuestas 403 de autorización (bootstrap/app.php): políticas / Gate denegadas,
// canales de broadcasting denegados y tokens sin la ability que pide la ruta.
return [
    'forbidden' => 'No tienes permiso para realizar esta acción',
    'token_ability' => 'Este token no permite realizar esta acción',
];
