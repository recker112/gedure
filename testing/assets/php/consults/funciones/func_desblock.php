<?php
function desblock($mysqli, $cedula){
	$consulta = $mysqli->prepare("DELETE FROM baneos
		WHERE ban_cedula=?");
	$consulta->bind_param("s", $cedula);
	$consulta->execute();

	if ($consulta->affected_rows >= 1) {
    	return true;
	}else {
		return false;
	}
}
?>