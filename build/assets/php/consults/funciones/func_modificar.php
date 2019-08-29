<?php
function modificarUser($mysqli, $privilegio, $cedula, $password, $name, $option, $curso, $seccion, $lista){
	//Cedula
	$cedulaReady = $privilegio.$cedula;

	//Parámetros normales
	$insertP1 = '(cedula, user, password)';
	$insertP2 = '(?,?,?)';
	$updateP1 = 'cedula=?, user=?';

	//Verificar privilegio
	if ($privilegio === 'V-') {
		$tabla = 'login';
		$estudi_id = "E_".$curso.$seccion."_".$lista;
		$insertP1 = '(cedula, user, password, estudi_id)';
		$insertP2 = '(?,?,?,?)';
		$updateP1 = 'cedula=?, user=?, estudi_id=?';
	}else if ($privilegio === 'A-') {
		$tabla = 'admins';
	}else if ($privilegio === 'CR-') {
		$tabla = 'creadores';
	}

	//Verificar opcion
	if ($option === 'INSERT') {
		$sql = "INSERT INTO $tabla
		$insertP1
		VALUES
		$insertP2";
	}else if ($option === 'UPDATE') {
		$sql = "UPDATE $tabla
		SET $updateP1 
		WHERE cedula=?";
	}else if ($option === 'DELETE') {
		$sql = "DELETE FROM $tabla
		WHERE cedula=?"; 
	}

	//Consulta
	$consulta = $mysqli->prepare($sql);
	if (!$consulta) {
		return 'consult_error';
	}

	//Bind de parametros
	if ($option === 'INSERT') {
		if ($privilegio === 'V-') {
			$consulta->bind_param('ssss', $cedulaReady, $name, $password, $estudi_id);
		}else {
			$consulta->bind_param('sss', $cedulaReady, $name, $password);
		}
	}else if ($option === 'UPDATE') {
		if ($privilegio === 'V-') {
			$consulta->bind_param('ssss', $cedulaReady, $name, $estudi_id, $cedulaReady);
		}else {
			$consulta->bind_param('sss', $cedulaReady, $name, $cedulaReady);
		}
	}else {
		$consulta->bind_param('s', $cedulaReady);
	}

	//Ejecutar consulta
	$consulta->execute();

	if ($consulta->affected_rows === 1) {
		return 'ok';
	}else {
		$optionFix = mb_strtolower($option);
		return $optionFix;
	}
}
?>