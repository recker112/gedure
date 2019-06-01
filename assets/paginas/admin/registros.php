<span id="admin-titulo1"><span class="icon-terminal"></span><b>Registros</b></span>
<div class="admin-registros">
  <div class="admin-registros-datos">
    <?php
    $acentos = $mysqli->query("SET NAMES 'utf8'");
    list($log_cedula, $log_user, $log_fecha, $log_accion, $log_cantidad, $datosUser) = logs($mysqli);
    $mysqli->close();
    ?>
      <div class="registro_cedula">
        <span>Cedula</span>
        <?php
        $i = 0;
        while ($i <= $log_cantidad) {
          if (isset($log_cedula[$i])) {
            $string = $log_cedula[$i][0].$log_cedula[$i][1];
            if ($string == "V-") {
              ?>
              <div class='c_dato c_dato_user popad_info_user' 
              data-cedula="<?php echo $log_cedula[$i]; ?>"
              data-name="<?php echo $log_user[$i]; ?>"
              data-curso="<?php echo $datosUser[$i]['curso']; ?>"
              data-seccion="<?php echo $datosUser[$i]['seccion']; ?>"
              data-pg="<?php echo $datosUser[$i]['user_pg']; ?>"
              data-lista="<?php echo $datosUser[$i]['archivo']; ?>"
              data-fecha="<?php echo $log_fecha[$i] ?>"
              data-accion="<?php echo $log_accion[$i] ?>"
                ><?php echo $log_cedula[$i] ?></div>
              <?php
            }else {
              ?>
              <div class='c_dato'
              data-cedula="<?php echo $log_cedula[$i]; ?>"
              data-name="<?php echo $log_user[$i]; ?>"
              data-fecha="<?php echo $log_fecha[$i] ?>"
              data-accion="<?php echo $log_accion[$i] ?>"
              ><?php echo $log_cedula[$i] ?></div>
              <?php
              }
            }
          else{
            ?>
            <div class='c_dato'>Ningun registro</div>
            <?php
            }
          $i++;
        } ?>
      </div>
      <div class="registro_nombre">
        <span>Nombre</span>
        <?php
        $i = 0;
        while ($i <= $log_cantidad) {
          if (isset($log_user[$i])) {
            ?>
            <div class='n_dato'><?php echo $log_user[$i] ?></div>
            <?php
            }
          else{
            ?>
            <div class='c_dato'>Ningun registro</div>
            <?php
            }
          $i++;
        } ?>
      </div>
      <div class="registro_fecha">
        <span>Fecha</span>
        <?php
        $i = 0;
        while ($i <= $log_cantidad) {
          if (isset($log_fecha[$i])) {
            ?>
            <div class='f_dato'><?php echo $log_fecha[$i] ?></div>
            <?php
            }
          else{
            ?>
            <div class='c_dato'>Ningun registro</div>
            <?php
            }
          $i++;
        } ?>
      </div>
      <div class="registro_accion">
        <span>Accion</span>
        <?php
        $i = 0;
        while ($i <= $log_cantidad) {
          if (isset($log_accion[$i])) {
            ?>
            <div class='a_dato'><?php echo $log_accion[$i] ?></div>
            <?php
            }
          else{
            ?>
            <div class='c_dato'>Ningun registro</div>
            <?php
            }
          $i++;
        } ?>
      </div>
  </div>
</div>