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

	//Verificar que exista en la base de datos
	if ($option === 'UPDATE' || $option === 'DELETE') {
		if (!($datos = veryfiUser($mysqli, $privilegio, $cedula))) {
			throw new Exception('no_found');
		}
	}

	//Verificar que no exista en la base de datos
	if ($option === 'INSERT') {
		if (veryfiUser($mysqli, $privilegio, $cedula)) {
			throw new Exception('user_found');
		}
	}

	//Verificar si existen el viejo estudi_id
	if (!isset($datos['estudi_id'])) {
		$datos['estudi_id']=false;
	}

	$modify = modificarUser($mysqli, $privilegio, $cedula, $password, $name, $option, $curso, $seccion, $datos['estudi_id']);

	if (substr($modify, 0, 2) !== 'ok') {
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

	//Mostrar cantidad total de estudiantes actualizados
	if (substr($modify, 0, 2) === 'ok' && $modify !== 'ok') {
		$optionFix = "update_".substr($modify, 4,8);
	}

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