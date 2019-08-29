<?php
function buscador_change_pw($mysqli, $cedula, $privilegio, $new_password){
	//Verificar privilegio
	if ($privilegio == "V-") {
		//Consulta a realizar
		$consulta = $mysqli->prepare("SELECT password
			FROM login
			WHERE cedula=?");
		//Bindear parametros (los ?)
		$consulta->bind_param("s", $cedula);

		//Ejecutar consulta
		$consulta->execute();

		//Obtener resultados
		$resultado = $consulta->get_result();

		if ($resultado->num_rows >= 1) {

			//Consulta a realizar
			$consulta2 = $mysqli->prepare("UPDATE login 
				SET password=?
				WHERE cedula=?");

			//Bindear parametros (los ?)
			$consulta2->bind_param("ss", $new_password, $cedula);

			//Ejecutar consulta
			$consulta2->execute();

			//Verificar si afectó algún registro
			if ($consulta2->affected_rows == 1) {
				return "update_ok";
			}else {
				return "update_error";
			}
		}else {
			return "no_found";
		}
	}else if ($privilegio == "CR-") {
			//Consulta a realizar
		$consulta = $mysqli->prepare("SELECT password
			FROM creadores
			WHERE cedula=?");
		//Bindear parametros (los ?)
		$consulta->bind_param("s", $cedula);

		//Ejecutar consulta
		$consulta->execute();

		//Obtener resultados
		$resultado = $consulta->get_result();

		if ($resultado->num_rows >= 1) {

			//Consulta a realizar
			$consulta2 = $mysqli->prepare("UPDATE creadores 
				SET password=?
				WHERE cedula=?");

			//Bindear parametros (los ?)
			$consulta2->bind_param("ss", $new_password, $cedula);

			//Ejecutar consulta
			$consulta2->execute();

			//Verificar si afectó algún registro
			if ($consulta2->affected_rows == 1) {
				return "update_ok";
			}else {
				return "update_error";
			}
		}else {
			return "no_found";
		}
	}else if ($privilegio == "A-") {
		return "no_change_admin";
	}
}
?>