import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';

//Components
import HeaderMenu from './HeaderMenu';

//redux
import { connect } from 'react-redux';
import reloginSuccess from '../actions/login/reloginSuccess';

function ReloginVerify({auth, reloginSuccess, children}) {
  useEffect(() => {
    document.title = "La Candelaria - News";
		
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
  });
	
	 //Verificar auth
  if (auth){
    return (
      <Redirect to={{
        pathname: '/panel'
      }} />
    )
  }
	
  return (
    <div>
			<HeaderMenu />
      {children}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.loginStatus.auth
})

const mapDispatchToProps = {
  reloginSuccess,
}

export default connect(mapStateToProps,mapDispatchToProps)(ReloginVerify);