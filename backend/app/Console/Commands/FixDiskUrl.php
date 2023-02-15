<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

// Models
use App\Models\User;
use App\Models\Gedure\Post;

class FixDiskUrl extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:text';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Arregla errores en los textos UTF-8';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // NOTA(RECKER): Mini fix
        $fixNames = User::latest()->get();

        $u=0;
        foreach($fixNames as $user) {
            $user->name = mb_convert_case(trim($user->name), MB_CASE_LOWER, "UTF-8");
            $user->email = mb_convert_case(trim($user->email), MB_CASE_LOWER, "UTF-8");
            $user->save();

            $u++;
        }


        $this->info("Nombre de usuarios arreglados: $u");
        return 0;
    }
}
