<?php

namespace Database\Factories\Gedure;

use App\Models\Gedure\Boleta;
use Illuminate\Database\Eloquent\Factories\Factory;

class BoletaFactory extends Factory
{
	/**
	 * The name of the factory's corresponding model.
	 *
	 * @var string
	 */
	protected $model = Boleta::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		return [
			'curso_id' => 1,
			'user_id' => rand(1,5),
			'boleta' => $this->faker->unique()->imageUrl(640, 480, 'boleta', true),
			'lapso' => rand(1,5),
		];
	}
}
