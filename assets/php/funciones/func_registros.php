<?php
function registros_log($mysqli){
	$consulta = $mysqli->prepare("SELECT log_cedula, log_user, fecha, accion
		FROM logs
		ORDER BY fecha DESC
		LIMIT 40");
	if (!$consulta) {
		return false;
	}
	$consulta->execute();
	$resultado = $consulta->get_result();
	if ($resultado->num_rows >= 1) {
		$i=0;//Contador
		while ($fila = $resultado->fetch_assoc()) {
			$privilegio = $fila['log_cedula'][0].$fila['log_cedula'][1];
			if ($privilegio == "V-") {//Verificar si es usuario
				//Consulta para extraer datos de usuarios
				$consultaV = $mysqli->prepare("SELECT cursos.curso AS log_curso, cursos.seccion AS log_seccion, profesores_guia.user_pg AS log_pg, estudiantes.archivo AS log_lista
    			FROM login
    			INNER JOIN estudiantes ON login.estudi_id=estudiantes.e_id
    			INNER JOIN cursos ON estudiantes.curso_id=cursos.id_c
    			INNER JOIN profesores_guia ON estudiantes.profeGuia_id=profesores_guia.id_pg
    			WHERE login.cedula=?");
		        if (!$consultaV) {
		          return false;
		        }
		        $consultaV->bind_param("s", $fila['log_cedula']);
    			$consultaV->execute();

    			$resultadoV = $consultaV->get_result();
    			//Guardar datos en variable
    			$datos[$i] = $resultadoV->fetch_assoc();
    			$datos[$i]['log_usuario'] = true;
			}else {
				$datos[$i]['log_usuario'] = false;
			}

			//Guardar datos genericos
			$datos[$i]['log_cedula'] = $fila['log_cedula'];
			$datos[$i]['log_user'] = $fila['log_user'];
			$datos[$i]['log_fecha'] = $fila['fecha'];
			$datos[$i]['log_accion'] = $fila['accion'];

			//Obtener datos de baneos
			$consultaB = $mysqli->prepare("SELECT attempts AS log_attemps, locks AS log_locks
				FROM baneos
				WHERE ban_cedula=?");
			$consultaB->bind_param("s", $fila['log_cedula']);
			$consultaB->execute();

			$resultadoB = $consultaB->get_result();
			if ($resultadoB->num_rows >= 1) {
				$fila3 = $resultadoB->fetch_assoc();
				$datos[$i]['log_attemps'] = $fila3['log_attemps'];
				$datos[$i]['log_locks'] = $fila3['log_locks'];
				$datos[$i]['log_bans'] = true;
			}else {
				$datos[$i]['log_attemps'] = 0;
				$datos[$i]['log_locks'] = 0;
				$datos[$i]['log_bans'] = false;
			}
			$i++;
		}
		$datos['cantidad'] = $i;
		return $datos;
	}else {
		return false;
	}
}
?>