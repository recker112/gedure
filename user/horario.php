<?php
//Deprendencias
require '../assets/php/funciones/func_global.php';

//Scripts
sec_session_start();

if ($_SESSION['loginIs'] == "admin" || $_SESSION['loginIs'] == "p_i" || !isset($_SESSION['loginIs'])) {
  header("location: ../user.php");
}else {
  if (token($_SESSION['token']) == true) {
    //
  }else {
    echo "<script>alert('Debes inicar session antes de poder entrar.');window.location.href='login.php'</script>";
    exit;
  }

  //Verificar notas activas.
  if ($_SESSION['horario'] == "1") {
    //Variables
    $seccion = $_SESSION['seccion'];
    $curso = $_SESSION['curso'];
    $dir = "../src/horarios/$curso/$seccion.docx";
    if (file_exists($dir)) {
      //Llamar archivo.
      header("Content-disposition: attachment; filename=Mi_horario.pdf");
      header("Content-type: application/pdf");
      header ("Content-Length: ".filesize($dir));
      readfile($dir);
    }else {
      header("location: ../user.php?error=horarios_no_found");
    }
  }else {
    //Mensaje de advertencia.
    header("location: ../user.php?error=horarios");
  }
}
?>
