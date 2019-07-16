<?php
//Dependencias
require '../assets/php/connect_db.php';
require '../assets/php/verify_cookie_session.php';

if ($verify_cs && $_SESSION['loginIs'] == "user") {
  $dir = "../src/Cursos_boletas/".$_SESSION['curso']."/".$_SESSION['seccion'].".pdf";
  if ($_SESSION['horario'] == "1") {
    if (file_exists($dir)) {
      //Llamar archivo.
      header('Content-Type: application/pdf');
      header('Expires: 0');
      header('Cache-Control: must-revalidate');
      header('Pragma: public');
      ob_clean();
      flush();
      readfile($dir);
    }else {
      echo "Horario no cargado.";
      echo "<script>setTimeout(function (){window.close()}, 4000);</script>";
    }
  }else {
    echo "Horario desactivado.";
    echo "<script>setTimeout(function (){window.close()}, 4000);</script>";
  }
}else {
  header("location: ../panel.php");
}
?>