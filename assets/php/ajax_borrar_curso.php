<?php
sleep(2);
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_borrar_curso.php';

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
		if ($_POST['seccion'] == "all") {
			$estudi_id = "E_".$_POST['curso']."%";
		}else {
			$estudi_id = "%".$_POST['curso'].$_POST['seccion']."%";
		}

		if ($resultado = delete_curso($mysqli, $estudi_id, $_POST['curso'])) {
			if ($_POST['seccion'] == "all") {
				if (isset($_POST['curso'][1])) {
					$curso = $_POST['curso'][0]." grado";
				}else {
					$curso = $_POST['curso']." año";
				}
			}else {
				if (isset($_POST['curso'][1])) {
					$curso = $_POST['curso'][0]." grado ".$_POST['seccion'];
				}else {
					$curso = $_POST['curso']." año ".$_POST['seccion'];
				}
			}
			$respuesta = array('message' => 'ok', 'cantidad' => $resultado, 'curso' => $curso);
			$accion = "Curso borrado: ".$curso.".";
			add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
		}else {
			$respuesta = array('message' => 'no_registro');
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