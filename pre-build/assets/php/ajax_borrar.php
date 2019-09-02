<?php
//Delay
sleep(1);

//Conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_borrar.php';

sec_session_start();

if (isset($_SESSION['token']) && token($_SESSION['token'])) {
	if ($_SESSION['loginIs'] == "admin") {
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

			if ($consulta) {
				$respuesta = array("message" => "ok_sec", "borrados" => $consulta);
				$accion = "Borrar: $consulta estudiantes borrados.";
				add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
			}else {
				$respuesta = array("message" => "no_delete_sec");
			}
		}else if ($select == "bol"){
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
			if ($borrado > 0) {
				$respuesta['borrados'] = $borrado;
				$accion = "Borrar: $borrado boletas borradas.";
				add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
			}else {
				$respuesta['no_borrados'] = true;
			}
		}
	}else {
		$respuesta = array("message" => "internal_error");
	}
}else {
	$respuesta = array("message" => "token");
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>