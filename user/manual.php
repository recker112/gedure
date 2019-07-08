<?php
require '../assets/php/funciones/func_global.php';
header('Content-Type: application/pdf');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
ob_clean();
flush();
readfile("../Gamers Volumen 2.pdf");
?>