<?php
sleep(2);
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_modify_prof.php';

sec_session_start();
if ($_SESSION['loginIs'] == 'usuario') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='user.php'</script>";
  exit;
}elseif ($_SESSION['loginIs'] == 'p_i') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='pre_inscripcion.php'</script>";
  exit;
}

if (isset($_POST['nombre']) && isset($_POST['curso']) && isset($_POST['seccion'])) {
	if (token($_SESSION['token'])) {
		$nombre = $_POST['nombre'];
		$curso = $_POST['curso'];
		$seccion = $_POST['seccion'];

		$consulta = modify_prof($mysqli, $nombre, $curso, $seccion);

		if ($consulta == "no_found_seccion") {
			$respuesta = array('message' => 'no_found_seccion');
		}else if ($consulta == "no_change") {
			$respuesta = array('message' => 'no_change');
		}else if ($consulta == "ok") {
			if (isset($curso[1])) {
				$curso_fix = "G";
			}else {
				$curso_fix = "A";
			}
			$respuesta = array('message' => 'ok', 'curso' => $curso[0], 'seccion' => $seccion, 'curso_fix' => $curso_fix);
		}
	}else {
		$respuesta = array('message' => 'token');
	}
	//Cerrar conexion.
	$mysqli->close();
	echo json_encode($respuesta);
}else {
	echo "None.";
}
?>