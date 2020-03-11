<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins_data', function (Blueprint $table) {
            $table->id("admin_id");
            $table->char("admin_name", 50);
            $table->char("admin_avatar", 75)->nullable()->default(null);
            $table->char("admin_cedula", 14);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins_data');
    }
}
