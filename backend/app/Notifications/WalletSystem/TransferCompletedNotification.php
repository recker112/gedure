<?php

namespace App\Notifications\WalletSystem;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

// Models
use App\Models\User;

class TransferCompletedNotification extends Notification
{
    use Queueable;
    
    protected float $amount;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(float $amount, float $newBalance, int $manual = 0)
    {
        $this->amount = $amount;
        $this->newBalance = $newBalance;
        $this->manual = $manual;
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
            'balance' => $this->newBalance,
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
            'balance' => $this->amount,
            'manual' => $this->manual,
        ];
    }
}
