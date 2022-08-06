<?php

namespace App\Notifications\Gedure;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class ProcessBoletasCompletedNotification extends Notification
{
    use Queueable;

    protected string $title;
    protected int $inserts;
    protected int $updateds;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $title, int $inserts, int $updateds)
    {
        $this->title = $title;
        $this->inserts = $inserts;
        $this->updateds = $updateds;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast', 'database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'count_notify' => $notifiable->unreadNotifications->count() + 1,
        ]);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'title' => $this->title,
            'inserts' => $this->inserts,
            'updateds' => $this->updateds,
        ];
    }
}
