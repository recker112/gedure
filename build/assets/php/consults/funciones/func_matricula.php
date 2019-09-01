<?php
//Abrir archivos para leer.
function utf8_fopen($archivo) {
    $handle=fopen($archivo, "rw");
    fwrite($handle, "\xEF\xBB\xBF");
    return $handle;
}

//Abrir archivos para escribir.
function utf8_fopen_insert($archivo) {
    $handle=fopen($archivo, "w");
    fwrite($handle, "\xEF\xBB\xBF");
    return $handle;
}

//Actualizar estudiante.
function update_matricula($mysqli, $user, $aula, $cedulaSin) {
  $cedula = "V-".$cedulaSin;
	$consulta = $mysqli->prepare('UPDATE login SET
	user=?, estudi_id=?
	WHERE cedula=?');
	if (!$consulta) {
	  return "error";
	}
	$consulta->bind_param("sss", $user, $aula, $cedula);
	$consulta->execute();

	if ($consulta->affected_rows >= 1) {
	  return true;
	}else {
	  return false;
	}
}

//Añadir estudiante.
function add_matricula($mysqli, $user, $aula, $cedulaSin, $password) {
  $cedula= "V-".$cedulaSin;
    $consulta = $mysqli->prepare('INSERT INTO login
    (cedula, user, password, estudi_id)
    VALUES
    (?,?,?,?)');
    if (!$consulta) {
      return false;
    }
    $consulta->bind_param("ssss", $cedula, $user, $password, $aula);
    $consulta->execute();

    if ($consulta->affected_rows >= 1) {
      return "yes";
    }else {
      return $consulta;
    }
}

function insertMatricula($mysqli, $cedula, $user, $password, $estudi_id){
  $cedulaReady = "V-".$cedula;
  $estudi_id = $estudi_id."_38";
  //Consulta
  $consulta = $mysqli->prepare('INSERT INTO login
  (cedula, user, password, estudi_id)
  VALUES
  (?,?,?,?)');
  if (!$consulta) {
    return false;
  }
  $consulta->bind_param("ssss", $cedulaReady, $user, $password, $estudi_id);
  $consulta->execute();

  if ($consulta->affected_rows >= 1) {
    return true;
  }else {
    return false;
  }
}

function updateMatricula($mysqli, $cedula, $user, $estudi_id){
  $cedulaReady = "V-".$cedula;
  $estudi_id = $estudi_id."_38";
  //Consulta
  $consulta = $mysqli->prepare('UPDATE login SET
	user=?, estudi_id=?
	WHERE cedula=?');
  if (!$consulta) {
    return false;
  }
  $consulta->bind_param("sss", $user, $estudi_id, $cedulaReady);
  $consulta->execute();

  if ($consulta->affected_rows >= 1) {
    return true;
  }else {
    return false;
  }
}
?>