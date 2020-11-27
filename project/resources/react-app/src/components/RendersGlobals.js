import React, { useState } from 'react';

//Material-UI
import {
	TextField,
	InputAdornment,
	IconButton,
	FormControl,
	InputLabel,
	FormHelperText,
	Select,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { Controller } from 'react-hook-form';

export function RenderSelectFormHook({
	id,
	name,
	nameLabel,
	control,
	defaultValue,
	errors,
	helperText,
	customWidth = false,
	children,
	...rest
}) {
	return (
		<FormControl 
			style={{ width: customWidth ? (customWidth) : '100%' }} 
			error={Boolean(errors)}
			{...rest}
		>
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
				rules={{ required: { value: true, message: 'Este campo es obligatorio' } }}
			/>
			<FormHelperText>{errors?.message ? errors?.message : helperText}</FormHelperText>
		</FormControl>
	);
}

export function RenderInputPassword(props) {
	const {
		name,
		registerInput,
		error,
		defaultValue,
		label,
		helperText,
		variant = 'outlined',
		maxWidth = false,
		size = 'medium',
		autoFocus = false,
		disabled = false,
	} = props;

	const [visibility, setVisibility] = useState(false);

	const handleClick = () => {
		setVisibility(!visibility);
	};
	return (
		<TextField
			inputRef={registerInput}
			type={visibility ? 'text' : 'password'}
			name={name}
			defaultValue={defaultValue}
			label={label}
			size={size}
			disabled={disabled}
			error={Boolean(error)}
			helperText={helperText}
			style={{ maxWidth: maxWidth ? maxWidth : 'none' }}
			fullWidth
			autoFocus={autoFocus}
			variant={variant}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClick} size={size}>
							{visibility ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}