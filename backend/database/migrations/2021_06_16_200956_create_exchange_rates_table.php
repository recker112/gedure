<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExchangeRatesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('exchange_rates', function (Blueprint $table) {
			$table->id();
			$table->char('type', 10);
			$table->decimal('amount', 18, 2);
			$table->timestamp('created_at', 0);
		});
		Schema::table('debt_lotes', function (Blueprint $table) {
			$table->decimal('exchange_amount', 18, 2);
			$table->foreignId('exchange_rate_id')
				->nullable()
				->constrained()
				->onUpdate('set null')
				->onDelete('set null');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('exchange_rates');
	}
}
