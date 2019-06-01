<?php
function verify_reloginID($mysqli, $cookieEncript, $cookieUser){
	$consulta = $mysqli->prepare("SELECT relogin_encript, relogin_cedula
		FROM reloginID
		WHERE relogin_user=?
		LIMIT 1");
	$consulta->bind_param("s", $cookieUser);
	$consulta->execute();
	$resultado = $consulta->get_result();

	if ($resultado->num_rows == 1) {
		$dato_encript = $resultado->fetch_assoc();
		$verify = password_verify($cookieEncript, $dato_encript['relogin_encript']);
		if ($verify == true) {
			$datos = verify_user($mysqli, $dato_encript['relogin_cedula']);
			$login = login($mysqli, $datos, password_hash("reckersito49937", PASSWORD_BCRYPT), "off", $dato_encript['relogin_cedula']);
			return $login;
		}else {
			return false;
		}
	}else {
		return false;
	}
}
?>