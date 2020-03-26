<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //Limpiador de trablas
        $this->truncateAllData([
            'users',
            'admins_data',
            'estudiantes_data',
            'creadores_data',
            'alumnos_data',
            'cursos_data',
            'profes_guias_data',
            'anuncios_data',
            'bans_data',
            'logs',
            'news_data',
        ]);

        $this->call(UsersTableSeeders::class);
        $this->call(AdminConfigTable::class);
        $this->call(CreadoresTable::class);
        $this->call(ProfesTable::class);
        $this->call(CursosTable::class);
        $this->call(AlumnoTable::class);
        $this->call(EstudianteTable::class);
        $this->call(BansTable::class);
        $this->call(LogsTable::class);
        $this->call(NewsTable::class);
        $this->call(AnunciosTable::class);
    }

    public function truncateAllData(array $tables)
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
    }
}
