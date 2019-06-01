<?php
//Deprendencias
require '../assets/php/funciones/func_global.php';

//Scripts
sec_session_start();

if ($_SESSION['loginIs'] == "admin" || $_SESSION['loginIs'] == "p_i" || !isset($_SESSION['loginIs'])) {
  header("location: ../user.php");
}else {
  //Verificar notas activas.
  if ($_SESSION['nota'] == "1") {
    //Variables
    $seccion = $_SESSION['seccion'];
    $archivo = mb_strtolower($_SESSION['user']);
    $curso = $_SESSION['curso'];
    $dir = "../src/Cursos_boletas/$curso/$seccion/$archivo.pdf";

    if (file_exists($dir)) {
      //Llamar archivo.
      header("Content-disposition: attachment; filename=Boletin.pdf");
      header("Content-type: application/pdf");
      header ("Content-Length: ".filesize($dir));
      readfile($dir);
    }else {
      header("location: ../user.php?error=notas_no_found");
    }
  }else {
    //Mensaje de advertencia.
    header("location: ../user.php?error=notas");
  }
}
?>
