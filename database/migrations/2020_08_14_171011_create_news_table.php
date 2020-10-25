<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('news', function (Blueprint $table) {
			$table->id();
			$table->char('title', 100);
			$table->longText('content');
			$table->json('imgs')->nulleable()->default(null);
			$table->bigInteger('user_id_owner');
			$table->boolean('onlyUsers')->default(0);
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
		Schema::dropIfExists('news');
	}
}
