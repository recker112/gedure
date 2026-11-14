<?php

use App\Services\Auth\SecurityCodeService;

test('el código generado usa el alfabeto sin caracteres ambiguos', function () {
    foreach (range(1, 50) as $_) {
        expect(SecurityCodeService::generateToken())->toMatch('/^[A-HJKMNP-Z2-9]{6}$/');
    }
});
