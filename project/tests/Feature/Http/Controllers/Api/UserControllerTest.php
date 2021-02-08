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
use App\Models\Boleta;
use App\Models\PersonalDataUser;

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
		
		$response = $this->getJson('/api/v1/user?per_page=5&page=0');
		
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
		
		Curso::create([
			'code' => '5-A',
			'curso' => '5',
			'seccion' => 'A',
		]);
		
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
		$admin = User::find(1);
		Passport::actingAs(
			$admin,
			['admin']
		);
		
		Curso::create([
			'code' => '5-A',
			'curso' => '5',
			'seccion' => 'A',
		]);
		
		$response = $this->postJson('/api/v1/user', [
			'username' => $admin->username,
			'name' => 'Luis Enrrique',
			'email' => $admin->email,
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
		
		$response->assertStatus(422)
			->assertJsonValidationErrors(['username', 'email']);
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
		
		Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);
		
		$users = User::factory(10)->create([
			'privilegio' => 'V-',
		]);
		
		$response = $this->putJson('/api/v1/massive/user/seccion',[
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
		
		Storage::fake('local');
		
		$file = new File(base_path('tests/files_required/data_studiends.xlsx'));
		$fileUpload = new UploadedFile($file->getPathName(), $file->getFileName(), $file->getMimeType(), null, true);
		
		$response = $this->postJson('/api/v1/user/matricula', [
			'database' => $fileUpload,
		]);

		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
		
		Excel::assertQueued($file->getFileName());
	}
	
	public function testIndexDeletedUsers()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$users = User::factory(3)->create();
		
		foreach($users as $user) {
			$user->delete();
		}
		
		$response = $this->getJson('/api/v1/user-disabled?per_page=5&page=0');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'data' => [
					'*' => [
						'username',
						'name',
						'privilegio',
						'email',
					]
				],
				'page',
				'totalUsers'
			])
			->assertJson([
				'totalUsers' => count($users),
			]);
	}
	
	public function testRestoreDeletedUser()
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
		
		$user = User::factory()->create([
			'privilegio' => 'V-'
		]);
		$user->personalData(false)->create();
		$user->alumno()->create([
			'curso_id' => $curso->id,
			'n_lista' => 10,
		]);
		$user->boletas()->create([
			'curso_id' => $curso->id,
			'boleta' => 'test',
			'lapso' => '1'
		]);
		
		$user->delete();
		
		$response = $this->getJson('/api/v1/user-disabled/restore/'.$user->id);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testRestoreDeletedUserMassive()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$users = User::factory(3)->create();
		
		foreach($users as $user) {
			$user->delete();	
		}
		
		$ids = json_encode([2,3,4]);
		
		$response = $this->getJson('/api/v1/user-disabled/restore?ids='.urlencode($ids));
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			])
			->assertJson([
				'users_restored' => 3,
			]);
	}
	
	public function testDestroyUser()
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
		
		$user = User::factory()->create([
			'privilegio' => 'V-'
		]);
		$user->personalData(false)->create();
		$user->alumno()->create([
			'curso_id' => $curso->id,
			'n_lista' => 10,
		]);
		$user->boletas()->create([
			'curso_id' => $curso->id,
			'boleta' => 'test',
			'lapso' => '1'
		]);
		
		$user->delete();
		
		$response = $this->deleteJson('/api/v1/user-disabled/'.$user->id);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testDestroyUserMassive()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$users = User::factory(3)->create();
		
		foreach($users as $user) {
			$user->personalData(false)->create();
			$user->delete();
		}
		
		$ids = json_encode([2,3,4]);
		
		$response = $this->deleteJson('/api/v1/user-disabled?ids='.urlencode($ids));
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			])
			->assertJson([
				'users_destroy' => 3,
			]);
	}
	
	public function testEditSelf()
	{
		//$this->withoutExceptionHandling();
		
		$user = User::factory()->create([
			'privilegio' => 'A-'
		]);
		$user->personalData(false)->create();
		
		Passport::actingAs(
			$user,
			['admin']
		);
		
		$response = $this->putJson('/api/v1/user', [
			'personalData' => [
				'telefono' => '4269340569'
			]
		]);
		
		$response->assertOk()
			->assertJsonStructure([
				'user' => [
					'id',
					'username',
					'personal_data' => [
						'telefono'
					]
				],
			])
			->assertJsonPath('user.personal_data.telefono', '4269340569');
	}
}
