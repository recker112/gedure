<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('posts', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')
				->nullable()
				->constrained()
				->onUpdate('set null')
				->onDelete('set null');
			
			$table->char('title', 100);
			$table->string('slug')->unique();
			$table->longText('content');
			$table->json('portada')->nullable()->default(null);
			$table->json('galery')->nullable()->default(null);
			$table->boolean('only_users')->default(0);
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
		Schema::dropIfExists('posts');
	}
}
