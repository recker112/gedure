<?php
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_search_panel.php';

sec_session_start();

if (isset($_SESSION['token']) && token($_SESSION['token'])) {
	if (isset($_SESSION['loginIs']) && $_SESSION['loginIs'] == "admin") {
		$buscar = $_POST['buscar'];
		$datos = search_panel($mysqli, $buscar);
		if ($datos == "consult1_error") {
			$respuesta = array('status' => 'error', 'status_message' => 'Consulta 1 fallida');
		}else if ($datos == "consult2_error") {
			$respuesta = array('status' => 'error', 'status_message' => 'Consulta 2 fallida');
		}else if ($datos == "consultV_error") {
			$respuesta = array('status' => 'error', 'status_message' => 'Consulta de estudiante fallida');
		}else if ($datos == "no_found") {
			$respuesta = array('status' => 'error', 'status_message' => 'No existe ese usuario');
		}else {
			$respuesta = $datos;
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