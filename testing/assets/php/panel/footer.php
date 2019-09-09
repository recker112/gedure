  <!-- Cookies -->
  <div id="cookies">
		<span>Este sitio web utiliza cookies propias para que usted tenga una mejor experiencia de usuario. Si continúa navegando está dando su consentimiento para la aceptación de las mencionadas cookies y la aceptación de nuestra <span class="cookie_link">política de cookies</span>.</span>
		<a href="javascript:void(0)" class="ok" id="confirm_cookie">Aceptar politicas de cookies</a>
	</div>
  <!-- Popad -->
	<div id="popad">
    <div id="popad-caja">
      <div id="popad-title">
        <span id="popad-titulo"></span>
        <span id="popad-cerrar">X</span>
      </div>
      <div id="popad-caja2">
        <span id="popad-info"></span>
      </div>
    </div>
  </div>
  <!-- Alerts -->
  <div id="areaAlert">
  </div>
  <?php if ($privilegio == "A-") { ?>
	<script type="text/javascript" src="assets/js/panelAdmin.bundle.js"></script>
  <?php }else if ($privilegio == "V-") { ?>
    <script type="text/javascript" src="assets/js/panelUser.bundle.js"></script>
  <?php }else if ($privilegio == "CR-") { ?>
    <script type="text/javascript" src="assets/js/panelCreator.bundle.js"></script>
  <?php } ?>
</body>
</html>