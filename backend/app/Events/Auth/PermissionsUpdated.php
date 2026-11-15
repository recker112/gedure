<?php

namespace App\Events\Auth;

use App\Enums\QueueName;
use App\Models\User;
use App\Services\Auth\AuthService;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\Attributes\Queue;
use Illuminate\Queue\SerializesModels;

/**
 * Los permisos o roles del usuario han cambiado. Viaja por Reverb a su canal
 * personal (`private-App.Models.User.{id}`, ver routes/channels.php) como
 * `.permissions.updated`, con el mismo `{permissions, roles, is_owner}` que la
 * respuesta de sesión (AuthService::accessPayload).
 *
 * Se emite en cola (ShouldBroadcast) y tras el commit; el payload se calcula al
 * emitir (en el worker), así que refleja el estado más reciente aunque se
 * encolen varios seguidos.
 */
#[Queue(QueueName::Events)]
class PermissionsUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public bool $afterCommit = true;

    public function __construct(public User $user) {}

    public function broadcastOn(): array
    {
        return [new PrivateChannel('App.Models.User.'.$this->user->getKey())];
    }

    public function broadcastAs(): string
    {
        return 'permissions.updated';
    }

    public function broadcastWith(): array
    {
        return app(AuthService::class)->accessPayload($this->user);
    }
}
