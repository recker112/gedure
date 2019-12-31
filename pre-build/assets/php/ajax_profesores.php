<?php
//Delay
sleep(1);

//Conexión
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_prof.php';

sec_session_start();

if (isset($_SESSION['token']) && token($_SESSION['token'])) {
	if ($_SESSION['loginIs'] == "admin") {
		$nombre = $_POST['name'];
		$curso = $_POST['curso'];
		$seccion = $_POST['seccion'];

		$consulta = modificar_prof($mysqli, $nombre, $curso, $seccion);

		if ($consulta == "consult_error") {
			$respuesta = array('message' => 'consult_error');
		}else if ($consulta == "no_found_seccion") {
			$respuesta = array('message' => 'no_found_seccion');
		}else if ($consulta == "no_change") {
			$respuesta = array('message' => 'no_change');
		}else if ($consulta == "ok") {
			$respuesta = array('message' => 'ok');
			$accion = "Prof modificado: ".$curso." ". $seccion .".";
			add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
		}else {
			$respuesta = array('message' => 'internal_error');
		}
	}else {
		$respuesta = array('message' => 'internal_error');
	}
}else {
	$respuesta = array('message' => 'token');
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>