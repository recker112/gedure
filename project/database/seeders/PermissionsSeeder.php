<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;
use App\Models\User;

class PermissionsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		app()[PermissionRegistrar::class]->forgetCachedPermissions();
		/*
			PERMISSIONS ADMIN
		*/
		// Registros
		Permission::create(['name' => 'registros_index']);
		Permission::create(['name' => 'registros_user']);
		
		// Users
		Permission::create(['name' => 'users_index']);
		Permission::create(['name' => 'users_show']);
		Permission::create(['name' => 'users_create']);
		Permission::create(['name' => 'users_create_massive']);
		Permission::create(['name' => 'users_update']);
		Permission::create(['name' => 'users_edit']);
		Permission::create(['name' => 'users_delete']);
		Permission::create(['name' => 'users_delete_massive']);
		
		// Solicitud de contacto
		Permission::create(['name' => 'soliContact_index']);
		Permission::create(['name' => 'soliContact_destroy']);
		
		// Publicaciones
		Permission::create(['name' => 'posts_index']);
		Permission::create(['name' => 'posts_create']);
		Permission::create(['name' => 'posts_edit']);
		Permission::create(['name' => 'posts_destroy']);
		Permission::create(['name' => 'posts_others']);
		
		// Boletas
		Permission::create(['name' => 'boletas_index']);
		Permission::create(['name' => 'boletas_upload']);
		Permission::create(['name' => 'boletas_edit']);
		Permission::create(['name' => 'boletas_destroy']);
		
		/*
			PERMISSIONS USER
		*/
		Permission::create(['name' => 'boletas']);
		Permission::create(['name' => 'horarios']);
		Permission::create(['name' => 'soporte']);
		Permission::create(['name' => 'account_exonerada']);
		
		$ADMIN = Role::create(['name' => 'super-admin']);
		
		$user = User::find(1); //Italo Morales
		$user->assignRole($ADMIN);
	}
}
