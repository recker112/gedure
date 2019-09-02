<?php
//Consulta para matricula.
function insert_modify($mysqli, $privilegio, $cedula, $user, $password, $curso) {
	if ($privilegio == "V-") {
		$consulta = $mysqli->prepare('INSERT INTO login
			(cedula, user, password, estudi_id)
			VALUES
			(?,?,?,?)');
		if (!$consulta) {
      		return false;
    	}
    	$consulta->bind_param("ssss", $cedula, $user, $password, $curso);
    	if ($consulta->execute()) {
  			return true;
  		}else {
  			return false;
  		}
	}else if ($privilegio == "A-") {
		$consulta = $mysqli->prepare('INSERT INTO admins
			(cedula, user, password)
			VALUES
			(?,?,?)');
		if (!$consulta) {
      		return false;
    	}
    	$consulta->bind_param("sss", $cedula, $user, $password);
    	if ($consulta->execute()) {
  			return true;
  		}else {
  			return false;
  		}
	}else if ($privilegio == "P-") {
		$consulta = $mysqli->prepare('INSERT INTO preinscripcion
			(cedula, user, password)
			VALUES
			(?,?,?)');
		if (!$consulta) {
      		return false;
    	}
    	$consulta->bind_param("sss", $cedula, $user, $password);
    	if ($consulta->execute()) {
  			return true;
  		}else {
  			return false;
  		}
	}
}

//Consulta para matricula.
function update_modify($mysqli, $privilegio, $cedula, $user, $curso) {
	if ($privilegio == "V-") {
		$consulta = $mysqli->prepare('UPDATE login SET
  		user=?, estudi_id=?
  		WHERE cedula=?');
		if (!$consulta) {
      		return false;
    	}
    	$consulta->bind_param("sss", $user, $curso, $cedula);
    	$consulta->execute();
    	if ($consulta->affected_rows >= 1) {
    		return true;
  		}else {
  			return false;
  		}
	}else if ($privilegio == "A-") {
		$consulta = $mysqli->prepare('UPDATE admins SET
  		user=?
  		WHERE cedula=?');
		if (!$consulta) {
      		return false;
    	}
    	$consulta->bind_param("ss", $user, $cedula);
    	$consulta->execute();
    	if ($consulta->affected_rows >= 1) {
    		return true;
  		}else {
  			return false;
  		}
	}else if ($privilegio == "P-") {
		$consulta = $mysqli->prepare('UPDATE preinscripcion SET
 	 	user=?
	  	WHERE cedula=?');
		if (!$consulta) {
      		return false;
    	}
    	$consulta->bind_param("ss", $user, $cedula);
    	$consulta->execute();
    	if ($consulta->affected_rows >= 1) {
    		return true;
  		}else {
  			return false;
  		}
	}
}

//Consulta para matricula.
function delete_modify($mysqli, $privilegio, $cedula) {
	if ($privilegio == "V-") {
		$consulta = $mysqli->prepare('DELETE FROM login
    	WHERE cedula=?');
		if (!$consulta) {
      		return false;
    	}
    	$consulta->bind_param("s", $cedula);
    	$consulta->execute();
    	if ($consulta->affected_rows >= 1) {
    		return true;
  		}else {
  			return false;
  		}
	}else if ($privilegio == "A-") {
		$consulta = $mysqli->prepare('DELETE FROM admins
    	WHERE cedula=?');
		if (!$consulta) {
      		return false;
    	}
    	$consulta->bind_param("s", $cedula);
    	$consulta->execute();
    	if ($consulta->affected_rows >= 1) {
    		return true;
  		}else {
  			return false;
  		}
	}else if ($privilegio == "P-") {
		$consulta = $mysqli->prepare('DELETE FROM preinscripcion
    	WHERE cedula=?');
		if (!$consulta) {
      		return false;
    	}
    	$consulta->bind_param("s", $cedula);
    	$consulta->execute();
    	if ($consulta->affected_rows >= 1) {
    		return true;
  		}else {
  			return false;
  		}
	}
}
?>