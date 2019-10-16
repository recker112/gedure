<!-- Información -->
<div class="c-caja" id="c-contenido-informacion" style="display: none;">
  <div class="box">
    <span class="title">Datos</span>
    <div id="infoU-datos">
      <span>Profesor Guia: <?php echo "$profeGuia." ?></span>
      <span>Curso: <?php 
        if ($curso[1]) {
          echo "$curso[0] grado $seccion.";
        }else {
          echo "$curso[0] año $seccion.";
        }
      ?></span>
      <span>Número de lista: <?php echo "$archivo." ?></span>
    </div>
  </div>
</div>