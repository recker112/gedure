//React
import React, { useState, useEffect } from 'react';

//redux
import { connect } from 'react-redux';
import updateDataUser from '../../actions/login/updateDataUser';
import authUpdate from '../../actions/login/authUpdate';
import logout from '../../actions/login/logout';

//React Router
import { useHistory, useLocation } from 'react-router-dom';

//Componentes
import { Loader } from '../Routers';

//SnackBar
import { useSnackbar } from 'notistack';

function VerifyRelogin({ 
	children, 
	auth, 
	checkbox, 
	updateDataUser,
	authUpdate,
	logout
}) {
	
	//Notistack
	const { enqueueSnackbar } = useSnackbar();

	//Auntenticate Waiting
	const [waitingAuth, setWaitingAuth] = useState(true);
	
	//RedirectInRelogin
	const [redirect, setRedirect] = useState(false);
	
	//React Router
	let history = useHistory();
  let location = useLocation();
	
	//Cancel
	let cancel = false;
	
	//Seleccionar from
	let { from, protect } = location.state || { 
		from: { pathname: "/" }, protect: false  };
	
	//Lugar de petición hacia el servidor
	const fetchData = async (key, localData = false) => {
		//QUERY
		try {
			const res = await axios.get('api/relogin', {
				headers: {
					Authorization: `Bearer ${key}`
				}
			});
			
			//Update data
			updateDataUser(res.data);

			//Refrescar ACCESS_KEY en los archivos locales
			if (localData) {
				//Datos permanentes.
				localStorage.setItem('key', JSON.stringify(res.data.access_key));
				sessionStorage.setItem('key', JSON.stringify(res.data.access_key));
			} else {
				//Datos de SOLO sesión.
				sessionStorage.setItem('key', JSON.stringify(res.data.access_key));
			}
			
			//Redirect
			setRedirect(true);
			
			//Autenticación OK;
			authUpdate(true);
			
			//Redireccionar al venir de un relogin
			if (from.pathname !== '/' && from.pathname !== '/login') {
				//Redireccionar
				history.replace(from);
			}else {
				//Redireccionar
				history.replace('/panel');
			}
		} catch (error) {
			const { status } = error.response || { status: "error" };
			
			if (status === 401) {
				enqueueSnackbar('Sesión expirada', {
					variant: 'error'
				});
			} else if (status === 500) {
				enqueueSnackbar('Error interno del servidor', {
					variant: 'error'
				});
			} else {
				enqueueSnackbar('Error interno en el sistema', {
					variant: 'error'
				});
			}

			//Limpiar todos los datos si ocurre algún error
			logout();
		}

		if (!cancel){
			//Quitar autenticación
			setWaitingAuth(false);
		}
	};
	
	//Verificar datos
	useEffect(()=>{
		//AccessKey
		const keyL = JSON.parse(localStorage.getItem('key'));
		const keyS = JSON.parse(sessionStorage.getItem('key'));
		
		//Verificar KEYS
		if (!auth && typeof keyL === 'string' && keyL.length > 0) {
			fetchData(keyL, true);
		} else if (!auth && typeof keyS === 'string' && keyS.length > 0) {
			fetchData(keyS, false);
		}else {
			//Quitar waiting
			setWaitingAuth(false);
		}
		
		return ()=>{
			cancel = true;
		}
	}, [waitingAuth]);
	
	//Verificar si se está autenticando
	if (waitingAuth) {
		return (<Loader />);
	}
	
	//Verificar si está autenticado y viene del login
	if (auth && !redirect) {
		//Redireccionar
		history.replace('/panel');
	}
	
	return (
		children
	);
}

//REDUX
const mapStateToProps = state => ({
	auth: state.loginStatus.auth,
	checkbox: state.dataLogin.checkbox,
});

const mapDispatchToProps = {
	updateDataUser,
	authUpdate,
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyRelogin);