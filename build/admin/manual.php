<?php
//Dependencias
require '../assets/php/consults/connect_db.php';
require '../assets/php/consults/verify_cookie_session.php';

if ($verify_cs && $_SESSION['loginIs'] == "admin") {
	$dir = "../assets/src/web-assets/Manual.pdf";
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
