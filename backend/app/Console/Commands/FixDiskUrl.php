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
    protected $signature = 'fix:url';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Arregla errores en los url de migraciones antiguas';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // NOTA(RECKER): Arreglar tabla users
        $allUsers = User::where('avatar', '!=', null)->get();

        $usersUpdateds = 0;
        foreach($allUsers as $user) {
            $match = strpos($user->avatarOriginal, 'avatars');

            if ($match === false) {
                $user->avatar = 'avatars/'.$user->avatarOriginal;
                $user->save();
                $usersUpdateds++;
            }
        }

        // NOTA(RECKER): Arreglar tabla posts
        $allPostsPortada = Post::where('portada', '!=', null)->get();

        $portadasUpdateds = 0;
        foreach($allPostsPortada as $post) {
            $match = strpos(json_decode($post->portada), 'posts');

            if ($match === false) {
                $post->portada = json_encode('posts/'.json_decode($post->portada));
                $post->save();
                $portadasUpdateds++;
            }
        }

        $allPostsGalery = Post::where('galery', '!=', null)->get();

        $galerysUpdateds = 0;
        foreach($allPostsGalery as $post) {
            $galery = json_decode($post->galery);
            $newGalery = [];

            $u = 0;
            foreach($galery as $key => $img) {
                $match = strpos($img, 'posts');
                $newImg = $match === false ? "posts/$img" : $img;

                $newGalery[$key] = $newImg;

                if ($match === false) { $galerysUpdateds++; }
            }

            $post->galery = json_encode($newGalery);
            $post->save();
        }


        $this->info("Avatars arreglados: $usersUpdateds");
        $this->info("Portadas arregladas: $portadasUpdateds");
        $this->info("Galerys arregladas: $galerysUpdateds");
        return 0;
    }
}
