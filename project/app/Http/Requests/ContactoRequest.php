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
			'nombre' => 'required|string|min:8|max:50',
			'email' => 'required|email|unique:contactos',
			'telefono' => 'required|string|min:8|max:12',
			'asunto' => 'required|string|min:4|max:30',
			'content' => 'required|string|min:10|max:750'
		];
	}
}
