import React from 'react';
import { Paper } from '@material-ui/core';

export function ListNoticias() {
  return (
  <article className="BoxNoticias">
    <Paper variant="outlined">
      <section className="Noticia">
        <div className="NHead">
          <span className="NHeadImg">Logo</span>
          <span className="NHeadName">Nombre</span>
        </div>
        <hr />
        <div className="NContent">
          <span className="NContentTitle">Titulo largo y chavista</span>
          <p className="NContentP">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <footer >
          <span className="imagen">Imagenes</span>
          <span className="imagen">Imagenes</span>
          <span className="Imagen">Imagenes</span>
          <span className="Imagen">Imagenes</span>
        </footer>
      </section>
    </Paper>
  </article>
  );
}
