<?php
sleep(1);

//Conexión
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_boletas.php';

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

	//Parametros
	$numero_archivo = 0;
	$total_archivo = $_POST['archivo_cantidad'];
	$curso = $_POST['curso'];
	$seccion = $_POST['seccion'];
	$cargados=0;

	//Verificar carpeta
	if (isset($curso[1])) {
		$destino = "../../src/Cursos_boletas/".$curso[0]." grado/".$seccion."/";
	}else {
		$destino = "../../src/Cursos_boletas/".$curso." año/".$seccion."/";
	}

	//Foreach que recorre cada uno de los archivos encontrados en el array
	foreach ($_FILES as $archivos) {
		if (isset($archivos['name']) && $archivos['error'] == UPLOAD_ERR_OK) {
			$nombreArchivo = $archivos['name'];//Guardar nombre completo
			$archivos['name'] = explode(".", $archivos['name']);//Obtener el número de lista
			if ($archivos['size'] <= 2000000) {
				if ($archivos['type'] == "application/pdf") {
					//Verificar destino
					if (!file_exists($destino)) {
						$oldumask = umask(0); 
						if (mkdir($destino, 0777, true)) {
							umask($oldumask); 
						}
					}

					//Verificar si existe el estudiante en esa sección con ese número de lista
					$estudi_id="E_".$curso.$seccion."_".$archivos['name'][0];
					if ($cedula = replaceNameBoletas($mysqli, $estudi_id)) {
						//Mover archivo
						$origen=$archivos["tmp_name"];
						$upload=$destino.$cedula.".pdf";

						if (@move_uploaded_file($origen, $upload)) {
							$respuesta[$numero_archivo] = array("name" => $nombreArchivo, "message" => "ok");
							$cargados++;
						}else {
							$respuesta[$numero_archivo] = array("name" => $nombreArchivo, "message" => "no_move");
						}
					} else {
						$respuesta[$numero_archivo] = array("name" => $nombreArchivo, "message" => "user_no_found");
					}
				}else {
					$respuesta[$numero_archivo] = array("name" => $nombreArchivo, "message" => "no_format");
				}
			}else {
				$respuesta[$numero_archivo] = array("name" => $nombreArchivo, "message" => "no_size");
			}
		}else {
			$respuesta[$numero_archivo] = array("name" => $nombreArchivo, "message" => "error_upload");
		}
		$numero_archivo++;
	}
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}

$respuesta['archivos_total'] = $numero_archivo;
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>