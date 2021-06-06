<?php

namespace Tests\Feature\Controllers\WalletSystem;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

// Passport
use Laravel\Passport\Passport;

// Models
use App\Models\User;

class WalletControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testIndex()
	{
		//$this->withoutExceptionHandling();
		$response = $this->get('/');

		$response->assertStatus(200);
	}
}
