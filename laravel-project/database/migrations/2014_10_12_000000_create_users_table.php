<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function (Blueprint $table) {
			$table->id();
			$table->char("cedula", 30)->unique();
			$table->char("nombre", 90);
			$table->enum("privilegio", ["V-", "A-", "P-"]);
			$table->string('password');
			$table->string("avatar", 500)->nullable()->default(null);
			$table->string("email")->unique()->nullable()->default(null);
			$table->timestamps();
			$table->softDeletes('deleted_at', 0);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
			Schema::dropIfExists('users');
	}
}
