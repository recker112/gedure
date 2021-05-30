import React, { useState, useCallback, useEffect } from 'react';

import {
	TextField,
	InputAdornment,
	IconButton,
	CircularProgress,
} from '@material-ui/core';
import {
	Autocomplete
} from '@material-ui/lab';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useController } from "react-hook-form";

import NumberFormat from 'react-number-format';

// Components
import useAsyncDebounce from '../../hooks/useAsyncDebounce';

export function InputHook(props) {
	const { 
		name, 
		control,
		rules = null, 
		defaultValue = '',
		helperText = '',
		...rest
	} = props;
	const {
    field: { ref, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });
	
	
	return (
		<TextField
			inputRef={ref}
			{...inputProps}
			{...rest}
			error={invalid}
			helperText={error ? error.message : helperText}
		/>
	);
}

export function InputPasswordHook(props) {
	const { 
		name, 
		control,
		rules = null,
		helperText = '', 
		defaultValue = '',
		...rest 
	} = props;
	const [visibility, setVisibility] = useState(false);
	
	const {
    field: { ref, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });

	const handleClick = () => {
		setVisibility(!visibility);
	};
	
	return (
		<TextField
			inputRef={ref}
			{...inputProps}
			{...rest}
			error={invalid}
			helperText={error ? error.message : helperText}
			type={visibility ? 'text' : 'password'}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClick} size={rest?.size}>
							{visibility ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}


function NumberFormatMoney(props) {
	const { inputRef, onChange, format, negative, ...other } = props;

	const MAX_VAL = 999999999999;
	const withValueLimit = (inputObj) => {
		const { value } = inputObj;
		if (value < MAX_VAL) return inputObj;
	};

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange(values?.floatValue || '');
			}}
			thousandSeparator='.'
			prefix={'Bs/S '}
			isAllowed={withValueLimit}
			decimalScale={2}
			decimalSeparator=','
			allowNegative={negative}
		/>
	);
}

function NumberFormatFormated(props) {
	const { inputRef, onChange, format, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange(values?.value || '');
			}}
			format={format}
			mask="_"
		/>
	);
}

export function InputMaskHook(props) {
	const { 
		name, 
		control,
		rules = null,
		mask='mask',
		format='',
		helperText = '', 
		defaultValue = '',
		negative = false,
		...rest 
	} = props;
	
	const {
    field: { ref, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });
	
	const MaskFormats = {
		'money': NumberFormatMoney,
		'mask': NumberFormatFormated,
	}
	
	return (
		<TextField
			inputRef={ref}
			{...rest}
			{...inputProps}
			error={invalid}
			helperText={error ? error.message : helperText}
			format={format}
			InputProps={{
				inputComponent: MaskFormats[mask],
			}}
			inputProps={{
				format: format,
				negative: negative
			}}
		/>
	);
}

export function AutoCompleteHook(props) {
	const {
		name, 
		control,
		getOptionLabel, 
		options,
		defaultValue = undefined,
		helperText = '',
		renderOption = null, 
		multiple = false,
		rules = null, 
		...rest 
	} = props;
	
	const {
    field: { ref, onChange, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });
	
	return (
		<Autocomplete
			{...inputProps}
			onChange={(e, newValue) => {
				onChange(newValue);
			}}
			multiple={multiple}
			getOptionLabel={getOptionLabel}
			options={options}
			noOptionsText='No hay resultados'
			renderOption={renderOption}
			renderInput={(params) => (
				<TextField
					{...params}
					{...rest}
					inputRef={ref}
					error={invalid}
					helperText={error ? error.message : helperText}
				/>
			)}
		/>
	);
}

export function AutoCompleteAsyncHook(props) {
	const { 
		label, 
		name, 
		control, 
		asyncRequest, 
		getOptionLabel, 
		helperText = '',
		renderOption = null, 
		multiple = false, 
		rules = null, 
		...rest 
	} = props;
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [hasFinish, setHasFinish] = useState(true);
	const loading = hasFinish && (open && options.length === 0);
	
	const {
    field: { ref, onChange, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue: multiple ? [] : '',
  });
	
	// Request to loading
	useEffect(() => {
		let cancel = false;
		
		const query = async () => {
			const result = await asyncRequest(inputValue);
			
			if (!cancel) {
				setOptions(result);
				setHasFinish(false);
			}
		}
		
		if (loading) {
			query();
		}
		
		return () => {
			cancel = true;
		}
		
		// eslint-disable-next-line
	},[loading]);
	
	// Clear options
	useEffect(() => {
		if (!open) {
			setOptions([]);
			setHasFinish(true);
		}
	},[open]);
	
	// eslint-disable-next-line
	const refreshResults = useCallback(
		useAsyncDebounce(() => {
			setOptions([]);
			setHasFinish(true);
		},500),
	[]);
	
	return (
		<Autocomplete
			{...inputProps}
			multiple={multiple}
			getOptionLabel={getOptionLabel}
			options={options}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			onChange={(e, newValue) => {
				onChange(newValue);
			}}
			inputValue={inputValue}
			onInputChange={(e, newValue) => {
				setInputValue(newValue);
				refreshResults();
			}}
			loading={loading}
			loadingText='Cargando...'
			noOptionsText='No hay resultados'
			renderOption={renderOption}
			renderInput={(params) => (
				<TextField
					{...params}
					{...rest}
					inputRef={ref}
					label={label}
					variant='outlined'
					error={invalid}
					helperText={error ? error.message : helperText}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? <CircularProgress color='inherit' size={20} /> : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						)
					}}
				/>
			)}
		/>
	);
}