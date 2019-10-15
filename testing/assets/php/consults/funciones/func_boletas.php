<?php
function replaceNameBoletas($mysqli, $estudi_id){
	$consulta = $mysqli->prepare('SELECT cedula
	FROM login
	WHERE estudi_id=?');
	
	$consulta->bind_param("s", $estudi_id);
	$consulta->execute();
	$resultado = $consulta->get_result();

	if ($resultado->num_rows >= 1) {
		$fila = $resultado->fetch_assoc();
		return $fila['cedula'];
	}else {
		return false;
	}
}

function moveBoletas($cedula, $estudi_id, $old_estudi){
  try {
    //Seleccionar carpetas
    if (strpbrk("G", $estudi_id)) {
      $destino = "../../src/Cursos_boletas/".$estudi_id[2]." grado/".$estudi_id[4]."/";
    }else {
      $destino = "../../src/Cursos_boletas/".$estudi_id[2]." año/".$estudi_id[3]."/";
    }
    
    if (strpbrk("G", $old_estudi)) {
      $origen = "../../src/Cursos_boletas/".$old_estudi[2]." grado/".$old_estudi[4]."/".$cedula.".pdf";
    }else {
      $origen = "../../src/Cursos_boletas/".$old_estudi[2]." año/".$old_estudi[3]."/".$cedula.".pdf";
    }

    //Verificar si existe boleta cargada
    if (!file_exists($origen)) {
      throw new Exception('no_origen');
    }

    //Verificar si existe la carpeta destino
    if (!file_exists($destino)) {
      $oldumask = umask(0); 
      if (@mkdir($destino, 0777, true)) {
        umask($oldumask); 
      }
    }

    //Mover archivo
    $destino = $destino.$cedula.".pdf";
    if (!@rename($origen, $destino)) {
      throw new Exception('no_destino');
    }

    return 'ok';
  } catch (\Throwable $e) {
    return $e->getMessage();
  }
}
?>