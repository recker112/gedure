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
			$table->char("username", 30)->unique();
			$table->char("name", 90);
			$table->enum("privilegio", ["V-", "A-", "P-"]);
			$table->string('password')->nullable()->default(null);
			$table->string("avatar", 500)->nullable()->default(null);
			$table->string("email")->unique()->nullable()->default(null);
			$table->unsignedBigInteger('personal_data_id')->nullable()->default(null);
			$table->string('personal_data_type')->nullable()->default(null);
			$table->timestamps();
			$table->softDeletes();
			$table->timestamp('actived_at')->nullable()->default(null);
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
