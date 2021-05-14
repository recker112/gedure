<?php

namespace Database\Factories\WalletSystem;

use App\Models\WalletSystem\BankAccount;
use Illuminate\Database\Eloquent\Factories\Factory;

class BankAccountFactory extends Factory
{
	/**
	 * The name of the factory's corresponding model.
	 *
	 * @var string
	 */
	protected $model = BankAccount::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		return [
			'n_account' => $this->faker->numerify('####################'),
			'rif' => $this->faker->numerify('########-#'),
			'name' => $this->faker->unique()->name,
			'email' => $this->faker->unique()->safeEmail,
			'type' => $this->faker->randomElement(['corriente', 'ahorro']),
			'code' => $this->faker->numerify('####'),
		];
	}
}
