<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBloqueosTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bloqueos', function (Blueprint $table) {
			$table->id('id');
			$table->bigInteger('user_id');
			$table->char('cedula', 30);
			$table->smallInteger('attemps')->default(0);
      $table->smallInteger('locks')->default(0);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('bloqueos');
	}
}
