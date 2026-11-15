<?php

namespace App\Mail\Usuarios;

use App\Enums\QueueName;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\Attributes\Queue;
use Illuminate\Queue\SerializesModels;

/**
 * Aviso al correo **anterior** de que la administración cambió el correo de la
 * cuenta (`PATCH /usuarios/{id}`). Sin enlaces para revertirlo: solo pide
 * contactar con el colegio si no fue con su conocimiento. Solo datos escalares;
 * se encola desde `UsuarioService` con `afterCommit()`.
 */
#[Queue(QueueName::Emails)]
class CorreoCambiadoMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param  string  $name  Nombre de la persona.
     * @param  string  $nuevo  Correo nuevo, enmascarado (`EmailMask`).
     */
    public function __construct(
        public string $name,
        public string $nuevo,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'El correo de tu cuenta ha cambiado',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.usuarios.correo-cambiado',
            text: 'mail.usuarios.correo-cambiado-text',
        );
    }
}
