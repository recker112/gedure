<?php
//Delay
sleep(1);

//Conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_borrar.php';

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
	$select = $_POST['select'];
	$curso = $_POST['curso'];
	$seccion = $_POST['seccion'];

	if ($select == "sec") {
		//Select estudi_id
		if ($_POST['seccion'] == "all") {
			$estudi_id = "E_".$curso."%";
		}else {
			$estudi_id = "%".$curso.$seccion."%";
		}

		$consulta = borrar_curso($mysqli, $estudi_id, $curso);

		if (!$consulta) {
			throw new Exception('no_delete_sec');
		}

		$respuesta = array("message" => "ok_sec", "borrados" => $consulta);
		$accion = "Borrar: $consulta estudiantes borrados.";
		add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
	}else if ($select == "bol") {
		//Escoger directorio
		if ($seccion == "all") {
			if (isset($curso[1])) {
				$dir = "../../src/Cursos_boletas/$curso[0] grado/";
			}else {
				$dir = "../../src/Cursos_boletas/$curso año/";
			}
		}else {
			if (isset($curso[1])) {
				$dir = "../../src/Cursos_boletas/$curso[0] grado/$seccion/";
			}else {
				$dir = "../../src/Cursos_boletas/$curso año/$seccion/";
			}
		}

		//Escanear achivos existentes en el directorio
		$scanFiles = glob($dir."*");

		//contador
		$i=0;
		$o=0;
		$borrado=0;

		foreach ($scanFiles as $files) {
			if (is_file($files)) {
				if (unlink($files)) {
					$respuesta[$i] = array("name" => basename($files),"message" => "Archivo borrado.");
					$borrado++;
				}else {
					$respuesta[$i] = array("name" => basename($files),"message" => "No se puede borrar el archivo.");
				}
			}else {
				$superScan = glob($files."/*");
				foreach ($superScan as $superFiles) {
					if (is_file($superFiles)) {
						if (unlink($superFiles)) {
							$respuesta[$o] = array("name" => basename($files)."/".basename($superFiles),"message" => "Archivo borrado.");
							$borrado++;
						}else {
							$respuesta[$o] = array("name" => basename($files)."/".basename($superFiles),"message" => "No se puede borrar el archivo.");
						}
					}else {
						$respuesta[$o] = array("name" => basename($files)."/".basename($superFiles),"message" => "No se puede encontrar el archivo.");
					}
					$o++;
				}
			}
			$i++;
		}

		if (!($borrado > 0)) {
			throw new Exception('no_bol_delete');
		}

		$respuesta['boletasDelete'] = $borrado;
		$respuesta['message'] = 'ok_bol';
		$accion = "Borrar: $borrado boletas borradas.";
		add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
	}
} catch (\Throwable $e) {
	$respuesta = array('status' => 'error','message' => $e->getMessage());
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>