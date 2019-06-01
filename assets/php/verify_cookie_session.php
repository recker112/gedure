<?php
sec_session_start();

if (isset($_SESSION['token']) && isset($_SESSION['loginIs'])) {
	if (token($_SESSION['token'])) {
		$archivo_actual = basename($_SERVER['PHP_SELF']);
		if ($archivo_actual == "login.php") {
			if ($_SESSION['loginIs'] == "user") {
				header('location: user.php');
			}else if ($_SESSION['loginIs'] == "admin") {
				header('location: admin.php');
				exit;
			}else if ($_SESSION['loginIs'] == "p_i") {
				header('location: pre_inscripcion.php');
				exit;
			}
		}else if ($archivo_actual == "user.php") {
			if ($_SESSION['loginIs'] == "admin") {
				header('location: admin.php');
				exit;
			}else if ($_SESSION['loginIs'] == "p_i") {
				header('location: pre_inscripcion.php');
				exit;
			}
		}else if ($archivo_actual == "admin.php") {
			if ($_SESSION['loginIs'] == "user") {
				header('location: user.php');
			}else if ($_SESSION['loginIs'] == "p_i") {
				header('location: pre_inscripcion.php');
				exit;
			}
		}else if ($archivo_actual == "pre_inscripcion.php") {
			if ($_SESSION['loginIs'] == "user") {
				header('location: user.php');
			}else if ($_SESSION['loginIs'] == "admin") {
				header('location: admin.php');
				exit;
			}
		}
	}else {
		session_unset();//Remueve la session.
  		session_destroy();//Destruye la session.
	}
}else if (isset($_COOKIE['reloginID']) && isset($_COOKIE['reloginID_user'])) {
	$verify = verify_reloginID($mysqli, $_COOKIE['reloginID'], $_COOKIE['reloginID_user']);
	if ($verify == true) {
		$archivo_actual = basename($_SERVER['PHP_SELF']);
		if ($archivo_actual == "login.php") {
			if ($verify == "user") {
				header('location: user.php');
			}else if ($verify == "admin") {
				header('location: admin.php');
				exit;
			}else if ($verify == "p_i") {
				header('location: pre_inscripcion.php');
				exit;
			}
		}else if ($archivo_actual == "user.php") {
			if ($verify == "admin") {
				header('location: admin.php');
				exit;
			}else if ($verify == "p_i") {
				header('location: pre_inscripcion.php');
				exit;
			}
		}else if ($archivo_actual == "admin.php") {
			if ($verify == "user") {
				header('location: user.php');
			}else if ($verify == "p_i") {
				header('location: pre_inscripcion.php');
				exit;
			}
		}else if ($archivo_actual == "pre_inscripcion.php") {
			if ($verify == "user") {
				header('location: user.php');
			}else if ($verify == "admin") {
				header('location: admin.php');
				exit;
			}
		}else if ($archivo_actual == "user.php") {
			if ($verify == "p_i") {
				header('location: pre_inscripcion.php');
				exit;
			}else if ($verify == "admin") {
				header('location: admin.php');
				exit;
			}
		}
	}else {
		setcookie("reloginID", "null", time() - 1, "/", $_SERVER['HTTP_HOST']);
		setcookie("reloginID_user", "null", time() - 1, "/", $_SERVER['HTTP_HOST']);
		$archivo_actual = basename($_SERVER['PHP_SELF']);
		if ($archivo_actual == "login.php") {

		}else {
			header('location: login.php?error=loginEntry');
		}
	}
}else {
	setcookie("reloginID", "null", time() - 1, "/", $_SERVER['HTTP_HOST']);
	setcookie("reloginID_user", "null", time() - 1, "/", $_SERVER['HTTP_HOST']);
	$archivo_actual = basename($_SERVER['PHP_SELF']);
	if ($archivo_actual == "login.php") {

	}else {
		header('location: login.php?error=loginEntry');
	}
}
 ?>