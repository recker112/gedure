<?php

namespace App\Http\Requests\wallet_system;

use Illuminate\Foundation\Http\FormRequest;

class BankAccountRequest extends FormRequest
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
	 * @return array
	 */
	public function rules()
	{
		return [
			'n_account' => 'required|string|max:20|unique:bank_accounts',
			'rif' => 'required|string',
			'name' => 'required|string|max:100',
			'email' => 'required|email',
			'type' => 'required|string|in:corriente,ahorro',
			'code' => 'required|string|max:4',
		];
	}
}
