<?php
//Dependencias
require '../assets/php/consults/connect_db.php';
require '../assets/php/consults/verify_cookie_session.php';

if ($verify_cs && $_SESSION['loginIs'] == "user") {
	$archivo = $_GET['file'];
	$dir = "../assets/src/constancias/$archivo.docx";

	//Llamar archivo.
	header("Content-disposition: attachment; filename=$archivo.docx");
	header("Content-type: application/msword");
	header ("Content-Length: ".filesize($dir));
	readfile($dir);
}else {
	header("location: ../panel.php");
}
?>