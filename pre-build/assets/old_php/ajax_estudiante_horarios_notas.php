<?php 
sleep(2);
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_estudiante_horarios_notas.php';

sec_session_start();
if ($_SESSION['loginIs'] == 'usuario') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='user.php'</script>";
  exit;
}elseif ($_SESSION['loginIs'] == 'p_i') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='pre_inscripcion.php'</script>";
  exit;
}

if (isset($_POST['cedula']) && isset($_POST['nota']) && isset($_POST['horario'])) {
	if (token($_SESSION['token'])) {
		if ($_POST['nota'] == "A") {
			$nota = 1;
		}else if ($_POST['nota'] == "D") {
			$nota = 0;
		}

		if ($_POST['horario'] == "A") {
			$horario = 1;
		}else if ($_POST['horario'] == "D") {
			$horario = 0;
		}
		$cedula = "V-".$_POST['cedula'];

		$consulta = estudiante_horarios_notas_change($mysqli, $cedula, $nota, $horario);

		if ($consulta == "Consulta error") {
			$respuesta = array('message' => 'consulta_error');
		}else if ($consulta == "Usuario no encontrado") {
			$respuesta = array('message' => 'user_no_found');
		}else if ($consulta == "No cambios") {
			$respuesta = array('message' => 'no_change');
		}else if ($consulta = "ok") {
			$respuesta = array('message' => 'ok');
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