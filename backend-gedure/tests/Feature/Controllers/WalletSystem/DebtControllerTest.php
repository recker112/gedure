<?php

namespace Tests\Feature\Controllers\WalletSystem;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Gedure\Curso;
use App\Models\WalletSystem\DebtLote;
use App\Models\WalletSystem\Debt;

class DebtControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function createDebts() {
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);
		
		$debt_lote = DebtLote::create([
			'reason' => 'Test',
			'amount_to_pay' => 40000,
		]);
		
		// Users creator
		$users = User::factory(10)->create([
			'privilegio' => 'V-',
		]);
		foreach($users as $user) {
			$user->alumno()->create([
				'n_lista' => 99,
				'curso_id' => $curso->id,
			]);

			$user->debts()->create([
				'debt_lote_id' => $debt_lote->id,
			]);
		}
	}
	
	public function testIndex()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$this->createDebts();
		
		$response = $this->getJson('/api/v1/deuda/lote/users/1?per_page=5&page=0');
		
		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'status',
						'updated_at',
						'user' => [
							'id',
							'privilegio',
							'username',
							'name'
						],
						'transaction',
					]
				],
				'page',
				'totalRows'
			]);
	}
}
