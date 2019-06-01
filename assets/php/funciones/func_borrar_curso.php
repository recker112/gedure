<?php
function delete_curso($mysqli, $estudi_id, $curso){
	if (isset($curso[1])) {
		$consulta = $mysqli->prepare("DELETE
			FROM login
			WHERE estudi_id LIKE ?");
		$consulta->bind_param("s", $estudi_id);
	}else {
		$consulta = $mysqli->prepare("DELETE
			FROM login
			WHERE estudi_id LIKE ? AND NOT estudi_id LIKE ?");
		$estudi_not_id = "E_".$curso[0]."G%";
		$consulta->bind_param("ss", $estudi_id, $estudi_not_id);
	}
	$consulta->execute();

	if ($consulta->affected_rows >= 1) {
		return $consulta->affected_rows;
	}else {
		return false;
	}
}
?>