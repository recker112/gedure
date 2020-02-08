//React
import React from 'react';
import { Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../store/action/login/updateInputValue';
import updateValidating from '../../store/action/login/updateValidating';
import openAlert from '../../store/action/alerts/openAlerts';

//Compoentes
import RenderForm from './RenderForm';
import { consultAjax } from '../../reutilizar/ajaxConsult';
import updateDataUser from '../../store/action/login/updateDataUser';
import loginSinceFormSuccess from '../../store/action/login/loginSinceFormSuccess';

function Form({
  updateInputValue, 
  updateValidating, 
  openAlert,
  auth,
  updateDataUser,
  loginSinceFormSuccess,
}) {
  const handleChange = (e) => {
    // enviar input al store para actualizar states
    updateInputValue(e);
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
    let res = await consultAjax("https://my-json-server.typicode.com/recker112/candelariaweb/login");
    if (res !== 'no_connect'){

      //Opciones de respuesta del servidor.
      if (true) {
        openAlert(
          'Login exitoso!!',
          'success',
          true
        )

        //Boceto de datos a guardar.
        const dataTest = {
          cedula: 'A-28432441',
          cedulaSin: '28432441',
          name: 'Recker ortiz',
          curso: '',
          seccion: '',
          nota: '',
          horario: '',
          profeGuia: '',
          privilegio: 'A-',
          avatar: 'reckerSITO',
          token: 'testDATA47',
        }

        //Al estar todo correcto el servidor DEBE regresar los
        //datos de usuario, los cuales se cargarán con 
        //"updateDataUser"
        updateDataUser(dataTest);

        //Una vez terminado de actualizar losd atos, se procede a
        //decirle a la APP que se realizó un login correctamente.
        loginSinceFormSuccess();
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
  if (auth) {
    return (
      <Redirect to={{
        pathname: '/panel',
        state: {
          auth: true
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
  auth: state.loginStatus.auth
})

const mapDispatchToProps = {
  updateInputValue,
  updateValidating,
  openAlert,
  updateDataUser,
  loginSinceFormSuccess,
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);