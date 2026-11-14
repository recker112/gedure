<?php

namespace App\Mail\Account;

use App\Enums\QueueName;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\Attributes\Queue;
use Illuminate\Queue\SerializesModels;

/**
 * Aviso a la persona de que la contraseña de su cuenta se cambió. Sin enlaces:
 * solo pide contactar con la administración del colegio si no fue ella. Solo
 * datos escalares; se encola desde `PasswordChange` con `afterCommit()`.
 */
#[Queue(QueueName::Emails)]
class PasswordChangedMail extends Mailable
{
    use Queueable, SerializesModels;

    /** Zona horaria en la que se muestra la fecha del cambio (Venezuela). */
    public const DISPLAY_TIMEZONE = 'America/Caracas';

    /**
     * @param  string  $name  Nombre de la persona.
     * @param  string  $changedAt  Fecha y hora del cambio, ya formateada; se
     *                             calcula al construir, no al renderizar desde la cola.
     * @param  bool  $reset  Si se restableció con el código (se cerraron todas
     *                       las sesiones) o se cambió desde la cuenta (las demás).
     */
    public function __construct(
        public string $name,
        public string $changedAt,
        public bool $reset,
    ) {}

    public static function for(User $user, bool $reset): self
    {
        $changedAt = ($user->password_changed_at ?? now())
            ->copy()
            ->setTimezone(self::DISPLAY_TIMEZONE)
            ->locale('es')
            ->isoFormat('D [de] MMMM [de] YYYY [a las] HH:mm [(hora de Venezuela)]');

        return new self($user->name, $changedAt, $reset);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'La contraseña de tu cuenta ha cambiado',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.account.password-changed',
            text: 'mail.account.password-changed-text',
        );
    }
}
