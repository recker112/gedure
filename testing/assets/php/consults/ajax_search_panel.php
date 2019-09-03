<?php
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_search_panel.php';

//Iniciar session
sec_session_start();

//Verificar token
if (isset($_SESSION['token']) && token($_SESSION['token'])) {

	//Verificar si el usuario realizando la acción es ADMIN
	if (isset($_SESSION['loginIs']) && $_SESSION['loginIs'] == "admin") {

		//Variables
		$buscar = $_POST['buscar'];

		//Realizar busqueda
		$datos = search_panel($mysqli, $buscar);

		//Opciones de la respuesta de la función search_panel()
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

		//Mostrar respuesta
		echo json_encode($respuesta);
	}else {

		//Mostrar error ADMIN
		echo "None.";
	}
}else {

	//Mostrar error TOKEN
	echo "None.";
}
//Cerrar conexion.
$mysqli->close();
?>