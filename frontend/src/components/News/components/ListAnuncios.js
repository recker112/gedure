import React from 'react';
import { Paper } from '@material-ui/core';
export function ListAnuncios() {
  return (
  <aside id="test" className="BoxAnuncios">
    <Paper variant="outlined">
      <div className="AHead">
        <span>Anuncios</span>
      </div>
    </Paper>
    <Paper variant="outlined">
      <section className="Anuncio">
        <span className="ATitle">Hola, soy una prueba</span>
        <p className="AContent">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
        <hr />
        <footer>Escrito por: Nombre</footer>
      </section>
    </Paper>
  </aside>);
}
