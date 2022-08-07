<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

// Models
use App\Models\User;

class ClearNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Limpiar todas las notificaciones de cada usuario';

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
            $i += $user->notifications->count();
            $user->notifications()->delete();
        }

        $this->info("Notificaciones limpiadas: $i");
        return 0;
    }
}
