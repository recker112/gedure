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

//Verificacion de usuario
function verify_user($mysqli, $cedula){
  $cedulaV = "V-".$cedula;
  $consulta = $mysqli->prepare('SELECT login.user, login.cedula, login.password, cursos.curso, cursos.seccion, profesores_guia.user_pg, estudiantes.archivo, estudiantes.horario, estudiantes.nota
    FROM estudiantes
    INNER JOIN login ON login.estudi_id=estudiantes.e_id
    INNER JOIN cursos ON cursos.id_c=estudiantes.curso_id
    INNER JOIN profesores_guia ON profesores_guia.id_pg=estudiantes.profeGuia_id
    WHERE login.cedula=?
    LIMIT 1');
  if (!$consulta) {
    return "consulta error";
  }
  $consulta->bind_param("s", $cedulaV);
  $consulta->execute();
  $resultado = $consulta->get_result();

  if ($resultado->num_rows == 1) {
    $datos = $resultado->fetch_assoc();
    $datos['privilegio'] = "V-";
    return $datos;
  }else {
    $cedulaA = "A-".$cedula;
    $consulta2 = $mysqli->prepare('SELECT cedula, user, password
        FROM admins
        WHERE cedula=?
        LIMIT 1');
    if (!$consulta2) {
      return "consulta fallida";
    }
    $consulta2->bind_param("s", $cedulaA);
    $consulta2->execute();
    $resultado2 = $consulta2->get_result();

    if ($resultado2->num_rows == 1) {
      $datos2 = $resultado2->fetch_assoc();
      $datos2['privilegio'] = "A-";
      return $datos2;
     }else {
      $cedulaP = "P-".$cedula;
      $consulta3 = $mysqli->prepare('SELECT cedula, user, password
          FROM preinscripcion
          WHERE cedula=?
          LIMIT 1');
      if (!$consulta3) {
        return "consulta fallida";
      }
      $consulta3->bind_param("s", $cedulaP);
      $consulta3->execute();
      $resultado3 = $consulta3->get_result();

      if ($resultado3->num_rows == 1) {
        $datos3 = $resultado3->fetch_assoc();
        $datos3['privilegio'] = "P-";
        return $datos3;
      }else {
        return "no encontrado";
      }
     }
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