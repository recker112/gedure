<?php

namespace App\Http\Requests\wallet_system;

use Illuminate\Foundation\Http\FormRequest;

class DebtRequest extends FormRequest
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
			'motivo' => 'required|string',
			'cantidad_pagar' => 'required|numeric|min:1',
			'type' => 'required|string',
			'cursos' => 'nullable|array',
			'cursos.*' => 'numeric',
			'selected_users' => 'nullable|array',
			'selected_users.*' => 'numeric',
		];
	}
}
