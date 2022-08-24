<?php

namespace App\Policies\WalletSystem;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DebtPolicy
{
    use HandlesAuthorization;

    public function index(User $user)
    {
        if ($user->privilegio !== 'V-') {
            return false;
        }

        return true;
    }
}
