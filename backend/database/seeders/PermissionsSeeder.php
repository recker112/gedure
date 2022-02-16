<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
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
		app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
		/*
			PERMISSIONS ADMIN
		*/
		// NOTA(RECKER): Permisos de Registros
		Permission::create(['guard_name' => 'api', 'name' => 'registros_index']);
		
		// NOTA(RECKER): Permisos de Users
		Permission::create(['guard_name' => 'api', 'name' => 'users_index']);
		Permission::create(['guard_name' => 'api', 'name' => 'users_create']);
		Permission::create(['guard_name' => 'api', 'name' => 'users_upload_matricula']);
		Permission::create(['guard_name' => 'api', 'name' => 'users_edit']);
		Permission::create(['guard_name' => 'api', 'name' => 'users_edit_admins']);
		Permission::create(['guard_name' => 'api', 'name' => 'users_delete']);
		// NOTA(RECKER): Permisos de gedure config
		Permission::create(['guard_name' => 'api', 'name' => 'users_disabled_index']);
		Permission::create(['guard_name' => 'api', 'name' => 'users_disabled_restore']);
		Permission::create(['guard_name' => 'api', 'name' => 'users_disabled_destroy']);
		
		// NOTA(RECKER): Permisos de Publicaciones
		Permission::create(['guard_name' => 'api', 'name' => 'posts_index']);
		Permission::create(['guard_name' => 'api', 'name' => 'posts_create']);
		Permission::create(['guard_name' => 'api', 'name' => 'posts_edit']);
		Permission::create(['guard_name' => 'api', 'name' => 'posts_destroy']);
		Permission::create(['guard_name' => 'api', 'name' => 'posts_others']);
		
		// NOTA(RECKER): Permisos de Boletas
		Permission::create(['guard_name' => 'api', 'name' => 'boletas_index']);
		Permission::create(['guard_name' => 'api', 'name' => 'boletas_upload']);
		Permission::create(['guard_name' => 'api', 'name' => 'boletas_edit']);
		Permission::create(['guard_name' => 'api', 'name' => 'boletas_destroy']);
		
		// NOTA(RECKER): Permisos de Cursos (gedure)
		Permission::create(['guard_name' => 'api', 'name' => 'cursos_index']);
		Permission::create(['guard_name' => 'api', 'name' => 'cursos_create']);
		Permission::create(['guard_name' => 'api', 'name' => 'cursos_destroy']);
		
		// NOTA(RECKER): Permisos de Solicitud de Contacto
		Permission::create(['guard_name' => 'api', 'name' => 'contact_index']);
		Permission::create(['guard_name' => 'api', 'name' => 'contact_destroy']);
		
		// NOTA(RECKER): Permisos de Deudas
		Permission::create(['guard_name' => 'api', 'name' => 'debt_lote_index']);
		Permission::create(['guard_name' => 'api', 'name' => 'debt_lote_create']);
		Permission::create(['guard_name' => 'api', 'name' => 'debt_lote_edit']);
		Permission::create(['guard_name' => 'api', 'name' => 'debt_lote_delete']);
		Permission::create(['guard_name' => 'api', 'name' => 'debt_create']);
		Permission::create(['guard_name' => 'api', 'name' => 'debt_delete']);
		Permission::create(['guard_name' => 'api', 'name' => 'debt_refund']);
		
		// NOTA(RECKER): Permisos de Cuentas Bancarias (Gedure)
		Permission::create(['guard_name' => 'api', 'name' => 'bank_account_index']);
		Permission::create(['guard_name' => 'api', 'name' => 'bank_account_create']);
		Permission::create(['guard_name' => 'api', 'name' => 'bank_account_edit']);
		Permission::create(['guard_name' => 'api', 'name' => 'bank_account_destroy']);
		
		// NOTA(RECKER): Permisos de Transacciones Bancarias (Gedure)
		Permission::create(['guard_name' => 'api', 'name' => 'bank_transaction_index']);
		Permission::create(['guard_name' => 'api', 'name' => 'bank_transaction_upload']);
		Permission::create(['guard_name' => 'api', 'name' => 'bank_transaction_assign']);
		Permission::create(['guard_name' => 'api', 'name' => 'bank_transaction_delete']);
		
		// NOTA(RECKER): Permisos de Transacciones
		Permission::create(['guard_name' => 'api', 'name' => 'transaction_index']);
		
		/*
			PERMISSIONS USER
		*/
		Permission::create(['guard_name' => 'api', 'name' => 'change_avatar']);
		Permission::create(['guard_name' => 'api', 'name' => 'boleta_download']);
		//Permission::create(['guard_name' => 'api', 'name' => 'horarios']);
		//Permission::create(['guard_name' => 'api', 'name' => 'soporte']);
		//Permission::create(['guard_name' => 'api', 'name' => 'account_exonerada']);
		
		$ADMIN = Role::create(['guard_name' => 'api', 'name' => 'super-admin']);
		
		$user = User::find(1);
		$user->assignRole($ADMIN);
	}
}