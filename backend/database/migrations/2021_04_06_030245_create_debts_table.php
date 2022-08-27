<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDebtsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('debts', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->foreignId('debt_lote_id')
				->nullable()
				->constrained()
				->onUpdate('set null')
				->onDelete('set null');
			
			$table->enum('status', ['pagada', 'no pagada', 'futura'])->default('no pagada');
			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('debts');
	}
}