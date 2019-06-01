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
      return false;
    }
    $consulta->bind_param("sss", $user, $aula, $cedula);
    if ($consulta->execute()) {
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
    if ($consulta->execute()) {
      return true;
    }else {
      return false;
    }
}
?>