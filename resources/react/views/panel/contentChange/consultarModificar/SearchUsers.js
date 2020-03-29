//React
import React, { useState, useEffect } from 'react';

//Material-UI
import { CircularProgress, InputBase, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';

//SnackBar
import { useSnackbar } from 'notistack';

function SearchUsers({ updateInputValue }) {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	//Buscar DATA
	useEffect(
		() => {
			let cancel = false;

			const fetchData = async () => {
				try {
					const res = await axios.get('api/user/all');

					if (!cancel) {
						setOptions(res.data);
					}
				} catch (error) {
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
						enqueueSnackbar('Error interno en el sistema', {
							variant: 'error'
						});
					}
				}
			};
			
			//Realizar consulta
			if(loading) {
				fetchData();
			}
			return () => {
				cancel = true;
			};
		},
		[loading]
	);

	//Reset de DATA guardada.
	useEffect(
		() => {
			if (!open) {
				setOptions([]);
			}
		},
		[open]
	);

	const handleClick = user => {
		if (user !== null) {
			updateInputValue(user, 'MODIFY_EXTERNO');
		}
	};

	return (
		<div className="searchUser">
			<Autocomplete
				//Verificar si está loading o no
				loading={loading}
				//Mensajes
				loadingText="Cargando..."
				noOptionsText="Sin resultados"
				//Data a usar para el autocompletado
				options={options}
				onChange={(e, user) => {
					console.log(user);
					handleClick(user);
				}}
				//Texto a mostrar al seleccionar un resultado.
				getOptionLabel={option => {
					return `${option.privilegio}${option.cedula}`;
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
					setOpen(true);
				}}
				//Acción al cerrar.
				onClose={() => {
					setOpen(false);
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

//REDUX
const mapDispatchToProps = {
	updateInputValue
};

export default connect(null, mapDispatchToProps)(SearchUsers);