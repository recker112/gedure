<?php

use App\Rules\Cedula;
use App\Support\Telefono;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

/**
 * Regla `Cedula` y normalización de cédula y teléfono (docs/fases/fase-1-usuarios.md
 * §2.1 y decisión 1). Necesita el validador y el traductor: arranca la
 * aplicación (sin base de datos).
 */
uses(TestCase::class);

test('acepta solo dígitos con E opcional', function (string $valor, bool $valida) {
    expect(Validator::make(['cedula' => $valor], ['cedula' => [new Cedula]])->passes())->toBe($valida);
})->with([
    'venezolana' => ['12345678', true],
    'antigua de 7 dígitos' => ['1234567', true],
    'extranjera' => ['E84123456', true],
    'mínimo 5 dígitos' => ['12345', true],
    'máximo 10 dígitos' => ['1234567890', true],
    '4 dígitos' => ['1234', false],
    '11 dígitos' => ['12345678901', false],
    'con V-' => ['V-12345678', false],
    'con puntos' => ['12.345.678', false],
    'e minúscula' => ['e84123456', false],
    'letras' => ['ana.perez', false],
    'con salto de línea' => ["12345678\n", false],
]);

test('el máximo de dígitos se configura (cédula escolar)', function () {
    expect(Validator::make(['c' => '123456789012'], ['c' => [new Cedula(12)]])->passes())->toBeTrue()
        ->and(Validator::make(['c' => '123456789012'], ['c' => [new Cedula]])->passes())->toBeFalse();
});

test('normaliza la forma escrita a mano', function (mixed $entrada, mixed $salida) {
    expect(Cedula::normalizar($entrada))->toBe($salida);
})->with([
    'V-12.345.678' => ['V-12.345.678', '12345678'],
    'v 12 345 678' => ['v 12 345 678', '12345678'],
    'e-84.123.456' => ['e-84.123.456', 'E84123456'],
    'ya normalizada' => ['12345678', '12345678'],
    'usuario de admin intacto' => ['ana.perez', 'ana.perez'],
    'usuario con mayúsculas intacto' => ['Director', 'Director'],
    'no texto' => [12345678, 12345678],
    'null' => [null, null],
]);

test('normaliza el teléfono a 0412-1234567', function (mixed $entrada, mixed $salida) {
    expect(Telefono::normalizar($entrada))->toBe($salida);
})->with([
    'normalizado' => ['0412-1234567', '0412-1234567'],
    'pegado' => ['04121234567', '0412-1234567'],
    'con espacios' => ['0412 123 45 67', '0412-1234567'],
    'internacional' => ['+58 412-1234567', '0412-1234567'],
    'sin el 0' => ['4121234567', '0412-1234567'],
    'fijo' => ['(0251) 555-1234', '0251-5551234'],
    'corto intacto' => ['12345', '12345'],
    'texto intacto' => ['llamar a casa', 'llamar a casa'],
    'null' => [null, null],
]);

test('el teléfono normalizado cumple el formato', function () {
    expect(preg_match(Telefono::REGEX, (string) Telefono::normalizar('04141234567')))->toBe(1)
        ->and(preg_match(Telefono::REGEX, '12345'))->toBe(0);
});
