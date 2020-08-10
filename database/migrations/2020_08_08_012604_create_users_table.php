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
			$table->char("password", 150);
			$table->string("avatar", 500)->nullable()->default(null);
			$table->char("email", 200)->unique('email')->nullable()->default(null);
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
