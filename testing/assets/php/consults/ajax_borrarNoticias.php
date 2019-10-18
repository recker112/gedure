<?php
//Delay
sleep(1);

//Conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_anuncios.php';

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
	
	//Variables
	$option = $_POST['option'];
	$ID = $_POST['id'];

	if ($option === 'id') {
		$delete = deleteNoticiaFromDB($mysqli, $ID);
	}else if ($option === 'unsee'){
		$delete = allUnseeDeleteNoticiaFromDB($mysqli);
	}else {
		throw new Exception('internal_error');
	}

	if ($delete !== 'ok') {
		throw new Exception($delete);
	}
	
  $respuesta = array('status' => 'ok','message' => $delete);
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>