import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Loader } from '../Routers';
import useFetch from './../../hooks/useFetch';

import { connect } from 'react-redux';
import updateDataUser from './../../actions/updateDataUser';
import updateAuth from './../../actions/updateAuth';
import logoutApp from './../../actions/logoutApp';

function ReloginComponent(props) {
	const { children, auth, theme, updateDataUser, updateAuth, access_key, logoutApp } = props;
	const [waitAuth, setWaitAuth] = useState(true);
	const { fetchData } = useFetch();
	
	let history = useHistory();
  let location = useLocation();
	
	//Seleccionar from
	let { from } = location.state || { from: { pathname: "/" } };
	
	useEffect(()=>{
		let cancel = false;
		
		const consult = async (key) =>{
			const prepareDate = {
				url: 'v1/relogin',
				data: {
					headers: {
						Authorization: `Bearer ${key}`
					}
				},
				successText: 'Login exitoso',
				type: 'get'
			}
			
			const response = await fetchData(prepareDate);
			
			setWaitAuth(false);
			
			if (response) {
				response.access_key = key;
				updateDataUser(response);
				updateAuth(true);
			}else {
				// Eliminame los Stogare ya que la key guardada en ellos no
				// es vรกlida dentro del servidor.
				updateAuth(false);
				logoutApp();
			}
		}
		
		//AccessKey
		const keyL = JSON.parse(localStorage.getItem('access_key'));
		const keyS = JSON.parse(sessionStorage.getItem('access_key'));
		
		if (!auth && waitAuth && typeof keyS === 'string' && keyS.length > 30) {
			consult(keyS);
		}else if (!auth && waitAuth && typeof keyL === 'string' && keyL.length > 30) {
			consult(keyL);
		}else {
			if (!cancel){
				setWaitAuth(false);
			}
		}
		
		return ()=>{
			cancel = true;
		}
	}, [auth, access_key, fetchData, updateDataUser, updateAuth, waitAuth, logoutApp]);
	
	if (waitAuth) {
		return <Loader theme={theme} />;
	}
	
	if (auth && from.pathname === '/') {
		history.push('/panel');
	} else if (auth && from.pathname !== '/') {
		history.replace(from);
	}
	
	return children;
}

//REDUX
const mapStateToProps = state => ({
	auth: state.userData.auth,
	theme: state.settings.tema,
	access_key: state.userData.access_key
});

const mapDispatchToProps = {
	updateDataUser,
	updateAuth,
	logoutApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReloginComponent);