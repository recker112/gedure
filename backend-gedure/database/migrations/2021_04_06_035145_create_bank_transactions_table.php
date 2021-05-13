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
			
			$table->integer('reference');
			$table->integer('concepto');
			$table->decimal('amount', 15, 2);
			$table->char('code', 4);
			$table->boolean('taked')->default('0');
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
