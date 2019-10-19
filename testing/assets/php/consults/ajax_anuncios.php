<?php
//Delay
sleep(1);

//Conexión
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
	if (!($_SESSION['loginIs'] == "admin" || $_SESSION['loginIs'] == "creador")) {
		throw new Exception('internal_error');
	}

	//Verificar variables vacias
	if (!verifyEmpty($_POST)) {
		throw new Exception('empty');
  }

  //Variables
  $title = $_POST['title'];
  $content = $_POST['content'];

  $addAnuncio = addAnunInDB($mysqli, $title, $content, $_SESSION['cedula']);

  if ($addAnuncio !== 'ok') {
    throw new Exception($addAnuncio);
  }

  $respuesta = array('status' => 'ok','message' => 'insert_ok');
} catch (\Throwable $e) {
  $respuesta = array('status' => 'error','message' => $e->getMessage());
}

echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>