<?php

/**
 * Sonda de disponibilidad de la base de datos usada por el entrypoint.
 * Comprueba lo que de verdad necesita Laravel (host, credenciales y que la
 * base exista), no solo que el puerto acepte conexiones.
 * Sale con 0 si la conexión funciona y 1 en cualquier otro caso, dejando la
 * causa real en stderr.
 */

$connection = getenv('DB_CONNECTION') ?: 'mysql';

if (! in_array($connection, ['mysql', 'mariadb'], true)) {
    exit(0);
}

$host = getenv('DB_HOST') ?: '127.0.0.1';
$port = getenv('DB_PORT') ?: '3306';
$dsn = sprintf('mysql:host=%s;port=%s;dbname=%s', $host, $port, getenv('DB_DATABASE') ?: '');

try {
    new PDO($dsn, getenv('DB_USERNAME') ?: 'root', getenv('DB_PASSWORD') ?: '', [
        // Acota cada intento: sin timeout, un host que no responde cuelga el
        // arranque varios minutos.
        PDO::ATTR_TIMEOUT => 3,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
} catch (Throwable $e) {
    fwrite(STDERR, $e->getMessage() . PHP_EOL);
    exit(1);
}

exit(0);
