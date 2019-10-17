<?php
function changeAvatar($mysqli, $privi, $url, $cedula){
	if ($privi === 'A-'){
		$tabla = 'admins';
	}else if ($privi === 'CR-') {
		$tabla = 'creadores';
	}

	$consult = $mysqli->prepare("UPDATE $tabla
	SET avatar=?
	WHERE cedula=?");
	$consult->bind_param("ss", $url, $cedula);
	$consult->execute();

	if ($consult->affected_rows >= 1) {
		return true;
	}else {
		return false;
	}
}
?>