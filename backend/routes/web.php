<?php

use Illuminate\Support\Facades\Route;

// La SPA de React (frontend/) se compila dentro de public/ y su index.html se
// instala como resources/views/app.blade.php. Cualquier ruta que no sea de la
// API la resuelve el router del cliente en el navegador.
//
// Excluidas: `api` (rutas de routes/api.php), `up` (healthcheck de Laravel),
// `app` (WebSockets de Reverb; Caddy lo atiende antes de llegar a PHP),
// `broadcasting` (auth de canales) y `assets/` (chunks de Vite: los que existen
// los sirve el servidor web; uno inexistente, p. ej. de un despliegue anterior,
// debe dar 404 real y no el HTML de la SPA con 200).
Route::view('/{any?}', 'app')
    ->where('any', '^(?!(?:api|up|app|broadcasting)(?:/|$)|assets/).*$')
    ->name('spa');
