<?php

namespace Database\Factories;

use App\Models\Log;
use Illuminate\Database\Eloquent\Factories\Factory;

class LogFactory extends Factory
{
	/**
	 * The name of the factory's corresponding model.
	 *
	 * @var string
	 */
	protected $model = Log::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		return [
			'user_id' => rand(1,5),
			'type' => $this->faker->randomElement(['session', 'gedure', 'user', 'class']),
			'action' => $this->faker->text,
		];
	}
}
