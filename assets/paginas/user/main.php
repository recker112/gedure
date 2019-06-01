<main>
      <h2>Panel de <?php echo $_SESSION['user'] ?></h2>
      <div class="user-contenedor">
        <div class="user-contenido">
          <h3>Bienvenido al panel</h3>
          <p>Aqui podras ver informacion sobre tu curso y algunos datos personales de tu progreso en el liceo, en el menu puedes descargar tus notas y el horario de clases asignado a tu sección.</p>
          <h4><span class="icon-book"></span><b>Datos</b></h4>
          <span class="user-guia">Profesor Guia: <?php echo $_SESSION['profeGuia']; ?></span>
          <span class="user-curso">Curso: <?php echo $_SESSION['curso']. ' ' .$_SESSION['seccion']; ?></span>
          <span class="user-n_lista">Numero de lista: <?php echo $_SESSION['archivo']; ?></span>
          <h6><span class=" icon-file-pdf"></span><b>Constancias Varias</b></h6>
          <div class="user-archivos">
            <div class="column-1">
              <a class="archivo1" href="src/constancias/c_estudio.docx" download="Constancia de estudio.docx">Estudio</a>
              <a class="archivo2" href="src/constancias/c_asistencia.docx" download="Constancia de asistencia.docx">Asistencia</a>
              <a class="archivo3" href="src/constancias/c_buena_conducta.docx" download="Constancia de buena conducta.docx">Buena conducta</a>
            </div>
            <div class="column-2">
              <a class="archivo4" href="src/constancias/c_aceptacion_cupo.docx" download="Constancia de aceptación de cupo.docx">Aceptación de cupo</a>
              <a class="archivo5" href="src/constancias/c_nota_certificada.docx" download="Constancia de solicitud de notas.docx">Solicitud de notas</a>
            </div>
          </div>
        </div>
      </div>
    </main>