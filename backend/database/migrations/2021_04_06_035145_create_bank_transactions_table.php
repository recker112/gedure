<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBankTransactionsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bank_transactions', function (Blueprint $table) {
			$table->id();
			$table->foreignId('bank_account_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->foreignId('user_id')
				->nullable()
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->integer('reference');
			$table->integer('concepto');
			$table->decimal('amount', 18, 2);
			$table->date('date');
			$table->char('code', 4);
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
		Schema::dropIfExists('bank_transactions');
	}
}
