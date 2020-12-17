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
				rules={{ required: { value: true, message: '* Campo requerido' } }}
			/>
			<FormHelperText>{errors?.message ? errors?.message : helperText}</FormHelperText>
		</FormControl>
	);
}

export function RenderInputPassword(props) {
	const [visibility, setVisibility] = useState(false);

	const handleClick = () => {
		setVisibility(!visibility);
	};
	
	return (
		<TextField
			type={visibility ? 'text' : 'password'}
			fullWidth
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClick} size={props?.size}>
							{visibility ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
			{...props}
		/>
	);
}