import React, { useEffect, useState } from 'react';

//Components
import donwloadFiles from '../../../../components/reutilizar/donwloadFiles';

//Material-UI
import { Button, Grid, Paper } from '@material-ui/core';

//NotiStack
import { useSnackbar } from 'notistack';

function RenderBoletas(){
	// Global Const
	const axios = window.axios;
	
	const [query, setQuery] = useState(true);
	
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();
	
	//Verificar si ya está la query
	useEffect(()=> {
		const fetchData = async () => {
			try{
				let res = await axios.get('api/archivos/boleta', {
					responseType: 'blob'
				});

				// Descargar archivo
				donwloadFiles(res.data, 'boleta', 'pdf');
				
				// Terminar query
				setQuery(false);
			} catch (error) {
				if (error.response){
					//Errores HTTP
					const { status } = error.response;

					if (status === 400) {
						enqueueSnackbar('Su boleta aún no ha sido cargada', {
							variant: 'warning'
						});
					} else if (status === 403) {
						enqueueSnackbar('Tu boleta fue desactivada', {
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
				}else {
					enqueueSnackbar('Error interno en el sistema', {
						variant: 'error'
					});
				}
			}
		}
		
		if (query) {
			fetchData();
		}
	}, [query, setQuery, axios, enqueueSnackbar]);
	
	return (
		<RenderContent query={query} setQuery={setQuery} />
	)
}

function RenderContent({ query, setQuery }) {
	const text = query ? 'Buscando boleta...' : 'Respuesta obtenida';
	
	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} sm={5} md={3}>
				<Paper className="Box">
					<span className="Box__Title">{text}</span>
					<div className="Box__Content">
						<Grid Container spacing={2} justify="center">
							{!query && (
								<Grid item xs={12} style={{textAlign: 'center'}}>
									<Button 
										variant='outlined' 
										color='inherit' 
										onClick={() => {
											setQuery(true);
										}}
										style={{marginTop: '20px'}}
									>
										Reintentar
									</Button>
								</Grid>
							)}
						</Grid>
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default RenderBoletas;