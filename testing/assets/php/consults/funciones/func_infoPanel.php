<?php
function countUsersRegister($mysqli){
  $consult = $mysqli->prepare('SELECT count(cedula) AS number
  FROM login');
  $consult->execute();

  $result = $consult->get_result();
  if ($result->num_rows >= 1) {
    $dato[] = $result->fetch_assoc();
    return $dato[0]['number'];
  }else {
    return 'N/A';
  }
}

function countUsersBlock($mysqli){
  $consult = $mysqli->prepare('SELECT count(ban_cedula) AS number
  FROM baneos
  WHERE locks < 5');
  $consult->execute();

  $result = $consult->get_result();
  if ($result->num_rows >= 1) {
    $dato[] = $result->fetch_assoc();
    return $dato[0]['number'];
  }else {
    return 'N/A';
  }
}

function countUsersBlockPerma($mysqli){
  $consult = $mysqli->prepare('SELECT count(ban_cedula) AS number
  FROM baneos
  WHERE locks=5');
  $consult->execute();

  $result = $consult->get_result();
  if ($result->num_rows >= 1) {
    $dato[] = $result->fetch_assoc();
    return $dato[0]['number'];
  }else {
    return 'N/A';
  }
}

function countPublicNews($mysqli, $cedula){
  $consult = $mysqli->prepare('SELECT count(owner) AS number
  FROM news
  WHERE owner=?');
  $consult->bind_param("s", $cedula);
  $consult->execute();

  $result = $consult->get_result();
  if ($result->num_rows >= 1) {
    $dato[] = $result->fetch_assoc();
    return $dato[0]['number'];
  }else {
    return 'N/A';
  }
}
?>