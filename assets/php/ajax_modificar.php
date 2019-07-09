<?php
//Conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_modificar.php';

//Sleep
sleep(1);

//Iniciar sesión
sec_session_start();

if (isset($_SESSION['token']) && token($_SESSION['token'])) {
	if ($_SESSION['loginIs'] == "admin") {
		$privilegio = $_POST['privilegio'];
		$cedula = $_POST['cedula'];
		$password = encript_password_register($_POST['password']);
		$name = $_POST['name'];
		$option = $_POST['option'];
		//Verificar si las variables curso estan vacias.
		if (empty($_POST['grado']) || empty($_POST['seccion']) || empty($_POST['lista'])) {
			$respuesta = array('status' => 'error','description' => 'no_curso');
		}else {
			//SCRIPS
			$curso = $_POST['grado'];
			$seccion = $_POST['seccion'];
			$lista = $_POST['lista'];

			//Escojer funcion
			if ($privilegio == "V-") {
				//USER
				$resultado = modificar_user($mysqli, $privilegio, $cedula, $password, $name, $option, $curso, $seccion, $lista);
			}else if ($privilegio == "A-") {
				//ADMIN
				$resultado = modificar_admin($mysqli, $privilegio, $cedula, $password, $name, $option);
			}else if ($privilegio == "CR-") {
				$resultado = modificar_creador($mysqli, $privilegio, $cedula, $password, $name, $option);
			}

			//Mensajes de status
			if ($resultado == "insert_ok") {
				$respuesta = array('status' => 'ok','description' => 'insert_ok');
			}else if ($resultado == "update_ok") {
				$respuesta = array('status' => 'ok','description' => 'update_ok');
			}else if ($resultado == "delete_ok") {
				$respuesta = array('status' => 'ok','description' => 'delete_ok');
			}else if ($resultado == "insert_error") {
				$respuesta = array('status' => 'error','description' => 'insert_error');
			}else if ($resultado == "update_error") {
				$respuesta = array('status' => 'error','description' => 'update_error');
			}else if ($resultado == "delete_error") {
				$respuesta = array('status' => 'error','description' => 'delete_error');
			}else {
				$respuesta = array('status' => 'error','description' => 'consult_error');
			}

			//Cerrar conexion.
			$mysqli->close();
		}
	}else {
		$respuesta = array('status' => 'error','description' => 'internal_error');
	}
}else {
	$respuesta = array('status' => 'error','description' => 'token');
}

//Imprimir resultado
echo json_encode($respuesta);
?>