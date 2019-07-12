<?php
//Mysqli
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_registros.php';

//Delay
sleep(1);

//Start session
sec_session_start();

if (token($_SESSION['token'])) {
	if ($_SESSION['loginIs'] == "admin") {
		$datos = registros_log($mysqli);
		$respuesta = $datos;
	}else {
		$respuesta = array('status' => 'error', 'description' => 'internal_error');
	}
}else {
	$respuesta = array('status' => 'error', 'description' => 'token');
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>