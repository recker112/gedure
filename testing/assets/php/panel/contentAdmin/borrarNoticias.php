<!-- Borrar -->
<div class="c-caja" id="c-contenido-borrarN" style="display: none">
  <div class="box">
    <span class="title">Borrar Noticias</span>
    <form action="#" id="boNot-form" method="POST">
      <div id="boNot-selectOption" class="boNot-div1">
        <span data-select="id" class="active">ID</span>
        <span data-select="unsee">No visibles</span>
        <input type="hidden" id="boNot-option" name="option" value="id" />
      </div>
      <div class="boNot-div2">
        <input class="inputText" type="text" name="id" id="boNot-id" placeholder="Número del ID" />
      </div>
      <div class="boNot-div3">
        <button id="boNot-ok">Borrar noticias</button>
        <img id="boNot-loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      </div>
    </form>
  </div>
</div>