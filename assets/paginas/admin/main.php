<main>
    <div class="admin-caja">
        <h2>Panel de administración</br>de <?php echo $_SESSION['user']; ?></h2>
        <div class="admin-contenedor">
            <?php
            require 'admin-menu.php';
            ?>
        <div class="admin-contenido">
            <?php
            require 'registros.php';
            require 'matricula.php';
            require 'modificar.php';
            require 'boletin.php';
            require 'buscar.php';
            require 'seccion.php';
            require 'notas.php';
            ?>
      </div>
    </div>
  </div>
</main>