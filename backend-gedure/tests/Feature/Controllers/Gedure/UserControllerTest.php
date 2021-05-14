<?php

namespace Tests\Feature\Controllers\Gedure;

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
use App\Models\Gedure\Alumno;
use App\Models\Gedure\Curso;
use App\Models\Gedure\Boleta;
use App\Models\Gedure\PersonalDataAdmin;
use App\Models\Gedure\PersonalDataUser;

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
						'id',
						'username',
						'name',
						'privilegio',
						'email',
						'avatar',
						'actived_at',
					]
				],
				'page',
				'totalRows'
			]);
	}
	
	public function testFindLikeUser() {
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/find/user');
		
		$response->assertOk()
			->assertJsonStructure([
				'*' => [
					'id',
					'username',
					'name',
					'privilegio',
				]
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
					'username',
					'email',
					'privilegio',
					'actived_at',
					'alumno',
					'personal_data',	
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
		
		$curso = Curso::create([
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
			'curso_id' => $curso->id,
			'permissions' => [
				'boleta_download' => true,
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
		
		Storage::fake('user_avatars');
		
		$user = User::factory()->create([
			'privilegio' => 'A-'
		]);
		$personal_data = PersonalDataAdmin::create();
		$personal_data->user()->save($user);
		
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
					'name',
					'email',
					'avatar',
					'actived_at',
					'privilegio',
					'alumno',
					'personal_data' => [
						'telefono',
						'nacimiento',
						'sexo',
						'direccion',
						'docente',
						'docente_titulo',
						'docente_ingreso_MPPE',
						'docente_ingreso',
					],
				],
				'permissions' => [
					'users_index',
					'registros_index',
				]
			])
			->assertJsonPath('user.personal_data.telefono', '4269340569');;
		
		$this->assertDatabaseHas('users', [
			'username' => 'luis',
      'email' => 'test@test.test',
			'name' => 'Luis Enrrique',
    ]);
		
		$this->assertDatabaseHas('personal_data_admins', [
			'telefono' => '4269340569',
    ]);
		
		Storage::disk('user_avatars')->assertExists($avatar->hashName());
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
		$personal_data = PersonalDataUser::create();
		$personal_data->user()->save($user);
		
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
		
		$users = User::factory(10)->create([
			'privilegio' => 'A-',
		]);
		foreach($users as $user) {
			$personal_data = PersonalDataAdmin::create();
			$personal_data->user()->save($user);
		}
		
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
		foreach($users as $user) {
			$personal_data = PersonalDataUser::create();
			$personal_data->user()->save($user);
		}
		
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
		
		$users = User::factory(3)->create([
			'privilegio' => 'V-'
		]);
		
		foreach($users as $user) {
			$personal_data = PersonalDataUser::create();
			$personal_data->user()->save($user);
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
				'totalRows'
			])
			->assertJson([
				'totalRows' => count($users),
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
		$personal_data = PersonalDataUser::create();
		$personal_data->user()->save($user);
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
		
		$response = $this->patchJson('/api/v1/user-disabled/restore/'.$user->id);
		
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
		
		$users = User::factory(3)->create([
			'privilegio' => 'A-'
		]);
		
		foreach($users as $user) {
			$personal_data = PersonalDataAdmin::create();
			$personal_data->user()->save($user);
			$user->delete();	
		}
		
		$ids = json_encode([2,3,4]);
		
		$response = $this->patchJson('/api/v1/user-disabled/restore?ids='.urlencode($ids));
		
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
		$personal_data = PersonalDataUser::create();
		$personal_data->user()->save($user);
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
		
		$users = User::factory(3)->create([
			'privilegio' => 'A-'
		]);
		
		foreach($users as $user) {
			$personal_data = PersonalDataAdmin::create();
			$personal_data->user()->save($user);
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
		$personal_data = PersonalDataAdmin::create();
		$personal_data->user()->save($user);
		
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
					'name',
					'email',
					'avatar',
					'actived_at',
					'privilegio',
					'alumno',
					'personal_data' => [
						'telefono',
						'nacimiento',
						'sexo',
						'direccion',
						'docente',
						'docente_titulo',
						'docente_ingreso_MPPE',
						'docente_ingreso',
					],
				],
			])
			->assertJsonPath('user.personal_data.telefono', '4269340569');
	}
	
	public function testChangeAvatarUser()
	{	
		//$this->withoutExceptionHandling();
		Storage::fake('user_avatars');
		
		$user = User::factory()->create([
			'privilegio' => 'V-'
		]);
		$personal_data = PersonalDataUser::create();
		$personal_data->user()->save($user);
		$user->givePermissionTo('change_avatar');
		Passport::actingAs(
			$user,
			['user']
		);
		
		$avatar = UploadedFile::fake()->image('Universidad.png');
		
		$response = $this->putJson('/api/v1/user', [
			'avatar' => $avatar,
		]);
		
		$response->assertOk()
			->assertJsonStructure([
				'user' => [
					'id',
					'username',
				]
			]);
		
		Storage::disk('user_avatars')->assertExists($avatar->hashName());
	}
}
