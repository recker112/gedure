import React from 'react';
import { Paper, Grow } from '@material-ui/core';

//Componentes
import { ImagenVisor } from "./ImagenVisor";

function Noticia(props) {
  const recorrerList = props.options.map((element) =>
  <div key={element.id}>
  <Grow in={true}> 
  <Paper variant="outlined">
    <section className="Noticia">
      <div className="NHead">
        <span className="NHeadImg">Logo</span>
        <span className="NHeadName">{element.name}</span>
      </div>
      <hr />
      <div className="NContent">
        <span className="NContentTitle">{element.title}</span>
        <p className="NContentP">{element.content}</p>
      </div>
      <ImagenVisor options={element.imgList} />
    </section>
  </Paper>
  </Grow>
  </div>);

  return recorrerList;
}

export default Noticia;