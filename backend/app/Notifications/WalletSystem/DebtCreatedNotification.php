<?php

namespace App\Notifications\WalletSystem;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class DebtCreatedNotification extends Notification
{
    use Queueable;
    
    protected string $title;
    protected float $amount;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $title, float $amount)
    {
        $this->title = $title;
        $this->amount = $amount;
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
            'amount' => $this->amount,
        ];
    }
}