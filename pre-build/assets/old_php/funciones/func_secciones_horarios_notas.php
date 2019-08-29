<?php
function secciones_horarios_notas_change($mysqli, $estudi_id, $nota, $horario, $curso){
	if (isset($curso[1])) {
		$consulta = $mysqli->prepare("SELECT e_id
			FROM estudiantes
			WHERE e_id LIKE ?");
		if (!$consulta) {
			return "consulta_error";
			exit;
		}
		$consulta->bind_param("s", $estudi_id);
	}else {
		$consulta = $mysqli->prepare("SELECT e_id
			FROM estudiantes
			WHERE e_id LIKE ? AND NOT e_id LIKE ?");
		if (!$consulta) {
			return "consulta_error";
			exit;
		}
		$estudi_not_id = "E_".$curso[0]."G%";
		$consulta->bind_param("ss", $estudi_id, $estudi_not_id);
	}
	$consulta->execute();
	$resultado = $consulta->get_result();

	if ($resultado->num_rows >= 24) {
		if (isset($curso[1])) {
			$consulta2 = $mysqli->prepare("UPDATE estudiantes
				SET nota=?, horario=?
				WHERE e_id LIKE ?");
			if (!$consulta2) {
				return "consulta_error";
				exit;
			}
			$consulta2->bind_param("sss", $nota, $horario, $estudi_id);
		}else {
			$consulta2 = $mysqli->prepare("UPDATE estudiantes
				SET nota=?, horario=?
				WHERE e_id LIKE ? AND NOT e_id LIKE ?");
			if (!$consulta2) {
				return "consulta_error";
				exit;
			}
			$consulta2->bind_param("ssss", $nota, $horario, $estudi_id, $estudi_not_id);
		}
		$consulta2->execute();

		if ($consulta2->affected_rows >= 1) {
			return "ok";
		}else {
			return "no_change";
		}
	}else {
		return "no_found_seccion";
	}
}
?>