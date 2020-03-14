<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationInAdminData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('admins_data', function (Blueprint $table) {
            $table->char("admin_cedula", 14);
            $table->foreign('admin_cedula')
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
        Schema::table('admins_data', function (Blueprint $table) {
            $table->dropForeign(['admin_cedula']);
        });
    }
}
