<?php
//Dependencias
require '../assets/php/connect_db.php';
require '../assets/php/verify_cookie_session.php';

if ($verify_cs && $_SESSION['loginIs'] == "user") {
	$dir = "../src/Cursos_boletas/".$_SESSION['curso']."/".$_SESSION['seccion']."/".$_SESSION['archivo'].".pdf";
	if ($_SESSION['nota'] == "1") {
		if (file_exists($dir)) {
			//Llamar archivo.
			header('Content-Type: application/pdf');
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			ob_clean();
			flush();
			readfile($dir);
		}else {
			echo "Boleta no cargada.";
			echo "<script>setTimeout(function (){window.close()}, 4000);</script>";
		}
	}else {
		echo "Boleta desactivada.";
		echo "<script>setTimeout(function (){window.close()}, 4000);</script>";
	}
}else {
  header("location: ../panel.php");
}
?>