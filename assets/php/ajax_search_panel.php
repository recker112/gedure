<?php
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_search_panel.php';

sec_session_start();
if (isset($_SESSION['loginIs']) && $_SESSION['loginIs'] != "admin") {
	header("location: ../../panel.php");
}

if (token($_SESSION['token'])) {
	if ($_SESSION['loginIs'] == "admin") {
		$buscar = $_POST['buscar'];
		$datos = search_panel($mysqli, $buscar);
		echo json_encode($datos);
	}else {
		echo "None.";
	}
}else {
	echo "None.";
}
?>