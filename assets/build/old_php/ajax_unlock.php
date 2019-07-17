<?php
sleep(2);
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_unlock.php';


sec_session_start();
if ($_SESSION['loginIs'] == 'usuario') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='user.php'</script>";
  exit;
}elseif ($_SESSION['loginIs'] == 'p_i') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='pre_inscripcion.php'</script>";
  exit;
}

if (isset($_POST['privilegio']) && isset($_POST['cedula'])) {
	if (token($_SESSION['token'])) {
		$cedula = $_POST['privilegio'].$_POST['cedula'];
		
		if (unlock($mysqli, $cedula)) {
			$respuesta = array('message' => 'unlock');
			$accion = "Usuario desbloqueado: ".$cedula.".";
			add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
		}else {
			$respuesta = array('message' => 'no_register');
		}
	}else {
		$respuesta = array('message' => 'token');
	} 
	//Cerrar conexion.
    $mysqli->close();
    echo json_encode($respuesta);
}else {
	echo "None.";
}
?>