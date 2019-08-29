<?php
function modificar_prof($mysqli, $nombre, $curso, $seccion){
	$consulta = $mysqli->prepare("SELECT id_pg
		FROM profesores_guia
		WHERE id_pg=?");
	$id_pg = "PG_".$curso.$seccion;
	$consulta->bind_param("s", $id_pg);
	$consulta->execute();
	$resultado = $consulta->get_result();

	if ($resultado->num_rows >= 1) {
		$consulta2 = $mysqli->prepare("UPDATE profesores_guia
			SET user_pg=?
			WHERE id_pg=?");
		if (!$consulta) {
			return "consult_error";
		}
		$consulta2->bind_param("ss", $nombre, $id_pg);
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