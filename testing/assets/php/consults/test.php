<?php
//Pedir datos a sqli
$db = array('V-10411976276', 'V-27646615', 'V-27654587');
//Usuario a insertar
$insertar = "20405";
//Desglosar array
foreach ($db as $key => $value) {
  $db[$key] = str_replace("V-", "", $value);
}
array_push($db, $insertar);
sort($db);
foreach ($db as $key => $value) {
  $db[$key] = "V-".$value;
}
echo print_r($db);
?>