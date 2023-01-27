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
		Permission::firstOrCreate(['name' => 'registros_index'],['guard_name' => 'api']);
		
		// NOTA(RECKER): Permisos de Users
		Permission::firstOrCreate(['name' => 'users_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'users_create'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'users_upload_matricula'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'users_edit'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'users_edit_admins'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'users_delete'],['guard_name' => 'api']);
		// NOTA(RECKER): Permisos de gedure config
		Permission::firstOrCreate(['name' => 'users_download_data'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'users_disabled_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'users_disabled_restore'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'users_disabled_destroy'],['guard_name' => 'api']);
		
		// NOTA(RECKER): Permisos de Publicaciones
		Permission::firstOrCreate(['name' => 'posts_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'posts_create'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'posts_edit'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'posts_destroy'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'posts_others'],['guard_name' => 'api']);
		
		// NOTA(RECKER): Permisos de Boletas
		Permission::firstOrCreate(['name' => 'boletas_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'boletas_upload'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'boletas_edit'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'boletas_destroy'],['guard_name' => 'api']);
		
		// NOTA(RECKER): Permisos de Cursos (gedure)
		Permission::firstOrCreate(['name' => 'cursos_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'cursos_create'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'cursos_destroy'],['guard_name' => 'api']);
		
		// NOTA(RECKER): Permisos de Solicitud de Contacto
		Permission::firstOrCreate(['name' => 'contact_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'contact_destroy'],['guard_name' => 'api']);
		
		// NOTA(RECKER): Permisos de Deudas
		Permission::firstOrCreate(['name' => 'debt_lote_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'debt_lote_create'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'debt_lote_edit'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'debt_lote_delete'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'debt_create'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'debt_delete'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'debt_refund'],['guard_name' => 'api']);
		
		// NOTA(RECKER): Permisos de Cuentas Bancarias (Gedure)
		Permission::firstOrCreate(['name' => 'bank_account_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'bank_account_create'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'bank_account_edit'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'bank_account_destroy'],['guard_name' => 'api']);
		
		// NOTA(RECKER): Permisos de Transacciones Bancarias (Gedure)
		Permission::firstOrCreate(['name' => 'bank_transaction_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'bank_transaction_upload'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'bank_transaction_assign'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'bank_transaction_delete'],['guard_name' => 'api']);

		// NOTA(RECKER): Permisos de Gedure Config (gedure)
		Permission::firstOrCreate(['name' => 'gc_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'gc_edit'],['guard_name' => 'api']);

		// NOTA(RECKER): Monederos Admin
		Permission::firstOrCreate(['name' => 'wallet_index'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'wallet_edit'],['guard_name' => 'api']);
		
		// NOTA(RECKER): Permisos de Transacciones
		Permission::firstOrCreate(['name' => 'transaction_index'],['guard_name' => 'api']);
		
		/*
			PERMISSIONS USER
		*/
		Permission::firstOrCreate(['name' => 'change_avatar'],['guard_name' => 'api']);
		Permission::firstOrCreate(['name' => 'boleta_download'],['guard_name' => 'api']);
		//Lote2
		Permission::firstOrCreate(['name' => 'account_exonerada'],['guard_name' => 'api']);
		//Permission::firstOrCreate(['name' => 'horarios'],['guard_name' => 'api']);
		//Permission::firstOrCreate(['name' => 'soporte'],['guard_name' => 'api']);
		
		$ADMIN = Role::firstOrCreate(['name' => 'super-admin'],['guard_name' => 'api']);
		
		$user = User::find(1);
		$user->assignRole($ADMIN);
	}
}