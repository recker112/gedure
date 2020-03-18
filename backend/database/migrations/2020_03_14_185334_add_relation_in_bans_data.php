<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationInBansData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bans_data', function (Blueprint $table) {
            $table->char("ban_cedula", 14)->after('ban_id');
            $table->foreign('ban_cedula')
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
        Schema::table('bans_data', function (Blueprint $table) {
            $table->dropForeign(['ban_cedula']);
        });
    }
}
