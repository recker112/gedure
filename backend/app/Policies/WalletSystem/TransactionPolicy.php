<?php

namespace App\Policies\WalletSystem;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TransactionPolicy
{
    use HandlesAuthorization;

    public function index(User $user)
    {
        return true;
    }
}
