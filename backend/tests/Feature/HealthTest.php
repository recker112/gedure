<?php

test('el healthcheck responde 200', function () {
    $this->get('/up')->assertOk();
});
