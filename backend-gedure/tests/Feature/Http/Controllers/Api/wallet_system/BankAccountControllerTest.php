<?php

namespace Tests\Feature\Http\Controllers\Api\wallet_system;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BankAccountControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testExample()
	{
		//$this->withoutExceptionHandling();
		$response = $this->get('/');

		$response->assertStatus(200);
	}
}
