import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { consultAjax } from '../../reutilizar/ajaxConsult';

export function ListNoticias() {
  const [DataGet, setDataGet] = useState({
    name: "Luis",
    title: "title REACTIVO",
    content: "Contenido papÁ.",
    imgList: {
      img1: {
        title: 'Imagen1'
      },
      img2: {
        title: 'Imagen2'
      },
      lenth: 2
    }
  });

  return (
  <article className="BoxNoticias">
    {DataGet.name !== ''}{
      <Noticia options={DataGet} />
    }
  </article>
  );
}

function Noticia(props) {
  const { name, content, title, imgList } = props.options;

  return (
    <Paper variant="outlined">
      <section className="Noticia">
        <div className="NHead">
          <span className="NHeadImg">Logo</span>
          <span className="NHeadName">{name}</span>
        </div>
        <hr />
        <div className="NContent">
          <span className="NContentTitle">{title}</span>
          <p className="NContentP">{content}</p>
        </div>
        <footer >
          <span>Imagenes</span>
          <span>Imagenes</span>
          <span>Imagenes</span>
          <span>Imagenes</span>
        </footer>
      </section>
    </Paper>
  )
}