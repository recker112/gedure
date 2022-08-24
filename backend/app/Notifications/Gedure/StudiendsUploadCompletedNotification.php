<?php

namespace App\Notifications\Gedure;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class StudiendsUploadCompletedNotification extends Notification
{
    use Queueable;

    protected int $inserts = 0;
	protected int $updateds = 0;
	protected array $errors = [];

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(int $inserts, int $updateds, array $errors)
    {
        $this->inserts = $inserts;
        $this->updateds = $updateds;
        $this->errors = $errors;
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
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'inserts' => $this->inserts,
            'updateds' => $this->updateds,
            'errors' => $this->errors,
        ];
    }
}
