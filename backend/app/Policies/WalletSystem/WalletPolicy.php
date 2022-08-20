<?php

namespace App\Policies\WalletSystem;

use Illuminate\Auth\Access\Response;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class WalletPolicy
{
    use HandlesAuthorization;

    public function verifyWallet(User $user)
    {
        if ($user->wallet->balance === null) {
            return  false;
        }

        return true;
    }
}
