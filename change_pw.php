<?php
//Dependencias
require 'assets/php/connect_db.php';
require 'assets/php/funciones/func_global.php';
require 'assets/php/funciones/func_change_pw.php';
require 'assets/php/funciones/func_login.php';
require 'assets/php/funciones/func_cookie.php';
require 'assets/php/verify_cookie_session.php';

//Scripts
if ($_SESSION['privilegio'] == "P-") {
	header("location: pre_inscripcion.php");
	exit;
}
require 'head.php';
require 'assets/paginas/change_pw/css.php';
require 'assets/paginas/change_pw/header.php';
require 'assets/paginas/change_pw/main.php';
require 'footer.php';
require 'assets/paginas/change_pw/js.php';
 ?>