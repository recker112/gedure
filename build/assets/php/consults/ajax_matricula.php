<?php
//Conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_matricula.php';
require 'funciones/func_modificar.php';

//Start session
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

	//Verificiar variables
	if (!verifyEmpty($_POST)) {
		throw new Exception('empty');
	}

	//Parametos
	$destino = "../../src/matricula/";
	$curso = $_POST['curso'];
	$seccion = $_POST['seccion'];
	$estudi_id = "E_".$curso.$seccion;

	//Verificiar existencia del archivo
	if (!isset($_FILES["archivo"]) && !isset($_FILES["archivo"]["name"])) {
		throw new Exception('no_found_file');
	}

	//Verificar formato del archivo
	if ($_FILES["archivo"]["type"] !== "text/csv" && $_FILES["archivo"]["type"] !== "application/vnd.ms-excel") {
		throw new Exception('no_format_file');
	}

	//Verificar peso del archivo
	if (!($_FILES["archivo"]["size"] <= 10000)) {
		throw new Exception('no_size');
	}

	//Verificar destino
	if (!file_exists($destino)) {
		$oldumask = umask(0); 
		if (mkdir($destino, 0777, true)) {
			umask($oldumask); 
		}
	}

	//Parametros
	$origen=$_FILES["archivo"]["tmp_name"];
	$upload=$destino.$_FILES["archivo"]["name"];

	//Verificar si se pudo mover el archivo
	if (!(@move_uploaded_file($origen, $upload))) {
		throw new Exception('no_upload');
	}

	//Abrir archivo
	$archivo_csv = fopen("../../src/matricula/".$_FILES["archivo"]["name"], "r");

	//Contadores
	$i = 0;
	$o = 0;
	$insertados = 0;
	$actualizados = 0;
	$errores = 0;

	//Extraer datos
	while (($datos=fgetcsv($archivo_csv,10000,";")) !== false){
		$cedulaCSV[$i] = $datos[0];
		$nombreCSV[$i] = trim(mb_convert_case($datos[1], MB_CASE_TITLE, "UTF-8"));
		$i++;
	}

	//Cerrar archivo.
	fclose($archivo_csv);

	//Abrir archivo
	$createCsv = fopen("../../src/matricula/passwords_".$curso.$seccion.".csv", "w");
	$texto = "CEDULA;NOMBRE;CONTRASEÑA";
	fputs($createCsv, $texto.PHP_EOL);

	while ($o < count($cedulaCSV)) {
		if (!($datos = veryfiUser($mysqli, "V-", $cedulaCSV[$o]))) {
			//Nuevo registro
			$password = password_generate(3);
			$password_encript = encript_password_register($password);

			//Insertar
			if (insertMatricula($mysqli, $cedulaCSV[$o], $nombreCSV[$o], $password_encript, $estudi_id)) {
				//Registrar en archivo
				$texto = "$cedulaCSV[$o];$nombreCSV[$o];$password";
				fputs($createCsv, $texto.PHP_EOL);
				$insertados++;
			}else {
				$errores++;
			}
		}else {
			if (updateMatricula($mysqli, $cedulaCSV[$o], $nombreCSV[$o], $estudi_id)) {
				//Registrar en archivo
				$texto = "$cedulaCSV[$o];$nombreCSV[$o];Ya generada";
				fputs($createCsv, $texto.PHP_EOL);
				//Ordenar las seccion vieja y nueva
				estudiFixUpdate($mysqli, $estudi_id, $datos['estudi_id'], "V-".$cedulaCSV[$o]);
				$actualizados++;
			}else {
				$errores++;
			}
		}
		$o++;
	}

	//Ordenar toda la seccion
	estudiFix($mysqli, $estudi_id."_%");

	//Cerrar 2 archivo
	fclose ($createCsv);

	//Eliminar archivo cargado
	unlink($upload);
	//Respuesta
	$respuesta = array("status" => 'ok', "message" => "update_ok", "insert" => $insertados, "update" => $actualizados, "error" => $errores, "dowload" => "assets/src/matricula/passwords_".$curso.$seccion.".csv");

	//log
	$total = $insertados + $actualizados;

	$accion = "Matricula subida: ".$total." alumnos de ".$curso." ".$seccion.".";
	add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>