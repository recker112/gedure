<?php

namespace Database\Factories\WalletSystem;

use App\Models\WalletSystem\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
	/**
	 * The name of the factory's corresponding model.
	 *
	 * @var string
	 */
	protected $model = Transaction::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		return [
			'user_id' => 1,
			'exonerante_id' => null,
			'transable_id' => null,
			'transable_type' => null,
			'type' => $this->faker->randomElement(['deuda', 'transferencia', 'pago verificado']),
			'payload' => json_encode([
				'data' => [
					[
						'reason' => 'Testing 1',
						'amount' => $this->faker->numerify('#######'),
					]
				],
			]),
			'amount' => $this->faker->numerify('#######'),
			'previous_balance' => $this->faker->numerify('#######'),
			'payment_method' => $this->faker->randomElement(['transferencia o depósito bancario', 'saldo disponible', 'otros']),
			'exonerado' => 0,
		];
	}
}
