<?php
//Seccion segura
function sec_session_start() {
  $session_name = 'sec_session_id';
  session_name($session_name);
  session_start();
  session_regenerate_id();
}

//Token
function token($token){
  $tokentext = "reckersito49937";
  if (password_verify($tokentext, $token) == true) {
    return true;
  }else {
    return false;
  }
}

//Encriptado de contraseña.
function encript_password($password){
  $supermd5 = md5(sha1($password));
  $encript1 = crypt($password, $supermd5);
  $encript2 = crypt($encript1, $supermd5);
  $encript3 = crypt($encript2, $encript1);
  return $encript3;
}

//Registrar contraseña encriptada
function encript_password_register($password){
  $supermd5 = md5(sha1($password));
  $encript1 = crypt($password, $supermd5);
  $encript2 = crypt($encript1, $supermd5);
  $encript3 = crypt($encript2, $encript1);
  $encript4 = password_hash($encript3, PASSWORD_BCRYPT);
  return $encript4;
}

//Verificacion de contraseñas encriptadas
function verify_password($password, $password_encript){
  $verify = password_verify($password, $password_encript);
  if ($verify == true) {
    return true;
  }else {
    return false;
  }
}

//Consulta para añadir un log.
function add_log($mysqli, $cedula, $user, $accion){
  $setdate = date_default_timezone_set("America/Caracas");//Seleccionar zona para la hora.
  $date = date("y")."-".date("m")."-".date("d")." ".date("H").":".date("i").":".date("s");//establecer fecha.
  $time = time();//establecer tiempo en segundos.
  $consulta = $mysqli->prepare('INSERT INTO logs
  (log_cedula, log_user, fecha, time, accion)
  VALUES (?,?,?,?,?)');
  $consulta->bind_param("sssis", $cedula, $user, $date, $time, $accion);
  $consulta->execute();
  return true;
}

//Verificar tiempo de un lock
function verify_log($mysqli, $cedula, $accion){
  $consulta = $mysqli->prepare('SELECT time
  FROM logs
  WHERE log_cedula=? AND accion=?
  ORDER BY log_id DESC');
  if (!$consulta) {
    return false;
  }
  $consulta->bind_param("ss", $cedula, $accion);
  $consulta->execute();
  $resultado = $consulta->get_result();
  if ($resultado->num_rows >= 1 ) {
    $datos = $resultado->fetch_assoc();
    return $datos;
  }else {
    $datos['time'] = time() - 301;
    return $datos;
  }
}

//Generar contraseña.
function password_generate($cantidad) {
  $lista = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
  $largoLista = strlen($lista)-1;
  $string = "";

  for($i=0; $i<=$cantidad; $i++){
      // Hasta que tengamos $longitud caracteres agregamos una letra al azar del conjunto $listaChar
      $string .= $lista[rand(0, $largoLista)];
    }
  return $string;
}
?>