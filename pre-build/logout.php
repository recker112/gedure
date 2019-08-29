<?php
sleep(3);
require 'assets/php/connect_db.php';
require 'assets/php/funciones/func_global.php';
require 'assets/php/funciones/func_logout.php';

//Consulta borra cookies.
if (isset($_COOKIE['reloginID_user'])) {
	delete_cookie($mysqli, $_COOKIE['reloginID_user']);
}
//Rompe las cookies.
setcookie("reloginID", "null", time() - 1, "/", $_SERVER['HTTP_HOST']);
setcookie("reloginID_user", "null", time() - 1, "/", $_SERVER['HTTP_HOST']);

sec_session_start();//Inicia la sesion.
session_unset();//Remueve la sesion.
session_destroy();//Destruye la sesion.

header("location: index.php");//Redireccion a la pagina de login.
exit;
 ?>