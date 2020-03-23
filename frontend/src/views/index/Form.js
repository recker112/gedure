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
      const waitSeconds = res.data.wait ? res.data.wait : 0;

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

      [
          {
              //Verificar credenciales
              type: 'credentials_error',
              message: 'Usuario y/o contraseña incorrecta',
              status: 'warning'
          },
          {
              //Privilegio no encontrado en el servidor
              type: 'not_found_privilegio',
              message: 'No se pudo encontrar el usuario en el sistema',
              status: 'error'
          },
          {
              //Cuenta bloqueada permanentemente
              type: 'max_locks',
              message: 'Comuniquese con un administrador para reactivar la cuenta',
              status: 'warning'
          },
          {
              //Cuenta bloqueada
              type: 'account_lock',
              message: `Cuenta bloqueada, espere ${waitSeconds}s`,
              status: 'warning'
          },
          {
              //Cuenta bloqueada por primera vez.
              type: 'account_block',
              message: 'Cuenta bloqueada, espere 5 minutos',
              status: 'warning'
          },
          {
              //Cuenta bloqueada permanentemente
              type: 'perma_block',
              message: 'Tu cuenta fue bloqueada permanentemente',
              status: 'warning'
          },
          {
              //Cuenta bloqueada permanentemente
              type: 'check_credentials',
              message: 'Revisa tus datos, los sigues poniendo mal',
              status: 'warning'
          },
      ].map((item)=>{
          if (msg === item.type) {
            enqueueSnackbar(item.message, {
                variant: item.status
            });
            throw item.type;
          }
          return null;
      })

      //Verificar bloqueo
      if (msg === 'max_locks') {
        enqueueSnackbar('La cuenta está bloqueada permanentemente', {
          variant: 'warinig'
        });
        throw "max_locks";
      }

      //Verificar bloqueo
      if (msg === 'max_locks') {
        enqueueSnackbar('La cuenta está bloqueada permanentemente', {
          variant: 'warinig'
        });
        throw "max_locks";
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
      updateDataUser({ ...dataUser });

      //Una vez terminado de actualizar los datos, se procede a
      //decirle a la APP que se realizó un login correctamente.
      loginSinceFormSuccess();

      //Add SnackBar
      enqueueSnackbar('Login exitoso', {
        variant: 'success'
      });
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if (status === 500) {
          enqueueSnackbar('No se ha podido conectar con la base de datos', {
            variant: 'error'
          });
        } else {
          enqueueSnackbar('Error interno en el sistema', {
            variant: 'error'
          });
        }
      }
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
