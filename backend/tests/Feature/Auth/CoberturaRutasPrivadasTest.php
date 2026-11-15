<?php

use Illuminate\Http\Request;
use Illuminate\Routing\Route as RutaLaravel;
use Illuminate\Support\Facades\Route;

/**
 * Cobertura del dataset 'rutas privadas' (tests/Datasets/RutasPrivadas.php): toda
 * ruta con `auth.full` debe estar en él (así TwoFactorAccessTest y
 * EstadoCuentaTest la recorren) y el dataset no debe apuntar a rutas que no lo
 * sean. Una ruta privada nueva sin entrada hace fallar este test.
 */

/** Clave estable de una ruta: método y URI con sus `{parámetros}`. */
function claveDeRuta(RutaLaravel $ruta, string $metodo): string
{
    return $metodo.' /'.ltrim($ruta->uri(), '/');
}

/**
 * Las rutas con `auth.full` (como grupo o con sus piezas ya expandidas), por
 * clave. HEAD se omite: Laravel lo añade a todo GET.
 *
 * @return array<string, RutaLaravel>
 */
function rutasConAuthFull(): array
{
    $rutas = [];

    foreach (Route::getRoutes()->getRoutes() as $ruta) {
        $middleware = $ruta->gatherMiddleware();

        if (! in_array('auth.full', $middleware, true) && ! in_array('tfa.completed', $middleware, true)) {
            continue;
        }

        foreach (array_diff($ruta->methods(), ['HEAD']) as $metodo) {
            $rutas[claveDeRuta($ruta, $metodo)] = $ruta;
        }
    }

    return $rutas;
}

test('toda ruta con auth.full está en el dataset de rutas privadas', function () {
    $cubiertas = [];

    foreach (rutasPrivadas() as [$metodo, $uri]) {
        try {
            $cubiertas[] = claveDeRuta(Route::getRoutes()->match(Request::create($uri, $metodo)), $metodo);
        } catch (Throwable) {
            // La entrada que no existe la reporta el otro test
        }
    }

    $faltan = array_values(array_diff(array_keys(rutasConAuthFull()), $cubiertas));
    sort($faltan);

    expect($faltan)->toBe([], "Rutas con auth.full sin entrada en tests/Datasets/RutasPrivadas.php:\n".implode("\n", $faltan));
});

test('ninguna entrada del dataset de rutas privadas apunta a una ruta sin auth.full', function () {
    $privadas = rutasConAuthFull();
    $sobran = [];

    foreach (rutasPrivadas() as $nombre => [$metodo, $uri]) {
        try {
            $ruta = Route::getRoutes()->match(Request::create($uri, $metodo));

            if (! isset($privadas[claveDeRuta($ruta, $metodo)])) {
                $sobran[] = "{$nombre} (es {$ruta->uri()}, sin auth.full)";
            }
        } catch (Throwable) {
            $sobran[] = "{$nombre} (no existe la ruta)";
        }
    }

    expect($sobran)->toBe([], "Entradas de RutasPrivadas.php que no son rutas auth.full:\n".implode("\n", $sobran));
});
