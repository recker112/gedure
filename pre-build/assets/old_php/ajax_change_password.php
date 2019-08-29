<?php
sleep(3);

//Dependencias
require 'connect_db.php';
require 'funciones/func_global.php';
require 'funciones/func_change_pw.php';

sec_session_start();
if (isset($_POST['old_pw']) && isset($_POST['new_pw'])) {
	$old_password = encript_password($_POST['old_pw']);
	$new_password = encript_password_register($_POST['new_pw']);

	$verify_log = verify_log($mysqli, $_SESSION['cedula'], "Actualización de contraseña.");
	$last_log = time() - $verify_log['time'];

	if ($last_log >= 300 ) {
		$change_pw = change_pw_verify($mysqli, $old_password, $_SESSION['cedulaSin'], $_SESSION['user'], $_SESSION['privilegio'], $new_password);
		if ($change_pw == "consulta fallida") {
			$respuesta = array('status' => 'fallido', 'message' => 'consulta fallida');
		}else if ($change_pw == "old_pass no coinciden") {
			$respuesta = array('status' => 'fallido', 'message' => 'old_pass');
		}else if ($change_pw == "execute") {
			$respuesta = array('status' => 'exitoso', 'message' => 'ok');
			$accion = "Actualización de contraseña.";
			add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
		}
	}else {
		$respuesta = array('status' => 'fallido', 'message' => 'time');
	}
	//Cerrar conexion.
	$mysqli->close();
	echo json_encode($respuesta);
}else {
	echo "None.";
}
?>