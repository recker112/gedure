<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePendingPaymentsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('pending_payments', function (Blueprint $table) {
			$table->id();
			$table->foreignId('bank_account_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->foreignId('user_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->integer('reference');
			$table->decimal('amount', 15, 2);
			$table->date('date');
			$table->char('code', 4);
			$table->enum('status', ['pendiente', 'no encontrada', 'verificada'])
				->default('pendiente');
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
		Schema::dropIfExists('pending_payments');
	}
}
