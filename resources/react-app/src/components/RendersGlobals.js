import React, { useState, useEffect } from 'react';

//Material-UI
import {
	TextField,
	InputAdornment,
	IconButton,
	FormControl,
	FormLabel,
	FormControlLabel,
	FormHelperText,
	Radio,
	RadioGroup,
	Select,
	InputLabel,
	CircularProgress
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Controller } from 'react-hook-form';

export function RenderSelectFormHook({
	id,
	name,
	nameLabel,
	control,
	defaultValue,
	children,
	errors,
	customWidth = false,
	...props
}) {
	return (
		<FormControl {...props} style={{ width: customWidth ? (customWidth) : '100%' }} error={Boolean(errors)}>
			<InputLabel id={id + '-label'}>{nameLabel}</InputLabel>
			<Controller
				as={
					<Select labelId={id + '-label'} id={id}>
						{children}
					</Select>
				}
				name={name}
				control={control}
				defaultValue={defaultValue}
				rules={{ required: { value: true, message: 'Campo requerido.' } }}
			/>
			<FormHelperText>{errors?.message}</FormHelperText>
		</FormControl>
	);
}

export function RenderRadios({ registerInput, data, defaultValue = null }) {
	return (
		<FormControl component="fieldset">
			<FormLabel color={data.color} component="legend">
				{data.title}
			</FormLabel>
			<RadioGroup defaultValue={defaultValue} aria-label={data.name} name={data.name} row>
				{data.values.map((element, i) => {
					return (
						<FormControlLabel
							key={i}
							value={element.value}
							inputRef={registerInput}
							control={<Radio color={data.color} />}
							label={element.name}
							labelPlacement="end"
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
}

export function RenderInput(props) {
	const {
		type = 'text',
		name,
		registerInput,
		errors,
		defaultValue,
		label,
		variant = 'outlined',
		textarea = false,
		maxRows = 6,
		maxWidth = false,
		size = 'medium',
		passwordMode = false,
		focus = false,
		disabledOnLoading = null,
	} = props;

	const [visibility, setVisibility] = useState(false);

	const handleClick = () => {
		setVisibility(!visibility);
	};

	const textareaConfig = {
		rows: 4,
		rowsMax: maxRows,
	};
	return (
		<TextField
			inputRef={registerInput}
			type={passwordMode ? (visibility ? 'text' : 'password') : type}
			name={name}
			defaultValue={defaultValue}
			label={label}
			size={size}
			disabled={disabledOnLoading !== null && disabledOnLoading}
			error={Boolean(errors)}
			helperText={errors?.message}
			autoFocus={focus}
			style={{ width: '100%', maxWidth: maxWidth ? maxWidth : 'none' }}
			variant={variant}
			multiline={textarea}
			InputProps={{
				endAdornment: passwordMode ? (
					<InputAdornment position="end">
						<IconButton onClick={handleClick} size={size}>
							{visibility ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				) : null,
			}}
			{...textareaConfig}
		/>
	);
}

export function RenderAutocompleteAsync({ id, query }) {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;
	
	useEffect(()=>{
		let cancel = false;
		
		if (!loading) {
			return undefined;
		}
		
		const queryAsync = async () => {
			let result = await query();
			
			if (!cancel){
				console.log(result);
			}
		}
		
		queryAsync();
		
		return ()=>{
			cancel = true;
		}
		
	}, [loading, query]);
	
	//Clear data
	useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
	
	return (
		<Autocomplete 
			id={id}
			open={open}
      onOpen={() => {
        setOpen(true);
      }}
			onClose={() => {
        setOpen(false);
      }}
			loading={loading}
			loadingText="Cargando..."
			noOptionsText="Sin resultados"
			options={options}
			getOptionSelected={(option, value) => option.estado === value}
			getOptionLabel={data => data.estado}
			renderInput={(params) => (
				<TextField {...params} 
					label="Estado" 
					variant="outlined"
					size="small" 
					InputProps={{
					...params.InputProps,
					endAdornment: (
						<React.Fragment>
							{loading ? <CircularProgress color="inherit" size={20} /> : null}
							{params.InputProps.endAdornment}
						</React.Fragment>
					)}}
					/>
			)}
		/>
	);
}