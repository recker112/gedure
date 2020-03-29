//React
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

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

	useEffect(
		() => {
			//Titulo
			document.title = 'La Candelaria - Panel';

			//Lugar de petición hacia el servidor
			const fetchData = async (key, localData = false) => {
				//QUERY
				try {
					const res = await axios.get('api/relogin', {
						headers: {
							Authorization: `Bearer ${key}`
						}
					});
					
					//TODO OK
					//Update data
					updateDataUser(res.data);

					//Autenticación OK;
					authUpdate(true);

					//Refrescar ACCESS_KEY en los archivos locales
					if (localData) {
						//Datos permanentes.
						localStorage.setItem('key', JSON.stringify(res.data.access_key));
						sessionStorage.setItem('key', JSON.stringify(res.data.access_key));
					} else {
						//Datos de SOLO sesión.
						sessionStorage.setItem('key', JSON.stringify(res.data.access_key));
					}
				} catch (error) {
					const { status } = error.response;
					if (status === 401) {
						enqueueSnackbar('Sesión expirada', {
							variant: 'error'
						});
					} else if (status === 500) {
						enqueueSnackbar('No se ha podido conectar con la base de datos', {
							variant: 'error'
						});
					} else {
						enqueueSnackbar('Error interno en el sistema', {
							variant: 'error'
						});
					}
					
					authUpdate(false);
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
		},
		[autenticate]
	);

	//Verificar auth
	if (auth) {
		//Renderizar contenido
		return <React.Fragment>{children}</React.Fragment>;
	}

	//Verificar si se está autenticando un usuario.
	if (autenticate) {
		return <Loader />;
	}

	//Al no estar verificado.
	clearAllData();
	return <Redirect to={{ pathname: '/' }} />;
}

export function clearAllData() {
	//Limpiar toda la data para solventar errores.
	const theme = localStorage.getItem('theme');
	//Verifivar que la lista no devuelva null
	const dialogList =
		localStorage.getItem('noListStorage') !== null ? localStorage.getItem('noListStorage') : '[]';

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