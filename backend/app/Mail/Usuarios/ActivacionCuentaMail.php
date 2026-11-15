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
 * Enlace para activar una cuenta creada por administración: la persona elige
 * su contraseña en `/auth/activar/{token}` de la SPA (docs/fases/fase-1-usuarios.md
 * §6). Nunca lleva una contraseña. Cola `high`: lo pide alguien con la ficha
 * abierta (alta y reenvío). Solo datos escalares; se encola desde
 * `ActivacionService` con `afterCommit()`.
 */
#[Queue(QueueName::High)]
class ActivacionCuentaMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param  string  $url  Enlace con el token en claro.
     * @param  string  $name  Nombre de la persona.
     * @param  string  $username  Usuario (cédula) con el que iniciará sesión.
     * @param  string|null  $enviadaPor  Nombre de quien envió el enlace.
     * @param  string  $caduca  Caducidad legible ("dentro de 7 días").
     */
    public function __construct(
        public string $url,
        public string $name,
        public string $username,
        public ?string $enviadaPor,
        public string $caduca,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Activa tu cuenta de Gedure',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.usuarios.activacion',
            text: 'mail.usuarios.activacion-text',
        );
    }
}
