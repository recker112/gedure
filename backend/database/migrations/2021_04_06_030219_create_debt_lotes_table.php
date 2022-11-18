<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDebtLotesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('debt_lotes', function (Blueprint $table) {
			$table->id();
			$table->text('reason');
			$table->decimal('amount_to_pay', 18, 2);
			$table->decimal('exchange_amount', 18, 2)->nullable();
			$table->boolean('important')->default(0);
			$table->foreignId('exchange_rate_id')
				->nullable()
				->constrained()
				->onUpdate('cascade')
				->onDelete('set null');	
			$table->datetime('available_on');
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
		Schema::dropIfExists('debt_lotes');
	}
}
