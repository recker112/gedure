<?php

//Dependencias
require '../assets/php/connect_db.php';
require '../assets/php/verify_cookie_session.php';

if ($verify_cs && $_SESSION['loginIs'] == "admin") {
	$dir = "../src/web-assets/Manual.pdf";
	//Llamar archivo.
	header('Content-Type: application/pdf');
	header('Expires: 0');
	header('Cache-Control: must-revalidate');
	header('Pragma: public');
	ob_clean();
	flush();
	readfile($dir);
}else {
  header("location: ../panel.php");
}
?>
