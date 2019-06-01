<?php

//Dependencias
require '../assets/php/connect_db.php';
require '../assets/php/funciones/func_global.php';
require '../assets/php/funciones/func_login.php';
require '../assets/php/funciones/func_cookie.php';
require '../assets/php/verify_cookie_session.php';

if ($_SESSION['loginIs'] == "admin") {
  $dir = "../src/web-assets/Manual.pdf";
  //Llamar archivo.
  header("Content-disposition: attachment; filename=Manual.pdf");
  header("Content-type: application/pdf");
  header ("Content-Length: ".filesize($dir));
  readfile($dir);
}else {
  header("location: ../admin.php");
}
?>
