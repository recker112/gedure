<?php
require 'assets/php/consults/verify_cookie_session.php';
if ($verify_cs){
  require 'assets/php/panel/variables.php';
  require 'assets/php/panel/head.php';
  require 'assets/php/panel/header.php';
  require 'assets/php/panel/panel.php';
  require 'assets/php/panel/content.php';
  require 'assets/php/panel/footer.php';
}else {
  header("location: index.php");
}
?>