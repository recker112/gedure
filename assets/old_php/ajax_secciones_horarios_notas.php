<?php
sleep(2);
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_secciones_horarios_notas.php';

sec_session_start();
if ($_SESSION['loginIs'] == 'usuario') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='user.php'</script>";
  exit;
}elseif ($_SESSION['loginIs'] == 'p_i') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='pre_inscripcion.php'</script>";
  exit;
}

if ($_POST['nota'] && $_POST['horario'] && $_POST['curso'] && $_POST['seccion']) {
	if (token($_SESSION['token'])) {
		$curso = $_POST['curso'];
		$seccion = $_POST['seccion'];
		if ($seccion == "all") {
			$estudi_id = "E_".$curso."%";
		}else {
			$estudi_id = "%".$curso.$seccion."%";
		}
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

		$consulta = secciones_horarios_notas_change($mysqli, $estudi_id, $nota, $horario, $curso);

		if ($consulta == "consulta_error") {
			$respuesta = array('message' => 'consul_error');
		}else if ($consulta == "no_found_seccion") {
			$respuesta = array('message' => 'no_found_seccion');
		}else if ($consulta == "ok") {
			if (isset($curso[1])) {
				$curso_fix = $curso[1];
			}else {
				$curso_fix = "A";
			}
			$respuesta = array('message' => 'ok', 'curso' => $curso[0], 'seccion' => $seccion, 'curso_fix' => $curso_fix);
		}else if ($consulta == "no_change") {
			$respuesta = array('message' => 'no_change');
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