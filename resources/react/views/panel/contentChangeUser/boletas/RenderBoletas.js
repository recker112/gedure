import React, { useEffect, useState } from 'react';

//Components
import donwloadFiles from '../../../../components/reutilizar/donwloadFiles';

//Material-UI
import { Button } from '@material-ui/core';

//NotiStack
import { useSnackbar } from 'notistack';

function RenderBoletas(){
	const [query, setQuery] = useState(false);
	
	let cancel = false;
	
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();
	
	const fetchData = async () => {
		try{
			let res = await axios.get('api/archivos/boleta', {
				responseType: 'blob'
			});
			
			//Descargar archivo
			donwloadFiles(res.data, 'boleta', 'pdf');
			
			enqueueSnackbar('Descargando boleta', {
				variant: 'info'
			});
			
			if (!cancel) {
				setQuery(true);
			}
		} catch (error) {
			const { status, data } = error.response;

			if (status === 400) {
				enqueueSnackbar('Su boleta aún no ha sido cargada', {
					variant: 'warning'
				});
			} else if (status === 403) {
				enqueueSnackbar('No estás autorizado', {
					variant: 'error'
				});
			} else if (status === 422) {
				enqueueSnackbar('El servidor rechazó tu solicitud', {
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
		}
		
		if (!cancel) {
			setQuery(true);
		}
	}
	
	//Verificar si ya está la query
	useEffect(()=> {
		if (!query) {
			fetchData();
		}
		
		return () => {
			cancel = true;
		}
	}, [query, cancel, setQuery]);
	
	if (!query){
		return (
			<h1>Buscando boleta...</h1>
		)
	}
	
	return (
		<React.Fragment>
			<h1>Respuesta obtenida.</h1>
			<Button variant='outlined' color='inherit' onClick={() => {
					setQuery(false);
				}}>
				Click aquí para re-intentar
			</Button>
		</React.Fragment>
	)
}

export default RenderBoletas;