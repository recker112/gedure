<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WalletSystem\ExchangeRate;

class ExchangeRateSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		ExchangeRate::create([
			'type' => 'USD',
			'amount' => 5.31
		]);
	}
}
