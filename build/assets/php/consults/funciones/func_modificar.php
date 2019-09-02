<?php
require 'func_boletas.php';

function modificarUser($mysqli, $privilegio, $cedula, $password, $name, $option, $curso, $seccion, $old_estudi){
	//Cedula
	$cedulaReady = $privilegio.$cedula;

	//Parámetros normales
	$insertP1 = '(cedula, user, password)';
	$insertP2 = '(?,?,?)';
	$updateP1 = 'cedula=?, user=?';
	$delete = 'cedula=?';

	//Verificar privilegio
	if ($privilegio === 'V-') {
		$tabla = 'login';
		$estudi_id = "E_".$curso.$seccion."_%";
		$insertP1 = '(cedula, user, password, estudi_id)';
		$insertP2 = '(?,?,?,?)';
		$updateP1 = 'cedula=?, user=?, estudi_id=?';
		$delete = 'cedula=? AND estudi_id LIKE "'.$estudi_id.'"';
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
		WHERE $delete"; 
	}

	//Consulta
	$consulta = $mysqli->prepare($sql);
	if (!$consulta) {
		return 'consult_error';
	}

	//Bind de parametros
	if ($option === 'INSERT') {
		if ($privilegio === 'V-') {
			$fix = "E_".$curso.$seccion.'_38';
			$consulta->bind_param('ssss', $cedulaReady, $name, $password, $fix);
		}else {
			$consulta->bind_param('sss', $cedulaReady, $name, $password);
		}
	}else if ($option === 'UPDATE') {
		if ($privilegio === 'V-') {
			$fix = "E_".$curso.$seccion.'_38';
			$consulta->bind_param('ssss', $cedulaReady, $name, $fix, $cedulaReady);
		}else {
			$consulta->bind_param('sss', $cedulaReady, $name, $cedulaReady);
		}
	}else {
		$consulta->bind_param('s', $cedulaReady);
	}

	//Ejecutar consulta
	$consulta->execute();

	$optionFix = mb_strtolower($option);

	if ($consulta->affected_rows === 1) {
		if ($privilegio === 'V-') {
			if ($option === 'UPDATE') {
				return estudiFixUpdate($mysqli, $estudi_id, $old_estudi, $cedulaReady);
			}else {
				return estudiFix($mysqli, $estudi_id);
			}
		}else {
			return 'ok';
		}
	}else {
		return $optionFix;
	}
}

function estudiFix($mysqli, $estudi_id){
	try {
		//Consulta
		$consulta = $mysqli->prepare("SELECT cedula
		FROM login
		WHERE estudi_id LIKE ?");
		if (!$consulta) {
			throw new Exception(false);
		}

		//bind
		$consulta->bind_param("s", $estudi_id);
		$consulta->execute();
		$result = $consulta->get_result();

		//Minimo de estudiantes para verificar las listas
		if (!($result->num_rows >= 2)) {
			throw new Exception('ok');
		}

		//Base de datos local
		$users_db = array();
		//Obtener datos
		while ($fila = $result->fetch_assoc()) {
			array_push($users_db, $fila['cedula']);
		}
		//Limpiar "V-" de los valores
		foreach ($users_db as $key => $value) {
			$users_db[$key] = str_replace("V-", "", $value);
		}
		//Ordenar
		sort($users_db);
		//Contador y organizador
		$i=1;
		$ok=0;
		foreach ($users_db as $key => $value) {
			$users_db[$key] = "V-".$value;
			//EstuID
			$estuID = str_replace("%", "$i", $estudi_id);
			//Consulta mysqli
			$consulta2 = $mysqli->prepare("UPDATE login
			SET estudi_id=?
			WHERE cedula=?");
			if (!$consulta2) {
				return false;
			}
			$consulta2->bind_param("ss", $estuID, $users_db[$key]);
			$consulta2->execute();

			if ($consulta2->affected_rows >= 1) {
				$ok++;
			}
			$i++;
		}
		return "ok";
	} catch (\Throwable $e) {
		return $e->getMessage();
	}
}

function estudiFixUpdate($mysqli, $estudi_id, $old_estudi, $cedula){
	try {
		//Fix estudiID
		$old_estudi = substr($old_estudi,0, 4).'_%';//Formato para poder realizar algoritmos

		//Verificar sección actual con la sección nueva
		if ($estudi_id === $old_estudi) {
			throw new Exception('ok');
		}

		//Mover boleta
		moveBoletas($cedula, $estudi_id, $old_estudi);

		//Seleccionar seccion vieja
		$param = $old_estudi;
		$add=0;

		//Realizar consultas
		for ($i=0; $i < 2; $i++) { 
			//Consulta
			$consulta = $mysqli->prepare("SELECT cedula
			FROM login
			WHERE estudi_id LIKE ?");
			if (!$consulta) {
				throw new Exception(false);
			}

			//bind
			$consulta->bind_param("s", $param);
			$consulta->execute();
			$result = $consulta->get_result();

			//Minimo de estudiantes para verificar las listas
			if (!($result->num_rows >= 1)) {
				throw new Exception('ok');
			}

			//Base de datos local
			$users_db = array();
			//Obtener datos
			while ($fila = $result->fetch_assoc()) {
				array_push($users_db, $fila['cedula']);
			}
			//Limpiar "V-" de los valores
			foreach ($users_db as $key => $value) {
				$users_db[$key] = str_replace("V-", "", $value);
			}
			//ordenar
			sort($users_db);
			//Contador y organizador
			$o=1;
			$ok=0;
			foreach ($users_db as $key => $value) {
				$users_db[$key] = "V-".$value;
				//EstuID
				$estuID = str_replace("%", "$o", $param);
				//Consulta mysqli
				$consulta2 = $mysqli->prepare("UPDATE login
				SET estudi_id=?
				WHERE cedula=?");
				if (!$consulta2) {
					return false;
				}
				$consulta2->bind_param("ss", $estuID, $users_db[$key]);
				$consulta2->execute();

				if ($consulta2->affected_rows >= 1) {
					$ok++;
				}
				$o++;
			}
			$add+=$ok;
			//Cambiar a la sección nueva
			$param = $estudi_id;
		}
		return "ok_$add";
	} catch (\Throwable $e) {
		return $e->getMessage();
	}
}
?>