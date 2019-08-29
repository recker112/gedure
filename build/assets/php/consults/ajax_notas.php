<?php
//Delay
sleep(1);

//Conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_notas.php';

sec_session_start();

try {
	//Verificar token
	if (!token($_SESSION['token'])) {
		throw new Exception('token');
	}

	//Verificar si es administrador
	if (!($_SESSION['loginIs'] == "admin")) {
		throw new Exception('internal_error');
	}

	//Verificar variables vacias
	if (!verifyEmpty($_POST)) {
		throw new Exception('empty');
	}

	//Nota change
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

	if ($_POST['option'] == "estu") {
		//Cedula
		$cedula = "V-".$_POST['cedula'];

		//Consulta
		$consulta = estu_nota($mysqli, $cedula, $nota, $horario);

		if ($consulta !== 'ok') {
			throw new Exception($consulta);
		}

		$respuesta = array('status' => 'ok', 'message' => 'ok');
		$accion = "Configuracion cambiada: ".$cedula.".";
		add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
	}else {
		$curso = $_POST['grado'];
		$seccion = $_POST['seccion'];
		$estudi_id = "E_".$curso.$seccion."%";

		$consulta = sec_nota($mysqli, $estudi_id, $nota, $horario, $curso);

		if ($consulta !== 'ok') {
			throw new Exception($consulta);
		}
		$respuesta = array('status' => 'ok', 'message' => 'ok');
		if (isset($curso[1])) {
			$curso = "$curso grado";
		}else {
			$curso = "$curso año";
		}
		$accion = "Configuracion cambiada: $curso $seccion.";
		add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
	}
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>