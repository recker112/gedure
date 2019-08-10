<?php
function search_panel($mysqli, $buscar){
	//Corrección para el LIKE en mysqli
	$querry = "%".$buscar."%";

	//Consulta a realizar
	$consulta = $mysqli->prepare("SELECT cedula, user 
		FROM (
			SELECT cedula, user
		    FROM login
		    WHERE cedula LIKE ? OR user LIKE ?
		    
		    UNION ALL
		    
		    SELECT cedula, user
		    FROM creadores
		    WHERE cedula LIKE ? OR user LIKE ?

		    UNION ALL
		    
		    SELECT cedula, user
		    FROM admins
		    WHERE cedula LIKE ? OR user LIKE ?
		) Usuarios
		ORDER BY cedula DESC
		LIMIT 5");

	//Verificar si la consulta anterior no da error
	if (!$consulta) {
		return "consult1_error";
	}

	//Establecer los parametros en las consultas (los ?)
	$consulta->bind_param("ssssss", $querry, $querry, $querry, $querry, $querry, $querry);

	//Realizar consulta
	$consulta->execute();

	//Obtener resultados de la consulta
	$resultado = $consulta->get_result();

	//contador
	$i=0;

	//Veriricar si se encuentra algún usuario
	if ($resultado->num_rows >= 1) {

		//Registrar datos
		while ($fila = $resultado->fetch_assoc()){

			//Datos
			$datos[$i]['cedula'] = $fila['cedula'];
			$datos[$i]['user'] = $fila['user'];

			//Variable de privilegio
			$privilegio = $fila['cedula'][0].$fila['cedula'][1];

			//Obtener datos del estudiante
			if ($privilegio == "V-") {
				//Consulta para obtener datos de estudiante
				$consultaV = $mysqli->prepare("SELECT cursos.curso, cursos.seccion, estudiantes.archivo
					FROM login
					INNER JOIN estudiantes ON estudiantes.e_id=login.estudi_id
					INNER JOIN cursos ON cursos.id_c=estudiantes.curso_id
					WHERE cedula=?");
				if (!$consultaV) {
					return "consultV_error";
				}

				//Establecer los parametros en las consultas (los ?)
				$consultaV->bind_param("s", $fila['cedula']);

				//Realizar consulta
				$consultaV->execute();

				//Obtener resultados de la consulta
				$resultadoV = $consultaV->get_result();

				//Verificar si realmente existe ese estudiante (aunque debería de estar en la lista a esta altura del script)
				if ($resultadoV->num_rows >= 1) {
					//Obtener datos.
					$filaV = $resultadoV->fetch_assoc();

					//Datos
					$datos[$i]['curso'] = $filaV['curso'];
					$datos[$i]['seccion'] = $filaV['seccion'];
					$datos[$i]['lista'] = $filaV['archivo'];
					$datos[$i]['estu'] = true;
				}else {
					$datos[$i]['estu'] = false;
				}
			}else {
				$datos[$i]['estu'] = false;
			}

			//Consulta para verificar si está BAN :u
			$consulta2 = $mysqli->prepare("SELECT ban_cedula, attempts, locks
				FROM baneos
				WHERE ban_cedula = ?");

			//Verificar si la consulta anterior no da error
			if (!$consulta2) {
				return "consult2_error";
			}

			//Establecer los parametros en las consultas (los ?)
			$consulta2->bind_param("s", $datos[$i]['cedula']);

			//Realizar consulta
			$consulta2->execute();

			//Obtener resultados de la consulta
			$resultado2 = $consulta2->get_result();

			//Verificar si está en la lista de bloqueados o no
			if ($resultado2->num_rows >= 1) {
				$datos[$i]['user_ban'] = true;
			}else {
				$datos[$i]['user_ban'] = false;
			}

			//Incrementar el contador
			$i++;
		}
		$datos['rows'] = $resultado->num_rows;
		return $datos;
	}else {
		return "no_found";
	}
}
?>