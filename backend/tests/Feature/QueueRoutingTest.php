<?php

use App\Enums\QueueName;
use App\Mail\Account\PasswordChangedMail;
use App\Mail\Auth\SecurityCodeMail;
use App\Mail\Auth\TfaCodeMail;
use App\Mail\Usuarios\ActivacionCuentaMail;
use App\Mail\Usuarios\CorreoCambiadoMail;
use Illuminate\Mail\SendQueuedMailable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;

/**
 * Cada Mailable cae en la cola que le corresponde (misma tabla que blulablel).
 * Si falla, el correo se encola en una cola que el worker quizá no escucha.
 */
dataset('mailables', [
    'TfaCodeMail' => [fn () => new TfaCodeMail('ABC123', 'en 15 minutos'), QueueName::High],
    'SecurityCodeMail' => [fn () => new SecurityCodeMail('ABC123', 'en 15 minutos'), QueueName::High],
    'PasswordChangedMail' => [fn () => new PasswordChangedMail('Ana', 'hoy', true), QueueName::Emails],
    'ActivacionCuentaMail' => [fn () => new ActivacionCuentaMail('https://x.test/auth/activar/abc', 'Ana', '12345678', 'Luis', 'dentro de 7 días'), QueueName::High],
    'CorreoCambiadoMail' => [fn () => new CorreoCambiadoMail('Ana', 'a***@example.com'), QueueName::Emails],
]);

it('encola cada Mailable en su cola', function (Closure $make, QueueName $cola) {
    Queue::fake();

    $mailable = $make();
    Mail::to('prueba@example.test')->queue($mailable);

    Queue::assertPushedOn($cola->value, SendQueuedMailable::class, fn ($job) => $mailable::class === $job->mailable::class);
})->with('mailables');

it('el worker escucha todas las colas por prioridad', function () {
    expect(QueueName::workerList())->toBe('high,events,default,emails');

    // El directorio docker/ no se monta dentro del contenedor de la app.
    foreach (['dev', 'prod'] as $entorno) {
        $ruta = base_path("../docker/$entorno/entrypoint.sh");
        if (is_file($ruta)) {
            expect(file_get_contents($ruta))->toContain('--queue='.QueueName::workerList());
        }
    }
});
