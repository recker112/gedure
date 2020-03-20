//React
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

//Material-UI
import { Backdrop } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import updateDataUser from '../actions/login/updateDataUser';
import reloginSuccess from '../actions/login/reloginSuccess';

//SnackBar
import { useSnackbar } from 'notistack';

//Componentes
import { Loader } from '../views/Routers';
import authUpdate from '../actions/login/authUpdate';

function ReloginVerify({
  auth,
  checkbox,
  loginSI,
  updateDataUser,
  reloginSuccess,
  redirect,
  children,
  access_key,
  authUpdate
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [autenticate, setAutenticate] = useState(true);

  useEffect(() => {
    //Titulo
    document.title = 'La Candelaria - Panel';

    //Lugar de petición hacia el servidor
    const fetchData = async (key, localData = false) => {
      console.log("Consulta");
      //QUERY
      try {
        const res = await axios.get('api/relogin', {
          headers: {
            Authorization: `Bearer ${key}`
          }
        });

        //Otras verificaciones

        //TODO OK
        //Destructing
        const { dataUser } = res.data;

        //Update data
        updateDataUser(dataUser);

        //Autenticación OK;
        authUpdate(true);

        //Refrescar ACCESS_KEY en los archivos locales
        if (localData) {
          //Datos permanentes.
          localStorage.setItem('key', JSON.stringify(dataUser.access_key));
          sessionStorage.setItem('key', JSON.stringify(dataUser.access_key));
        } else {
          //Datos de SOLO sesión.
          sessionStorage.setItem('key', JSON.stringify(dataUser.access_key));
        }
      } catch (error) {
        // Error
        if (error.response) {
          const { status } = error.response;

          if (status === 401) {
            enqueueSnackbar('Sesión expirada', {
              variant: 'error'
            });
            authUpdate(false);
          }
        } else {
          enqueueSnackbar('Error interno en el sistema', {
            variant: 'error'
          });
        }
      }

      //Quitar autenticación
      setAutenticate(false);

      //Redirect reset
      reloginSuccess(false);
    };

    let CanselaSHION = false;

    if (!CanselaSHION) {
      //console.log('Contador los render');

      //Verificar login desde el FORM
      if (loginSI && autenticate) {
        //Verificar checkbox para guardar datos.
        // console.log("KEY seteada");
        if (checkbox) {
          //Datos permanentes.
          localStorage.setItem('key', JSON.stringify(access_key));
          sessionStorage.setItem('key', JSON.stringify(access_key));
        } else {
          //Datos de SOLO sesión.
          sessionStorage.setItem('key', JSON.stringify(access_key));
        }

        //Cambiar autenticate estado
        setAutenticate(false);
      } else if (!auth && autenticate) {
        //Verificar si el usuario no está autenticado por el
        //sistema y si poseé los datos suficientes para
        //entrar.
        const keyL = JSON.parse(localStorage.getItem('key'));
        const keyS = JSON.parse(sessionStorage.getItem('key'));

        //Verificar primero si existe key local.
        if (typeof keyL === 'string') {
          fetchData(keyL, true);
        } else if (typeof keyS === 'string') {
          fetchData(keyS);
        } else {
          //Quitar autenticación al no poseer datos.
          setAutenticate(false);
        }
      } else if (auth) {
        //No hacer nada, ya que el usuario está autenticado
      }
    }

    //Al desmontar componente
    return () => {
      CanselaSHION = true;
    };
  }, [autenticate]);

  //Verificar auth
  if (auth) {
    //Renderizar contenido
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  //Verificar si se está autenticando un usuario.
  if (autenticate) {
    return <Loader />;
  }

  //Al no estar verificado.
  clearAllData();
  return  <Redirect to={{pathname: '/'}} />;
}

function LoadingVerifyRelogin() {
  setTimeout(() => {
    document.getElementById('redirectToLogin').click();
  }, 4000);
  return (
    <Backdrop open={true}>
      <div className="VerifyReloginDiv">
        <h1>Fallo al intentar loguear</h1>
        <p>
          A ocurrido un fallo al intertar acceder al panel, para
					solucionar este inconveniente de click{' '}
          <Link id="redirectToLogin" onClick={clearAllData} to="/">
            aquí
		  </Link>{' '}
          si no es redirijido automáticamente.
				</p>
      </div>
    </Backdrop>
  );
}

export function clearAllData() {
  //Limpiar toda la data para solventar errores.
  const theme = localStorage.getItem('theme');
  //Verifivar que la lista no devuelva null
  const dialogList = localStorage.getItem('noListStorage') !== null ? localStorage.getItem('noListStorage') : "[]";

  localStorage.clear();
  sessionStorage.clear();

  //Para mantener la configuración del usuario.
  localStorage.setItem('theme', theme);
  localStorage.setItem('noListStorage', dialogList);
}

//REDUX
const mapStateToProps = state => ({
  auth: state.loginStatus.auth,
  checkbox: state.dataLogin.checkbox,
  loginSI: state.loginStatus.loginSI,
  redirect: state.loginStatus.redirect,
  access_key: state.userData.access_key
});

const mapDispatchToProps = {
  updateDataUser,
  reloginSuccess,
  authUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(ReloginVerify);
