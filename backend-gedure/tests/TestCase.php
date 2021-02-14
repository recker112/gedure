<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
	use CreatesApplication;
	
	public function setUp(): void
	{
		parent::setUp();
		\Artisan::call('migrate', ['-vvv' => true]);
		\Artisan::call('passport:install', ['-vvv' => true]);
		\Artisan::call('db:seed', ['-vvv' => true]);
		$this->app->make(\Spatie\Permission\PermissionRegistrar::class)->registerPermissions();
		
		$this->enableForeignKeys();
	}
	
	/**
	* Activar claves foraneas
	*
	* @return void
	*/
	public function enableForeignKeys()
	{
		$db = app()->make('db');
		$db->getSchemaBuilder()->enableForeignKeyConstraints();
	}
}
