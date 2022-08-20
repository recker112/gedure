<?php

namespace App\Policies\Gedure;

use Illuminate\Auth\Access\Response;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        if ($user->wallet) {
            return  false;
        }

        return true;
    }
}
