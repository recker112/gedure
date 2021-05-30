<?php

namespace Database\Factories\WalletSystem;

use App\Models\WalletSystem\BankTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class BankTransactionFactory extends Factory
{
	/**
	 * The name of the factory's corresponding model.
	 *
	 * @var string
	 */
	protected $model = BankTransaction::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		return [
			'bank_account_id' => 1,
			'user_id' => null,
			'reference' => $this->faker->numerify('###'),
			'concepto' => $this->faker->numerify('###'),
			'amount' => $this->faker->numerify('#######'),
			'date' => $this->faker->date(),
			'code' => $this->faker->randomElement(['0102', '0104', '0105']),
		];
	}
}
