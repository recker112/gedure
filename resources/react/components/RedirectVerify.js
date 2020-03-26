//React
import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import reloginSuccess from '../actions/login/reloginSuccess';

function RedirectVerify({redirect, reloginSuccess, children}) {
  useEffect(() => {
		let cancelar = false;//Se crea una variable la cual cancele TODO
    //el useEffect, esto es para cuando se desmonte el componente
    //y así evitar problemas.

    if (!cancelar) {//Encierra todas las funciones.
      //Algoritmos para verificar el LOGIN
      const keyL = JSON.parse(localStorage.getItem("key"));
      const keyS = JSON.parse(sessionStorage.getItem("key"));

      if (typeof keyL === 'string' || typeof keyS === 'string'){
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
  if (redirect){
    return (
      <Redirect to={{
        pathname: '/panel'
      }} />
    )
  }

  return (
    <div>
      {children}
    </div>
  );
}

const mapStateToProps = (state) => ({
  redirect: state.loginStatus.redirect
})

const mapDispatchToProps = {
  reloginSuccess,
}

export default connect(mapStateToProps,mapDispatchToProps)(RedirectVerify);
