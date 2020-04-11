<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreadoresTable extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    // DB::table('creadores_data')->insert([
    // 'creador_name' => "ReckerSOTE",
    // 'creador_cedula' => "reckersote",
    // ]);

    // DB::table('creadores_data')->insert([
    // 'creador_name' => "BANEADO",
    // 'creador_cedula' => "banUser",
    // ]);
    $creadores = array(
      array('cedula' => 'CR-19207612','user' => 'Rafael Cisneros','password' => '$2y$10$wanwgf8fXCRIysSE7iiMmOqqYVJQkD5CZjPwhnlJdCPf70bBBYawC','avatar' => 'admin/avatars/default.jpg'),
      array('cedula' => 'CR-apepregional','user' => 'APEP Regional','password' => '$2y$10$ud/sholWTuenKHRCxnx9F.ZuNMNfPKqMh.QY1AjZhhQftxEGrlodm','avatar' => 'admin/avatars/default.jpg')
    );

    foreach($creadores as $user) {
      $explode = explode('-', $user['cedula']);
      $cedula = $explode[1];
      $privilegio = $explode[0].'-';
      $password = $user['password'];
	
      if ($privilegio === 'CR-'){
        DB::table('creadores_data')->insert([
          'creador_name' => $user['user'],
          'creador_cedula' => $cedula,
        ]);
      }
    }
  }
}
