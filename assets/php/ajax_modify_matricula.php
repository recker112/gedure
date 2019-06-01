<?php
sleep(2);
//Realizar conexion
require 'connect_db.php';

//Dependencias
require 'funciones/func_global.php';
require 'funciones/func_modify_matricula.php';

sec_session_start();
if ($_SESSION['loginIs'] == 'usuario') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='user.php'</script>";
  exit;
}elseif ($_SESSION['loginIs'] == 'p_i') {
  echo "<script>alert('Tienes una sesion activa.');window.location.href='pre_inscripcion.php'</script>";
  exit;
}

if (isset($_POST['privilegio']) && isset($_POST['cedula']) && isset($_POST['password'])) {
    if (token($_SESSION['token'])) {
        $privilegio = $_POST['privilegio'];
        $cedula = $privilegio.$_POST['cedula'];
        $contra = encript_password_register($_POST['password']);
        $curso = "E_".$_POST['grado'].$_POST['seccion']."_".$_POST['lista'];
        $nombre = $_POST['nombre'];
        $option = $_POST['option'];

        if ($option == "INSERT") {
            $insert = insert_modify($mysqli, $privilegio, $cedula, $nombre, $contra, $curso);
            if ($insert == true) {
                $respuesta = array('message' => 'insertado');
                $accion = "Añadido: $cedula";
                add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
            }else {
                $respuesta = array('message' => 'ya_registrado');
            }
        }elseif ($option == "UPDATE") {
            $update = update_modify($mysqli, $privilegio, $cedula, $nombre, $curso);
            if ($update == true) {
                $respuesta = array('message' => 'actualizado');
                $accion = "Actualizado: $cedula";
                add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
            }else {
                $respuesta = array('message' => 'no_changes');
            }
        }elseif ($option == "DELETE") {
            $delete = delete_modify($mysqli, $privilegio, $cedula);
            if ($delete) {
                $accion = "Eliminado: $cedula";
                add_log($mysqli, $_SESSION['cedula'], $_SESSION['user'], $accion);
                $respuesta = array('message' => 'eliminado');
            }else {
                $respuesta = array('message' => 'no_encontrado');
            }
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