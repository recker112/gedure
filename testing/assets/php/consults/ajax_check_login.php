<?php 
//Deprendencias
require 'connect_db.php';
require 'funciones/func_global.php';
require 'funciones/func_login.php';

//Scripts
sleep(2);

//Iniciar session segura
sec_session_start();
if (isset($_SESSION['loginIs']) && $_SESSION['loginIs'] != "admin") {
	header("location: ../../panel.php");//Regresar al panel
}

//Verificar token
if (isset($_POST['token']) && token($_POST['token'])) {

	//Variable token
	$token = $_POST['token'];

	//Variables a tomar del formulario.
	$cedula = $_POST['cedula'];
	$password = encript_password($_POST['password']);
	if ($_POST['remember']) {
		$checkbox = "on";
	}else {
		$checkbox = "off";
	}

	//Verificar usuario
	$datos = verify_user($mysqli, $cedula);

	//Opciones de respuesta de la funcion verify_user()
	if ($datos == "consulta fallida") {
		$respuesta = array('status' => 'fallido', 'message' => 'consult_error1');
	}else if ($datos == "no encontrado") {
		$respuesta = array('status' => 'fallido', 'message' => 'no_encontrado');
	}else {
		//Verificar tabla Baneos en el servidor
		$banlist = banlist($mysqli, $datos['cedula']);

		//Opciones de respuesta de la funcion banlist()
		if ($banlist == "no_register") {

			//Verificar credenciales
			$credenciales = verify_password($password, $datos['password']);

			//Opciones de respuesta de la funcion verify_password()
			if ($credenciales == true) {

				//Iniciar proceso de login
				$login_in = login($mysqli, $datos, $token, $checkbox, $cedula);

				//Opciones de respuesta de la funcion login()
				if ($login_in == "user") {
					$respuesta = array('status' => 'exitoso', 'message' => 'user');
				}else if ($login_in == "admin") {
					$respuesta = array('status' => 'exitoso', 'message' => 'admin');
				}else if ($login_in == "creador") {
					$respuesta = array('status' => 'exitoso', 'message' => 'creador');
				}
			}else {

				//Registrar error en la tabla de Baneos
				$login_register_banlist = login_new_register_banlist($mysqli, $cedula, $datos['user'], $datos['privilegio']);
				if ($login_register_banlist == "banlist") {
					$respuesta = array('status' => 'fallido', 'message' => 'banlist');
				}else if ($login_register_banlist == 'consult_error') {
					$respuesta = array('status' => 'fallido', 'message' => 'consult_error2');
				}
			}
		}else if ($banlist == "register") {

			//Verificar credenciales
			$credenciales = verify_password($password, $datos['password']);

			//Opciones de respuesta de la funcion verify_password()
			if ($credenciales == true) {

				//Limpiar usuario de la tabla Baneos
				login_clear($mysqli, $datos['cedula']);

				//Iniciar proceso de login
				$login_in = login($mysqli, $datos, $token, $checkbox, $cedula);

				//Opciones de respuesta de la funcion login()				
				if ($login_in == "user") {
					$respuesta = array('status' => 'exitoso', 'message' => 'user');
				}else if ($login_in == "admin") {
					$respuesta = array('status' => 'exitoso', 'message' => 'admin');
				}else if ($login_in == "creador") {
					$respuesta = array('status' => 'exitoso', 'message' => 'creador');
				}
			}else {

				//Añadir error al usuario registrado en la tabla Baneos
				$loginErrorAdd = login_add_register_banlist($mysqli, $datos['cedula'], $datos['user']);

				//Opciones de respuesta de la funcion login_add_register_banlist()
				if ($loginErrorAdd == 'consult_error') {
					$respuesta = array('status' => 'fallido', 'message' => 'consult_error3');
				}else if ($loginErrorAdd == "error_add_in_banlist") {
					$respuesta = array('status' => 'fallido', 'message' => 'banlist');
				}else if ($loginErrorAdd == "account_perma_block") {
					$respuesta = array('status' => 'fallido', 'message' => 'block_perma');
				}else if ($loginErrorAdd == "account_block"){
					$respuesta = array('status' => 'fallido', 'message' => 'block');
				}
			}
		}else if ($banlist == "attempts_5") {
			//Verificar timelock
			$login_timelock = login_timelock_attemps5($mysqli, $datos['cedula'], $datos['cedula']);

			//Opciones de respuesta de la funcion login_timelock_attemps5()
			if ($login_timelock == "account_unlock") {
				$respuesta = array('status' => 'fallido', 'message' => 'unlock');
			}else if ($login_timelock == "account_still_block") {
				$respuesta = array('status' => 'fallido', 'message' => 'still_blocked');
			}else if ($login_timelock == "consult_error") {
				$respuesta = array('status' => 'fallido', 'message' => 'consult_error4');
			}
		}else if ($banlist == "locks_5") {

			//Cuenta bloqueada permanentemente
			$respuesta = array('status' => 'fallido', 'message' => 'block_perma');
		}
	}
}else {

	//Tokensito
	$respuesta = array('status' => 'fallido', 'message' => 'token');
}
echo json_encode($respuesta);
//Cerrar conexion.
$mysqli->close();
?>