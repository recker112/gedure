import React, { useState, useEffect } from 'react';
import { Paper, Grow, Zoom } from '@material-ui/core';

export function AnnounceBox(props) {
  //Register mantiene la cantidad total a mostrar
  const [register, setRegister] = useState(0);

  //porps
  const { text, background, data } = props.options;

  //Al montar el componente
  useEffect(() => {
    //Pedir datos a la DB
    setTimeout(() => {
      const res = {
        StudientsTotal: 4735,
        StudientsBlock: 47,
        StudientsPermaBlock: 12,
        PublicNotice: 12,
        Likes: 312
      };

      //Mostrar el dato necesitado.
      setRegister(res[data]);
    }, 1000);
  }, [data]);

  //regresar
  return (<Grow in={true} timeout={500}>
    <Paper variant="outlined" className="Status">
      <Zoom in={true} timeout={800}>
        <div className="circulo" style={{ background: background }}>
          <span className="text">{register}</span>
        </div>
      </Zoom>
      <div>
        {text}
      </div>
    </Paper>
  </Grow>);
}