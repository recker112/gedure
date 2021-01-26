<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;

class BoletaControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testBoletasUpload()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::persistentFake('local');
		
		$file = new File(Storage::path('boleta_test.pdf'));
		$fileUpload = new UploadedFile($file->getPathName(), $file->getFileName(), $file->getMimeType(), null, true);
		
		$response = $this->postJson('/api/v1/boleta', [
			'boletas' => [$fileUpload],
			'lapso' => '1',
		]);

		$response->assertStatus(200);
	}
}
