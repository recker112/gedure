<?php

namespace App\Http\Requests\wallet_system;

use Illuminate\Foundation\Http\FormRequest;

class WalletEditRequest extends FormRequest
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
			'data' => 'required|array',
			'data.*.reason' => 'required|string',
			'data.*.amount' => 'required|numeric',
		];
	}
}
