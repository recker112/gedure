import React from 'react';

import {
	FormControlLabel,
	Switch,
} from '@mui/material';

import { useController } from "react-hook-form";

export function SwitchHook({ 
	label, 
	name, 
	control, 
	defaultValue = false,
	labelPlacement = 'end', 
	...rest
}) {
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
			sx={{userSelect: 'none'}}
			labelPlacement={labelPlacement}
		/>
	);
}