<?php

namespace App\Notifications\WalletSystem;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

// Models
use App\Models\WalletSystem\BankAccount;

class BankTransactionsProcessedNotification extends Notification
{
    use Queueable;

    public BankAccount $bank_account;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(BankAccount $bank_account)
    {
        $this->bank_account = $bank_account;
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
            'bank_account' => [
                'n_account' => $this->bank_account->n_account,
                'name' => $this->bank_account->name,
                'email' => $this->bank_account->email,
            ],
        ];
    }
}
