<?php
//Delay
sleep(1);

//Conexión
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_avatar.php';

sec_session_start();

try {
  //Verificar token
	if (!token($_SESSION['token'])) {
		throw new Exception('token');
	}

	//Verificar si es administrador
	if (!($_SESSION['loginIs'] == "admin" || $_SESSION['loginIs'] == "creador")) {
		throw new Exception('internal_error');
	}

	//Verificar variables vacias
	if (!verifyEmpty($_FILES)) {
		throw new Exception('empty');
  }

  //Seleccionar url
  if ($_SESSION['privilegio'] === 'A-') {
		$url = '../../../admin/avatars/';
		$urlSQL = 'admin/avatars/';
  }else if ($_SESSION['privilegio'] === 'CR-') {
		$url = '../../../creadores/avatars/';
		$urlSQL = 'creadores/avatars/';
	}

	//Verificar carga del archivo
	$img = $_FILES['foto'];
	if (!isset($img['name']) && $img['error'] !== UPLOAD_ERR_OK) {
		throw new Exception('no_upload');
	}

	//Verificar tamaño máximo 10MB
	if (!($img['size'] <= 10000000)){
		throw new Exception('no_size');
	}

	//Verificar si es una imagen
	if ($img['type'] !== "image/png" && $img['type'] !== "image/gif" && $img['type'] !== "image/jpg" && $img['type'] !== "image/jpeg") {
		throw new Exception('no_type');
	}

	//Verificar destino
	if (!file_exists($url)) {
		$oldumask = umask(0); 
		if (mkdir($url, 0777, true)) {
			umask($oldumask); 
		}
	}

	$img['name'] = explode(".", $img['name']);//Subdividir string para obtener la extensión exacta.
	$origen=$img["tmp_name"];
	$destino=$url.$_SESSION['cedulaSin'].".".$img['name'][1];
	if (!(@move_uploaded_file($origen, $destino))) {
		throw new Exception('no_move');
	}

	$urlSQL=$urlSQL.$_SESSION['cedulaSin'].".".$img['name'][1];
	$changeAva = changeAvatar($mysqli, $_SESSION['privilegio'], $urlSQL, $_SESSION['cedula']);

	$accion = "Avatar actualizado.";
	add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
	if ($changeAva) {
		$respuesta = array('status' => 'ok', 'message' => 'ok_SQL', 'avatar' => $urlSQL);
	}else {
		$respuesta = array('status' => 'ok', 'message' => 'ok', 'avatar' => $urlSQL);
	}

	//UPDATE SESSION IMG
	$_SESSION['avatar'] = $urlSQL;
} catch (\Throwable $e) {
  $respuesta = array('status' => 'error','message' => $e->getMessage());
}

echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>