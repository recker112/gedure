<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
			'title' => 'required|string|min:6|max:100',
			'content' => 'required|string|min:10',
			'only_users' => 'required',
			'delete_portada' => 'nullable',
			'delete_galery' => 'nullable',
			'portada' => 'nullable|mimes:png,jpeg,jpg',
			'galery' => 'nullable',
			'galery.*' => 'nullable|max:5120|mimes:png,jpeg,jpg'
		];
	}
}
