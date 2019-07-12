<?php
function search_panel($mysqli, $buscar){
	$querry = "%".$buscar."%";
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
	if (!$consulta) {
		return false;
	}
	$consulta->bind_param("ssssss", $querry, $querry, $querry, $querry, $querry, $querry);
	$consulta->execute();
	$resultado = $consulta->get_result();

	//contador
	$i=0;
	if ($resultado->num_rows >= 1) {
		while ($fila = $resultado->fetch_assoc()){
			$datos[$i]['cedula'] = $fila['cedula'];
			$datos[$i]['user'] = $fila['user'];
			$i++;
		}
		$datos['rows'] = $resultado->num_rows;
		return $datos;
	}else {
		return false;
	}
}
?>