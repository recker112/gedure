<?php

namespace App\Jobs\WalletSystem;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

// Models
use App\Models\User;
use App\Models\WalletSystem\BankAccount;

// Notifications
use App\Notifications\WalletSystem\BankTransactionsProcessedNotification;

class NotiftyBankTransactionCompleted implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public User $user;
    public BankAccount $bank_account;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, BankAccount $bank_account)
    {
        $this->user = $user;
        $this->bank_account = $bank_account;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->user->notify(new BankTransactionsProcessedNotification($this->bank_account));
    }
}
