<!-- Avatar -->
<div class="c-caja" id="c-contenido-avatar" style="display: none;">
  <div class="box">
    <span class="title">Cambiar avatar</span>
    <form action="#" id="ava-form" enctype="multipart/form-data">
      <div class="ava-div1">
        <input type="file" name="avatar" id="ava-img" />
        <span>(Máximo: 10MB)</span>
      </div>
      <div class="ava-div2">
        <img id="ava-showPreview" src="<? echo $avatar ?>" alt='Avatar' width="100" height="100" />
        <span>Vista Previa</span>
      </div>
      <div class="ava-div3">
        <button id="ava-ok">Cambiar avatar</button>
        <img id="ava-loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      </div>
  </form>
  </div>
</div>