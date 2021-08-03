<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FindLikeRequest extends FormRequest
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
			'search' => 'nullable|string',
			'privilegio' => 'nullable|string',
			'id_lote_deuda' => 'nullable|numeric',
			'not_registred' => 'nullable|boolean',
			'limit' => 'nullable|numeric',
		];
	}
}
