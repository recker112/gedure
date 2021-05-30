<?php

namespace Database\Factories\Auth;

use App\Models\Auth\RecoveryPassword;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class RecoveryPasswordFactory extends Factory
{
	/**
	 * The name of the factory's corresponding model.
	 *
	 * @var string
	 */
	protected $model = RecoveryPassword::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		return [
			'code' => '12345',
			'user_id' => rand(1,5),
		];
	}
}
