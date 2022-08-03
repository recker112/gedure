<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;

class SocketsNotification extends Notification
{
    use Queueable;
    
    public string $title;
    public string $content;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $title, string $content)
    {
        $this->title = $title;
        $this->content = $content;
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

    public function toArray($notifiable)
    {
        return [
            'msg_type' => $this->title,
            'msg_title' => 
            'content' => $this->content,
            'count_notify' => $notifiable->notifications->count() + 1,
        ];
    }
}
