import React, { useState, useEffect } from 'react';

function PagePanel(props) {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    // Verificar props enviados desde el formulario.
    // "this.props.location.state" sirve para poder identificar el objecto
    // el cual contiene todos los props enviados desde la etiqueta Redirect,
    // pero se necesita comprobar primero que este pops contenga algo antes
    // de poder realizar una comprobación de valores, porque sino, todo
    // EXPLOTA
    if (props.location.state !== undefined && props.location.state.loginIs === true){
      setAuth(true);
      setData(props.location.state.data);
    }else {
      //Verificar datos locales.
      console.log()
      const loginIs = localStorage.getItem("loginIs");

      if (loginIs === "true"){
        setAuth(true);
        setData(JSON.parse(localStorage.getItem('data')));
        localStorage.removeItem("data");
        localStorage.removeItem("loginIs");
      }
    }
  }, [])

  if (auth === true){
    return(
      <h1>Bienvenido {data.user}</h1>
    )
  }else {
    return(
      <h1>NEL</h1>
    )
  }
}

export default PagePanel;