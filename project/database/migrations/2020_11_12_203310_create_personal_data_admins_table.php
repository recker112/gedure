<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalDataAdminsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('personal_data_admins', function (Blueprint $table) {
			$table->id();
			$table->timestamp("nacimiento")->nullable()->default(null);
			$table->bigInteger('telefono')->nullable()->default(null);
			$table->enum("sexo", ['Masculino', 'Femenino'])->nullable()->default(null);
			$table->string('direccion')->nullable()->default(null);
			$table->enum("docente", ['Si', 'No'])->nullable()->default(null);
			$table->timestamp("docente_ingreso_MPPE")->nullable()->default(null);
			$table->timestamp("docente_ingreso")->nullable()->default(null);
			$table->bigInteger('user_id');
			$table->softDeletes();
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
		Schema::dropIfExists('personal_data_admins');
	}
}
