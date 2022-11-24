<?php

namespace App\Http\Requests\wallet_system;

use Illuminate\Foundation\Http\FormRequest;

class DebtLoteEditRequest extends FormRequest
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
			'reason' => 'required|string',
			'amount_to_pay' => 'required|numeric|min:1',
			'exchange_rate_type' => 'required|in:Bs.,$',
			'important' => 'nullable|boolean',
			'type' => 'nullable|string',
			'selected_users' => 'nullable|array',
			'selected_users.*' => 'numeric',
			'cursos' => 'nullable|array',
			'cursos.*' => 'numeric',
		];
	}
}
