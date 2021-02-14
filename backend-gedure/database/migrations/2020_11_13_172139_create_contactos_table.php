<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactosTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('contactos', function (Blueprint $table) {
			$table->id();
			$table->char("nombre", 50);
			$table->string("email")->unique();
			$table->bigInteger('telefono');
			$table->char("asunto", 30);
			$table->longText('content');
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
		Schema::dropIfExists('contactos');
	}
}
