//React
import React, { useState, useEffect } from 'react';

//Material-UI
import { CircularProgress, InputBase, InputAdornment } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

//SnackBar
import { useSnackbar } from 'notistack';

function SearchUsers({ apiUrl, updateData, updateDataOption }) {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [val, setVal] = useState(undefined);
	const [loading, setLoading] = useState(false);

	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();
	
	let cancel;
	let CancelAxios = axios.CancelToken;
	
	const fetchData = async val => {
		try {
			const res = await axios.get(`${apiUrl}${val}?like=true`, {
				cancelToken: new CancelAxios(c=>{
					cancel = c;
				})
			});

			//Verificar existencia de usuarios
			if(res.data.length !== 0) {
				setOptions(res.data);
			}else {
				setOptions([]);
			}
			setLoading(false);
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
	
	//Clear data on close
	useEffect(()=>{
		//Cancelar al cambiar loading
		return () => {
			if (cancel){
				cancel();
			}
		};
	}, [loading]);
	
	//Hacer petición cada vez que cambie el value
	useEffect(()=>{
		//Verificar no null
		if (val){
			//Loading
			setLoading(true);
			
			//Abrir box de busqueda
			setOpen(true);
			
			//Consulta
			fetchData(val);
		}else {
			//Al no tener val ningún valor
			setLoading(false);
		}
		
		return () => {
			if (cancel){
				cancel();
			}

			//Reset de DATA guardada después de cada consulta
			setOptions([]);
		};
	}, [val]);

	const handleClick = user => {
		//Cerrar caja.
		setVal(false);
		setOpen(false);
		setLoading(false);
		setOptions([]);
		
		//Actualizar datos
		if (user !== null) {
			updateData(user, updateDataOption);
		}
	};

	const theme = useTheme();
	
	let darkModeColor = theme.palette.type === 'dark' ? 'AutoComplete--Dark' : '';
	
	return (
		<div className={`AutoComplete ${darkModeColor}`}>
			<Autocomplete
				//Verificar si está loading o no
				loading={loading}
				//Mensajes
				loadingText="Cargando..."
				noOptionsText="Sin resultados"
				//Data a usar para el autocompletado
				options={options}
				onChange={(e, user) => {
					handleClick(user);
				}}
				onInputChange={(e, value) => {
					//Al cambiar el value
					setLoading(true);
					setVal(value);
				}}
				//Texto a mostrar al seleccionar un resultado.
				getOptionSelected={(option, value) => option.privilegio+option.cedula === value}
				//Texto a mostrar al seleccionar un resultado.
				getOptionLabel={option => {
					return `${option.cedula}`;
				}}
				//Renderizar texto en la caja del autocompletado.
				renderOption={option => (
					<div className="searchBoxInfo">
						<span>{option.privilegio + option.cedula}</span>
						<span>{option.name}</span>
					</div>
				)}
				//Verificar si está open o no.
				open={open}
				//Acción al abrir.
				onOpen={() => {
					setOptions([]);
					// setOpen(true);
				}}
				//Acción al cerrar.
				onClose={() => {
					setOpen(false);
					setLoading(false);
				}}
				//Render input.
				renderInput={params => (
					//Se usa el input base porque queda más bonito. xD
					<InputBase
						style={{ padding: '10px', width: '100%' }}
						placeholder="Buscar usuario..."
						inputProps={{
							...params.inputProps,
							type: 'search',
							'aria-label': 'buscar usuario'
						}}
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
						ref={params.InputProps.ref}
					/>
				)}
			/>
		</div>
	);
}

export default SearchUsers;