import { useSnackbar } from 'notistack';

import { useDispatch } from "react-redux";
import logoutApp from './../actions/logoutApp';

function useFetch(){
	const axios = window.axios;
	
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	
	const fetchData = async (prepareData)=>{
		const { 
			url, 
			data=null, 
			successText=false, 
			type='post', 
			variant='success' 
		} = prepareData;
		
		try {
			let res;
			
			if (type === 'post') {
				res = await axios.post(url, data);
			}else if (type === 'get') {
				res = await axios.get(url, data);
			}
			
			enqueueSnackbar(successText ? successText : res.data.description, {
				variant: variant
			});
			
			return res.data;
		} catch (error) {
			if (error.response){
				//Errores HTTP
				const { status, data } = error.response;

				if (status === 403){
					enqueueSnackbar(data.description, {
						variant: 'error'
					});
				}else if (status === 400){
					enqueueSnackbar(data.description, {
						variant: 'warning'
					});
				}else if (status === 401){
					enqueueSnackbar('Sesión expirada', {
						variant: 'info'
					});
					
					dispatch(logoutApp());
				}else if (status === 403){
					enqueueSnackbar('No tienes permisos para esta acciรณn', {
						variant: 'error'
					});
				}else if (status === 500){
					enqueueSnackbar('No se ha podido conectar con la base de datos', {
						variant: 'error'
					});
				}else {
					enqueueSnackbar('Error interno en el servidor', {
						variant: 'error'
					});
				}
			}else {
				enqueueSnackbar('Error interno en el sistema', {
					variant: 'error'
				});
			}
			
			return false;
		}
	}
	
	return { fetchData };
}

export default useFetch;