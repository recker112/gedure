<?php
//Conexion base de datos
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_login.php';
require 'funciones/func_cookie.php';

//Iniciar session
sec_session_start();
if (isset($_SESSION['token']) && isset($_SESSION['loginIs'])) {
	if (token($_SESSION['token'])) {
		$verify_cs = true;
	}else {
		session_unset();//Remueve la session.
		session_destroy();//Destruye la session.
		$verify_cs = false;
	}
}else if (isset($_COOKIE['reloginID']) && isset($_COOKIE['reloginID_user'])) {
	$verify = verify_reloginID($mysqli, $_COOKIE['reloginID'], $_COOKIE['reloginID_user']);
	if ($verify == true) {
		$verify_cs = true;
	}else {
		$verify_cs = false;
	}
}else {
	$verify_cs = false;
}
//Cerrar conexion.
$mysqli->close();
 ?>