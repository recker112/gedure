import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Material-UI
import LockIcon from '@material-ui/icons/Lock';
import { Grow, Zoom } from '@material-ui/core';


//Componentes
import HeaderNoPanel from '../reutilizar/HeaderNoPanel';
import Form from './components/Form';
import AlertsState from '../reutilizar/AlertsState';

//redux
import { connect } from 'react-redux';
import updateAuth from '../store/action/updateAuth';

function PageIndex({auth, updateAuth}) {
  useEffect(() => {
    document.title = "La Candelaria - Login";

    let cancelar = false;//Se crea una variable la cual cancele TODO
    //el useEffect, esto es para cuando se desmonte el componente
    //y así evitar problemas.

    if (!cancelar) {//Encierra todas las funciones.
      //Primero verifica si existe el ssesionStorage y después lo inserta
      //para ser transformado a JSON.
      const loginIsS = JSON.parse(
        sessionStorage.getItem("loginIs") === "true" ? sessionStorage.getItem("loginIs") 
        : 
        false);
      const dataS = JSON.parse(sessionStorage.getItem("data"));

      const loginIsL = JSON.parse(
        localStorage.getItem("loginIs") !== "true" ? 
        localStorage.getItem("loginIs") 
        : 
        false);
      const dataL = JSON.parse(sessionStorage.getItem("data"));

      //Verificar datos
      if ((loginIsS && dataS !== null ) || (loginIsL && dataL !== null) ){
        //ACtualizar AUTH para que redirija al panel
        updateAuth(true);
      }
    }
    
    //Return se usa para llamar la variable la cual cancelará toda la
    //función. Para entenderlo mejor ver la documentación de los HOOKS.
    return () => {
      cancelar = true;
    }
  })
  
  //Verificar auth
  if (auth){
    return (
      <Redirect to={{
        pathname: '/panel',
      }} />
    )
  }

  //Regresar contenido del login
  return(
    <div className="BoxPageIndex">
      <HeaderNoPanel />
      <Grow in={true}>
        <main>
          <Zoom in={true} timeout={600}>
          <div className="HeadMain">
            <span className="IconBoxIndex">
              <LockIcon style={{ fontSize: 40 }} />
            </span>
            <span className="TitleIndex">La Candelaria</span>
          </div>
          </Zoom>
          <Form />
          <AlertsState />
        </main>
      </Grow>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.loginStatus.auth
})

const mapDispatchToProps = {
  updateAuth,
}

export default connect(mapStateToProps,mapDispatchToProps)(PageIndex);