import React from 'react';

import {
	FormControlLabel,
	Switch,
} from '@material-ui/core';

import { useController } from "react-hook-form";

export function SwitchHook(props) {
	const { 
		label, 
		name, 
		control, 
		defaultValue = false,
		labelPlacement = 'end', 
		...rest
	} = props;
	
	const {
    field: { ref, onChange, value, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });
	
	return (
		<FormControlLabel
			control={
				<Switch
					{...rest}
					{...inputProps}
					inputRef={ref}
					onChange={e => onChange(e.currentTarget.checked)}
					checked={value}
				/>
			}
			label={label}
			labelPlacement={labelPlacement}
		/>
	);
}