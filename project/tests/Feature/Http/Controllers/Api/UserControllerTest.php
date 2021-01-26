<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Maatwebsite\Excel\Facades\Excel;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Alumno;
use App\Models\Curso;

class UserControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testGetTableUsers()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/users?per_page=5&page=0');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'data' => [
					'*' => [
						'username',
						'name',
						'privilegio',
						'email',
						'avatar',
					]
				],
				'page',
				'totalUsers'
			]);
	}
	
	public function testShowUser()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/user/1');
		
		$response->assertOk()
			->assertJsonStructure([
				'user' => [
					'id',
					'name',
					'privilegio',
					'personal_data',
					'estudiante_data',	
				],
				'permissions' => [
					'super_admin'
				]
			]);
	}
	
	public function testCreateStudiant()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/user', [
			'username' => 'luis',
			'name' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'V-',
			'password' => '1234',
			'curso' => '5',
			'seccion' => 'A',
			'permissions' => [
				'boletas' => true,
				'horarios' => true,
				'soporte' => true,
				'account_exonerada' => false,
			]
		]);
		
		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('users', [
        'email' => 'test@test.test',
    ]);
	}
	
	public function testCreateAdmin()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/user', [
			'username' => 'luis',
			'name' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'A-',
			'password' => '1234',
			'permissions' => [
				'registros_index' => true,
				'users_index' => true,
				'users_create' => true,
				'users_edit' => true,
			]
		]);
		
		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('users', [
        'email' => 'test@test.test',
    ]);
	}
	
	public function testCreateSuperAdmin()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/user', [
			'username' => 'luis',
			'name' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'A-',
			'password' => '1234',
			'super_admin' => true,
		]);
		
		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('users', [
        'email' => 'test@test.test',
    ]);
	}
	
	public function testEditUser()
	{
		//$this->withoutExceptionHandling();
		
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('public');
		
		$user = User::factory()->create([
			'privilegio' => 'A-'
		]);
		$user->personalData(false)->create();
		
		$avatar = UploadedFile::fake()->image('Universidad.png');
		
		$response = $this->putJson('/api/v1/user/'.$user->id, [
			'username' => 'luis',
			'name' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'password' => '1234',
			'avatar' => $avatar,
			'permissions' => [
				'registros_index' => true,
				'users_index' => true,
			],
			'personalData' => [
				'telefono' => '4269340569'
			]
		]);
		
		$response->assertOk()
			->assertJsonStructure([
				'user' => [
					'id',
					'username',
				],
				'permissions' => [
					'users_index',
					'registros_index',
				]
			]);
		
		$this->assertDatabaseHas('users', [
			'username' => 'luis',
      'email' => 'test@test.test',
			'name' => 'Luis Enrrique',
    ]);
		
		$this->assertDatabaseHas('personal_data_admins', [
			'telefono' => '4269340569',
    ]);
		
		Storage::disk('public')->assertExists('avatars/avatar_'.$user->username.'.png');
	}
	
	public function testErrorCedulaCreateStudiant()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/user', [
			'username' => 'recker',
			'name' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'V-',
			'password' => '1234',
			'permissions' => [
				'boletas' => true,
				'horarios' => true,
				'soporte' => true,
				'account_exonerada' => false,
			]
		]);
		
		$response->assertStatus(422)
			->assertJsonValidationErrors(['username']);
	}
	
	public function testErrorEmailUniqueCreateStudiant()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/user', [
			'cedula' => 'luis',
			'nombre' => 'Luis Enrrique',
			'email' => 'joseortiz112001@gmail.com',
			'privilegio' => 'V-',
			'password' => '1234',
			'permissions' => [
				'boletas' => true,
				'horarios' => true,
				'soporte' => true,
				'account_exonerada' => false,
			]
		]);
		
		$response->assertStatus(422)
			->assertJsonValidationErrors(['email']);
	}
	
	public function testDeleteUser()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$user = User::factory()->create([
			'privilegio' => 'V-'
		]);
		$alumno = Alumno::create([
				'curso_id' => 1,
				'user_id' => $user->id,
				'n_lista' => 99
			]);
		
		$response = $this->deleteJson('/api/v1/user/'.$user->id);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertSoftDeleted($user);	
		$this->assertDeleted($alumno);
	}
	
	public function testDeleteUserMassive()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$users = User::factory(10)->create();
		
		$ids = json_encode([2,3,4,5,6,7,8,9,10,11]);
		
		$response = $this->deleteJson('/api/v1/massive/user?ids='.urlencode($ids));
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertSoftDeleted(User::find(4));
	}
	
	public function testUpdateSeccionMassive()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$users = User::factory(10)->create([
			'privilegio' => 'V-',
		]);
		
		$response = $this->putJson('/api/v1/massive/seccion',[
			'ids' => [2,3,4,5,6,7,8,9,10,11],
			'curso' => '1',
			'seccion' => 'A',
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testUploadMassiveStudiends()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Excel::fake();
		
		// Cursos
		Curso::create([
			'code' => '1A',
			'curso' => '1 año',
			'seccion' => 'A',
		]);
		Curso::create([
			'code' => '1B',
			'curso' => '1 año',
			'seccion' => 'B',
		]);
		Curso::create([
			'code' => '1C',
			'curso' => '1 año',
			'seccion' => 'C',
		]);
		
		Storage::persistentFake('local');
		
		$file = new File(Storage::path('data_studiends.xlsx'));
		$fileUpload = new UploadedFile($file->getPathName(), $file->getFileName(), $file->getMimeType(), null, true);
		
		$response = $this->postJson('/api/v1/user/matricula', [
			'database' => $fileUpload,
		]);

		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);;
		
		Excel::assertQueued($file->getFileName());
	}
}
