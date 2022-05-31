import React from 'react';

import {
	FormControl,
	InputLabel,
	Select,
	FormHelperText,
} from '@mui/material';

import { useController } from "react-hook-form";

export function SelectHook({
	name,
	label,
	control,
	helperText = '',
	defaultValue = '',
	rules = { required: '* Campo requerido' },
	children,
	...rest
}) {
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
		<FormControl
			{...rest}
			error={invalid}
		>
			<InputLabel id={name + '-label'}>{label}</InputLabel>
			<Select labelId={name + '-label'} id={name} {...inputProps}>
				{children}
			</Select>
			<FormHelperText>{error ? error.message : helperText}</FormHelperText>
		</FormControl>
	);
}