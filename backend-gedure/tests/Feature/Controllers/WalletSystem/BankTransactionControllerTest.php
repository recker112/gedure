<?php

namespace Tests\Feature\Controllers\WalletSystem;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

// Excel
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\BankTransactionImport;

// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\WalletSystem\BankAccount;
use App\Models\WalletSystem\BankTransaction;

class BankTransactionControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testIndexTransaction()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$bank_account = BankAccount::factory()->create();
		$bank_transactions = BankTransaction::factory(10)->create([
			'user_id' => 1,
		]);
		
		$response = $this->getJson('/api/v1/bank-transaction?per_page=5&page=0');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'reference',
						'concepto',
						'amount',
						'code',
						'user' => [
							'username',
							'privilegio'
						]
					]
				],
				'page',
				'totalRows'
			])
			->assertJsonFragment([
				'totalRows' => 10
			]);
	}
	
	public function testUploadTransaction()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Excel::fake();
		Storage::fake('local');
		
		$bank_account = BankAccount::factory()->create();
		$id = $bank_account->id;
		
		$file = new File(base_path('tests/files_required/EstadoCuenta.xls'));
		$fileUpload = new UploadedFile($file->getPathName(), $file->getFileName(), $file->getMimeType(), null, true);
		
		$response = $this->postJson("/api/v1/bank-account/$id/transaction", [
			'transactions' => $fileUpload
		]);
		
		$response->assertOk();
		
		Excel::assertQueued($file->getFileName());
	}
}
