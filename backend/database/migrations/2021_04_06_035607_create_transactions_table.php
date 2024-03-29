d<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transactions', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->unsignedBigInteger('transable_id')->nullable()->default(null);
			$table->string('transable_type')->nullable()->default(null);
			$table->enum('type', ['deuda pagada', 'transferencia de saldo', 'pago verificado', 'manual']);
			$table->json('payload');
			$table->decimal('amount', 18, 2);
			$table->decimal('previous_balance', 18, 2);
			$table->enum('payment_method', ['transferencia o depósito bancario', 'saldo disponible', 'exonerado', 'otros']);
			$table->boolean('exonerado')->default(0);
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
		Schema::dropIfExists('transactions');
	}
}