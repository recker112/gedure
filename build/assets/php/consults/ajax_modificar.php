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

	//Seleccionar variables
	$privilegio = $_POST['privilegio'];
	$cedula = $_POST['cedula'];
	$password = encript_password_register($_POST['password']);
	$name = $_POST['name'];
	$option = $_POST['option'];
	$curso = $_POST['grado'];
	$seccion = $_POST['seccion'];
	$lista = $_POST['lista'];

	//Verificar que exista en la base de datos
	if ($option === 'UPDATE' || $option === 'DELETE') {
		if (!veryfiUser($mysqli, $privilegio, $cedula)) {
			throw new Exception('no_found');
		}
	}

	//Verificar que no exista en la base de datos
	if ($option === 'INSERT') {
		if (veryfiUser($mysqli, $privilegio, $cedula)) {
			throw new Exception('user_found');
		}
	}

	$modify = modificarUser($mysqli, $privilegio, $cedula, $password, $name, $option, $curso, $seccion, $lista);

	if ($modify !== 'ok') {
		throw new Exception($modify.'_error');
	}

	//Mensaje del log
	if ($option === 'INSERT') {
		$optionMessage = 'Añadido:';
	}else if ($option === 'UPDATE') {
		$optionMessage = 'Actualizado:';
	}else if ($option === 'DELETE') {
		$optionMessage = 'Eliminado:';
	}
	$optionFix = mb_strtolower($option);

	add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], "$optionMessage ".$privilegio.$cedula.".");
	$respuesta = array('status' => 'ok','message' => $optionFix.'_ok');
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}

//Imprimir resultado
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>