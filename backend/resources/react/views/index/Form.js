//React
import React from 'react';
import { Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../actions/updateInputValue';
import updateLoading from '../../actions/updateLoading';
import errorInfo from '../../actions/errorInfo';

//Compoentes
import RenderForm from './RenderForm';
import updateDataUser from '../../actions/login/updateDataUser';
import loginSinceFormSuccess from '../../actions/login/loginSinceFormSuccess';

//SnackBar
import { useSnackbar } from 'notistack';

function Form({ updateInputValue, updateLoading, auth, updateDataUser, loginSinceFormSuccess, dataLogin, errorInfo }) {
  //Destructing
  const { user, pass, checkbox } = dataLogin;
  //Crear un SnackBar
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = e => {
    // enviar input al store para actualizar states
    updateInputValue(e, "LOGIN");
  };

  const handleSubmit = (e) => {
    //Preparativos
    e.preventDefault();
    let error = false;

    //Evitar que el usuario cambie de ruta para así
    //evitar que el componente se desmonte y pueda causar
    //algún daño.
    document.querySelectorAll('.headerNoPanel button').forEach(element => {
      element.disabled = true;
    });

    //Verificar datos
    [{ value: user, name: "user" }, { value: pass, name: "pass" }].map((input) => {
      if (input.value.length === 0) {
        //Empty
        errorInfo(input.name, "Campo obligatorio", "LOGIN");
        error = true;
      } else if (input.value.length < 4) {
        //No valid cédula
        errorInfo(input.name, "No válido", "LOGIN");
        error = true;
      }
      return null;
    });

    //Verificar errores
    if (error) {
      //Reactivando botones.
      document.querySelectorAll('.headerNoPanel button').forEach(element => {
        element.disabled = false;
      });
      return null
    }

    //Loading
    updateLoading(true, "LOGIN");
    //Consulta
    getConsult();
  };

  const getConsult = async () => {
    //Probar resultados
    try {
      //Consulta
      const res = await axios.post('api/login', { user: user, pass: pass, checkbox: checkbox });

      //Destructing
      const { status, smg, msg } = res.data;

      //Verificar que el status de la consulta sea 200.
      if (res.status !== 200) {
        if (res.status === 422) {
          enqueueSnackbar('El servidor rechazó su solicitud', {
            variant: 'error'
          });
          throw "server_refused";
        } else {
          enqueueSnackbar('No se pudo conectar con el servidor', {
            variant: 'error'
          });
          throw "no_connect";
        }
      }

      //Verificar credenciales
      if (msg === 'credentials_error') {
        enqueueSnackbar('Usuario y/o contraseña incorrecta', {
          variant: 'warning'
        });
        throw "credentials_error";
      }

      //Verificar privilegio existente
      if (msg === 'not_found_privilegio') {
        enqueueSnackbar('No se pudo encontrar el usuario en el sistema', {
          variant: 'error'
        });
        throw "not_found_privilegio";
      }

      //Verificar que todo vaya bien.
      if (status !== 'ok') {
        enqueueSnackbar('Error interno en el sistema', {
          variant: 'error'
        });
      }

      const { dataUser } = res.data;

      //Al estar todo correcto el servidor DEBE regresar los
      //datos de usuario, los cuales se cargarán con
      //"updateDataUser"
      updateDataUser({...dataUser});

      //Una vez terminado de actualizar los datos, se procede a
      //decirle a la APP que se realizó un login correctamente.
      loginSinceFormSuccess();

      //Add SnackBar
      enqueueSnackbar('Login exitoso', {
        variant: 'success'
      });
    } catch (error) {
      console.log(error);
    }

    //Reactivando botones.
    document.querySelectorAll('.headerNoPanel button').forEach(element => {
      element.disabled = false;
    });

    updateLoading(false, "LOGIN");
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
  dataLogin: state.dataLogin,
});

const mapDispatchToProps = {
  updateInputValue,
  updateLoading,
  updateDataUser,
  loginSinceFormSuccess,
  errorInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
