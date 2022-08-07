<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

// Models
use App\Models\User;

// Notifications
use App\Notifications\SocketsNotification;

class SendNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:send {title} {content}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envia notificaciones a todos los usuarios registrados en el sistema';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $allUsers = User::get();

        $i = 0;
        foreach($allUsers as $user) {
            $user->notify(new SocketsNotification($this->argument('title'), $this->argument('content')));
            $i++;
        }

        $this->info("Notificaciones enviadas: $i");
        return 0;
    }
}
