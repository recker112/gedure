<?php
require 'config_mysql.php';
$mysqli = new mysqli($host, $host_user, $host_password, $host_db);//Creando conexion

if ($mysqli->connect_errno) {//Verificando conexion exitosa
	echo "Tenemos un problema al intentar hacer la conexion. ERROR: " . $mysqli->connect_errno . ' "' . $mysqli->connect_error . '"';
	exit;
}

$acentos = $mysqli->query("SET NAMES 'utf8'");
?>
