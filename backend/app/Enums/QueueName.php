<?php

namespace App\Enums;

/**
 * Colas del worker (conexión `database`), de más a menos prioritaria
 * (prioridad estricta: mientras `high` tenga trabajos, el resto espera). El
 * orden de los casos es la prioridad y `workerList()` debe coincidir con
 * `--queue` de docker/prod/entrypoint.sh y docker/dev/entrypoint.sh (si se
 * añade una cola, hay que actualizar los tres).
 *
 * Mismos nombres y orden que blulablel. Se aplica con
 * `#[Queue(QueueName::High)]` (Illuminate\Queue\Attributes\Queue) en la clase,
 * nunca en la llamada que despacha.
 */
enum QueueName: string
{
    /** Lo que la persona está esperando ahora (códigos 2FA y de seguridad). */
    case High = 'high';

    /** Notificaciones, broadcasts y listeners de eventos. */
    case Events = 'events';

    /** Lo que no indique otra cola. */
    case Default = 'default';

    /** Correos que nadie espera en el momento (avisos...). */
    case Emails = 'emails';

    /** Valor de `--queue` del worker, en orden de prioridad. */
    public static function workerList(): string
    {
        return implode(',', array_map(fn (self $queue) => $queue->value, self::cases()));
    }
}
