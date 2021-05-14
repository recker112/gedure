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

class BankTransactionControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testUploadTransaction() {
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
