<!-- Contenido -->
<main>
  <!-- Publicaciones -->
  <article>
    <?php
    $noticias = listNews($mysqli);

    if ($noticias === 'noNews') {
      $noticias = null;
    }
    
    $i=0;
    while (isset($noticias[$i]) && $i < 5){
      $nActual = $noticias[$i];
    ?>
    <section>
      <div class="content">
        <div class="avatar">
          <img src="<? echo $nActual['avatarOwner'] ?>" alt="" width="100" height="100"/>
          <span class="nombre"><? echo $nActual['owner']; ?></span>
          <span>#<? echo $nActual['id']; ?></span>
        </div>
        <p class="contenido"><? echo $nActual['title']; ?>:
        <br/><? echo $nActual['content']; ?>
        <br/><span class="fecha"><? echo substr($nActual['fecha'], 0, 10) ?></span></p>
        </div>
      <footer>
        <?
        $img = json_decode($nActual['img']);

        $o=0;
        for ($l=0; $l < count($img); $l++) { 
          if ($l < 3) {
        ?>
          <img data-actual="<? echo $l ?>" class="showImg" src="<? echo $img[$l] ?>" alt="imagen" width="160" height="100"/>
        <?
          }else {
        ?>
          <img data-actual="<? echo $l ?>" class="noShowImg" src="<? echo $img[$l] ?>" alt="imagen" width="160" height="100"/>
        <?
          $o++;
          }
        }

        if ($o > 0) {
          ?>
          <span class="more">+<? echo $o; ?></span>
          <?
        }
        ?>
      </footer>
    </section>
    <?php $i++;}?>
  </article>
  <!-- Noticias -->
  <aside>
    <span class="AsideTitle">Anuncios</span>
    <?php
    $anuncios = listAnnounce($mysqli);

    if ($anuncios === 'noAnnounce') {
      $anuncios = null;
    }
    $i=0;
    while (isset($anuncios[$i]) && $i < 10){
      $aActual = $anuncios[$i];
    ?>
    <section>
      <header class="titulo">
        <p><?php echo $aActual['title'] ?></p>
      </header>
      <p class="contenido"><?php echo $aActual['content'] ?></p>
      <footer class="by">Escrito por: <?php echo $aActual['byUser'] ?><? echo substr($aActual['fecha'], 0, 10) ?></footer>
    </section>
    <?php $i++;} ?>
  </aside>
</main>