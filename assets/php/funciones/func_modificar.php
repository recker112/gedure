<?php
function modificar_user($mysqli, $privilegio, $cedula, $password, $name, $option, $curso, $seccion, $lista){
	$estudi_id = "E_".$curso.$seccion."_".$lista;
	$cedulaUP = $privilegio.$cedula;
	if ($option == "INSERT") {
		$consulta = $mysqli->prepare("INSERT INTO login 
			(cedula, user, password, estudi_id)
			VALUES
			(?,?,?,?)");
		if (!$consulta) {
			return false;
		}
		$consulta->bind_param("ssss", $cedulaUP, $name, $password, $estudi_id);
		$consulta->execute();

		if ($consulta->affected_rows >= 1) {
			return "insert_ok";
		}else {
			return "insert_error";
		}
	}else if ($option == "UPDATE") {
		$consulta = $mysqli->prepare("UPDATE login
			SET cedula=?, user=?, estudi_id=? WHERE cedula=?");
		if (!$consulta) {
			return false;
		}
		$consulta->bind_param("ssss", $cedulaUP, $name, $estudi_id, $cedulaUP);
		$consulta->execute();

		if ($consulta->affected_rows >= 1) {
			return "update_ok";
		}else {
			return "update_error";
		}
	}else if ($option == "DELETE") {
		$consulta = $mysqli->prepare("DELETE FROM login
		 WHERE cedula=?");
		if (!$consulta) {
			return false;
		}
		$consulta->bind_param("s", $cedulaUP);
		$consulta->execute();

		if ($consulta->affected_rows >= 1) {
			return "delete_ok";
		}else {
			return "delete_error";
		}
	}
}

function modificar_admin($mysqli, $privilegio, $cedula, $password, $name, $option) {
	$cedulaUP = $privilegio.$cedula;
	if ($option == "INSERT") {
		$consulta = $mysqli->prepare("INSERT INTO admins 
			(cedula, user, password)
			VALUES
			(?,?,?)");
		if (!$consulta) {
			return false;
		}
		$consulta->bind_param("sss", $cedulaUP, $name, $password);
		$consulta->execute();

		if ($consulta->affected_rows >= 1) {
			return "insert_ok";
		}else {
			return "insert_error";
		}
	}else if ($option == "UPDATE") {
		$consulta = $mysqli->prepare("UPDATE admins
			SET cedula=?, user=? WHERE cedula=?");
		if (!$consulta) {
			return false;
		}
		$consulta->bind_param("sss", $cedulaUP, $name, $cedulaUP);
		$consulta->execute();

		if ($consulta->affected_rows >= 1) {
			return "update_ok";
		}else {
			return "update_error";
		}
	}else if ($option == "DELETE") {
		$consulta = $mysqli->prepare("DELETE FROM admins
		 WHERE cedula=?");
		if (!$consulta) {
			return false;
		}
		$consulta->bind_param("s", $cedulaUP);
		$consulta->execute();

		if ($consulta->affected_rows >= 1) {
			return "delete_ok";
		}else {
			return "delete_error";
		}
	}
}

function modificar_creador($mysqli, $privilegio, $cedula, $password, $name, $option) {
	$cedulaUP = $privilegio.$cedula;
	if ($option == "INSERT") {
		$consulta = $mysqli->prepare("INSERT INTO creadores
			(cedula, user, password)
			VALUES
			(?,?,?)");
		if (!$consulta) {
			return false;
		}
		$consulta->bind_param("sss", $cedulaUP, $name, $password);
		$consulta->execute();

		if ($consulta->affected_rows >= 1) {
			return "insert_ok";
		}else {
			return "insert_error";
		}
	}else if ($option == "UPDATE") {
		$consulta = $mysqli->prepare("UPDATE creadores
			SET cedula=?, user=? WHERE cedula=?");
		if (!$consulta) {
			return false;
		}
		$consulta->bind_param("sss", $cedulaUP, $name, $cedulaUP);
		$consulta->execute();

		if ($consulta->affected_rows >= 1) {
			return "update_ok";
		}else {
			return "update_error";
		}
	}else if ($option == "DELETE") {
		$consulta = $mysqli->prepare("DELETE FROM creadores
		 WHERE cedula=?");
		if (!$consulta) {
			return false;
		}
		$consulta->bind_param("s", $cedulaUP);
		$consulta->execute();

		if ($consulta->affected_rows >= 1) {
			return "delete_ok";
		}else {
			return "delete_error";
		}
	}
}
?>