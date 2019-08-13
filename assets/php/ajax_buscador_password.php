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

if (isset($_SESSION['token']) && token($_SESSION['token'])) {
	if ($_SESSION['loginIs'] == "admin") {

		//Variables
		$new_password = password_generate(3);
		$new_password_encrypt = encript_password_register($new_password);
		$cedula = $_POST['cedula'];
		$privilegio = $_POST['privilegio'];

		//Cambio de pw
		$change_pw = buscador_change_pw($mysqli, $cedula, $privilegio, $new_password_encrypt);

		//Respuestas
		if ($change_pw == "no_found") {
			$respuesta = array('message' => 'no_found');
		}else if ($change_pw == "update_error") {
			$respuesta = array('message' => 'update_error');
		}else if ($change_pw == "no_change_admin") {
			$respuesta = array('message' => 'user_admin');
		}else if ($change_pw == "update_ok") {
			$respuesta = array('message' => 'update_ok', 'password' => $new_password);
		}

		echo json_encode($respuesta);
	}else {
		echo "None.";
	}
}else {
	echo "None.";
}
//Cerrar conexion.
$mysqli->close();
?>