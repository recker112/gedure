<?php

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
			
			$table->foreignId('bank_account_id')
				->nullable()
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->foreignId('exonerante_id')
				->nullable()
				->references('id')
				->on('users')
				->onUpdate('cascade')
				->onDelete('set null');
			
			$table->foreignId('debt_id')
				->nullable()
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->enum('type', ['deuda', 'transferencia', 'pago verficado']);
			$table->text('reason');
			$table->decimal('amount', 15, 2);
			$table->decimal('remaining', 15, 2);
			$table->enum('payment_method', ['transferencia bancaria', 'saldo disponible']);
			$table->boolean('exonerante_server');
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