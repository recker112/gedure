<?php

/**
 * Una petición sin `Accept: application/json` (curl, otro cliente) a una ruta
 * autenticada y sin token debe dar 401 JSON, no un 500 por `Route [login] not
 * defined` (ver `redirectGuestsTo` en bootstrap/app.php).
 */
test('una ruta auth:sanctum sin Accept responde 401 JSON', function () {
    $this->post('/api/v1/auth/relogin')
        ->assertUnauthorized()
        ->assertHeader('Content-Type', 'application/json')
        ->assertExactJson(['message' => 'Unauthenticated.']);
});

test('la autorización de canales sin Accept responde 401 JSON', function () {
    $this->post('/api/broadcasting/auth')
        ->assertUnauthorized()
        ->assertHeader('Content-Type', 'application/json');
});
