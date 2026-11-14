<?php

namespace App\Mail\Auth;

use App\Enums\QueueName;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\Attributes\Queue;
use Illuminate\Queue\SerializesModels;

/**
 * Correo con el código para restablecer la contraseña.
 * Se encola con `Mail::to(...)->queue(...)`.
 */
#[Queue(QueueName::High)]
class SecurityCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param  string  $code  Código de seguridad de 6 caracteres.
     * @param  string  $expireAt  Caducidad en formato legible (p. ej. "en 15 minutos").
     */
    public function __construct(
        public string $code,
        public string $expireAt,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Código de seguridad',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.auth.security-code',
            text: 'mail.auth.security-code-text',
        );
    }
}
