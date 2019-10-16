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

  //Verificar si es administrador o creador
	if ($_SESSION['loginIs'] === "user") {
		throw new Exception('internal_error');
  }

  //Verificar variables vacias
	if (!verifyEmpty($_POST) && verifyEmpty($_FILES)) {
		throw new Exception('empty');
  }

  //Variables
  $title = $_POST['title'];
  $content = $_POST['content'];
  $owner = $_SESSION['cedula'];
  $destino = "../../src/noticias/img/";

  //Verificar destino
  if (!file_exists($destino)) {
    $oldumask = umask(0); 
    if (mkdir($destino, 0777, true)) {
      umask($oldumask); 
    }
  }

  //Verificar cantidad de archivos actuales
  $max=0;
  foreach (glob($destino."*") as $key => $value) {
    $value = explode("/", $value);//Dividir el arreglo
    $archivo = explode(".", $value[count($value)-1]);//Obtener el número de archivos

    if ($archivo[0] > $max){
      $max = $archivo[0];
    }
  }

  //Insertar archivos
  $i=$max+1;
  $o=0;
  foreach ($_FILES as $archivos) {
    //Verificar si se cargó el archivo correctamente
    if (!isset($archivos['name']) && $archivos['error'] !== UPLOAD_ERR_OK) {
      throw new Exception('no_load_img');
    }
    
    if ($archivos['type'] !== "image/png" && $archivos['type'] !== "image/gif" && $archivos['type'] !== "image/jpg" && $archivos['type'] !== "image/jpeg") {
      throw new Exception('no_type');
    }

    $archivos['name'] = explode(".", $archivos['name']);//separar string

    //Mover archivo
    $origen=$archivos["tmp_name"];
    $upload=$destino."$i.".$archivos['name'][1];
    if (!@move_uploaded_file($origen, $upload)) {
      throw new Exception('no_upload');
    }
    $imgUploaded[$o]='assets/src/noticias/img/'."$i.".$archivos['name'][1];
    $i++;
    $o++;
  }
  //transformar a json
  $imgUploaded=json_encode($imgUploaded);

  //Realizar consulta
  $consult = addNewsInDB($mysqli, $title, $content, $imgUploaded, $owner);
  if ($consult != "ok") {
   throw new Exception($consult);
  }

  $respuesta = array('status' => 'ok','message' => $consult);
} catch (\Throwable $e) {
  $respuesta = array('status' => 'error','message' => $e->getMessage());
}
echo json_encode($respuesta);
//Cerrar conexion
$mysqli->close();
?>