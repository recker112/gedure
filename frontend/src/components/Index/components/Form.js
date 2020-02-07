//React
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import updateUserInfo from '../../store/action/updateUserInfo';
import updateValidating from '../../store/action/updateValidating';
import openAlert from '../../store/action/openAlerts';

//Compoentes
import RenderForm from './RenderForm';
import { consultAjax } from '../../reutilizar/ajaxConsult';

function Form({
  updateUserInfo, 
  updateValidating, 
  openAlert,
  dataLogin,
}) {
  //State para verificar si se inició sesión o NEL.
  const [loginIs, setLoginIs] = useState(false);

  const handleChange = (e) => {
    // enviar input al store para actualizar states
    updateUserInfo(e);
  }

  const handleSubmit = (e) => {
    //Preparativos
    e.preventDefault();
    updateValidating(true);

    //Evitar que el usuario cambie de ruta para así
    //evitar que el componente se desmonte y pueda causar
    //algún daño.
    document.querySelectorAll('.headerNoPanel button').forEach((element) => {
      element.disabled = true;
    });

    //Consulta
    setTimeout(getConsult, 2000);
  }

  const getConsult = async () => {
    let res = await consultAjax("http://echo.jsontest.com/pass/jenn/user/recker");
    if (res.user === dataLogin.user && res.pass === dataLogin.pass){
      if (true) {
        //res.user === DataForm.user && res.pass === DataForm.pass
        openAlert(
          'Login exitoso!!',
          'success'
        )
        //Recuerda poner las actualizaciones de los state al final,
        //ya que con cada update esto referesca el render().
        setLoginIs(true);
      }else {
        openAlert(
          'Usuario y/o contraseña incorrecta',
          'error'
        )
      }
    }else {
      openAlert(
        'No se pudo conectar con el servidor.',
        'error',
        true
      )
    }
    

    //Reactivando botones.
    document.querySelectorAll('.headerNoPanel button').forEach((element) => {
      element.disabled = false;
    });

    updateValidating(false);
  }

  //Verificar si se redireccionará o no.
  if (loginIs) {
    return (
      <Redirect to={{
        pathname: '/panel',
        state: {
          loginIs: true
        }
      }} />
    )
  }else {
    return (
      <RenderForm options={{handleChange, handleSubmit}} />
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.dataLogin,
})

const mapDispatchToProps = {
  updateUserInfo,
  updateValidating,
  openAlert,
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);