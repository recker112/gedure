import React, { useState, useEffect } from 'react';

import { Redirect, useLocation } from 'react-router-dom';

import useFetch from './../../hooks/useFetch';

// Components
import { Loader } from '../Routers';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateAuth from '../../actions/updateAuth';
import updateDataUser from '../../actions/updateDataUser';
import logoutApp from '../../actions/logoutApp';

function ReloginComponent(props) {
	const { children } = props;
	const [waitAuth, setWaitAuth] = useState(true);
	
	const { auth, tema } = useSelector(state => ({
		auth: state.userData.auth,
		tema: state.settings.tema,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
  let location = useLocation();
	
	let { from } = location.state || { from: { pathname: "/" } };
	
	useEffect(()=>{
		let cancel = false;
		
		const consult = async (key) =>{
			const prepareDate = {
				type: 'get',
				url: 'v1/relogin',
				data: {
					headers: {
						Authorization: `Bearer ${key}`
					}
				},
				successText: 'Login exitoso'
			}
			
			const response = await fetchData(prepareDate);
			
			setWaitAuth(false);
			
			if (response) {
				response.access_key = key;
				dispatch(updateDataUser(response));
				dispatch(updateAuth(true));
			}else {
				// Eliminame los Stogare ya que la key guardada en ellos no
				// serรกn vรกlidas dentro del servidor.
				dispatch(logoutApp());
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
		
		// eslint-disable-next-line
	},[]);
	
	if (waitAuth) {
		return <Loader theme={tema} />;
	}
	
	if (auth && from.pathname === '/') {
		return <Redirect to='/panel' />;
	} else if (auth && from.pathname !== '/') {
		return <Redirect to={from} />;
	}
	
	return (children);
}

export default ReloginComponent;