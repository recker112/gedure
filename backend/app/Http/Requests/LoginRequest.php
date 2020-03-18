<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'user' => 'required|string|min:4',
            'pass' => 'required|string|min:4',
            'checkbox' => 'required',
        ];
    }

    public function messages()
    {
        /*
            Custom message
            GLOBAL [propiedad] = required
            ESPECIFICO [value].[propiedad] = user.required
        */
        return [
            'required' => 'Campo obigatorio',
            'string' => 'No válido',
            'min' => 'No válido',
        ];
    }
}
