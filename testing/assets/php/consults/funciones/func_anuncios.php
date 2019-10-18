<?php
function listAnnounce($mysqli){
  try {
    $consult = $mysqli->prepare('SELECT anuncios.title, anuncios.content, anuncios.fecha, admins.user AS byUser
    FROM anuncios
    INNER JOIN admins ON anuncios.byUser=admins.cedula
    ORDER BY id DESC
    LIMIT 8');

    //Verificar consulta
    if (!$consult) {
      throw new Exception('consultError');
    }

    $consult->execute();
    $result = $consult->get_result();

    if ($result->num_rows === 0) {
      throw new Exception('noAnnounce');
    }

    $i=0;
    while ($fila = $result->fetch_assoc()) {
      $array[$i] = $fila;
      $i++;
    }
    return $array;
  } catch (\Throwable $e) {
    return $e->getMessage();
  }
}

function listNews($mysqli){
  try {
    $consult = $mysqli->prepare('SELECT id, title, content, img, owner, avatarOwner, fecha
    FROM (
      SELECT news.id, news.title, news.content, news.img, news.fecha, creadores.user AS owner, creadores.avatar AS avatarOwner
        FROM news
        INNER JOIN creadores ON news.owner=creadores.cedula

      UNION ALL

      SELECT news.id, news.title, news.content, news.img, news.fecha, admins.user AS owner, admins.avatar AS avatarOwner
        FROM news
        INNER JOIN admins ON news.owner=admins.cedula
    ) Noticias
    ORDER BY id DESC
    LIMIT 6');

    //Verificar consulta
    if (!$consult) {
      throw new Exception('consultError');
    }

    $consult->execute();
    $result = $consult->get_result();

    if ($result->num_rows === 0) {
      throw new Exception('noNews');
    }

    $i=0;
    while ($fila = $result->fetch_assoc()) {
      $array[$i] = $fila;
      $i++;
    }
    return $array;
  } catch (\Throwable $e) {
    return $e->getMessage();
  }
}

function addNewsInDB($mysqli, $title, $content, $img, $owner){
  try {
    $consult = $mysqli->prepare('INSERT INTO news
    (title, content, img, fecha, owner)
    VALUES
    (?,?,?,?,?)');
    if (!$consult) {
      throw new Exception('consultError');
    }

    $setdate = date_default_timezone_set("America/Caracas");//Seleccionar zona para la hora.
    $date = date("y")."-".date("m")."-".date("d")." ".date("H").":".date("i").":".date("s");//establecer fecha.

    $consult->bind_param("sssss", $title, $content, $img, $date, $owner);
    $consult->execute();

    if ($consult->affected_rows > 1) {
      throw new Exception("errorInsert");
    }

    return "ok";
  } catch (\Throwable $e) {
    return $e->getMessage();
  }
}

function addAnunInDB($mysqli, $title, $content, $owner){
  try {
    $consult = $mysqli->prepare("INSERT INTO anuncios
    (title, content, fecha, byUser)
    VALUES
    (?,?,?,?)");
    if (!$consult) {
      throw new Exception('consultError');
    }

    $setdate = date_default_timezone_set("America/Caracas");//Seleccionar zona para la hora.
    $date = date("y")."-".date("m")."-".date("d")." ".date("H").":".date("i").":".date("s");//establecer fecha.

    $consult->bind_param("ssss", $title, $content, $date, $owner);
    $consult->execute();

    if ($consult->affected_rows > 1) {
      throw new Exception("errorInsert");
    }

    return 'ok';
  } catch (\Throwable $th) {
    return $e->getMessage();
  }
}

function deleteNoticiaFromDB($mysqli, $ID){
	$consult = $mysqli->prepare("SELECT id, img FROM news
	WHERE id=?");
	if (!$consult) {
		throw new Exception('consultError');
	}
	$consult->bind_param("s", $ID);
	$consult->execute();

	$result = $consult->get_result();

	if ($result->num_rows == 1) {
		//Obtener datos
		$fila = $result->fetch_assoc();

		//Decodificar JSON
		$img = json_decode($fila['img']);

		//Eliminar fotos del servidor
		$i=0;
		while (isset($img[$i])){
			unlink("../../../".$img[$i]);
			$i++;
		}
		
		$consultDelete = $mysqli->prepare("DELETE FROM news
		WHERE id=?");
		if (!$consultDelete) {
			throw new Exception('consultError');
		}
		$consultDelete->bind_param("s", $ID);
		$consultDelete->execute();

		if ($consultDelete->affected_rows >= 1) {
			return 'ok';
		}else {
			return 'no_delete';
		}
	}else {
		return 'no_exist';
	}
}

function allUnseeDeleteNoticiaFromDB($mysqli){
	$consult = $mysqli->prepare("SELECT id, img FROM news
	ORDER BY id DESC");
	if (!$consult) {
		throw new Exception('consultError');
	}
	$consult->execute();

	$result = $consult->get_result();

	if ($result->num_rows >= 10) {
		//Obtener datos
		$fila = $result->fetch_assoc();

		//Borrar noticias antiguas
		$i=0;
		while (isset($fila['id'])) {
			if ($i >= 10){
				//Decodificar JSON
				$img = json_decode($fila['img']);

				//Eliminar fotos del servidor
				$i=0;
				while (isset($img[$i])){
					unlink("../../../".$img[$i]);
					$i++;
				}

				$consultDelete = $mysqli->prepare("DELETE FROM news
				WHERE id=?");
				if (!$consultDelete) {
					throw new Exception('consultError');
				}
				$consultDelete->bind_param("s", $fila['id']);
				$consultDelete->execute();
			}
			//Obtener datos
			$fila = $result->fetch_assoc();
			$i++;
		}
		return 'ok';
	}else {
		return 'no_10';
	}
}
?>