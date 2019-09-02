<?php
sleep(2);
//Realizar conexion
require 'connect_db.php';

//Llamar a las funciones
require 'funciones/func_global.php';

sec_session_start();
if ($_SESSION['loginIs'] == 'usuario') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='user.php'</script>";
  exit;
}elseif ($_SESSION['loginIs'] == 'p_i') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='pre_inscripcion.php'</script>";
  exit;
}

if (isset($_POST['curso']) && isset($_POST['seccion'])) {
	if (token($_SESSION['token'])) {
		$curso = $_POST['curso'];
		$seccion = $_POST['seccion'];
		if ($seccion == "all") {
			if (isset($curso[1])) {
				$dir = "../../src/Cursos_boletas/$curso[0] grado/";
			}else {
				$dir = "../../src/Cursos_boletas/$curso año/";
			}
		}else {
			if (isset($curso[1])) {
				$dir = "../../src/Cursos_boletas/$curso[0] grado/$seccion";
			}else {
				$dir = "../../src/Cursos_boletas/$curso año/$seccion";
			}
		}
		$scanFiles = glob($dir."*");

		foreach ($scanFiles as $files) {
			if (is_file($files)) {
				if (unlink($files)) {
					echo "Archivo: ".basename($files)."<br>".
						"Estado: Eliminado.<br><br>";
				}else {
					echo "Archivo: ".basename($files)."<br>".
					"Estado: No encontrado.<br><br>";
				}
			}else {
				$superScan = glob($files."/*");
				foreach ($superScan as $superFiles) {
					if (is_file($superFiles)) {
						if (unlink($superFiles)) {
							echo "Archivo: ".basename($files)."/".basename($superFiles)."<br>".
								"Estado: Eliminado.<br><br>";
						}
					}else {
						echo "Archivo: ".basename($files)."/".basename($superFiles)."<br>".
							"Estado: No encontrado.<br><br>";
					}
				}
			}
		}
	}else {
		echo "Error en los procesos internos!! <br> Ex000001";
	}
}else {
	echo "None.";
}
?>