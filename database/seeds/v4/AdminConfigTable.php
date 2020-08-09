<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminConfigTable extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $admins = array(
      array('cedula' => 'A-recker','user' => 'Recker','password' => '$2y$10$q5YZTNXWs8bvH6VvnIYR0eWKE6mH57XWspobgpmZb7RwUNUipdQSq','avatar' => 'admin/avatars/recker.jpg'),
      array('cedula' => 'A-rhadys','user' => 'Rhadys Garcia','password' => '$2y$10$9es00juSUmEKflI0rKmy3uo34UYTdlHBbpVSPvZDQe5c8yKf38GjW','avatar' => 'admin/avatars/default.jpg')
    );

    foreach($admins as $user) {
      $explode = explode('-', $user['cedula']);
      $cedula = $explode[1];
      $privilegio = $explode[0].'-';
      $password = $user['password'];
	
      if ($privilegio === 'A-'){
        DB::table('admins_data')->insert([
          'admin_name' => $user['user'],
          'admin_cedula' => $cedula,
        ]);
      }
    }
  }
}
