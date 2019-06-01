<?php 
//Deprendencias
require 'connect_db.php';
require 'funciones/func_global.php';
require 'funciones/func_login.php';

//Scripts
sleep(3);

sec_session_start();
if (isset($_SESSION['loginIs'])) {
	if ($_SESSION['loginIs'] == "user") {
		echo "<script>alert('Tienes una sesion activa.');window.location.href='../../user.php'</script>";
	}else if ($_SESSION['loginIs'] == "admin") {
		echo "<script>alert('Tienes una sesion activa como admin.');window.location.href='../../admin.php'</script>";
		exit;
	}else if ($_SESSION['loginIs'] == "p_i") {
		echo "<script>alert('Tienes una sesion activa.');window.location.href='../../pre_inscripcion.php'</script>";
		exit;
	}
}

if (isset($_POST['token'])) {
	$token = $_POST['token'];
	if (token($token)) {
		//Variables a tomar del formulario.
		$cedula = $_POST['cedula'];
		$password = encript_password($_POST['password']);
		if (isset($_POST['remember'])) {
			$checkbox = $_POST['remember'];
		}else {
			$checkbox = "off";
		}

		//Datos.
		$datos = verify_user($mysqli, $cedula);
		if ($datos == "consulta fallida") {
			$respuesta = array('status' => 'fallido', 'message' => 'consult_error');
		}else if ($datos == "no encontrado") {
			$respuesta = array('status' => 'fallido', 'message' => 'no_encontrado');
		}else {
			$banlist = banlist($mysqli, $datos['cedula']);
			if ($banlist == "no_register") {
				$credenciales = verify_password($password, $datos['password']);
				if ($credenciales == true) {
					login_clear($mysqli, $datos['cedula']);
					$login_in = login($mysqli, $datos, $token, $checkbox, $cedula);
					if ($login_in == "user") {
						$respuesta = array('status' => 'exitoso', 'message' => 'user');
					}else if ($login_in == "admin") {
						$respuesta = array('status' => 'exitoso', 'message' => 'admin');
					}else if ($login_in == "p_i") {
						$respuesta = array('status' => 'exitoso', 'message' => 'p_i');
					}
				}else {
					$login_register_banlist = login_failed_register($mysqli, $cedula, $datos['user'], $datos['privilegio']);
					if ($login_register_banlist == "banlist") {
						$respuesta = array('status' => 'fallido', 'message' => 'banlist');
					}else if ($login_register_banlist == 'consulta fallida') {
						$respuesta = array('status' => 'fallido', 'message' => 'consult_error');
					}
				}
			}else if ($banlist == "register") {
				$credenciales = verify_password($password, $datos['password']);
				if ($credenciales == true) {
					login_clear($mysqli, $datos['cedula']);
					$login_in = login($mysqli, $datos, $token, $checkbox, $cedula);
					if ($login_in == "user") {
						$respuesta = array('status' => 'exitoso', 'message' => 'user');
					}else if ($login_in == "admin") {
						$respuesta = array('status' => 'exitoso', 'message' => 'admin');
					}else if ($login_in == "p_i") {
						$respuesta = array('status' => 'exitoso', 'message' => 'p_i');
					}
				}else {
					$loginErrorAdd = login_failed_add($mysqli, $datos['cedula'], $datos['user']);
					if ($loginErrorAdd == 'consulta fallida') {
						$respuesta = array('status' => 'fallido', 'message' => 'consult_error');
					}else if ($loginErrorAdd == "error añadido a la banlist") {
						$respuesta = array('status' => 'fallido', 'message' => 'banlist');
					}else if ($loginErrorAdd == "bloqueo permanente") {
						$respuesta = array('status' => 'fallido', 'message' => 'block_perma');
					}else if ($loginErrorAdd == "bloqueo"){
						$respuesta = array('status' => 'fallido', 'message' => 'block');
					}
				}
			}else if ($banlist == "attempts_5") {
				$login_timelock = login_failed_timelock($mysqli, $datos['cedula'], $datos['cedula']);
				if ($login_timelock == "desbloqueo de cuenta") {
					$respuesta = array('status' => 'fallido', 'message' => 'unlock');
				}else if ($login_timelock == "cuenta aun bloqueada") {
					$respuesta = array('status' => 'fallido', 'message' => 'still_blocked');
				}else if ($login_timelock == "consulta fallida") {
					$respuesta = array('status' => 'fallido', 'message' => 'consult_error');
				}
			}else if ($banlist == "locks_5") {
				$respuesta = array('status' => 'fallido', 'message' => 'block_perma');
			}
		}
	}else {
		$respuesta = array('status' => 'fallido', 'message' => 'token');
	}

	//Cerrar conexion.
	$mysqli->close();
	echo json_encode($respuesta);
}else {
	echo "None.";
}
?>