<?php
function change_pw($mysqli, $old_password, $cedulaSin, $user, $privilegio, $new_password){
	$cedula = $privilegio.$cedulaSin;
	if ($privilegio == "V-") {
		$consulta = $mysqli->prepare("SELECT password
			FROM login
			WHERE cedula=?");
		if (!$consulta) {
			return "consult_error";
		}
		$consulta->bind_param("s", $cedula);
		$consulta->execute();
		$resultado = $consulta->get_result();

		if ($resultado->num_rows == 1) {
			$dato = $resultado->fetch_assoc();
			$old_pass = verify_password($old_password, $dato['password']);
			if ($old_pass == true) {
				$consulta2 = $mysqli->prepare('UPDATE login
			      SET password=?
			      WHERE cedula=?');
				if (!$consulta2) {
					return "consult_error";
				}
				$consulta2->bind_param("ss", $new_password, $cedula);
				$consulta2->execute();
				return "ok";
			}else {
				return "old_pass";
			}
		}else {
			return "consult_error";
		}
	}else if ($privilegio == "A-") {
		$consulta = $mysqli->prepare("SELECT password
			FROM admins
			WHERE cedula=?");
		if (!$consulta) {
			return "consult_error";
		}
		$consulta->bind_param("s", $cedula);
		$consulta->execute();
		$resultado = $consulta->get_result();

		if ($resultado->num_rows == 1) {
			$dato = $resultado->fetch_assoc();
			$old_pass = verify_password($old_password, $dato['password']);
			if ($old_pass == true) {
				$consulta2 = $mysqli->prepare('UPDATE admins
			      SET password=?
			      WHERE cedula=?');
				if (!$consulta) {
					return "consult_error";
				}
				$consulta2->bind_param("ss", $new_password, $cedula);
				$consulta2->execute();
				return "ok";
			}else {
				return "old_pass";
			}
		}else {
			return "consult_error";
		}
	}else if ($privilegio == "CR-") {
		$consulta = $mysqli->prepare("SELECT password
			FROM creadores
			WHERE cedula=?");
		if (!$consulta) {
			return "consult_error";
		}
		$consulta->bind_param("s", $cedula);
		$consulta->execute();
		$resultado = $consulta->get_result();

		if ($resultado->num_rows == 1) {
			$dato = $resultado->fetch_assoc();
			$old_pass = verify_password($old_password, $dato['password']);
			if ($old_pass == true) {
				$consulta2 = $mysqli->prepare('UPDATE creadores
			      SET password=?
			      WHERE cedula=?');
				if (!$consulta) {
					return "consult_error";
				}
				$consulta2->bind_param("ss", $new_password, $cedula);
				$consulta2->execute();
				return "ok";
			}else {
				return "old_pass";
			}
		}else {
			return "consult_error";
		}
	}
}
?>