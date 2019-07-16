<?php
//Delay
sleep(1);

//Conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_password.php';

sec_session_start();

if (isset($_SESSION['token']) && token($_SESSION['token'])) {
	if (isset($_POST['pass_actual']) && isset($_POST['pass_new'])) {
		$old_password = encript_password($_POST['pass_actual']);
		$new_password = encript_password_register($_POST['pass_new']);

		$verify_log = verify_log($mysqli, $_SESSION['cedula'], "Actualización de contraseña.");
		$last_log = time() - $verify_log['time'];

		if ($last_log > 300) {
			$change_pw = change_pw($mysqli, $old_password, $_SESSION['cedulaSin'], $_SESSION['user'], $_SESSION['privilegio'], $new_password);

			if ($change_pw == "consult_error") {
				$respuesta = array('message' => 'consult_error');
			}else if ($change_pw == "old_pass") {
				$respuesta = array('message' => 'old_pass');
			}else if ($change_pw == "ok") {
				$respuesta = array('message' => 'ok');
				add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], "Actualización de contraseña.");
			}else {
				$respuesta = array('message' => 'internal_error');
			}
		}else {
			$respuesta = array('message' => 'time');
		}
	}else {
		$respuesta = array('message' => 'internal_error');
	}
}else {
	$respuesta = array('message' => 'token');
}
echo json_encode($respuesta);
//Cerrar conexion
$mysqli->close();
?>
