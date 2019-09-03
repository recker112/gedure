<?php
//Delay
sleep(1);

//Conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_password.php';

sec_session_start();

try {
	//Verificar token
	if (!token($_SESSION['token'])) {
		throw new Exception('token');
	}

	//Verificar variables vacias
	if (!verifyEmpty($_POST)) {
		throw new Exception('empty');
	}

	//parametros
	$old_password = encript_password($_POST['pass_actual']);
	$new_password = encript_password_register($_POST['pass_new']);
	$verify_log = verify_log($mysqli, $_SESSION['cedula'], "Actualización de contraseña.");
	$last_log = time() - $verify_log['time'];

	if (!($last_log > 300)) {
		throw new Exception('time');
	}

	$change_pw = change_pw($mysqli, $old_password, $_SESSION['cedulaSin'], $_SESSION['user'], $_SESSION['privilegio'], $new_password);

	if ($change_pw !== 'ok') {
		throw new Exception($change_pw);
	}

	$respuesta = array('status' => 'ok', 'message' => 'ok');
	add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], "Actualización de contraseña.");
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}
echo json_encode($respuesta);
//Cerrar conexion
$mysqli->close();
?>
