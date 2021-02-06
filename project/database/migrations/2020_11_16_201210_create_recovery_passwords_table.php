<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecoveryPasswordsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('recovery_passwords', function (Blueprint $table) {
			$table->id();
			$table->string('code');
			$table->foreignId('user_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->boolean('confirm')->default(0);
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
		Schema::dropIfExists('recovery_passwords');
	}
}
