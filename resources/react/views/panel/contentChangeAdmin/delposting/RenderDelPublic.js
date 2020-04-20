//React
import React, { useState, useEffect } from 'react';

//Material-UI
import { Grid, Paper, CircularProgress, InputBase, InputAdornment, Chip, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Component
import { RenderSelect } from '../../../../components/RendersGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';
import updateLoading from '../../../../actions/updateLoading';

//NotiStack
import { useSnackbar } from 'notistack';

function RenderPublicar({ data, updateValue, updateLoading }) {
	
	const { option, id, loading } = data;

	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();
	
	const fetchData = async () => {
		try {
			let res;
			
			if (option === 'noticia') {
				res = await axios.delete(`api/news/${JSON.stringify(id)}?jsonSend=true`);
			}else {
				res = await axios.delete(`api/anuncios/${JSON.stringify(id)}?jsonSend=true`);
			}
			
			const { description } = res.data;
			
			enqueueSnackbar(description, {
				variant: 'success'
			});
			
			//Clear chips and reset autoComplete
			const e = {
				target: {
					name: 'id',
					value: []
				}
			}
			
			updateValue(e, 'DEL_POSTING');
		} catch (error) {
			
			if (error.response){
				//Errores HTTP
				const { status, data } = error.response;

				if (status === 400) {
					enqueueSnackbar(data.description, {
						variant: 'warning'
					});
				} else if (status === 403) {
					enqueueSnackbar(data.description, {
						variant: 'error'
					});
				} else if (status === 422) {
					enqueueSnackbar(data.description, {
						variant: 'error'
					});
				} else if (status === 500) {
					enqueueSnackbar('No se ha podido conectar con la base de datos', {
						variant: 'error'
					});
				} else {
					enqueueSnackbar('Error interno en el servidor', {
						variant: 'error'
					});
				}
			}else {
				enqueueSnackbar('Error interno en el sistema', {
					variant: 'error'
				});
			}
		}
		
		//Revertir loading
		updateLoading(false, 'DEL_POSTING');
	}
	
	const handleChange = e => {
		updateValue(e, 'DEL_POSTING');
	};

	const handleSubmit = e => {
		//Preparativos
		e.preventDefault();
		let errorStatus = false;

		//Verificar datos
		if (id.length <= 0) {
			enqueueSnackbar('Debe seleccionar algún post', {
				variant: 'error'
			});
			errorStatus = true;
		}
		
		if (errorStatus) {
			return null;
		}
		
		updateLoading(true, 'DEL_POSTING');
		fetchData();
	};

	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} sm={5} md={3}>
				<Paper variant="outlined">
					<SelectorDelPublicar action={handleChange} value={option} />
				</Paper>
			</Grid>
			<Grid item xs={12} sm={10}>
				<Paper variant="outlined">
					<div className="Box">
						<div className="content">
							<form 
								autoComplete="off"
								onSubmit={handleSubmit}
								method="GET"
								style={{ marginTop: '0' }}
							>
								<Grid container spacing={2} justify="center">
									<Grid item xs={12}>
										<SearchPost 
											option={option} 
											enqueueSnackbar={enqueueSnackbar} 
											handleChange={handleChange}
											value={id}
										/>
									</Grid>
									<Grid item xs={12} style={{ textAlign: 'center' }}>
										<ButtonLoading 
											estilo="outlined" 
											colorsito="inherit" 
											text="Eliminar" 
											loading={loading}
										/>
									</Grid>
								</Grid>
							</form>
						</div>
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
}

function SelectorDelPublicar({ action, value }) {
	//Config de opciones
	const delPostingSelect = {
		name: 'option',
		values: [
			{
				value: 'noticia',
				name: 'Noticia'
			},
			{
				value: 'anuncio',
				name: 'Anuncio'
			}
		]
	};

	return (
		<div className="Box">
			<span className="title">Eliminar publicación</span>
			<div className="content">
				<RenderSelect
					action={action}
					val={value}
					data={delPostingSelect}
					classNameSet="select"
					customWidth="auto"
					empty={false}
				/>
			</div>
		</div>
	);
}

