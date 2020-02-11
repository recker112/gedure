import React from 'react';
export function ImagenVisor(props) {
  let imagenes = props.options.map((element, i) => {
    if (i === 3) {
      return (<span key={i}>Hay mas</span>);
    }
    else if (i < 4) {
      return (<span key={i}>{element.title}</span>);
    }
    else {
      return (<span key={i} style={{ display: "none" }}>{element.title}</span>);
    }
  });
  return (<footer>{imagenes}</footer>);
}
