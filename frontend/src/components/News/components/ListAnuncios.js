import React, { useState, useEffect } from 'react';
import { Paper, Grow } from '@material-ui/core';
export function ListAnuncios() {
  const [ListAnuncios, setListAnuncios] = useState([])

  const test = [{
    title: 'Hola, soy una prueba',
    content: "Test test tes test",
    by: 'Recker'
  }, {
    title: 'Test2 largo',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.`,
    by: 'Recker'
  },...ListAnuncios]

  useEffect(() => {
    setTimeout(() => {
      setListAnuncios(test);
    }, 10000);
  }, [test])

  return (
  <aside id="test" className="BoxAnuncios">
    <Grow in={true}>
    <Paper variant="outlined">
      <div className="AHead">
        <span>Anuncios</span>
      </div>
    </Paper>
    </Grow>
    <Anuncio option={ListAnuncios} />
    {console.log(ListAnuncios)}
  </aside>);
}

function Anuncio(props) {
  console.log(props.option);
  const recorrerLista = props.option.map((anuncio, i) => 
  <Grow in={true} key={i}>
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