function SearchPost({ option, enqueueSnackbar, handleChange, value }) {
	//Autocomplete vars
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;
	const textSearch = option === 'noticia' ? 'noticias' : 'anuncios';
	const textLabel = option === 'noticia' ? 'Noticia' : 'Anuncio';
	
	//AUTOCOMPLEtE AGARRANDO TODO LOS DAToS DE UNA
	//Buscar DATA
	useEffect(
		() => {
			let cancel;
			let CancelAxios = axios.CancelToken;
			
			const fetchData = async () => {
				try {
					let res;
					
					if (option === 'noticia') {
						res = await axios.get('api/news/search', {
							cancelToken: new CancelAxios(c=>{
								cancel = c;
							})
						});
					}else {
						res = await axios.get('api/anuncios/search', {
							cancelToken: new CancelAxios(c=>{
								cancel = c;
							})
						});
					}

					if (res.data.length === 0){
						enqueueSnackbar('No has publicado nada aún', {
							variant: 'info'
						});
					}
					
					setOptions(res.data);
				} catch (error) {
					if (axios.isCancel(error)){
						//Mensaje al cancelar peticion
					}else {
						if (error.response){
							//Errores HTTP
							const { status, data } = error.response;
							
							if (status === 403) {
								enqueueSnackbar(data.description, {
									variant: 'error'
								});
							}if (status === 401) {
								enqueueSnackbar('No estás autorizado', {
									variant: 'error'
								});
							} else if (status === 500) {
								enqueueSnackbar('No se ha podido conectar con la base de datos', {
									variant: 'error'
								});
							} else {
								enqueueSnackbar('Error interno en el servidor', {
									variant: 'error'
								});
							}
						}else {
							enqueueSnackbar('Error interno en el servidor', {
								variant: 'error'
							});
						}
					}
				}
			};
			
			//Realizar consulta
			if(loading) {
				fetchData();
			}
			
			//Al cancelar
			return () => {
				if (cancel){
					cancel();
				}
			};
		},
		[loading]
	);
	
	//Clear data affter change the option
	useEffect(()=> {
		return ()=> {
			setOptions([]);
			
			const e = {
				target: {
					name: 'id',
					value: []
				}
			}

			handleChange(e);
		}
	}, [option])
	
	//Clear data affter query delete
	useEffect(()=> {
		if (value.length === 0) {
			setOptions([]);
		}
	},[value])
	
	const handleClick = deleteTHIS => {
		const e = {
			target: {
				name: 'id',
				value: deleteTHIS
			}
		}
		
		handleChange(e);
	}
	
	return (
		<div className="autoComplete">
			<Autocomplete
				//Verificar si está loading o no
				loading={loading}
				value={value}
				multiple
				//Mensajes
				loadingText="Cargando..."
				noOptionsText="Sin resultados"
				//Data a usar para el autocompletado
				options={options}
				onChange={(e, deleteTHIS) => {
					handleClick(deleteTHIS);
				}}
				//Texto a mostrar al seleccionar un resultado.
				getOptionLabel={option => `${textLabel} #${option.id}`}
				//Renderizar texto en la caja del autocompletado.
				renderOption={option => `${textLabel} #${option.id}`}
				//Verificar si está open o no.
				open={open}
				//Acción al abrir.
				onOpen={() => {
					setOpen(true);
				}}
				//Acción al cerrar.
				onClose={() => {
					setOpen(false);
				}}
				//Render input.
				renderInput={params => (
					//Se usa el input base porque queda más bonito. xD
					<TextField
            {...params}
            variant="outlined"
            label={`Seleccionar ${textSearch}`}
						startAdornment={
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						}
						endAdornment={
							<InputAdornment position="end">
								{loading ? <CircularProgress color="inherit" size={30} /> : <div />}
							</InputAdornment>
						}
          />
				)}
			/>
		</div>
	);
}

//Redux
const mapStateToProps = state => ({
	data: state.panelSettings.delPostingSection
});

const mapDispatchToProps = {
	updateLoading,
	updateValue
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderPublicar);