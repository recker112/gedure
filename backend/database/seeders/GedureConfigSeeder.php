<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GedureConfig;

class GedureConfigSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		// Pagos
		$user = GedureConfig::create([
			'name' => 'gc_mensualidad',
			'value' => 4,
		]);

		$user = GedureConfig::create([
			'name' => 'gc_inscripción',
			'value' => 2,
		]);
	}
}
