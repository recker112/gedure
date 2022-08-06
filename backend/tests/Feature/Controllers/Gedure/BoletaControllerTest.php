<?php

namespace Tests\Feature\Controllers\Gedure;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\File;
use Tests\TestCase;

// Passport
use Laravel\Passport\Passport;

// Models
use App\Models\User;
use App\Models\Gedure\Boleta;
use App\Models\Gedure\Curso;
use App\Models\Gedure\PersonalDataUser;

// Notifications
use App\Notifications\SocketsNotification;
use App\Notifications\Gedure\ProcessBoletasCompletedNotification;

class BoletaControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */

	public function testBoletasUploadWithMassiveStudiends()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('local');
		Notification::fake();
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);
		
		$users = User::factory(4)->create([
			'privilegio' => 'V-',
		]);

		$i = 0;
		foreach($users as $user) {
			$personal_data = PersonalDataUser::create();
			$personal_data->user()->save($user);

			$user->alumno()->create([
				'curso_id' => $curso->id,
				'n_lista' => 10,
			]);

			$user->username = "4000000$i";
			$user->save();

			$i++;
		}
		
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

		Notification::assertSentTo(
				[User::find(1)], ProcessBoletasCompletedNotification::class
		);

		$this->assertDatabaseHas('boletas', [
				'id' => 3,
		]);
	}

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
		Notification::fake();
		
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

		Notification::assertSentTo(
				[$user], SocketsNotification::class
		);
		
		Notification::assertSentTo(
				[User::find(1)], ProcessBoletasCompletedNotification::class
		);

		$this->assertDatabaseHas('boletas', [
        'id' => 1,
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

		Notification::fake();
		
		$file = new File(base_path('tests/files_required/test_boleta_edit.pdf'));
		$fileUpload = new UploadedFile($file->getPathName(), $file->getFileName(), $file->getMimeType(), null, true);
		
		$response = $this->putJson('/api/v1/boleta/1', [
			'boleta' => $fileUpload,
		]);

		Notification::assertSentTo(
			[User::find(2)], SocketsNotification::class
		);
		
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
		Notification::fake();
		
		$this->testBoletasUpload();
		
		$response = $this->deleteJson('/api/v1/boleta/1');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);

		Notification::assertSentTo(
			[User::find(2)], SocketsNotification::class
		);
	}
	
	public function testDeleteBoletaMassive()
	{
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('local');
		Notification::fake();
		
		$this->testBoletasUpload();
		
		$ids = json_encode([User::where('username', '40000000')->first()->id]);
		
		$response = $this->deleteJson('/api/v1/massive/boleta?ids='.urlencode($ids).'&lapso=1');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
		
		Notification::assertSentTo(
			[User::find(2)], SocketsNotification::class
		);
	}
}
