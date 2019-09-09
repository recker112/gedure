<?php
function listAnnounce($mysqli){
  try {
    $consult = $mysqli->prepare('SELECT anuncios.title, anuncios.content, admins.user AS byUser
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

function listNews($mysqli){
  try {
    $consult = $mysqli->prepare('SELECT title, content, img, owner, avatarOwner
    FROM (
      SELECT news.id, news.title, news.content, news.img, creadores.user AS owner, creadores.avatar AS avatarOwner
        FROM news
        INNER JOIN creadores ON news.owner=creadores.cedula

      UNION ALL

      SELECT news.id, news.title, news.content, news.img, admins.user AS owner, admins.avatar AS avatarOwner
        FROM news
        INNER JOIN admins ON news.owner=admins.cedula
    ) Noticias
    ORDER BY id DESC
    LIMIT 10');

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
?>