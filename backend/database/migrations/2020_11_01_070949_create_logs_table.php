<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('logs', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')
				->nullable()
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			
			$table->string("action");
			$table->json("payload")->nullable();
			$table->enum("type", ["session", "gedure", "user", "class", "transaction"]);
			$table->timestamp('created_at', 0);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
			Schema::dropIfExists('logs');
	}
}
