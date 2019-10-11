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
    while (isset($noticias[$i])){
      $nActual = $noticias[$i];
    ?>
    <section>
      <div class="content">
        <div class="avatar">
          <img src="<? echo $nActual['avatarOwner'] ?>" alt="" width="100" heigth="100"/>
          <span class="nombre"><? echo $nActual['owner']; ?></span>
        </div>
        <p class="contenido"><? echo $nActual['title']; ?>:<br/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium quia distinctio repudiandae. Voluptate esse eos unde. Ducimus culpa eveniet minima at sapiente tenetur doloribus odio facere ipsum? Consectetur, quibusdam. Harum, consectetur rem. Sapiente eaque nisi nemo voluptates sint eius vitae non eos delectus laudantium ab praesentium obcaecati alias assumenda a, est vero sed ad iure, expedita earum omnis atque! In ducimus sed fugit similique animi. Qui nostrum ut rerum provident, ea, odio nulla expedita harum, sapiente fugiat dolorem. Ducimus earum blanditiis expedita debitis rem alias atque, delectus enim ut veniam sunt vel laboriosam eum odio recusandae doloribus assumenda eius sint ea commodi, totam amet molestias eaque iste. Suscipit vitae eius, repellat minus soluta tempora reprehenderit inventore animi voluptatibus veniam illo, odit saepe vel, ullam maxime at tenetur provident nemo nihil pariatur similique. Quo, commodi voluptas! Inventore obcaecati provident illo, asperiores, temporibus blanditiis deserunt aspernatur necessitatibus sunt debitis beatae, ab ratione.</p>
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
    while (isset($anuncios[$i])){
      $aActual = $anuncios[$i];
    ?>
    <section>
      <header class="titulo">
        <p><?php echo $aActual['title'] ?></p>
      </header>
      <p class="contenido"><?php echo $aActual['content'] ?></p>
      <footer class="by">Escrito por: <?php echo $aActual['byUser'] ?></footer>
    </section>
    <?php $i++;} ?>
  </aside>
</main>