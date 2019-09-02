<?php
//Delay
sleep(1);

//Conexión
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_desblock.php';

sec_session_start();

if (isset($_SESSION['token']) && token($_SESSION['token'])) {
	if ($_SESSION['loginIs'] == "admin") {
		$cedula = $_POST['cedula'];

		if (desblock($mysqli, $cedula)) {
			$respuesta = array("message" => "ok");
			$accion = "Usuario desbloqueado: ".$cedula.".";
			add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
		}else {
			$respuesta = array("message" => "no_register");
		}
	}else {
		$respuesta = array("message" => "internal_error");
	}
}else {
	$respuesta = array("message" => "token");
}

echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>