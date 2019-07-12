<?php
//Delay
sleep(1);

//Conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_notas.php';

sec_session_start();

if (isset($_SESSION['token']) && token($_SESSION['token'])) {
	if ($_SESSION['loginIs'] == "admin") {
		if ($_POST['option'] == "estu") {
			$cedula = "V-".$_POST['cedula'];

			//Verificar variables
			if (!empty($_POST['cedula']) && !empty($_POST['nota']) && !empty($_POST['nota'])) {
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

				$consulta = estu_nota($mysqli, $cedula, $nota, $horario);
				
				//Mensajes
				if ($consulta == "consult_error") {
					$respuesta = array('message' => 'consult_error');
				}else if ($consulta == "no_found_user") {
					$respuesta = array('message' => 'no_found_user');
				}else if ($consulta == "no_changes") {
					$respuesta = array('message' => 'no_changes');
				}else if ($consulta == "ok") {
					$respuesta = array('message' => 'ok');
				}else {
					$respuesta = array('message' => 'internal_error');
				}
			}else {
				$respuesta = array('message' => 'empty');
			}
		}else {
			$curso = $_POST['grado'];
			$seccion = $_POST['seccion'];
			$estudi_id = "E_".$curso.$seccion."%";

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

			//Verificar variables
			if (!empty($curso) && !empty($seccion) && !empty($_POST['horario']) && !empty($_POST['nota'])) {
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

				$consulta = sec_nota($mysqli, $estudi_id, $nota, $horario, $curso);

				if ($consulta == "consult_error") {
					$respuesta = array('message' => 'consult_error');
				}else if ($consulta == "no_found_sec") {
					$respuesta = array('message' => 'no_found_sec');
				}else if ($consulta == "no_change") {
					$respuesta = array('message' => 'no_change');
				}else if ($consulta == "ok") {
					$respuesta = array('message' => 'ok');
				}else {
					$respuesta = array('message' => 'internal_error');
				}
				
			}else {
				$respuesta = array('message' => 'empty');
			}
		}
	}
}else {
	$respuesta = array('message' => 'token');
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>