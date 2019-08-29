<?php
//Login.
function login($mysqli, $datos, $token, $checkbox, $cedula){

  //Verificar checkbox en el formulario
  if (isset($checkbox) && $checkbox == "on") {

    //Variables
    $reloginID = generate_reid($datos['cedula']);
    $reloginID_user = password_generate(10);

    //Crear cookies
    setcookie("reloginID", generate_reid_local($datos['cedula']), time() + 31536000, "/", $_SERVER['HTTP_HOST']);
    setcookie("reloginID_user", $reloginID_user, time() + 31536000, "/", $_SERVER['HTTP_HOST']);

    //Consulta a realizar
    $consulta = $mysqli->prepare("INSERT INTO reloginID
      (relogin_encript, relogin_user, relogin_cedula)
      VALUES
      (?,?,?)");

    //Verificar si la consulta no da error
    if (!$consulta) {
      return "consulta falida";
    }

    //Bindear parametros (los ?)
    $consulta->bind_param("sss", $reloginID, $reloginID_user, $cedula);

    //Ejecutar consulta
    $consulta->execute();
  }

  //Añadir acción a log
  $accion = "Inicio de sesión exitoso.";
  add_log($mysqli, $datos['cedula'], $datos['user'], $accion);

  //Variables a insertar en la sesión.
  if ($datos['privilegio'] == "V-") {

    //Variables del usuario V-
    $_SESSION['user'] = $datos['user'];
    $_SESSION['cedula'] = $datos['cedula'];
    $_SESSION['cedulaSin'] = $cedula;
    $_SESSION['curso'] = $datos['curso'];
    $_SESSION['seccion'] = $datos['seccion'];
    $_SESSION['archivo'] = $datos['archivo'];
    $_SESSION['nota'] = $datos['nota'];
    $_SESSION['horario'] = $datos['horario'];
    $_SESSION['profeGuia'] = $datos['user_pg'];
    $_SESSION['privilegio'] = $datos['privilegio'];
    $_SESSION['avatar'] = $datos['avatar'];
    $_SESSION['token'] = $token;
    $_SESSION['loginIs'] = "user";
    $_SESSION['change_log'] = 0;
    $_SESSION['change_lock'] = 0;

    //Regresar mensaje "user"
    return "user";
  }else if ($datos['privilegio'] == "A-") {

    //Variables del usuario A-
    $_SESSION['user'] = $datos['user'];
    $_SESSION['cedula'] = $datos['cedula'];
    $_SESSION['cedulaSin'] = $cedula;
    $_SESSION['privilegio'] = $datos['privilegio'];
    $_SESSION['token'] = $token;
    $_SESSION['loginIs'] = "admin";
    $_SESSION['avatar'] = $datos['avatar'];
    $_SESSION['change_log'] = 0;
    $_SESSION['change_lock'] = 0;
    $_SESSION['inser'] = 0;
    $_SESSION['update'] = 0;
    $_SESSION['error'] = 0;

    //Regresar mensaje "admin"
    return "admin";
  }else if ($datos['privilegio'] == "CR-") {

    //Variables del usuario CR-
    $_SESSION['user'] = $datos['user'];
    $_SESSION['cedula'] = $datos['cedula'];
    $_SESSION['cedulaSin'] = $cedula;
    $_SESSION['privilegio'] = $datos['privilegio'];
    $_SESSION['avatar'] = $datos['avatar'];
    $_SESSION['token'] = $token;
    $_SESSION['loginIs'] = "creador";

    //Regresar mensaje "creador"
    return "creador";
  }
}

//Verificacion de usuario
function verify_user($mysqli, $cedula){
  //Variable cedula
  $cedulaV = "V-".$cedula;

  //Consulta a realizar
  $consulta = $mysqli->prepare('SELECT login.user, login.cedula, login.password, cursos.curso, cursos.seccion, profesores_guia.user_pg, estudiantes.archivo, estudiantes.horario, estudiantes.nota, login.avatar
    FROM estudiantes
    INNER JOIN login ON login.estudi_id=estudiantes.e_id
    INNER JOIN cursos ON cursos.id_c=estudiantes.curso_id
    INNER JOIN profesores_guia ON profesores_guia.id_pg=estudiantes.profeGuia_id
    WHERE login.cedula=?
    LIMIT 1');

  //Verificar si la consulta da error
  if (!$consulta) {
    return "consulta fallida";
  }

  //Bindear los parametros (los ?)
  $consulta->bind_param("s", $cedulaV);

  //Ejecutar consulta
  $consulta->execute();

  //Obtener resultado de la consulta
  $resultado = $consulta->get_result();

  //Verificar si la consulta obtuvo algo
  if ($resultado->num_rows == 1) {

    //Obtener datos
    $datos = $resultado->fetch_assoc();
    $datos['privilegio'] = "V-";

    //Regresar datos
    return $datos;
  }else {
    //Variable cedula
    $cedulaA = "A-".$cedula;

    //Consulta a realizar
    $consulta2 = $mysqli->prepare('SELECT cedula, user, password, avatar
        FROM admins
        WHERE cedula=?
        LIMIT 1');

    //Verificar si la consulta da error
    if (!$consulta2) {
      return "consulta fallida";
    }

    //Bindear los parametros (los ?)
    $consulta2->bind_param("s", $cedulaA);

    //Ejecutar consulta
    $consulta2->execute();

    //Obtener resultado de la consulta
    $resultado2 = $consulta2->get_result();

    //Verificar si la consulta obtuvo algo
    if ($resultado2->num_rows == 1) {

      //Obtener datos
      $datos2 = $resultado2->fetch_assoc();
      $datos2['privilegio'] = "A-";

      //Regresar datos
      return $datos2;
     }else {
      //Variable cedula
      $cedulaP = "CR-".$cedula;

      //Consulta a realizar
      $consulta3 = $mysqli->prepare('SELECT cedula, user, password, avatar
          FROM creadores
          WHERE cedula=?
          LIMIT 1');

      //Verificar si la consulta da error
      if (!$consulta3) {
        return "consulta fallida";
      }

      //Bindear los parametros (los ?)
      $consulta3->bind_param("s", $cedulaP);

      //Ejecutar consulta
      $consulta3->execute();

      //Obtener resultado de la consulta
      $resultado3 = $consulta3->get_result();

      //Verificar si la consulta obtuvo algo
      if ($resultado3->num_rows == 1) {

        //Obtener datos
        $datos3 = $resultado3->fetch_assoc();
        $datos3['privilegio'] = "CR-";

        //Regresar datos
        return $datos3;
      }else {
        //Si no se encuentra ningún usuario regresar esto
        return "no encontrado";
      }
     }
  }
}

//Verificar lista de baneados
function banlist($mysqli, $cedula){

  //Consulta a realizar
  $consulta = $mysqli->prepare('SELECT time, attempts, locks
  FROM baneos
  WHERE ban_cedula=?
  LIMIT 1');

  //Verificar si la consulta no da error
  if (!$consulta) {
    return "consulta falida";
  }

  //Bindear parametros (los ?)
  $consulta->bind_param("s", $cedula);

  //Ejecutar consulta
  $consulta->execute();

  //Obtener resultados
  $resultado = $consulta->get_result();

  //Verificar si la consulta arrojó algo
  if ($resultado->num_rows == 1) {

    //Obtener datos
    $datos = $resultado->fetch_assoc();

    //Verificar locks y attemps
    if ($datos['locks'] >= 5) {
      return "locks_5";//Ban permanente
    }elseif ($datos['attempts'] >= 5) {
      return "attempts_5";//Bloqueo temporal
    }else {
      return "register";//Registrado pero sin bloqueo actual
    }
  }else {
    return "no_register";//Primer fallo en las credenciales
  }
}

//Consulta de errores sin registro previo.
function login_new_register_banlist($mysqli, $cedula, $user, $privilegio){

  //Variables
  $cedulaC = $privilegio.$cedula;
	$time = time();
	$attempts = 1;

  //Consulta a realizar
	$consulta = $mysqli->prepare('INSERT INTO baneos
	(ban_cedula, ban_user, time, attempts)
	VALUES (?,?,?,?)');

  //Verificar si la consulta da error
	if (!$consulta) {
    return "consult_error";
  }

  //Bindear parametros (los ?)
	$consulta->bind_param("ssii", $cedulaC, $user, $time, $attempts);

  //Ejecutar consulta
	$consulta->execute();

  //Verificar si se affectó alguna fila
  if ($consulta->affected_rows >= 1) {
    return "banlist";
  }else {
    return "consult_error";
  }
}

//Añadir modificacion al registro de baneo.
function login_add_register_banlist($mysqli, $cedula, $user){
  //Consulta a realizar
	$consulta = $mysqli->prepare('SELECT time, attempts, locks
	  FROM baneos
	  WHERE ban_cedula=?
	  LIMIT 1');

  //Verificar si la consulta da error.
	if (!$consulta) {
    	return "consulta falida";
  }

  //Bindear parametros (los ?)
	$consulta->bind_param("s", $cedula);

  //Ejecutar consulta
	$consulta->execute();

  //Obtener resultados
	$resultado = $consulta->get_result();

	if ($resultado->num_rows == 1) {
		$datos_ban = $resultado->fetch_assoc();

		if ($datos_ban['attempts'] <= 3) {//Entra en esta zona si los attemps son menores o igual a 3, dejandola como máximo en 4 attemps

      //Variables
			$time = time();

      //Consulta a realizar
	    $consulta2 = $mysqli->prepare('UPDATE baneos
	      SET time=?, attempts=attempts+1
	      WHERE ban_cedula=?');

      //Verificar si la consulta da error
	    if (!$consulta2) {
  			return "consult_error";
			}

      //Bindear parametros (los ?)
	    $consulta2->bind_param("is", $time, $cedula);

      //Ejecutar consulta
	    $consulta2->execute();

      //Verificar si se affectó alguna fila
      if ($consulta2->affected_rows >= 1) {

        //Regresar mensaje
        return "error_add_in_banlist";
      }else {

        //Regresar mensaje
        return "consult_error";
      }
		}else if ($datos_ban['attempts'] == 4 && $datos_ban['locks'] == 4) {//Entra en esta zona si la cuenta esta siendo bloqueada permanentemente (4 attemps y 4 locks)

      //Variables
			$time_desban = time();

      //Consulta a realizar
	    $consulta2 = $mysqli->prepare('UPDATE baneos
			SET time=?, attempts=0, locks=locks+1
			WHERE ban_cedula=?');

      //Verificar si la consulta da error
	    if (!$consulta2) {
				return "consult_error";
			}

      //Bindear parametros (los ?)
	    $consulta2->bind_param("is", $time_desban, $cedula);

      //Ejecutar consulta
	    $consulta2->execute();

      //Añadir log
			$accion = 'Cuenta bloqueada permanentemente.';
			add_log($mysqli, $cedula, $user, $accion);

      //regresar mensaje
			return "account_perma_block";
		}else {//Entra en esta zona cuando hay ya 4 errores registrados.

      //Variables
			$time = time();

      //Consulta a realizar
      $consulta2 = $mysqli->prepare('UPDATE baneos
				SET time=?, attempts=attempts+1
				WHERE ban_cedula=?');

      //Verificar si la consulta da error
			if (!$consulta2) {
  			return "consult_error";
			}

      //Bindear parametros (los ?)
			$consulta2->bind_param("is", $time, $cedula);

      //Ejecutar consulta
			$consulta2->execute();


			/*Añadir registro del lock*/

      //Consulta a realizar
			$consulta3 = $mysqli->prepare('SELECT locks
				FROM baneos
				WHERE ban_cedula=?');

      //Verificar si la consulta no da error
			if (!$consulta3) {
  			return "consult_error";
			}

      //Bindear parametros (los ?)
			$consulta3->bind_param("s", $cedula);

      //Ejecutar consulta
			$consulta3->execute();

      //Obtener resultados
			$resultado2 = $consulta3->get_result();

      //Obtener datos
			$datos_ban2 = $resultado2->fetch_assoc();

      //Añadir log
			$locks = $datos_ban2['locks'] + 1;
			$accion = 'Cuenta bloqueada '. $locks .'/5.';
			add_log($mysqli, $cedula, $user, $accion);

      //Regresar mensaje
			return "account_block";
		}
	}else {
		return "consult_error";
	}
}

//Verificar tiempo
function login_timelock_attemps5($mysqli, $cedula, $user) {
  //Consulta a realizar
  $consulta = $mysqli->prepare('SELECT time, attempts, locks
  FROM baneos
  WHERE ban_cedula=?');

  //Verificar que la consulta no de error
  if (!$consulta) {
  	return "consulta falida";
  }

  //Bindear parametros (los ?)
  $consulta->bind_param("s", $cedula);

  //Ejecutar consulta
  $consulta->execute();

  //Obtener resultados
  $resultado = $consulta->get_result();

  //Verificar si la consulta obtuvo algún resultado
  if ($resultado->num_rows == 1) {

    //Obtener datos
    $datos_ban = $resultado->fetch_assoc();

    //Variables
    $time_unban = time() - $datos_ban['time'];
    $time = 300;

    //Verificar timelock
    if ($time_unban > $time) {

      //Variables
      $time_desban = time();

      //Consulta a realizar
      $consulta2 = $mysqli->prepare('UPDATE baneos
  		SET time=?, attempts=0, locks=locks+1
  		WHERE ban_cedula=?');

      //Bindear parametros (los ?)
      $consulta2->bind_param("is", $time_desban, $cedula);

      //Ejecutar consulta
      $consulta2->execute();

      //Regresar mensaje
      return "account_unlock";
    }else {

      //Regresar mensaje
      return "account_still_block";
    }
  }else {
    return "consult_error";
  }
}

//Limpiar errores.
function login_clear($mysqli, $cedula){
  //Consulta a realizar
	$consulta = $mysqli->prepare('DELETE
	FROM baneos
	WHERE ban_cedula=?');

  //Bindear parametros (lost ?)
	$consulta->bind_param("s", $cedula);

  //Ejecutar consulta
	$consulta->execute();
}

//Generar reloginID sql.
function generate_reid($cedula){
	$supermd5 = sha1(md5(sha1($cedula)));
	$encript1 = crypt($cedula, $supermd5);
	$encript2 = crypt($encript1, $supermd5);
	$encript3 = crypt($encript2, $encript1);
	$encript4 = password_hash($encript3, PASSWORD_BCRYPT);
	return $encript4;
}

//Generar reloginID local.
function generate_reid_local($cedula){
	$supermd5 = sha1(md5(sha1($cedula)));
	$encript1 = crypt($cedula, $supermd5);
	$encript2 = crypt($encript1, $supermd5);
	$encript3 = crypt($encript2, $encript1);
	return $encript3;
}
?>