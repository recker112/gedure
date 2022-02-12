<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalDataUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('personal_data_users', function (Blueprint $table) {
			$table->id();
			
			/*
				MADRE
			*/
			$table->string("madre_nombre")->nullable()->default(null);
			$table->enum("madre_nacionalidad", ['V', 'E'])->nullable()->default(null);
			$table->bigInteger('madre_cedula')->nullable()->default(null);
			$table->bigInteger('madre_telefono')->nullable()->default(null);
			$table->string('madre_direccion')->nullable()->default(null);
			
			/*
				PADRE
			*/
			$table->string("padre_nombre")->nullable()->default(null);
			$table->enum("padre_nacionalidad", ['V', 'E'])->nullable()->default(null);
			$table->bigInteger('padre_cedula')->nullable()->default(null);
			$table->bigInteger('padre_telefono')->nullable()->default(null);
			$table->string('padre_direccion')->nullable()->default(null);
			
			/*
				REPRESENTANTE
			*/
			$table->string("repre_nombre")->nullable()->default(null);
			$table->enum("repre_nacionalidad", ['V', 'E'])->nullable()->default(null);
			$table->bigInteger('repre_cedula')->nullable()->default(null);
			$table->bigInteger('repre_telefono')->nullable()->default(null);
			$table->string('repre_direccion')->nullable()->default(null);
			$table->enum("repre_sexo", ['Masculino', 'Femenino'])->nullable()->default(null);
			$table->enum("repre_tipo_familiar", [
				'Madre', 
				'Padre',
				'Abuela(o)',
				'Padrastro',
				'Madastra',
				'Tia(o)',
				'Otro'
			])->nullable()->default(null);
			$table->enum("repre_estado_civil", [
				'Soltero', 
				'Casado',
				'Viudo',
				'Concubino',
				'Divorciado',
			])->nullable()->default(null);
			$table->date("repre_nacimiento")->nullable()->default(null);
			$table->string("repre_email")->unique()->nullable()->default(null);
			$table->char("repre_ubi_estado", 30)->nullable()->default(null);
			$table->string("repre_ubi_municipio")->nullable()->default(null);
			$table->string("repre_ubi_parroquia")->nullable()->default(null);
			$table->enum("repre_ubi_via", [
				'Aut', 
				'Av',
				'Blvr',
				'Calle',
				'Callejón',
				'Carretera',
				'Manzana',
				'Prolongación',
				'Transversal',
				'Vereda',
			])->nullable()->default(null);
			$table->enum("repre_empleo", [
				'Si', 
				'No',
			])->nullable()->default(null);
			$table->string("repre_empleo_profesion")->nullable()->default(null);
			$table->string("repre_empleo_lugar")->nullable()->default(null);
			
			/*
				ESTUDIANTE
			*/
			$table->enum("estudi_sexo", ['Masculino', 'Femenino'])->nullable()->default(null);
			$table->enum("estudi_estado_civil", [
				'Soltero', 
				'Casado',
				'Concubino',
			])->nullable()->default(null);
			$table->enum("estudi_lateralidad", [
				'Derecho', 
				'Zurdo',
				'Ambidiestro',
			])->nullable()->default(null);
			$table->enum("estudi_nacionalidad", ['V', 'E'])->nullable()->default(null);
			$table->date("estudi_nacimiento")->nullable()->default(null);
			$table->char("estudi_nacimiento_estado", 30)->nullable()->default(null);
			$table->string("estudi_nacimiento_lugar")->nullable()->default(null);
			$table->enum("estudi_ubi", [
				'Barrio',
				'Caserio',
				'Urbanización',
				'Zona residencial',
				'Otros',
			])->nullable()->default(null);
			$table->enum("estudi_ubi_tipo", [
				'Apto',
				'Apto-quinta',
				'Casa',
				'Casa-quinta',
				'Quinta',
				'Rancho barrio',
				'Refugio',
				'Casa de vecindad',
				'Improvisado',
				'Rancho rural'
			])->nullable()->default(null);
			$table->enum("estudi_ubi_zona", [
				'Rural',
				'Urbana',
			])->nullable()->default(null);
			$table->enum("estudi_ubi_condiInfra", [
				1,2,3,4,5
			])->nullable()->default(null);
			$table->enum("estudi_ubi_condiVivienda", [
				'Al cuido',
				'Alquilada',
				'Propia pagada',
				'Propia pagandose',
				'Otro',
			])->nullable()->default(null);
			$table->enum("estudi_otros_canaima", [
				'Si',
				'No',
			])->nullable()->default(null);
			$table->enum("estudi_otros_beca", [
				'Si',
				'No',
			])->nullable()->default(null);
			$table->enum("estudi_otros_alojado", [
				'Si',
				'No',
			])->nullable()->default(null);
			$table->string("estudi_otros_direccion")->nullable()->default(null);
			
			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('personal_data_users');
	}
}
