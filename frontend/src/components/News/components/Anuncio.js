import React from 'react';
import { Paper, Grow } from '@material-ui/core';
export function Anuncio(props) {
  const recorrerLista = props.option.map((anuncio, i) => <Grow in={true} key={i}>
    <Paper variant="outlined">
      <section className="Anuncio">
        <span className="ATitle">{anuncio.title}</span>
        <p className="AContent">{anuncio.content}</p>
        <hr />
        <footer>Escrito por: {anuncio.by}</footer>
      </section>
    </Paper>
  </Grow>);
  return recorrerLista;
}
