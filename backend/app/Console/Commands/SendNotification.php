<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

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

        Notification::send($allUsers, new SocketsNotification($this->argument('title'), $this->argument('content')));

        $this->info("Notificaciones enviadas: ".$allUsers->count());
        return 0;
    }
}
