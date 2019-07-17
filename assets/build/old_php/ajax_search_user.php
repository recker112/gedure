<?php
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_search_user.php';

sec_session_start();
if ($_SESSION['loginIs'] == 'usuario') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='user.php'</script>";
  exit;
}elseif ($_SESSION['loginIs'] == 'p_i') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='pre_inscripcion.php'</script>";
  exit;
}

if (token($_SESSION['token'])) {
	$cedula = "%".$_POST['buscar']."%";
	if (isset($_POST['buscar'])) {
		list($user_cedula, $user, $user_curso, $user_seccion, $user_pg, $total, $attempts, $locks, $lista) = search_user($mysqli, $cedula);
		$respuesta = array('cedula' => $user_cedula, 'user' => $user, 'curso' => $user_curso, 'seccion' => $user_seccion, 'pg' => $user_pg, 'total' => $total, "attempts_user" => $attempts, "locks_user" => $locks, "lista" => $lista);
		echo json_encode($respuesta);
		//Cerrar conexion.
    	$mysqli->close();
	}
}
?>