<?php
function search_user($mysqli, $cedula){
	$consulta = $mysqli->prepare("SELECT login.cedula, login.user, cursos.curso, cursos.seccion, estudiantes.archivo, profesores_guia.user_pg
		FROM login
		INNER JOIN estudiantes ON login.estudi_id=estudiantes.e_id
		INNER JOIN cursos ON estudiantes.curso_id=cursos.id_c
		INNER JOIN profesores_guia ON estudiantes.profeGuia_id=profesores_guia.id_pg
		WHERE login.cedula LIKE ?");
	$consulta->bind_param("s", $cedula);
	$consulta->execute();

	$resultado = $consulta->get_result();

	if ($resultado->num_rows >= 1) {
		$i = 0;
		while ($datos = $resultado->fetch_assoc()) {
			$user_cedula[$i] = $datos['cedula'];
			$user[$i] = $datos['user'];
			$user_curso[$i] = $datos['curso'];
			$user_seccion[$i] = $datos['seccion'];
			$user_pg[$i] = $datos['user_pg'];
			$lista[$i] = $datos['archivo'];
			$consulta2 = $mysqli->prepare("SELECT attempts, locks
				FROM baneos
				WHERE ban_cedula LIKE ?");
			$consulta2->bind_param("s", $cedula);
			$consulta2->execute();

			$resultado2 = $consulta2->get_result();
			if ($resultado2->num_rows >= 1) {
				$datos_ban = $resultado2->fetch_assoc();
				$ban_errores[$i] = $datos_ban['attempts'];
				$ban_locks[$i] = $datos_ban['locks'];
			}else {
				$ban_errores[$i] = 0;
				$ban_locks[$i] = 0;
			}
			$i++;
		}
		return array($user_cedula, $user, $user_curso, $user_seccion, $user_pg, $i, $ban_errores, $ban_locks, $lista);
	}
}
?>