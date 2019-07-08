<?php
function change_pw_verify($mysqli, $old_password, $cedulaSin, $user, $privilegio, $new_password){
	$cedula = $privilegio.$cedulaSin;
	if ($privilegio == "V-") {
		$consulta = $mysqli->prepare("SELECT password
			FROM login
			WHERE cedula=?");
		if (!$consulta) {
			return "consulta fallida";
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
					return "consulta fallida";
				}
				$consulta2->bind_param("ss", $new_password, $cedula);
				$consulta2->execute();
				return "execute";
			}else {
				return "old_pass no coinciden";
			}
		}else {
			return "consulta fallida";
		}
	}else if ($privilegio == "A-") {
		$consulta = $mysqli->prepare("SELECT password
			FROM admins
			WHERE cedula=?");
		if (!$consulta) {
			return "consulta fallida";
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
					return "consulta fallida";
				}
				$consulta2->bind_param("ss", $new_password, $cedula);
				$consulta2->execute();
				return "execute";
			}else {
				return "old_pass no coinciden";
			}
		}else {
			return "consulta fallida";
		}
	}else if ($privilegio == "P-") {
		return "consulta fallida";
	}
}
?>