<?php
function logs($mysqli){
  $consulta = $mysqli->prepare('SELECT log_cedula, log_user, fecha, accion
  FROM logs
  ORDER BY fecha DESC
  LIMIT 20');
  if (!$consulta) {
    return false;
  }
  $consulta->execute();
  $resultado = $consulta->get_result();
  if ($resultado->num_rows >= 1) {
    $i = 0;
    while ($fila = $resultado->fetch_assoc()) {
    	$string = $fila['log_cedula'][0].$fila['log_cedula'][1];
    	if ($string == "V-") {
    		$consultaV = $mysqli->prepare("SELECT cursos.curso, cursos.seccion, profesores_guia.user_pg, estudiantes.archivo
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

    		$datosV[$i] = $resultadoV->fetch_assoc();
    	}else {
        $datosV[$i] = 0;
      }
		$log_cedula[$i] = $fila['log_cedula'];
		$log_user[$i] = $fila['log_user'];
		$fecha[$i] = $fila['fecha'];
		$accion[$i] = $fila['accion'];
		$i++;
    }
    $cantidad = $i - 1;
    return array($log_cedula, $log_user, $fecha, $accion, $cantidad, $datosV);
  }else {
    return false;
  }
}
?>