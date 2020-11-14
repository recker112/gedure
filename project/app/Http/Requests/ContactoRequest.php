<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactoRequest extends FormRequest
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
			'nombre' => 'required|min:8|max:50',
			'email' => 'required|email|unique:contactos',
			'telefono' => 'required|numeric',
			'asunto' => 'required|string|min:4|max:150',
			'content' => 'required|string'
		];
	}
}
