<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->char("user_cedula", 14);
            $table->enum("user_privilegio", ["V-", "A-", "CR-"]);
            $table->char("user_password", 100);
            $table->char("api_token", 70)->nullable()->unique();
            $table->dateTime('create_at', 0);
            $table->primary("user_cedula");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
