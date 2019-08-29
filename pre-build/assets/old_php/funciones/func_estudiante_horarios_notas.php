<?php
function estudiante_horarios_notas_change($mysqli, $cedula, $nota, $horario){
	$consulta = $mysqli->prepare("SELECT cedula
		FROM login
		WHERE cedula=?");
	if (!$consulta) {
		return "Consulta error";
		exit;
	}
	$consulta->bind_param("s", $cedula);
	$consulta->execute();
	$resultado = $consulta->get_result();

	if ($resultado->num_rows >= 1) {
		$consulta2 = $mysqli->prepare("UPDATE estudiantes 
			INNER JOIN login ON estudiantes.e_id=login.estudi_id
			SET nota=?, horario=? 
			WHERE login.cedula=?");
		if (!$consulta2) {
			return "Consulta error";
		}
		$consulta2->bind_param("sss", $nota, $horario, $cedula);
		$consulta2->execute();
		
		if ($consulta2->affected_rows >= 1) {
			return "Ok";
		}else {
			return "No cambios";
		}
	}else {
		return "Usuario no encontrado";
	}
}
?>