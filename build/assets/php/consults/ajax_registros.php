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

try {
	//Verificar token
	if (!token($_SESSION['token'])) {
		throw new Exception('token');
	}

	//Verificar si es administrador
	if (!($_SESSION['loginIs'] == "admin")) {
		throw new Exception('internal_error');
	}

	//Resultado
	$respuesta = registros_log($mysqli);
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}

echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>