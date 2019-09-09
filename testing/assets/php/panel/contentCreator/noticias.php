<!-- Noticias -->
<span class="c-caja" id="c-titulo-noticias"><span class="icon-newspaper"></span>Noticias</span>
<div class="c-caja" id="c-contenido-noticias">
  <form action="" id="formNoticias" enctype="multipart/form-data">
    <input type="text" id="notiTitle" class="title" name="title" placeholder="Titulo"/>
    <textarea name="content" id="notiContent"></textarea>
    <span id="statusArea">0/1200 caracteres.</span>
    <input type="file" id="notiImg" name="img" multiple="">
    <button id="notiOk">Subir noticia</button>
    <img id="notiLoading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
  </form>
</div>