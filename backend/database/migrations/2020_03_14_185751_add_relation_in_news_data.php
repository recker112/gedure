<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationInNewsData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('news_data', function (Blueprint $table) {
            $table->char('new_owner', 14);
            $table->foreign('new_owner')
                ->references('user_cedula')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('news_data', function (Blueprint $table) {
            $table->dropForeign(['new_owner']);
        });
    }
}
