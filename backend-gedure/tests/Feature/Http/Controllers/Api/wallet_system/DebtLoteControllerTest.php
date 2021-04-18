<?php

namespace Tests\Feature\Http\Controllers\Api\wallet_system;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Curso;

class DebtLoteControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testCreateDebt()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
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
		}
		
		$response = $this->postJson('/api/v1/deuda/lote', [
			'motivo' => 'Mensualidad Abril 2021',
			'cantidad_pagar' => 600000.93,
			'type' => 'cursos',
			'cursos' => [1],
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
	}
	
	public function testCreateDebtWithUsersSelected()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
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
		}
		
		$response = $this->postJson('/api/v1/deuda/lote', [
			'motivo' => 'Mensualidad Abril 2021',
			'cantidad_pagar' => 600000.93,
			'type' => 'selected',
			'selected_users' => [$users[0]->id, $users[1]->id, $users[2]->id]
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
	}
	
	public function testIndex()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$this->testCreateDebt();
		
		$response = $this->getJson('/api/v1/deuda/lote?per_page=5&page=0&search=Mensualidad');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'reason',
						'amount_to_pay',
						'created_at'
					]
				],
				'page',
				'totalRows'
			]);
	}
	
	public function testEdit()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$this->testCreateDebt();
		
		$response = $this->putJson('/api/v1/deuda/lote/1', [
			'motivo' => 'Nuevo motivo',
			'new_price' => 700.30,
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
}
