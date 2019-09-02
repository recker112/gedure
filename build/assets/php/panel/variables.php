<?php
$privilegio = $_SESSION['privilegio'];
if ($privilegio == "V-") {
  $user = $_SESSION['user'];
  $cedula = $_SESSION['cedula'];
  $cedulaSin = $_SESSION['cedulaSin'];
  $curso = $_SESSION['curso'];
  $seccion = $_SESSION['seccion'];
  $archivo = $_SESSION['archivo'];
  $nota = $_SESSION['nota'];
  $horario = $_SESSION['horario'];
  $profeGuia = $_SESSION['profeGuia'];
  $avatar = $_SESSION['avatar'];
  $token = $_SESSION['token'];
}else if ($privilegio == "A-"){
  $user = $_SESSION['user'];
  $cedula = $_SESSION['cedula'];
  $cedulaSin = $_SESSION['cedulaSin'];
  $avatar = $_SESSION['avatar'];
  $token = $_SESSION['token'];
}else if ($privilegio == "CR-"){
  $user = $_SESSION['user'];
  $cedula = $_SESSION['cedula'];
  $cedulaSin = $_SESSION['cedulaSin'];
  $avatar = $_SESSION['avatar'];
  $token = $_SESSION['token'];
}
?>