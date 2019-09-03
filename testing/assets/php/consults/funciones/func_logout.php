<?php
function delete_cookie($mysqli, $cookie){
	$consulta = $mysqli->prepare("DELETE
		FROM reloginID
		WHERE relogin_user=?");
	$consulta->bind_param("s", $cookie);
	$consulta->execute();
}
?>