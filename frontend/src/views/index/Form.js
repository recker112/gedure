//React
import React from 'react';
import { Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../actions/login/updateInputValue';
import updateValidating from '../../actions/login/updateValidating';

//Compoentes
import RenderForm from './RenderForm';
import { consultAjax } from '../../components/reutilizar/ajaxConsult';
import updateDataUser from '../../actions/login/updateDataUser';
import loginSinceFormSuccess from '../../actions/login/loginSinceFormSuccess';

//SnackBar
import { useSnackbar } from 'notistack';
import errorEmptyLogin from '../../actions/login/errorEmptyLogin';

function Form({ updateInputValue, updateValidating, auth, updateDataUser, loginSinceFormSuccess, errorEmptyLogin, user, pass }) {
  //Crear un SnackBar
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = e => {
    // enviar input al store para actualizar states
    updateInputValue(e);
  };

  const handleSubmit = (e) => {
    //Preparativos
    e.preventDefault();
    let error=false;

    //Evitar que el usuario cambie de ruta para así
    //evitar que el componente se desmonte y pueda causar
    //algún daño.
    document.querySelectorAll('.headerNoPanel button').forEach(element => {
      element.disabled = true;
    });

    //Verificar datos
    if (user.length === 0) {
      //Empty
      errorEmptyLogin("user", "Campo obligatorio");
      error=true;
    }else if (user.length < 4) {
      //No valid cédula
      errorEmptyLogin("user", "Cédula no válida");
      error=true;
    }

    if (pass.length === 0) {
      //Empty
      errorEmptyLogin("pass", "Campo obligatorio");
      error=true;
    }else if (pass.length < 4) {
      //No valid pass
      errorEmptyLogin("pass", "Contraseña no válida");
      error=true;
    }

    //Verificar errores
    if (error) {
      //Reactivando botones.
      document.querySelectorAll('.headerNoPanel button').forEach(element => {
        element.disabled = false;
      });
      return null
    }

    //Loading
    updateValidating(true);
    //Consulta
    setTimeout(getConsult, 2000);
  };

  const getConsult = async () => {
    let res = await consultAjax(
      'https://my-json-server.typicode.com/recker112/candelariaweb/login'
    );
    if (res !== 'no_connect') {
      //Opciones de respuesta del servidor.
      if (true) {
        console.log(res);

        //Add SnackBar
        enqueueSnackbar('Login exitoso', {
          variant: 'success'
        });

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
          token: 'testDATA47'
        };

        //Al estar todo correcto el servidor DEBE regresar los
        //datos de usuario, los cuales se cargarán con
        //"updateDataUser"
        updateDataUser(dataTest);

        //Una vez terminado de actualizar los datos, se procede a
        //decirle a la APP que se realizó un login correctamente.
        loginSinceFormSuccess();
      }
    } else {
      enqueueSnackbar('No se pudo conectar con el servidor', {
        variant: 'error'
      });
    }

    //Reactivando botones.
    document.querySelectorAll('.headerNoPanel button').forEach(element => {
      element.disabled = false;
    });

    updateValidating(false);
  };

  //Verificar si se redireccionará o no.
  if (auth) {
    return (
      <Redirect
        to={{
          pathname: '/panel'
        }}
      />
    );
  } else {
    return <RenderForm options={{ handleChange, handleSubmit }} />;
  }
}

const mapStateToProps = state => ({
  auth: state.loginStatus.auth,
  user: state.dataLogin.user,
  pass: state.dataLogin.pass,
  error: state.dataLogin.error,
});

const mapDispatchToProps = {
  updateInputValue,
  updateValidating,
  updateDataUser,
  loginSinceFormSuccess,
  errorEmptyLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);