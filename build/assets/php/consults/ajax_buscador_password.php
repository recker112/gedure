<?php
//Delay
sleep(2);

//Conexión
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_buscador_password.php';

//Iniciar sesión
sec_session_start();

try {
	//Verificar token
	if (!token($_SESSION['token'])) {
		throw new Exception('token');
	}

	//Verificar si es administrador
	if (!($_SESSION['loginIs'] == "admin")) {
		throw new Exception('internal_error');
	}

	//Verificar variables vacias
	if (!verifyEmpty($_POST)) {
		throw new Exception('empty');
	}

	//Variables
	$new_password = password_generate(3);
	$new_password_encrypt = encript_password_register($new_password);
	$cedula = $_POST['cedula'];
	$privilegio = $_POST['privilegio'];

	//Cambio de pw
	$change_pw = buscador_change_pw($mysqli, $cedula, $privilegio, $new_password_encrypt);

	if ($change_pw !== 'update_ok') {
		throw new Exception($change_pw);
	}

	$respuesta = array('message' => 'update_ok', 'password' => $new_password);
	add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], "Contraseña generada para $cedula");
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>