import React, { useEffect, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import { Grow, Zoom } from '@material-ui/core';
import { Redirect } from 'react-router-dom'


//Componentes
import HeaderNoPanel from '../reutilizar/HeaderNoPanel';
import { Form } from './components/Form';


function PageIndex() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    document.title = "La Candelaria - Login";
    let cancelar = false;

    if (!cancelar) {
      //Primero verifica si existe el ssesionStorage y después lo inserta
      //para ser transformado a JSON.
      const loginIsS = JSON.parse(
        sessionStorage.getItem("loginIs") !== "null" ? sessionStorage.getItem("loginIs") 
        : 
        false);
      const dataS = JSON.parse(sessionStorage.getItem("data"));
      const loginIsL = JSON.parse(
        localStorage.getItem("loginIs") !== "null" ? 
        localStorage.getItem("loginIs") 
        : 
        false);
      const dataL = JSON.parse(sessionStorage.getItem("data"));

      //Verificar datos
      if ((loginIsS && dataS !== "null" ) || (loginIsL && dataL !== "null") ){
        setAuth(true);
      }
    }
    
    return () => {
      cancelar = true;
    }
  }, [])
  

  if (!auth){
    return(
      <div className="BoxPageIndex">
        <HeaderNoPanel />
        <Grow in={true}>
          <main>
            <Zoom in={true} timeout={500}>
            <div className="HeadMain">
              <span className="IconBoxIndex">
                <LockIcon style={{ fontSize: 40 }} />
              </span>
              <span className="TitleIndex">La Candelaria</span>
            </div>
            </Zoom>
            <Form />
          </main>
        </Grow>
      </div>
    )
  }else {
    return (
      <Redirect to={{
        pathname: '/panel',
        state: {
          loginIs: true
        }
      }} />
    )
  }
}

export default PageIndex;