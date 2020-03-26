//React
import React, { useState, useEffect } from 'react';

//Material-UI
import { CircularProgress, InputBase, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';

function SearchUsers({updateInputValue}) {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	//Buscar DATA
	useEffect(
		() => {
			let cancel = false;
			setTimeout(() => {
				if (loading && !cancel) {
					setOptions([
						{
              cedula: '213142',
              combiCedula: 'V-213142',
							name: 'luis',
							//AÑadir ESTO en caso de querer buscar la cedula
							//con el privilegio incluido.
							//combiCedula: 'V-213142',
							privilegio: 'V-',
							curso: '6',
							seccion: 'C'
						},
						{
              cedula: '2434144',
              combiCedula: 'V-2434144',
							name: 'ale',
							privilegio: 'V-',
							curso: '3G',
							seccion: 'U'
						},
						{
              cedula: '3029472',
              combiCedula: 'CR-3029472',
							name: 'Fernando',
							privilegio: 'CR-'
						},
						{
              cedula: '3939484',
              combiCedula: 'A-3939484',
							name: 'Alverto',
							privilegio: 'A-'
						}
					]);
				}
			}, 2000);
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
      updateInputValue(user,'MODIFY_EXTERNO');
    }
	}

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
        onChange={(e,user)=>{
          handleClick(user);
        }}
				//Texto a mostrar al seleccionar un resultado.
				getOptionLabel={option => {return `${option.privilegio}${option.cedula}`}}
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

export default connect(null,mapDispatchToProps)(SearchUsers);