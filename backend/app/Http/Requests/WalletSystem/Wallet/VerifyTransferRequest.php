<?php

namespace App\Http\Requests\WalletSystem\Wallet;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

// Rules
use App\Rules\WalletSystem\Wallet\UserTransferVerifyRule;
use App\Rules\WalletSystem\Wallet\BalanceVerifyRule;

class VerifyTransferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'username' => ['required', 'string', new UserTransferVerifyRule()],
            'amount_to_transfer' => ['required', 'numeric', 'gt:0', new BalanceVerifyRule()],
            'reason' => ['nullable', 'string', 'min:4', 'max:50'],
        ];
    }
}
