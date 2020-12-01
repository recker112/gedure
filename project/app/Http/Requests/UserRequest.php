<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
			'cedula' => 'required|string|min:3|max:30',
			'nombre' => 'required|string|min:8|max:90',
			'privilegio' => 'required|string|min:2|max:4',
			'email' => 'required|email|unique:users',
			'password' => 'nullable|string|min:4',
			'curso' => 'nullable|min:1|max:4',
			'seccion' => 'nullable|min:1|max:4',
			'permissions' => 'nullable|array',
			'permissions.*' => 'nullable|boolean',
			'super_admin' => 'nullable|boolean',
		];
	}
}
