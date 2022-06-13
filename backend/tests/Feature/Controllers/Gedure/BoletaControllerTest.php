<?php

namespace Tests\Feature\Controllers\Gedure;

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
use App\Models\Gedure\Boleta;
use App\Models\Gedure\Curso;

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
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);
		
		// User Boleta
		$user = User::factory()->create([
			'privilegio' => 'V-',
			'username' => '40000000',
		]);
		$user->alumno()->create([
			'n_lista' => 99,
			'curso_id' => $curso->id,
		]);
		
		Storage::fake('local');
		
		$file = new File(base_path('tests/files_required/test_boleta_1.zip'));
		$fileUpload = new UploadedFile($file->getPathName(), $file->getFileName(), $file->getMimeType(), null, true);

		$response = $this->postJson('/api/v1/boleta', [
			'boletas' => $fileUpload,
			'lapso' => '1',
		]);

		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
		
		$this->assertDatabaseHas('boletas', [
        'id' => 1,
    ]);
	}
	
	public function testBoletasUploadWithMassiveStudiends()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('local');
		
		$file = new File(base_path('tests/files_required/data_studiends.xlsx'));
		$fileUpload = new UploadedFile($file->getPathName(), $file->getFileName(), $file->getMimeType(), null, true);
		
		$response = $this->postJson('/api/v1/user/matricula', [
			'database' => $fileUpload,
		]);
		
		$file = new File(base_path('tests/files_required/test_boleta_2.zip'));
		$fileUpload = new UploadedFile($file->getPathName(), $file->getFileName(), $file->getMimeType(), null, true);
		
		$response = $this->postJson('/api/v1/boleta', [
			'boletas' => $fileUpload,
			'lapso' => '1',
		]);

		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
	}
	
	public function testGetUsersWithBoletas()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$this->testBoletasUpload();
		$user = User::factory()->create([
			'privilegio' => 'V-',
		]);
		$user->alumno()->create([
			'n_lista' => 1,
			'curso_id' => 1,
		]);
		
		$response = $this->getJson('/api/v1/boleta?per_page=5&page=0&seccion=A&curso=1');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'data' => [
					'*' => [
						'username',
						'name',
						'avatar',
						'privilegio',
						'boletas_count',
						'n_lista',
					]
				],
				'page',
				'totalRows'
			]);
	}
	
	public function testShowBoletas()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$this->testBoletasUpload();
		
		$response = $this->getJson('/api/v1/boleta/'.Boleta::find(1)->user_id);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'boletas' => [
					'*' => [
						'id',
						'lapso',
						'created_at',
						'updated_at',
						'fecha_humano',
						'fecha_humano_modify',
						'curso' => [
							'curso',
							'seccion'
						],
					]
				],
				'user'
			]);
	}
	
	public function testGetBoletaUser()
	{
		//$this->withoutExceptionHandling();
		$this->testBoletasUpload();
		
		Passport::actingAs(
			User::find(2),
			['user']
		);
		
		$response = $this->getJson('/api/v1/boletas');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'*' => [
					'id',
					'lapso',
					'created_at',
					'updated_at',
					'fecha_humano',
					'fecha_humano_modify',
					'curso' => [
						'curso',
						'seccion'
					],
				]
			]);
	}
	
	public function testEditBoleta()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$this->testBoletasUpload();
		
		$file = new File(base_path('tests/files_required/test_boleta_edit.pdf'));
		$fileUpload = new UploadedFile($file->getPathName(), $file->getFileName(), $file->getMimeType(), null, true);
		
		$response = $this->putJson('/api/v1/boleta/1', [
			'boleta' => $fileUpload,
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testDownloadBoleta()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('local');
		
		$this->testBoletasUpload();
		
		$response = $this->getJson('/api/v1/download/boleta/1');
		
		$response->assertStatus(200);
		
		$filename = explode("/", Boleta::find(1)->boleta);
		$filename = $filename[count($filename) - 1];
		
		$this->assertTrue($response->headers->get('content-disposition') == 'attachment; filename=' . $filename . '');
	}
	
	public function testDownloadBoletaUser()
	{
		//$this->withoutExceptionHandling();
		
		Storage::fake('local');
		
		$this->testBoletasUpload();
		
		$user = User::firstWhere('username', '40000000');
		$user->givePermissionTo('boleta_download');
		Passport::actingAs(
			$user,
			['user']
		);
		
		$response = $this->getJson('/api/v1/download/boleta/1');
		
		$response->assertStatus(200);
		
		$filename = explode("/", Boleta::find(1)->boleta);
		$filename = $filename[count($filename) - 1];
		
		$this->assertTrue($response->headers->get('content-disposition') == 'attachment; filename=' . $filename . '');
	}
	
	public function testDeleteBoleta()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('local');
		
		$this->testBoletasUpload();
		
		$response = $this->deleteJson('/api/v1/boleta/1');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testDeleteBoletaMassive()
	{
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('local');
		
		$this->testBoletasUpload();
		
		$ids = json_encode([User::where('username', '40000000')->first()->id]);
		
		$response = $this->deleteJson('/api/v1/massive/boleta?ids='.urlencode($ids).'&lapso=1');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
	}
}
