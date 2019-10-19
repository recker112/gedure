<!-- Noticias -->
<div class="c-caja" id="c-contenido-noticias" style="display: none;">
  <div class="box">
    <span class="title">Publicar noticia</span>
    <form action="" id="cr-pn" enctype="multipart/form-data">
      <div class="cr-pndiv1">
        <input type="text" class="inputText" id="cr-pnTitle" name="title" placeholder="Titulo"/>
      </div>
      <div class="cr-pndiv2">
        <textarea name="content" class="inputText" id="cr-pnTextarea"></textarea>
        <span id="cr-pnstatusArea">0/1200 caracteres.</span>
      </div>
      <div class="cr-pndiv3">
        <input type="file" id="cr-pnImg" name="img" multiple="">
      </div>
      <div class="cr-pndiv4">
        <button id="cr-pnok">Subir noticia</button>
        <img id="cr-pnloading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      </div>
  </form>
  </div>
</div>