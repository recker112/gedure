<?php
sleep(2);
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';

sec_session_start();
if ($_SESSION['loginIs'] == 'usuario') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='user.php'</script>";
  exit;
}elseif ($_SESSION['loginIs'] == 'p_i') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='pre_inscripcion.php'</script>";
  exit;
}

if (isset($_POST['archivo_cantidad']) && isset($_POST['curso']) && $_POST['seccion']) {
	if (token($_SESSION['token'])) {
		$numero_archivo = 0;
		$total_archivo = $_POST['archivo_cantidad'];
		$curso = $_POST['curso'];
		$seccion = $_POST['seccion'];
		if (isset($curso[1])) {
			$destino = "../../src/Cursos_boletas/".$curso[0]." grado/".$seccion."/";
		}else {
			$destino = "../../src/Cursos_boletas/".$curso." año/".$seccion."/";
		}

		foreach ($_FILES as $archivos) {
			if (isset($archivos['name']) && $archivos['error'] == UPLOAD_ERR_OK) {
				if ($archivos['size'] <= 2000000) {
					if ($archivos['type'] == "application/pdf") {
						if (!file_exists($destino)) {
							$oldumask = umask(0); 
							if (mkdir($destino, 0777, true)) {
								umask($oldumask); 
							}
						}
						$origen=$archivos["tmp_name"];
						$upload=$destino.mb_convert_case($archivos["name"], MB_CASE_LOWER, "UTF-8");
						if (@move_uploaded_file($origen, $upload)) {
							$respuesta[$numero_archivo] = array("Nombre" => $archivos['name'], "Estado" => "Cargado al servidor con exito");
						}else {
							$respuesta[$numero_archivo] = array("Nombre" => $archivos['name'], "Estado" => "Error al mover el archivo");
						}
					}else {
						$respuesta[$numero_archivo] = array("Nombre" => $archivos['name'], "Estado" => "Formato no compatible");
					}
				}else {
					$respuesta[$numero_archivo] = array("Nombre" => $archivos['name'], "Estado" => "Tamaño exedido");
				}
			}else {
				$respuesta[$numero_archivo] = array("Nombre" => $archivos['name'], "Estado" => "Error al cargar");
			}
			$numero_archivo++;
		}

		for ($o=0; $o <= $numero_archivo - 1; $o++) { 
			echo "Nombre: ".$respuesta[$o]['Nombre']."</br>"."Estado: ".$respuesta[$o]['Estado']."</br></br>";
		};
		$accion = "Boletas subidas: ".$curso." año ".$seccion.".";
		add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
		$mysqli->close();
	}else {
		echo "Error en los procesos internos!! <br> Ex000001";
	}
}else {
	echo "None.";
}
?>