<?php 
sleep(2);
//Realizar conexion
require 'connect_db.php';

//Llamar a las funciones
require 'funciones/func_global.php';
require 'funciones/func_update_matricula.php';

sec_session_start();
if ($_SESSION['loginIs'] == 'usuario') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='user.php'</script>";
  exit;
}elseif ($_SESSION['loginIs'] == 'p_i') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='pre_inscripcion.php'</script>";
  exit;
}

if (isset($_POST['curso']) && isset($_POST['seccion']) && isset($_FILES['archivo'])) {
	if (token($_SESSION['token'])) {
		$destino = "../../src/matricula/";
		$curso = $_POST['curso'];
		$seccion = $_POST['seccion'];

		if (isset($_FILES["archivo"]) && $_FILES["archivo"]["name"]) {
			if ($_FILES["archivo"]["type"]=="text/csv" || $_FILES["archivo"]["type"]=="application/vnd.ms-excel") {
				if ($_FILES["archivo"]["size"] <= 10000) {
					if (file_exists($destino)) {
						$origen=$_FILES["archivo"]["tmp_name"];
						$upload=$destino.$_FILES["archivo"]["name"];

						if (@move_uploaded_file($origen, $upload)) {
							//Abrir archivo.
							$archivo_csv = utf8_fopen("../../src/matricula/".$_FILES["archivo"]["name"]);
							
							//Contadores.
							$i = 0;
							$o = 0;
							$insertados = 0;
							$actualizados = 0;
							$errores = 0;
							
							//Extraer datos.
							while (($datos=fgetcsv($archivo_csv,10000,";")) !== false){
								$numero_lista[$i] = $datos[0];
								$cedula_csv[$i] = $datos[1];
								$nombre[$i] = mb_convert_case($datos[2], MB_CASE_TITLE, "UTF-8");
								$i++;
							}
							print_r($datos);
							
							//Cerrar archivo.
							fclose ($archivo_csv);

							//Consultas.
							$archivo_csv2 = utf8_fopen_insert("../../src/matricula/password/passwords_".$curso.$seccion.".csv");
							while ($o <= ($i -1)) {
								$consulta = verify_user($mysqli, $cedula_csv[$o]);
								if ($consulta != "no encontrado") {
									$aula = "E_".$curso.$seccion."_".$numero_lista[$o];
									$matricula_update = update_matricula($mysqli, $nombre[$o], $aula, $cedula_csv[$o]);
									$password_already = "Su contraseña ya fue generada.";
									$fila_update = $numero_lista[$o].";".$nombre[$o].";".$password_already;
									if (fputs($archivo_csv2, $fila_update.PHP_EOL) == true) {
										if ($matricula_update == true) {
											$actualizados++;
										}else {
											$errores++;
										}
									}else {
										$errores++;
									}
								}else {
									$password = password_generate(3);
									$password_encript = encript_password_register($password);
									$aula = "E_".$curso.$seccion."_".$numero_lista[$o];
									$matricula_add = add_matricula($mysqli, $nombre[$o], $aula, $cedula_csv[$o], $password_encript);
									$fila_insert = $numero_lista[$o].";".$nombre[$o].";".$password;
									if (fputs($archivo_csv2, $fila_insert.PHP_EOL) == true) {
										if ($matricula_add == true) {
											$insertados++;
										}else {
											$errores++;
										}
									}else {
										$errores++;
									}
								}
								$o++;
							}
							fclose ($archivo_csv2);
							$_SESSION['inser'] = $insertados;
							$_SESSION['update'] = $actualizados;
							$_SESSION['error'] = $errores;
							$_SESSION['download'] = $curso.$seccion;
							if (isset($curso[1])) {
								$accion = "Matricula update: ".$curso[0]." grado ".$seccion.".";
							}else {
								$accion = "Matricula update: ".$curso." año ".$seccion.".";
							}
							add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
							unlink($upload);
							$respuesta = array("message" => "update ok", "insert" => $insertados, "update" => $actualizados, "error" => $errores, "dowload" => "src/matricula/password/passwords_".$curso.$seccion.".csv");
						}else {
							$respuesta = array("message" => "update error");
						}
					}else {
						$respuesta = array("message" => "update local");
					}
				}else {
					$respuesta = array("message" => "update max");
				}
			}else {
				$respuesta = array("message" => "update type");
			}
		}else {
			$respuesta = array("message" => "update none");
			
		}
	}else {
		$respuesta = array("message" => "token");
	}
	//Cerrar conexion.
	$mysqli->close();
	echo json_encode($respuesta);
}else {
	echo "None.";
}
 ?>