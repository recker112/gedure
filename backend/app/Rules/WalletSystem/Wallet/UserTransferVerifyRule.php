<?php

namespace App\Rules\WalletSystem\Wallet;

use Illuminate\Contracts\Validation\Rule;

use App\Models\User;

class UserTransferVerifyRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $user = User::firstWhere('username', $value);

        return $user && $user->id !== request()->user()->id;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El usuario o cédula no existe';
    }
}
