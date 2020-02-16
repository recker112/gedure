import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Material-UI
import LockIcon from '@material-ui/icons/Lock';
import { Zoom } from '@material-ui/core';


//Componentes
import HeaderNoPanel from '../../components/reutilizar/HeaderNoPanel';
import Form from './Form';
import AlertsState from '../../components/AlertsState';

//redux
import { connect } from 'react-redux';
import reloginSuccess from '../../actions/login/reloginSuccess';

function PageIndex({auth, reloginSuccess}) {
  useEffect(() => {
    document.title = "La Candelaria - Login";

    let cancelar = false;//Se crea una variable la cual cancele TODO
    //el useEffect, esto es para cuando se desmonte el componente
    //y así evitar problemas.

    if (!cancelar) {//Encierra todas las funciones.
      //Algoritmos para verificar el LOGIN
      const keyL = JSON.parse(localStorage.getItem("key"));
      const keyS = JSON.parse(sessionStorage.getItem("key"));

      if (keyL || keyS){
        //Al actualizar el AUTH, se le pasa el parámetro
        //true para decirle a PANEL que está siendo redireccionado
        //por la web, y así pueda revisar la key sin que
        //entre en bucle.
        reloginSuccess(true);
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
        pathname: '/panel'
      }} />
    )
  }

  //Regresar contenido del login
  return(
    <div className="BoxPageIndex">
      <HeaderNoPanel />
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
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.loginStatus.auth
})

const mapDispatchToProps = {
  reloginSuccess,
}

export default connect(mapStateToProps,mapDispatchToProps)(PageIndex);