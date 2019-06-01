<?php
//Verificar lista de baneados
function banlist($mysqli, $cedula){
  $consulta = $mysqli->prepare('SELECT time, attempts, locks
  FROM baneos
  WHERE ban_cedula=?
  LIMIT 1');
  if (!$consulta) {
    return "consulta falida";
  }
  $consulta->bind_param("s", $cedula);
  $consulta->execute();
  $resultado = $consulta->get_result();

  if ($resultado->num_rows == 1) {
    $datos = $resultado->fetch_assoc();
    if ($datos['locks'] >= 5) {
      return "locks_5";
    }elseif ($datos['attempts'] >= 5) {
      return "attempts_5";
    }else {
      return "register";
    }
  }else {
    return "no_register";
  }
}

//Consulta de errores sin registro previo.
function login_failed_register($mysqli, $cedula, $user, $privilegio){
  if ($privilegio == "P-") {
  	return "banlist";
  }else {
  	$cedulaC = $privilegio.$cedula;
	$time = time();
	$attempts = 1;
	$consulta = $mysqli->prepare('INSERT INTO baneos
	(ban_cedula, ban_user, time, attempts)
	VALUES (?,?,?,?)');
	if (!$consulta) {
    	return "consulta falida";
  	}
	$consulta->bind_param("ssii", $cedulaC, $user, $time, $attempts);
	$consulta->execute();
	return "banlist";
	}
}

//Añadir modificacion al registro de baneo.
function login_failed_add($mysqli, $cedula, $user){
	$consulta = $mysqli->prepare('SELECT time, attempts, locks
	  FROM baneos
	  WHERE ban_cedula=?
	  LIMIT 1');
	if (!$consulta) {
    	return "consulta falida";
  	}
	$consulta->bind_param("s", $cedula);
	$consulta->execute();
	$resultado = $consulta->get_result();

	if ($resultado->num_rows == 1) {
		$datos_ban = $resultado->fetch_assoc();

		if ($datos_ban['attempts'] <= 3) {
			$time = time();
		    $consulta2 = $mysqli->prepare('UPDATE baneos
		      SET time=?, attempts=attempts+1
		      WHERE ban_cedula=?');
		    if (!$consulta2) {
    			return "consulta falida";
  			}
		    $consulta2->bind_param("is", $time, $cedula);
		    $consulta2->execute();
		    return "error añadido a la banlist";
			}else if ($datos_ban['attempts'] == 4 && $datos_ban['locks'] == 4) {
				$time_desban = time();
			    $consulta2 = $mysqli->prepare('UPDATE baneos
					SET time=?, attempts=0, locks=locks+1
					WHERE ban_cedula=?');
			    if (!$consulta2) {
    				return "consulta falida";
  				}
			    $consulta2->bind_param("is", $time_desban, $cedula);
			    $consulta2->execute();
				$accion = 'Cuenta bloqueada permanentemente.';
				add_log($mysqli, $cedula, $user, $accion);
				return "bloqueo permanente";
		}else {
				//Actualizar errores.
				$time = time();
			$consulta2 = $mysqli->prepare('UPDATE baneos
				SET time=?, attempts=attempts+1
				WHERE ban_cedula=?');
			if (!$consulta2) {
    			return "consulta falida";
  			}
			$consulta2->bind_param("is", $time, $cedula);
			$consulta2->execute();

			//Añadir el lock.
			$consulta3 = $mysqli->prepare('SELECT locks
				FROM baneos
				WHERE ban_cedula=?');
			if (!$consulta3) {
    			return "consulta falida";
  			}
			$consulta3->bind_param("s", $cedula);
			$consulta3->execute();
			$resultado2 = $consulta3->get_result();
			$datos_ban2 = $resultado2->fetch_assoc();
			$locks = $datos_ban2['locks'] + 1;
			$accion = 'Cuenta bloqueada '. $locks .'/5.';
			add_log($mysqli, $cedula, $user, $accion);
			return "bloqueo";
		}
	}else {
		return "consulta falida";
	}
}

//Verificar tiempo
function login_failed_timelock($mysqli, $cedula, $user) {
  $consulta = $mysqli->prepare('SELECT time, attempts, locks
  FROM baneos
  WHERE ban_cedula=?');
  if (!$consulta) {
  	return "consulta falida";
  }
  $consulta->bind_param("s", $cedula);
  $consulta->execute();
  $resultado = $consulta->get_result();

  if ($resultado->num_rows == 1) {
    $datos_ban = $resultado->fetch_assoc();
    $time_unban = time() - $datos_ban['time'];
    $time = 300;

    if ($time_unban > $time) {
    $time_desban = time();
    $consulta2 = $mysqli->prepare('UPDATE baneos
		SET time=?, attempts=0, locks=locks+1
		WHERE ban_cedula=?');
    $consulta2->bind_param("is", $time_desban, $cedula);
    $consulta2->execute();
    return "desbloqueo de cuenta";
    }else {
      return "cuenta aun bloqueada";
    }
  }else {
    return "consulta fallida";
  }
}

//Limpiar errores.
function login_clear($mysqli, $cedula){
	$consulta = $mysqli->prepare('DELETE
	FROM baneos
	WHERE ban_cedula=?');
	$consulta->bind_param("s", $cedula);
	$consulta->execute();
}

//Login.
function login($mysqli, $datos, $token, $checkbox, $cedula){
	if (isset($checkbox) && $checkbox == "on") {
		$reloginID = generate_reid($datos['cedula']);
		$reloginID_user = password_generate(10);
		setcookie("reloginID", generate_reid_local($datos['cedula']), time() + 31536000, "/", $_SERVER['HTTP_HOST']);
		setcookie("reloginID_user", $reloginID_user, time() + 31536000, "/", $_SERVER['HTTP_HOST']);
		$consulta = $mysqli->prepare("INSERT INTO reloginID
			(relogin_encript, relogin_user, relogin_cedula)
			VALUES
			(?,?,?)");
		if (!$consulta) {
			return "consulta falida";
		}
		$consulta->bind_param("sss", $reloginID, $reloginID_user, $cedula);
		$consulta->execute();
	}
	$accion = "Inicio de sesión exitoso.";
  	add_log($mysqli, $datos['cedula'], $datos['user'], $accion);
	if ($datos['privilegio'] == "V-") {
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
		$_SESSION['token'] = $token;
		$_SESSION['loginIs'] = "user";
		$_SESSION['change_log'] = 0;
		$_SESSION['change_lock'] = 0;
		return "user";
	}else if ($datos['privilegio'] == "A-") {
		$_SESSION['user'] = $datos['user'];
		$_SESSION['cedula'] = $datos['cedula'];
		$_SESSION['cedulaSin'] = $cedula;
		$_SESSION['privilegio'] = $datos['privilegio'];
		$_SESSION['token'] = $token;
		$_SESSION['loginIs'] = "admin";
		$_SESSION['change_log'] = 0;
		$_SESSION['change_lock'] = 0;
		$_SESSION['inser'] = 0;
		$_SESSION['update'] = 0;
		$_SESSION['error'] = 0;
		return "admin";
	}else if ($datos['privilegio'] == "P-") {
		$_SESSION['user'] = $datos['user'];
		$_SESSION['cedula'] = $datos['cedula'];
		$_SESSION['privilegio'] = $datos['privilegio'];
		$_SESSION['token'] = $token;
		$_SESSION['loginIs'] = "p_i";
		return "p_i";
	}
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