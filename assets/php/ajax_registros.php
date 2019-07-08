<?php
//Mysqli
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_registros.php';

//Delay
sleep(1);

sec_session_start();
if (isset($_SESSION['loginIs']) && $_SESSION['loginIs'] != "admin") {
	header("location: ../../panel.php");
}

if (token($_SESSION['token'])) {
	if ($_SESSION['loginIs'] == "admin") {
		$datos = registros_log($mysqli);
		echo json_encode($datos);
	}else {
		echo "None.";
	}
}else {
	echo "None.";
}
?>