# Tests del backend (Pest)

## Ejecutar

No hay PHP en el host:

```bash
docker compose exec app php artisan test                                   # toda la suite
docker compose exec app php artisan test tests/Feature/Auth/AuthControllerTest.php
docker compose exec app php artisan test --filter="token temporal"
```

## Reglas

- **`test()`, nunca `it()`**: `it()` antepone "it " y los títulos van en español.
- `describe()` para agrupar dentro de un archivo.
- `tests/Feature/<Modulo>/` (HTTP, BD) y `tests/Unit/<Modulo>/` (lógica pura: cálculo de promedios, conversión de literales, emparejado de pagos).
- Un archivo por recurso o flujo: `tests/Feature/Academico/LapsosTest.php`, `tests/Feature/Notas/CargaDeNotasTest.php`.
- Datasets en `tests/Datasets/` (ya existe `CodigosNoValidos.php`).
- Helpers usados por **más de un archivo** en `tests/Helpers/<Modulo>.php` (funciones globales); si se definen dentro de un test, rompen `--parallel`. Los genéricos de sesión siguen en `tests/Pest.php`.

## Entorno

- SQLite en memoria, `RefreshDatabase` para todo `Feature/` (`tests/Pest.php`), cola `sync`, correo `array`, caché `array`, broadcasting `null`, `BCRYPT_ROUNDS=4`.
- **Trampa de `phpunit.xml`:** el contenedor `app` carga `backend/.env` como variables reales, así que cada variable va **dos veces**: `<env ... force="true"/>` y `<server .../>`. Sin el bloque `<server>`, los tests correrían contra MariaDB de desarrollo y `RefreshDatabase` la vaciaría. Una variable nueva va en los dos bloques.
- Ojo con SQLite frente a MariaDB: intercalación (acentos y mayúsculas), `lockForUpdate` (no bloquea en SQLite) y tipos JSON. Lo que dependa de eso se comenta en el test.

## Helpers de sesión (`tests/Pest.php`)

Tokens **reales** (Bearer), no `Sanctum::actingAs`, para recorrer el mismo camino que el frontend:

| Helper | Uso |
|---|---|
| `tokenTemporal($user)` | Token del login, pendiente del 2FA. |
| `tokenDefinitivo($user)` | Token tras el 2FA. |
| `conToken($token)` | Olvida el guard y prepara la petición con ese Bearer. |
| `rutaPrivadaDePrueba($token)` | Ruta `auth.full` de prueba (se retirará cuando haya rutas privadas reales). |

| Helper | Uso |
|---|---|
| `usuarioCon(Role\|Permission ...$cosas)` | Crea un usuario con esos roles/permisos. |
| `comoUsuario(User $user)` | `conToken(tokenDefinitivo($user))`. |
| Dataset `'rutas privadas'` (`tests/Datasets/RutasPrivadas.php`) | Cada ruta privada (método, URI): se comprueba 401 sin token y 403 con el temporal. `tests/Feature/Auth/CoberturaRutasPrivadasTest.php` falla si una ruta `auth.full` no está en el dataset. |

`TestCase::$seed = true` siembra solo el catálogo (`PermissionsSeeder`). **Los tests construyen sus propios usuarios** con `usuarioCon()` (y la factory para los estudiantes, que no son usuarios); no dependen del `DatabaseSeeder`.

### Usuarios de desarrollo (seed)

`php artisan db:seed` crea cuatro usuarios, uno por rol, contraseña `password` (los comprueba `tests/Feature/SeederTest.php`):

| Usuario | Correo | Rol |
|---|---|---|
| `12345678` | `owner@example.com` | owner |
| `11111111` | `admin@example.com` | admin |
| `22222222` | `profesor@example.com` | profesor |
| `33333333` | `representante@example.com` | representante |

## Qué probar en cada endpoint

1. Caso feliz: estado, forma de la respuesta (`{status, msg, data}`) y efecto en BD.
2. 401 sin token y 403 con el token temporal (vía dataset).
3. 403 sin el permiso; 403 de Policy si aplica.
4. 404 de un id inexistente **y** de un registro ajeno (pertenencia).
5. 422 de cada regla de `rules()` relevante y de cada regla de dominio del Service.
6. Efectos laterales: `Mail::fake()` / `Queue::fake()` / `Event::fake()` con la cola esperada.
7. Número de consultas constante en listados (sin N+1) cuando la lista pueda crecer.

```php
test('un profesor no puede cargar notas en un lapso cerrado', function () {
    $profesor = usuarioCon(Role::Profesor);
    $asignacion = asignacionDe($profesor, lapso: lapsoCerrado());

    comoUsuario($profesor)
        ->putJson(route('notas.cargas.update', $asignacion), ['notas' => [/* ... */]])
        ->assertStatus(422)
        ->assertJson(['status' => 422, 'msg' => __('notas.lapso_cerrado')]);
});
```

## CI

`.github/workflows/check_test_laravel.yml` ejecuta `php artisan test` en cada PR a `master` que toque `backend/**` (PHP 8.5, caché de Composer). No usa MariaDB: la base es la SQLite en memoria de `phpunit.xml`, así que la trampa de `<env>`/`<server>` también protege al CI. El frontend tiene `check_test_frontend.yml` (lint y vitest) y `check_build_frontend.yml` (`npm run build`).
