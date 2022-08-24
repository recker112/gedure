<?php

namespace App\Policies\WalletSystem;

use App\Models\User;
use App\Models\WalletSystem\Debt;
use Illuminate\Auth\Access\Response;
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

    public function pay(User $user, Debt $debt)
    {
        if ($user->privilegio !== 'V-' || $user->id !== $debt->user->id) {
            return Response::denyWithStatus(404);
        }

        return true;
    }
}
