<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserEditRequest extends FormRequest
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
			'username' => 'nullable|string|unique:users|min:3|max:30',
			'name' => 'nullable|string|min:3|max:255',
			'privilegio' => 'nullable|string|min:2|max:4',
			'email' => 'nullable|email|unique:users',
			'password' => 'nullable|string|min:4',
			'avatar' => 'nullable|mimes:png,jpeg,jpg',
			'delete_avatar' => 'nullable|string',
			'curso' => 'nullable|min:1|max:4',
			'seccion' => 'nullable|min:1|max:4',
			'permissions' => 'nullable|array',
			'permissions.*' => 'nullable|boolean',
			'personalData' => 'nullable|array',
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
