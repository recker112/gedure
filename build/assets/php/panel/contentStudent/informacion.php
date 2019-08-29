<!-- Información -->
<span class="c-caja" id="c-titulo-informacion"><span class="icon-book"></span>Información</span>
<div class="c-caja" id="c-contenido-informacion">
  <div id="informacion">
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