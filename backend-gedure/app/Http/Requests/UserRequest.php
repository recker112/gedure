<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
			'username' => 'required|string|unique:users|min:3|max:30',
			'name' => 'required|string|min:3|max:255',
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
	
	/**
	 * Get hte error messages.
	 *
	 * @return array
	 */
	public function messages()
	{
		return [
			'username.unique' => 'El usuario o cédula ya existe en el sistema',
			'email.unique' => 'El correo ya existe en el sistema',
		];
	}
}
