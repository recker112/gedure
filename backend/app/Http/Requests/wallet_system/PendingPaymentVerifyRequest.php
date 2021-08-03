<?php

namespace App\Http\Requests\wallet_system;

use Illuminate\Foundation\Http\FormRequest;

class PendingPaymentVerifyRequest extends FormRequest
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
			'reference' => 'required|digits_between:6,8',
			'amount' => 'required|numeric',
			'code' => 'required|digits:4',
			'date' => 'required|date',
		];
	}
}
