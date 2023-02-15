<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
	/**
	 * The name of the factory's corresponding model.
	 *
	 * @var string
	 */
	protected $model = User::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		return [
			'username' => $this->faker->unique()->firstName,
			'name' => $this->faker->name,
			'privilegio' => 'A-',
			'avatar' => null,
			'email' => $this->faker->unique()->safeEmail,
			'password' => 'password',
			'actived_at' => now(),
		];
	}
}
