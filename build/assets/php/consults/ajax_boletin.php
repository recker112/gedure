<?php
sleep(1);

//Conexión
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';

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
			if ($archivos['size'] <= 2000000) {
				if ($archivos['type'] == "application/pdf") {
					//Verificar destino
					if (!file_exists($destino)) {
						$oldumask = umask(0); 
						if (mkdir($destino, 0777, true)) {
							umask($oldumask); 
						}
					}

					//Mover archivo
					$origen=$archivos["tmp_name"];
					$upload=$destino.$archivos["name"];
					$estudi_id="E_$curso$seccion_%";
					if (@move_uploaded_file($origen, $upload)) {
						$respuesta[$numero_archivo] = array("name" => $archivos['name'], "message" => "ok");
						$cargados++;
					}else {
						$respuesta[$numero_archivo] = array("name" => $archivos['name'], "message" => "no_move");
					}
				}else {
					$respuesta[$numero_archivo] = array("name" => $archivos['name'], "message" => "no_format");
				}
			}else {
				$respuesta[$numero_archivo] = array("name" => $archivos['name'], "message" => "no_size");
			}
		}else {
			$respuesta[$numero_archivo] = array("name" => $archivos['name'], "message" => "error_upload");
		}
		$numero_archivo++;
	}
	if (isset($_POST['lote']) && $_POST['lote'] == 1) {
		$lote = true;
	}else if (isset($_POST['lote']) && $_POST['lote'] == 2) {
		$num_lote = 20 + $numero_archivo;
		$accion = "Boletas subidas: $num_lote boletas de $curso $seccion.";
		$lote = false;
	}else {
		$accion = "Boletas subidas: $numero_archivo boletas de $curso $seccion.";
		$lote = false;
	}

	if ($lote != true) {
		add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
	}
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}

$respuesta['archivos_total'] = $numero_archivo;
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
// function reemplazeNameBoletas($mysqli, $estudi_id){
// 	$consulta = $mysqli->prepare('SELECT cedula
// 	FROM login
// 	WHERE estudi_id LIKE ?');
	
// 	$consulta->bind_param("s", $estudi_id);
// 	$consulta->execute();
// 	$resultado = $consulta->get_result();

// 	if ($resultado->num_rows >= 1) {
// 		while ($fila = $resultado->fetch_assoc()) {

// 		}
// 	}else {
// 		return false;
// 	}
// }
?>